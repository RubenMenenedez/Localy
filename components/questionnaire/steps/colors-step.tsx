import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";
import { businessTypeConfig, type Palette } from "@/lib/business-types";

export function ColorsStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.colors");
  const palettes = draft.type ? businessTypeConfig[draft.type].palettes : [];
  const colors = draft.colors;

  const isSelected = (palette: Palette) =>
    colors?.primary === palette.primary && colors?.secondary === palette.secondary;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {palettes.map((palette) => (
          <button
            key={`${palette.primary}-${palette.secondary}`}
            type="button"
            aria-label={t("palette", { primary: palette.primary, secondary: palette.secondary })}
            onClick={() => update({ colors: palette })}
            className={`flex overflow-hidden rounded border-2 ${isSelected(palette) ? "border-gray-900" : "border-transparent"}`}
          >
            <span className="h-10 w-10" style={{ backgroundColor: palette.primary }} />
            <span className="h-10 w-10" style={{ backgroundColor: palette.secondary }} />
          </button>
        ))}
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t("custom")}</legend>
        {(["primary", "secondary"] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="color"
              value={colors?.[key] ?? "#000000"}
              onChange={(event) =>
                update({
                  colors: {
                    primary: colors?.primary ?? "#000000",
                    secondary: colors?.secondary ?? "#ffffff",
                    [key]: event.target.value,
                  },
                })
              }
            />
            {t(key)}
          </label>
        ))}
      </fieldset>
      <FieldError error={errors.colors ?? errors["colors.primary"] ?? errors["colors.secondary"]} />
    </div>
  );
}
