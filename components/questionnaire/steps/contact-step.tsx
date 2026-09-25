import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";

const FIELDS = [
  { key: "email", type: "email", maxLength: 254 },
  { key: "phone", type: "tel", maxLength: 30 },
  { key: "address", type: "text", maxLength: 200 },
] as const;

export function ContactStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.contact");

  return (
    <div className="space-y-3">
      {FIELDS.map(({ key, type, maxLength }) => (
        <label key={key} className="block space-y-1">
          <span className="text-sm font-medium">{t(key)}</span>
          <input
            className="w-full rounded border px-3 py-2"
            type={type}
            maxLength={maxLength}
            value={draft[key] ?? ""}
            onChange={(event) => update({ [key]: event.target.value })}
          />
          <FieldError error={errors[key]} />
        </label>
      ))}
    </div>
  );
}
