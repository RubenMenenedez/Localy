import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { inputClassName, labelClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";

export function NameStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.name");

  return (
    <label className="block space-y-2">
      <span className={labelClassName}>{t("label")}</span>
      <input
        className={`${inputClassName} text-lg`}
        value={draft.name ?? ""}
        maxLength={80}
        onChange={(event) => update({ name: event.target.value })}
      />
      <FieldError error={errors.name} />
    </label>
  );
}
