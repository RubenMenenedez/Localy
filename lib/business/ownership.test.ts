import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BusinessDraft } from "@/lib/questionnaire/schema";

const OWNER_ID = "11111111-1111-4111-8111-111111111111";
const OTHER_USER_ID = "22222222-2222-4222-8222-222222222222";

const businesses = [
  { id: "b1", userId: OWNER_ID, name: "Owner's salon" },
  { id: "b2", userId: OTHER_USER_ID, name: "Someone else's gym" },
];

const tx = {
  business: { create: vi.fn() },
  staff: { create: vi.fn() },
};

vi.mock("@/lib/db", () => ({
  db: {
    business: {
      findMany: vi.fn(async ({ where }: { where: { userId?: string } }) =>
        businesses.filter((business) => business.userId === where.userId),
      ),
    },
    $transaction: vi.fn(async (callback: (client: typeof tx) => unknown) => callback(tx)),
  },
}));

const requireUser = vi.fn();
vi.mock("@/lib/auth/session", () => ({ requireUser: () => requireUser() }));

const { db } = await import("@/lib/db");
const { listOwnedBusinesses } = await import("@/lib/business/queries");
const { createDraftBusiness } = await import("@/lib/business/create");
const { submitDraft } = await import("@/lib/questionnaire/actions");

const draft: BusinessDraft = {
  type: "HAIR_SALON",
  colors: { primary: "#9d174d", secondary: "#fce7f3" },
  name: "Salon",
  description: "Haircuts and color",
  language: "en",
  services: [{ name: "Haircut", priceCents: 2500, durationMinutes: 30 }],
  openingHours: [{ dayOfWeek: 1, openMinute: 540, closeMinute: 1020 }],
  email: "owner@example.com",
  timezone: "Europe/Madrid",
};

beforeEach(() => {
  vi.clearAllMocks();
  tx.business.create.mockResolvedValue({ id: "new-business", services: [{ id: "service-1" }] });
});

describe("listOwnedBusinesses", () => {
  it("scopes the query to the given user", async () => {
    await listOwnedBusinesses(OWNER_ID);
    expect(db.business.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { userId: OWNER_ID } }));
  });

  it("never returns another user's businesses", async () => {
    const result = await listOwnedBusinesses(OWNER_ID);
    expect(result.map((business) => business.id)).toEqual(["b1"]);
  });
});

describe("createDraftBusiness", () => {
  it("assigns the business and the default staff entry to the owner", async () => {
    await createDraftBusiness({ id: OWNER_ID, name: "Ana" }, draft);

    expect(tx.business.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: OWNER_ID }) }),
    );
    expect(tx.staff.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        businessId: "new-business",
        userId: OWNER_ID,
        name: "Ana",
        services: { create: [{ serviceId: "service-1" }] },
        workingHours: { create: draft.openingHours },
      }),
    });
  });
});

describe("submitDraft", () => {
  it("uses the session user as owner, ignoring any userId in the payload", async () => {
    requireUser.mockResolvedValue({ id: OWNER_ID, name: "Ana" });

    const result = await submitDraft({ ...draft, userId: OTHER_USER_ID });

    expect(result).toEqual({ ok: true });
    const { data } = tx.business.create.mock.calls[0][0];
    expect(data.userId).toBe(OWNER_ID);
    expect(tx.staff.create.mock.calls[0][0].data.userId).toBe(OWNER_ID);
  });

  it("does not create anything when there is no session", async () => {
    requireUser.mockRejectedValue(new Error("NEXT_REDIRECT"));

    await expect(submitDraft(draft)).rejects.toThrow("NEXT_REDIRECT");
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it("rejects an invalid draft without writing", async () => {
    requireUser.mockResolvedValue({ id: OWNER_ID, name: "Ana" });

    const result = await submitDraft({ ...draft, services: [] });

    expect(result).toEqual({ ok: false });
    expect(db.$transaction).not.toHaveBeenCalled();
  });
});
