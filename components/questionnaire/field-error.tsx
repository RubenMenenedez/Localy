import { useTranslations } from "next-intl";
import type messages from "@/messages/en.json";

type ErrorKey = keyof typeof messages.Questionnaire.errors;

export function FieldError({ error }: { error?: string }) {
  const t = useTranslations("Questionnaire.errors");
  if (!error) return null;

  const key = error as ErrorKey;
  return <p className="text-sm text-red-600">{t.has(key) ? t(key) : t("invalid")}</p>;
}
