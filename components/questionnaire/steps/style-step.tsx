import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { cardOptionClassName, labelClassName, optionClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";
import { fontPairings } from "@/lib/fonts";
import { FontPairing, TextAlign, WebsiteStyle } from "@/lib/generated/prisma/enums";
import { headingWeight, websiteStyles } from "@/lib/website-styles";

export function StyleStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.style");
  const hasStyle = Boolean(draft.style);

  return (
    <div className="space-y-10">
      <div className="grid gap-3 sm:grid-cols-2">
        {Object.values(WebsiteStyle).map((style) => {
          const look = websiteStyles[style];
          const fonts = fontPairings[look.defaults.fontPairing];
          return (
            <button
              key={style}
              type="button"
              onClick={() => update({ style, ...look.defaults })}
              className={cardOptionClassName(draft.style === style)}
            >
              <span
                aria-hidden
                className="mb-4 flex h-16 flex-col justify-end gap-2 border-b border-current/15 pb-3"
                style={{ alignItems: look.defaults.textAlign === "CENTER" ? "center" : "flex-start" }}
              >
                <span
                  className="text-2xl leading-none"
                  style={{
                    fontFamily: fonts.heading,
                    fontWeight: headingWeight(look.defaults.boldHeadings),
                    textTransform: look.headingCase,
                    letterSpacing: look.headingTracking,
                  }}
                >
                  Aa
                </span>
                <span className="h-2 w-12 bg-current/70" style={{ borderRadius: look.radius }} />
              </span>
              <span className="block font-medium">{t(`options.${style}.title`)}</span>
              <span className="mt-1 block text-sm opacity-70">{t(`options.${style}.text`)}</span>
            </button>
          );
        })}
      </div>
      <FieldError error={errors.style} />

      {hasStyle && (
        <div className="animate-fade-up space-y-8 border-t border-neutral-200 pt-8">
          <p className="text-sm text-neutral-600">{t("customize")}</p>

          <fieldset className="space-y-3">
            <legend className={labelClassName}>{t("position.label")}</legend>
            <div className="flex gap-2.5">
              {Object.values(TextAlign).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => update({ textAlign: align })}
                  className={`${optionClassName(draft.textAlign === align)} inline-flex items-center gap-2`}
                >
                  <span aria-hidden className={`flex w-4 flex-col gap-0.5 ${align === "CENTER" ? "items-center" : "items-start"}`}>
                    <span className="h-0.5 w-4 bg-current" />
                    <span className="h-0.5 w-2.5 bg-current" />
                    <span className="h-0.5 w-3.5 bg-current" />
                  </span>
                  {t(`position.${align}`)}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className={labelClassName}>{t("font.label")}</legend>
            <div className="grid grid-cols-2 gap-3">
              {Object.values(FontPairing).map((pairing) => (
                <button
                  key={pairing}
                  type="button"
                  onClick={() => update({ fontPairing: pairing })}
                  className={`${cardOptionClassName(draft.fontPairing === pairing)} !p-4`}
                >
                  <span className="block text-xl" style={{ fontFamily: fontPairings[pairing].heading }}>
                    {t(`font.options.${pairing}.title`)}
                  </span>
                  <span className="mt-1 block text-xs opacity-70" style={{ fontFamily: fontPairings[pairing].body }}>
                    {t(`font.options.${pairing}.text`)}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span>
              <span className={`block ${labelClassName}`}>{t("bold.label")}</span>
              <span className="block text-sm text-neutral-500">{t("bold.text")}</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={Boolean(draft.boldHeadings)}
              onClick={() => update({ boldHeadings: !draft.boldHeadings })}
              className={`relative h-7 w-12 shrink-0 rounded-full transition duration-300 ${
                draft.boldHeadings ? "bg-neutral-950 shadow-[0_6px_18px_-6px_rgba(56,189,248,0.7)]" : "bg-neutral-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                  draft.boldHeadings ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>
        </div>
      )}
    </div>
  );
}
