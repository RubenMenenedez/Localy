import { getTranslations } from "next-intl/server";

export async function SiteFooter() {
  const t = await getTranslations("Landing");

  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-10 text-sm text-white/60">
        <span className="text-base font-semibold text-white">{t("brand")}</span>
        <span>{t("footer", { year: new Date().getFullYear() })}</span>
      </div>
    </footer>
  );
}
