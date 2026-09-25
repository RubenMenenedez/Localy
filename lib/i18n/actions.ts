"use server";

import { cookies } from "next/headers";
import { LOCALE_COOKIE, localeSchema } from "@/lib/i18n/config";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function setLocale(locale: unknown) {
  const parsed = localeSchema.parse(locale);
  (await cookies()).set(LOCALE_COOKIE, parsed, {
    path: "/",
    maxAge: ONE_YEAR_IN_SECONDS,
    sameSite: "lax",
  });
}
