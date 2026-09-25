"use server";

import { requireUser } from "@/lib/auth/session";
import { createDraftBusiness } from "@/lib/business/create";
import { businessDraftSchema } from "@/lib/questionnaire/schema";

// The owner always comes from the session, never from the submitted draft.
export async function submitDraft(input: unknown): Promise<{ ok: boolean }> {
  const user = await requireUser();
  const parsed = businessDraftSchema.safeParse(input);
  if (!parsed.success) return { ok: false };

  await createDraftBusiness({ id: user.id, name: user.name }, parsed.data);
  return { ok: true };
}
