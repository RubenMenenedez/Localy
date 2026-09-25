import { useTranslations } from "next-intl";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-3">
      <p className="text-xs tracking-[0.2em] text-neutral-500 uppercase">{t("progress", { current, total })}</p>
      <div className="h-0.5 bg-neutral-200">
        <div className="h-0.5 bg-neutral-900 transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
