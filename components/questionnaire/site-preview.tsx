import { useTranslations } from "next-intl";
import { readableTextColor } from "@/lib/color";
import { fontPairings } from "@/lib/fonts";
import type { PartialBusinessDraft } from "@/lib/questionnaire/schema";
import { headingWeight, websiteStyles } from "@/lib/website-styles";

const DEFAULT_COLORS = { primary: "#111827", secondary: "#1f2937", accent: "#38bdf8", background: "#ffffff" };
const MAX_SERVICES = 3;

// Live, simplified rendering of the future website from the in-progress draft.
export function SitePreview({ draft }: { draft: PartialBusinessDraft }) {
  const t = useTranslations("Preview");
  const colors = { ...DEFAULT_COLORS, ...draft.colors };
  const fonts = fontPairings[draft.fontPairing ?? "MODERN"];
  const look = websiteStyles[draft.style ?? "MINIMAL"];
  const bodyText = readableTextColor(colors.background);
  const heroText = readableTextColor(colors.secondary);
  const services = (draft.services ?? []).filter((service) => service.name.trim()).slice(0, MAX_SERVICES);

  const textAlign = draft.textAlign === "CENTER" ? "center" : "left";

  const heading = {
    fontFamily: fonts.heading,
    fontWeight: headingWeight(draft.boldHeadings ?? false),
    textTransform: look.headingCase,
    letterSpacing: look.headingTracking,
  } as const;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 bg-neutral-900 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 text-[11px] tracking-widest text-white/50 uppercase">{t("label")}</span>
      </div>

      <div
        className="flex-1 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: colors.background, color: bodyText, fontFamily: fonts.body }}
      >
        <nav className="flex items-center justify-between px-8 py-5 text-xs">
          <span className="truncate text-base" style={heading}>
            {draft.name?.trim() || t("namePlaceholder")}
          </span>
          <span className="flex gap-4 opacity-70">
            <span>{t("nav.services")}</span>
            <span>{t("nav.hours")}</span>
            <span>{t("nav.contact")}</span>
          </span>
        </nav>

        <section
          className="px-8 py-14 transition-colors duration-500"
          style={{ backgroundColor: colors.secondary, color: heroText, textAlign }}
        >
          <h2 className="text-3xl leading-tight" style={heading}>
            {draft.name?.trim() || t("namePlaceholder")}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm opacity-80">{draft.description?.trim() || t("descriptionPlaceholder")}</p>
          <span
            className="mt-6 inline-block px-5 py-2.5 text-xs font-semibold transition-colors duration-500"
            style={{ backgroundColor: colors.primary, color: readableTextColor(colors.primary), borderRadius: look.radius }}
          >
            {t(`cta.${draft.goal ?? "BOOKINGS"}`)}
          </span>
        </section>

        <section className="space-y-3 px-8 py-8">
          <h3 className="text-lg" style={{ ...heading, textAlign }}>
            {t("services")}
          </h3>
          {services.length === 0 && <p className="text-sm opacity-60">{t("noServices")}</p>}
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between border px-4 py-3 text-sm"
              style={{ borderColor: `${bodyText}22`, borderRadius: look.radius === "9999px" ? "1rem" : look.radius }}
            >
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                {service.name}
              </span>
              {Number.isFinite(service.durationMinutes) && (
                <span className="opacity-60">{t("duration", { minutes: service.durationMinutes })}</span>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
