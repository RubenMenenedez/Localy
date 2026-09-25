import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSelector } from "@/components/i18n/language-selector";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const t = await getTranslations("Dashboard");

  return (
    <main className="space-y-4 p-8">
      <LanguageSelector />
      <p>{t("signedInAs", { email: user.email })}</p>
      <Link href="/auth/sign-out" className="underline">
        {t("signOut")}
      </Link>
    </main>
  );
}
