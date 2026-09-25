import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSelector } from "@/components/i18n/language-selector";

export async function QuestionnaireHeader() {
  const t = await getTranslations();

  return (
    <header className="flex h-20 items-center justify-between">
      <Link href="/" className="text-xl font-semibold tracking-tight">
        {t("Landing.brand")}
      </Link>
      <div className="flex items-center gap-6">
        <LanguageSelector />
        <Link href="/" className="text-sm text-neutral-600 transition hover:text-neutral-900">
          {t("Questionnaire.exit")}
        </Link>
      </div>
    </header>
  );
}
