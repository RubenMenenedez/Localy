import { useTranslations } from "next-intl";
import { useState } from "react";
import { FieldError } from "@/components/questionnaire/field-error";
import { labelClassName, optionClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";
import { moodPalettes, sectorPalettesFor, type Palette, type PaletteMood } from "@/lib/business-types";

const ROLES = ["primary", "secondary", "accent", "background"] as const;
const MOODS: (PaletteMood | "all")[] = ["all", "light", "dark", "warm", "cool"];
const FALLBACK: Palette = { primary: "#111827", secondary: "#1f2937", accent: "#38bdf8", background: "#ffffff" };

function samePalette(a: Palette | undefined, b: Palette) {
  return ROLES.every((role) => a?.[role] === b[role]);
}

function PaletteGrid({ palettes, selected, onSelect }: { palettes: Palette[]; selected?: Palette; onSelect: (p: Palette) => void }) {
  const t = useTranslations("Questionnaire.steps.colors");

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {palettes.map((palette) => (
        <button
          key={ROLES.map((role) => palette[role]).join("")}
          type="button"
          aria-label={t("palette", { primary: palette.primary, secondary: palette.secondary })}
          onClick={() => onSelect(palette)}
          className={`flex h-14 overflow-hidden rounded-xl ring-offset-2 transition duration-300 ${
            samePalette(selected, palette)
              ? "ring-2 ring-neutral-950 shadow-[0_10px_28px_-10px_rgba(56,189,248,0.6)]"
              : "ring-1 ring-neutral-200 hover:-translate-y-0.5 hover:ring-neutral-400"
          }`}
        >
          {ROLES.map((role) => (
            <span key={role} className={role === "primary" ? "flex-[2]" : "flex-1"} style={{ backgroundColor: palette[role] }} />
          ))}
        </button>
      ))}
    </div>
  );
}

export function ColorsStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.colors");
  const [mood, setMood] = useState<PaletteMood | "all">("all");
  const colors = draft.colors;
  const select = (palette: Palette) => update({ colors: palette });

  return (
    <div className="space-y-10">
      {draft.type && (
        <section className="space-y-3">
          <h2 className={labelClassName}>{t("suggested")}</h2>
          <PaletteGrid palettes={sectorPalettesFor(draft.type)} selected={colors} onSelect={select} />
        </section>
      )}

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={labelClassName}>{t("more")}</h2>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((option) => (
              <button key={option} type="button" onClick={() => setMood(option)} className={`${optionClassName(mood === option)} !px-3 !py-1 text-xs`}>
                {t(`moods.${option}`)}
              </button>
            ))}
          </div>
        </div>
        <PaletteGrid
          palettes={moodPalettes.filter((entry) => mood === "all" || entry.mood === mood).map((entry) => entry.palette)}
          selected={colors}
          onSelect={select}
        />
      </section>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>{t("custom")}</legend>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ROLES.map((role) => (
            <label key={role} className="flex items-center gap-3 text-sm text-neutral-700">
              <input
                type="color"
                className="h-10 w-10 shrink-0 cursor-pointer rounded-full border border-neutral-300"
                value={colors?.[role] ?? FALLBACK[role]}
                onChange={(event) => update({ colors: { ...FALLBACK, ...colors, [role]: event.target.value } })}
              />
              {t(`roles.${role}`)}
            </label>
          ))}
        </div>
      </fieldset>
      <FieldError error={errors.colors ?? ROLES.map((role) => errors[`colors.${role}`]).find(Boolean)} />
    </div>
  );
}
