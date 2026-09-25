"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import type { FieldErrors, StepProps } from "@/components/questionnaire/step-props";
import { ColorsStep } from "@/components/questionnaire/steps/colors-step";
import { ContactStep } from "@/components/questionnaire/steps/contact-step";
import { DescriptionStep } from "@/components/questionnaire/steps/description-step";
import { HoursStep } from "@/components/questionnaire/steps/hours-step";
import { ImagesStep } from "@/components/questionnaire/steps/images-step";
import { LanguageStep } from "@/components/questionnaire/steps/language-step";
import { NameStep } from "@/components/questionnaire/steps/name-step";
import { ServicesStep } from "@/components/questionnaire/steps/services-step";
import { TypeStep } from "@/components/questionnaire/steps/type-step";
import { loadDraft, saveDraft } from "@/lib/questionnaire/draft-storage";
import { stepIds, stepSchemas, type PartialBusinessDraft, type StepId } from "@/lib/questionnaire/schema";

const STEP_COMPONENTS: Record<StepId, ComponentType<StepProps>> = {
  type: TypeStep,
  colors: ColorsStep,
  name: NameStep,
  description: DescriptionStep,
  language: LanguageStep,
  services: ServicesStep,
  hours: HoursStep,
  contact: ContactStep,
  images: ImagesStep,
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

export function Questionnaire({ isSignedIn }: { isSignedIn: boolean }) {
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

  if (!draft) return null;

  const stepId = stepIds[step];
  const StepComponent = STEP_COMPONENTS[stepId];
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
    <div className="space-y-6">
      <ProgressBar current={step + 1} total={stepIds.length} />
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{t(`steps.${stepId}.title`)}</h1>
        <p className="text-gray-600">{t(`steps.${stepId}.description`)}</p>
      </div>
      <StepComponent draft={draft} update={update} errors={errors} />
      <div className="flex justify-between">
        <button
          type="button"
          className="rounded border px-4 py-2 disabled:opacity-40"
          disabled={step === 0}
          onClick={() => goTo(step - 1)}
        >
          {t("back")}
        </button>
        <button type="button" className="rounded bg-gray-900 px-4 py-2 text-white" onClick={next}>
          {isLast ? t("finish") : t("next")}
        </button>
      </div>
    </div>
  );
}
