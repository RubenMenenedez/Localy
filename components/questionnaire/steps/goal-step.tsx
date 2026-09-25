import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { cardOptionClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";
import { WebsiteGoal } from "@/lib/generated/prisma/enums";

export function GoalStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.goal.options");

  return (
    <div className="space-y-3">
      {Object.values(WebsiteGoal).map((goal) => (
        <button key={goal} type="button" onClick={() => update({ goal })} className={cardOptionClassName(draft.goal === goal)}>
          <span className="block font-medium">{t(`${goal}.title`)}</span>
          <span className="mt-1 block text-sm opacity-70">{t(`${goal}.text`)}</span>
        </button>
      ))}
      <FieldError error={errors.goal} />
    </div>
  );
}
