import { useMessages, useTranslations } from "next-intl";
import { FieldError } from "@/components/questionnaire/field-error";
import { optionClassName } from "@/components/questionnaire/field-styles";
import type { StepProps } from "@/components/questionnaire/step-props";
import { businessTypes, exampleServicesFor, sectorPalettesFor } from "@/lib/business-types";
import type { BusinessType } from "@/lib/generated/prisma/enums";

export function TypeStep({ draft, update, errors }: StepProps) {
  const t = useTranslations("BusinessTypes");
  const messages = useMessages();

  function select(type: BusinessType) {
    const serviceNames: Record<string, string> = messages.BusinessTypes[type].services;
    update({
      type,
      colors: draft.colors ?? sectorPalettesFor(type)[0],
      services:
        draft.services ?? exampleServicesFor(type).map(({ key, ...service }) => ({ name: serviceNames[key], ...service })),
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2.5">
        {businessTypes.map((type) => (
          <button key={type} type="button" onClick={() => select(type)} className={optionClassName(draft.type === type)}>
            {t(`${type}.name`)}
          </button>
        ))}
      </div>
      <FieldError error={errors.type} />
    </div>
  );
}
