import { z } from "zod";
import { BusinessType } from "@/lib/generated/prisma/enums";
import { localeSchema } from "@/lib/i18n/config";

// Every `error` below is a key in messages: Questionnaire.errors.<key>
const MINUTES_PER_DAY = 24 * 60;

const requiredText = (max: number) =>
  z.string({ error: "required" }).trim().min(1, { error: "required" }).max(max, { error: "tooLong" });

const optionalText = (max: number) =>
  z.string().trim().max(max, { error: "tooLong" }).optional();

const hexColor = z.string({ error: "required" }).regex(/^#[0-9a-f]{6}$/i, { error: "invalidColor" });

function isValidTimeZone(value: string) {
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export const serviceSchema = z.object({
  name: requiredText(80),
  priceCents: z.number({ error: "invalidPrice" }).int({ error: "invalidPrice" }).min(0, { error: "invalidPrice" }).max(10_000_000, { error: "invalidPrice" }),
  durationMinutes: z.number({ error: "invalidDuration" }).int({ error: "invalidDuration" }).min(5, { error: "invalidDuration" }).max(480, { error: "invalidDuration" }),
});

export const hoursIntervalSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(6),
    openMinute: z.number({ error: "required" }).int().min(0).max(MINUTES_PER_DAY - 1),
    closeMinute: z.number({ error: "required" }).int().min(1).max(MINUTES_PER_DAY),
  })
  .refine((interval) => interval.openMinute < interval.closeMinute, {
    error: "closeBeforeOpen",
    path: ["closeMinute"],
  });

const openingHoursSchema = z
  .array(hoursIntervalSchema)
  .min(1, { error: "hoursRequired" })
  .superRefine((intervals, ctx) => {
    for (let day = 0; day < 7; day++) {
      const sorted = intervals
        .filter((interval) => interval.dayOfWeek === day)
        .sort((a, b) => a.openMinute - b.openMinute);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].openMinute < sorted[i - 1].closeMinute) {
          ctx.addIssue({ code: "custom", message: "hoursOverlap" });
          return;
        }
      }
    }
  });

export const stepSchemas = {
  type: z.object({ type: z.enum(BusinessType, { error: "required" }) }),
  colors: z.object({ colors: z.object({ primary: hexColor, secondary: hexColor }, { error: "required" }) }),
  name: z.object({ name: requiredText(80) }),
  description: z.object({ description: requiredText(1000) }),
  language: z.object({ language: localeSchema }),
  services: z.object({ services: z.array(serviceSchema).min(1, { error: "servicesRequired" }) }),
  hours: z.object({ openingHours: openingHoursSchema }),
  contact: z.object({
    email: z.email({ error: "invalidEmail" }),
    phone: optionalText(30),
    address: optionalText(200),
  }),
  images: z.object({}),
};

export type StepId = keyof typeof stepSchemas;

export const stepIds = Object.keys(stepSchemas) as StepId[];

export const businessDraftSchema = z.object({
  ...stepSchemas.type.shape,
  ...stepSchemas.colors.shape,
  ...stepSchemas.name.shape,
  ...stepSchemas.description.shape,
  ...stepSchemas.language.shape,
  ...stepSchemas.services.shape,
  ...stepSchemas.hours.shape,
  ...stepSchemas.contact.shape,
  timezone: z.string().refine(isValidTimeZone, { error: "invalidTimezone" }),
});

export type BusinessDraft = z.infer<typeof businessDraftSchema>;

// What is stored in the browser while the questionnaire is in progress; the Phase 3 preview reads this shape.
export type PartialBusinessDraft = Partial<BusinessDraft>;
