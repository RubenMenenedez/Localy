import { useMessages, useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import type { StepProps } from "@/components/questionnaire/step-props";
import { businessTypeConfig, businessTypes } from "@/lib/business-types";
import type { BusinessType } from "@/lib/generated/prisma/enums";

export function TypeStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("BusinessTypes");
  const messages = useMessages();

  function select(type: BusinessType) {
    const config = businessTypeConfig[type];
    const serviceNames: Record<string, string> = messages.BusinessTypes[type].services;
    update({
      type,
      colors: draft.colors ?? config.palettes[0],
      services:
        draft.services ??
        config.exampleServices.map(({ key, ...service }) => ({ name: serviceNames[key], ...service })),
    });
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {businessTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => select(type)}
            className={`rounded border p-3 text-left ${draft.type === type ? "border-gray-900 bg-gray-100" : "border-gray-300"}`}
          >
            {t(`${type}.name`)}
          </button>
        ))}
      </div>
      <FieldError error={errors.type} />
    </div>
  );
}
