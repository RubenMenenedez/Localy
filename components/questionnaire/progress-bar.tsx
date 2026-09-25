import { useTranslations } from "next-intl";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const t = useTranslations("Questionnaire");

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-600">{t("progress", { current, total })}</p>
      <div className="h-2 rounded bg-gray-200">
        <div className="h-2 rounded bg-gray-900 transition-all" style={{ width: `${(current / total) * 100}%` }} />
      </div>
    </div>
  );
}
