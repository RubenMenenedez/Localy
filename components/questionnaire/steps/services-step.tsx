import { useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { inputClassName, labelClassName, secondaryButtonClassName } from "@/components/questionnaire/field-styles";
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
        <fieldset key={index} className="space-y-3 border-b border-neutral-200 pb-5">
          <label className="block space-y-2">
            <span className={labelClassName}>{t("name")}</span>
            <input
              className={inputClassName}
              value={service.name}
              maxLength={80}
              onChange={(event) => change(index, { name: event.target.value })}
            />
            <FieldError error={errors[`services.${index}.name`]} />
          </label>
          <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
            <label className="space-y-2">
              <span className={labelClassName}>{t("price")}</span>
              <input
                className={inputClassName}
                type="number"
                min={0}
                step="0.01"
                value={Number.isFinite(service.priceCents) ? service.priceCents / 100 : ""}
                onChange={(event) =>
                  change(index, { priceCents: event.target.value === "" ? NaN : Math.round(Number(event.target.value) * 100) })
                }
              />
            </label>
            <label className="space-y-2">
              <span className={labelClassName}>{t("duration")}</span>
              <input
                className={inputClassName}
                type="number"
                min={5}
                max={480}
                step={5}
                value={Number.isFinite(service.durationMinutes) ? service.durationMinutes : ""}
                onChange={(event) =>
                  change(index, { durationMinutes: event.target.value === "" ? NaN : Number(event.target.value) })
                }
              />
            </label>
            <button
              type="button"
              className="pb-3 text-sm text-neutral-500 underline-offset-4 hover:text-neutral-900 hover:underline"
              onClick={() => update({ services: services.filter((_, i) => i !== index) })}
            >
              {t("remove")}
            </button>
          </div>
          <FieldError error={errors[`services.${index}.priceCents`] ?? errors[`services.${index}.durationMinutes`]} />
        </fieldset>
      ))}
      <button type="button" className={secondaryButtonClassName} onClick={() => update({ services: [...services, NEW_SERVICE] })}>
        {t("add")}
      </button>
      <FieldError error={errors.services} />
    </div>
  );
}
