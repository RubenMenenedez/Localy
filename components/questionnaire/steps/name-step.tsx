import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";

export function NameStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.name");

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{t("label")}</span>
      <input
        className="w-full rounded border px-3 py-2"
        value={draft.name ?? ""}
        maxLength={80}
        onChange={(event) => update({ name: event.target.value })}
      />
      <FieldError error={errors.name} />
    </label>
  );
}
