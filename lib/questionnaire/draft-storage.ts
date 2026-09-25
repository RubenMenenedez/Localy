import { z } from "zod";
import type { PartialBusinessDraft } from "@/lib/questionnaire/schema";

const STORAGE_KEY = "localy.questionnaire.v1";

// Step data is only loosely checked here; each step is validated before moving on and the whole draft before saving.
const storedDraftSchema = z.object({
  step: z.number().int().nonnegative(),
  draft: z.record(z.string(), z.unknown()),
});

export type StoredDraft = { step: number; draft: PartialBusinessDraft };

export function loadDraft(): StoredDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = storedDraftSchema.safeParse(JSON.parse(raw));
    return parsed.success ? (parsed.data as StoredDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(value: StoredDraft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage can be unavailable (private mode, quota); the questionnaire still works without persistence.
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
