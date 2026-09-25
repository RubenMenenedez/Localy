import { useFormatter, useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";
import { minutesToTime, timeToMinutes } from "@/lib/questionnaire/time";

const DAYS_FROM_MONDAY = [1, 2, 3, 4, 5, 6, 0];
// 2024-01-07 was a Sunday, so adding dayOfWeek gives a date with that weekday.
const SUNDAY = Date.UTC(2024, 0, 7);
const DAY_MS = 24 * 60 * 60 * 1000;

export function HoursStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.hours");
  const format = useFormatter();
  const intervals = draft.openingHours ?? [];

  function change(index: number, patch: Partial<(typeof intervals)[number]>) {
    update({ openingHours: intervals.map((interval, i) => (i === index ? { ...interval, ...patch } : interval)) });
  }

  return (
    <div className="space-y-3">
      {DAYS_FROM_MONDAY.map((day) => {
        const dayIntervals = intervals
          .map((interval, index) => ({ interval, index }))
          .filter(({ interval }) => interval.dayOfWeek === day);

        return (
          <div key={day} className="rounded border p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {format.dateTime(SUNDAY + day * DAY_MS, { weekday: "long", timeZone: "UTC" })}
              </span>
              <button
                type="button"
                className="text-sm underline"
                onClick={() => update({ openingHours: [...intervals, { dayOfWeek: day, openMinute: 9 * 60, closeMinute: 17 * 60 }] })}
              >
                {t("addShift")}
              </button>
            </div>
            {dayIntervals.length === 0 && <p className="text-sm text-gray-500">{t("closed")}</p>}
            {dayIntervals.map(({ interval, index }) => (
              <div key={index} className="mt-2 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="time"
                    aria-label={t("opens")}
                    className="rounded border px-2 py-1"
                    value={minutesToTime(interval.openMinute)}
                    onChange={(event) => change(index, { openMinute: timeToMinutes(event.target.value) })}
                  />
                  <span>–</span>
                  <input
                    type="time"
                    aria-label={t("closes")}
                    className="rounded border px-2 py-1"
                    value={minutesToTime(interval.closeMinute)}
                    onChange={(event) => change(index, { closeMinute: timeToMinutes(event.target.value, { isClosing: true }) })}
                  />
                  <button
                    type="button"
                    className="text-sm text-red-700 underline"
                    onClick={() => update({ openingHours: intervals.filter((_, i) => i !== index) })}
                  >
                    {t("remove")}
                  </button>
                </div>
                <FieldError error={errors[`openingHours.${index}.closeMinute`] ?? errors[`openingHours.${index}.openMinute`]} />
              </div>
            ))}
          </div>
        );
      })}
      <FieldError error={errors.openingHours} />
    </div>
  );
}
