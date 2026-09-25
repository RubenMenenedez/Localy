import type { PartialBusinessDraft } from "@/lib/questionnaire/schema";

// Keyed by the Zod issue path joined with "." (e.g. "services.0.name"); values are Questionnaire.errors keys.
export type FieldErrors = Record<string, string>;

export type StepProps = {
  draft: PartialBusinessDraft;
  update: (patch: PartialBusinessDraft) => void;
  errors: FieldErrors;
};
