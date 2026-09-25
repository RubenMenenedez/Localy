import { useTranslations } from "next-intl";

export function ImagesStep() {
  const t = useTranslations("Questionnaire.steps.images");

  return <p className="rounded-md border border-dashed border-neutral-300 p-6 text-neutral-600">{t("comingSoon")}</p>;
}
