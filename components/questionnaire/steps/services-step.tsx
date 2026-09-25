import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";
import type { BusinessDraft } from "@/lib/questionnaire/schema";

type Service = BusinessDraft["services"][number];

const NEW_SERVICE: Service = { name: "", priceCents: 0, durationMinutes: 30 };

export function ServicesStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("Questionnaire.steps.services");
  const services = draft.services ?? [];

  function change(index: number, patch: Partial<Service>) {
    update({ services: services.map((service, i) => (i === index ? { ...service, ...patch } : service)) });
  }

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <fieldset key={index} className="grid gap-2 rounded border p-3 sm:grid-cols-[1fr_8rem_8rem_auto] sm:items-start">
          <label className="space-y-1">
            <span className="text-sm">{t("name")}</span>
            <input
              className="w-full rounded border px-2 py-1"
              value={service.name}
              maxLength={80}
              onChange={(event) => change(index, { name: event.target.value })}
            />
            <FieldError error={errors[`services.${index}.name`]} />
          </label>
          <label className="space-y-1">
            <span className="text-sm">{t("price")}</span>
            <input
              className="w-full rounded border px-2 py-1"
              type="number"
              min={0}
              step="0.01"
              value={Number.isFinite(service.priceCents) ? service.priceCents / 100 : ""}
              onChange={(event) =>
                change(index, { priceCents: event.target.value === "" ? NaN : Math.round(Number(event.target.value) * 100) })
              }
            />
            <FieldError error={errors[`services.${index}.priceCents`]} />
          </label>
          <label className="space-y-1">
            <span className="text-sm">{t("duration")}</span>
            <input
              className="w-full rounded border px-2 py-1"
              type="number"
              min={5}
              max={480}
              step={5}
              value={Number.isFinite(service.durationMinutes) ? service.durationMinutes : ""}
              onChange={(event) =>
                change(index, { durationMinutes: event.target.value === "" ? NaN : Number(event.target.value) })
              }
            />
            <FieldError error={errors[`services.${index}.durationMinutes`]} />
          </label>
          <button
            type="button"
            className="text-sm text-red-700 underline sm:mt-6"
            onClick={() => update({ services: services.filter((_, i) => i !== index) })}
          >
            {t("remove")}
          </button>
        </fieldset>
      ))}
      <button type="button" className="rounded border px-3 py-1" onClick={() => update({ services: [...services, NEW_SERVICE] })}>
        {t("add")}
      </button>
      <FieldError error={errors.services} />
    </div>
  );
}
