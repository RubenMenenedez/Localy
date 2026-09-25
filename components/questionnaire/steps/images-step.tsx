import { useTranslations } from "next-intl";

export function ImagesStep() {
  const t = useTranslations("Questionnaire.steps.images");

  return <p className="rounded border border-dashed p-4 text-sm text-gray-600">{t("comingSoon")}</p>;
}
