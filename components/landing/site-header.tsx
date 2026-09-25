import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSelector } from "@/components/i18n/language-selector";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { buttonSizes, buttonStyles } from "@/components/ui/button-styles";

// Sits on top of the full-bleed hero photo, so it uses light text.
export async function SiteHeader() {
  const t = await getTranslations("Landing");

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 text-white">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          {t("brand")}
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <LanguageSelector variant="light" />
          <Link href="/auth/sign-in" className="text-sm text-white/80 transition hover:text-white">
            {t("nav.signIn")}
          </Link>
          <Link href="/start" className={`${buttonStyles.glass} ${buttonSizes.sm}`}>
            {t("nav.getStarted")}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
