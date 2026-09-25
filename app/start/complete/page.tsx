import { CompleteDraft } from "@/components/questionnaire/complete-draft";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function CompletePage() {
  await requireUser();

  return (
    <main className="mx-auto max-w-2xl p-4">
      <CompleteDraft />
    </main>
  );
}
