import { z } from "zod";

// To add a language: create messages/<code>.json and add the code here.
export const locales = ["en", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "locale";

export const localeSchema = z.enum(locales);
