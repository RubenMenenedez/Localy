import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguageSelector } from "@/components/i18n/language-selector";
import { requireUser } from "@/lib/auth/session";
import { listOwnedBusinesses } from "@/lib/business/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const businesses = await listOwnedBusinesses(user.id);
  const t = await getTranslations("Dashboard");

  return (
    <main className="space-y-4 p-8">
      <LanguageSelector />
      <p>{t("signedInAs", { email: user.email })}</p>
      <h1 className="text-xl font-semibold">{t("businesses")}</h1>
      {businesses.length === 0 ? (
        <p>{t("noBusinesses")}</p>
      ) : (
        <ul className="list-disc pl-5">
          {businesses.map((business) => (
            <li key={business.id}>
              {business.name} — {t(`status.${business.status}`)}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-4">
        <Link href="/start" className="underline">
          {t("createBusiness")}
        </Link>
        <Link href="/auth/sign-out" className="underline">
          {t("signOut")}
        </Link>
      </div>
    </main>
  );
}
