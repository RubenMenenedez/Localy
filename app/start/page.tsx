import { LanguageSelector } from "@/components/i18n/language-selector";
import { Questionnaire } from "@/components/questionnaire/questionnaire";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  const { data: session } = await auth.getSession();

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex justify-end">
        <LanguageSelector />
      </div>
      <Questionnaire isSignedIn={Boolean(session?.user)} />
    </main>
  );
}
