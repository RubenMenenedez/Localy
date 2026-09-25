import { db } from "@/lib/db";

export function listOwnedBusinesses(userId: string) {
  return db.business.findMany({
    where: { userId },
    select: { id: true, name: true, type: true, status: true },
    orderBy: { createdAt: "desc" },
  });
}
