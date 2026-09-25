"use client";

import { useLocale, useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { buttonSizes, buttonStyles } from "@/components/ui/button-styles";
import type { FieldErrors, StepProps } from "@/components/questionnaire/step-props";
import { SitePreview } from "@/components/questionnaire/site-preview";
import { ColorsStep } from "@/components/questionnaire/steps/colors-step";
import { ContactStep } from "@/components/questionnaire/steps/contact-step";
import { DescriptionStep } from "@/components/questionnaire/steps/description-step";
import { GoalStep } from "@/components/questionnaire/steps/goal-step";
import { HoursStep } from "@/components/questionnaire/steps/hours-step";
import { ImagesStep } from "@/components/questionnaire/steps/images-step";
import { LanguageStep } from "@/components/questionnaire/steps/language-step";
import { NameStep } from "@/components/questionnaire/steps/name-step";
import { ServicesStep } from "@/components/questionnaire/steps/services-step";
import { StyleStep } from "@/components/questionnaire/steps/style-step";
import { TypeStep } from "@/components/questionnaire/steps/type-step";
import { loadDraft, saveDraft } from "@/lib/questionnaire/draft-storage";
import { stepIds, stepSchemas, type PartialBusinessDraft, type StepId } from "@/lib/questionnaire/schema";
import ownerLaptop from "@/public/landing/owner-laptop.png";
import veterinary from "@/public/landing/veterinary.jpg";

const STEP_COMPONENTS: Record<StepId, ComponentType<StepProps>> = {
  type: TypeStep,
  goal: GoalStep,
  name: NameStep,
  description: DescriptionStep,
  style: StyleStep,
  colors: ColorsStep,
  language: LanguageStep,
  services: ServicesStep,
  hours: HoursStep,
  contact: ContactStep,
  images: ImagesStep,
};

// The first steps show a photo; from then on the right panel shows the live preview.
const STEP_PHOTOS: Partial<Record<StepId, StaticImageData>> = {
  type: ownerLaptop,
  goal: veterinary,
};

const WEEKDAYS = [1, 2, 3, 4, 5];
const COMPLETE_PATH = "/start/complete";

function initialDraft(locale: string): PartialBusinessDraft {
  return {
    language: locale as PartialBusinessDraft["language"],
    openingHours: WEEKDAYS.map((dayOfWeek) => ({ dayOfWeek, openMinute: 9 * 60, closeMinute: 17 * 60 })),
  };
}

function toFieldErrors(issues: { path: PropertyKey[]; message: string }[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path.join(".");
    errors[key] ??= issue.message;
  }
  return errors;
}

export function Questionnaire({ isSignedIn, header }: { isSignedIn: boolean; header: ReactNode }) {
  const t = useTranslations("Questionnaire");
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<PartialBusinessDraft | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    const stored = loadDraft();
    const restored = stored?.draft ?? initialDraft(locale);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after hydration.
    setDraft({ ...restored, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    setStep(Math.min(stored?.step ?? 0, stepIds.length - 1));
  }, [locale]);

  useEffect(() => {
    if (draft) saveDraft({ step, draft });
  }, [step, draft]);

  const stepId = stepIds[step];
  const StepComponent = STEP_COMPONENTS[stepId];
  const photo = STEP_PHOTOS[stepId];
  const isLast = step === stepIds.length - 1;

  function update(patch: PartialBusinessDraft) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function goTo(nextStep: number) {
    setErrors({});
    setStep(nextStep);
    window.scrollTo({ top: 0 });
  }

  function next() {
    const result = stepSchemas[stepId].safeParse(draft);
    if (!result.success) {
      setErrors(toFieldErrors(result.error.issues));
      return;
    }
    if (!isLast) return goTo(step + 1);

    router.push(isSignedIn ? COMPLETE_PATH : `/auth/sign-up?redirectTo=${encodeURIComponent(COMPLETE_PATH)}`);
  }

  return (
    <div className="grid min-h-[100svh] lg:grid-cols-[minmax(0,1fr)_42%]">
      <div className="flex flex-col px-6 sm:px-12 lg:px-16">
        {header}
        <ProgressBar current={step + 1} total={stepIds.length} />

        {draft && (
          <>
            <div className="flex flex-1 items-center py-14">
              <div key={stepId} className="animate-fade-up mx-auto w-full max-w-xl space-y-10">
                <div className="space-y-4">
                  <h1 className="text-4xl font-semibold tracking-tight text-balance text-neutral-900 sm:text-5xl">
                    {t(`steps.${stepId}.title`)}
                  </h1>
                  <p className="text-lg text-neutral-600">{t(`steps.${stepId}.description`)}</p>
                </div>
                <StepComponent draft={draft} update={update} errors={errors} />
              </div>
            </div>

            <nav className="sticky bottom-0 -mx-6 flex items-center justify-between border-t border-neutral-200 bg-white/95 px-6 py-5 backdrop-blur sm:-mx-12 sm:px-12 lg:-mx-16 lg:px-16">
              <button type="button" className={buttonStyles.ghost} disabled={step === 0} onClick={() => goTo(step - 1)}>
                <ArrowIcon direction="left" />
                {t("back")}
              </button>
              <button type="button" className={`${buttonStyles.primary} ${buttonSizes.md}`} onClick={next}>
                {isLast ? t("finish") : t("next")}
                <ArrowIcon />
              </button>
            </nav>
          </>
        )}
      </div>

      <aside className="relative hidden overflow-hidden bg-neutral-950 lg:block">
        {photo ? (
          <Image
            key={stepId}
            src={photo}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="42vw"
            className="animate-fade-in object-cover"
          />
        ) : (
          draft && (
            <div className="animate-fade-in sticky top-0 h-[100svh] p-10">
              <SitePreview draft={draft} />
            </div>
          )
        )}
      </aside>
    </div>
  );
}
