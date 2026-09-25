import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";
import { locales } from "@/lib/i18n/config";
import { nativeLanguageName } from "@/lib/i18n/native-name";

export function LanguageStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-2">
      {locales.map((locale) => (
        <label key={locale} className="flex items-center gap-2">
          <input
            type="radio"
            name="language"
            checked={draft.language === locale}
            onChange={() => update({ language: locale })}
          />
          {nativeLanguageName(locale)}
        </label>
      ))}
      <FieldError error={errors.language} />
    </div>
  );
}
