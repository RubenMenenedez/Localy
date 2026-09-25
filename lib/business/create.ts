import { db } from "@/lib/db";
import type { BusinessDraft } from "@/lib/questionnaire/schema";

// Creates the business with its services, opening hours and the owner's default staff entry, atomically.
export async function createDraftBusiness(
  owner: { id: string; name: string },
  draft: BusinessDraft,
) {
  return db.$transaction(async (tx) => {
    const business = await tx.business.create({
      data: {
        userId: owner.id,
        type: draft.type,
        name: draft.name,
        description: draft.description,
        primaryColor: draft.colors.primary,
        secondaryColor: draft.colors.secondary,
        language: draft.language,
        timezone: draft.timezone,
        email: draft.email,
        phone: draft.phone || null,
        address: draft.address || null,
        services: { create: draft.services },
        openingHours: { create: draft.openingHours },
      },
      select: { id: true, services: { select: { id: true } } },
    });

    await tx.staff.create({
      data: {
        businessId: business.id,
        userId: owner.id,
        name: owner.name || draft.name,
        services: { create: business.services.map((service) => ({ serviceId: service.id })) },
        workingHours: { create: draft.openingHours },
      },
    });

    return business.id;
  });
}
