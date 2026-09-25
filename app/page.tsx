import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Link href="/start" className="underline">
        {t("start")}
      </Link>
    </main>
  );
}
