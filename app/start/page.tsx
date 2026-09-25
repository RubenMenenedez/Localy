import { Questionnaire } from "@/components/questionnaire/questionnaire";
import { QuestionnaireHeader } from "@/components/questionnaire/questionnaire-header";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  const { data: session } = await auth.getSession();

  return (
    <main>
      <Questionnaire isSignedIn={Boolean(session?.user)} header={<QuestionnaireHeader />} />
    </main>
  );
}
