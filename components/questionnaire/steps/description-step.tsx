import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { inputClassName, labelClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";

export function DescriptionStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.description");

  return (
    <label className="block space-y-2">
      <span className={labelClassName}>{t("label")}</span>
      <textarea
        className={inputClassName}
        rows={6}
        maxLength={1000}
        value={draft.description ?? ""}
        onChange={(event) => update({ description: event.target.value })}
      />
      <FieldError error={errors.description} />
    </label>
  );
}
