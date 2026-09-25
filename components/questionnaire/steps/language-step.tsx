import { FieldError } from "@/components/questionnaire/field-error";
import { optionClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";
import { locales } from "@/lib/i18n/config";
import { nativeLanguageName } from "@/lib/i18n/native-name";

export function LanguageStep({ draft, update, errors }: StepProps) {
  return (
    <div className="space-y-3">
      <div role="radiogroup" className="flex flex-wrap gap-3">
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            role="radio"
            aria-checked={draft.language === locale}
            onClick={() => update({ language: locale })}
            className={optionClassName(draft.language === locale)}
          >
            {nativeLanguageName(locale)}
          </button>
        ))}
      </div>
      <FieldError error={errors.language} />
    </div>
  );
}
