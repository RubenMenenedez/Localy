import { BusinessType } from "@/lib/generated/prisma/enums";

export type Palette = { primary: string; secondary: string };

// `key` indexes the translated name in messages: BusinessTypes.<type>.services.<key>
export type ExampleService = { key: string; priceCents: number; durationMinutes: number };

type BusinessTypeConfig = { palettes: Palette[]; exampleServices: ExampleService[] };

export const businessTypes = Object.values(BusinessType);

export const businessTypeConfig: Record<BusinessType, BusinessTypeConfig> = {
  HAIR_SALON: {
    palettes: [
      { primary: "#9d174d", secondary: "#fce7f3" },
      { primary: "#6b21a8", secondary: "#f3e8ff" },
      { primary: "#1f2937", secondary: "#f5d0c5" },
      { primary: "#b45309", secondary: "#fef3c7" },
    ],
    exampleServices: [
      { key: "haircut", priceCents: 2500, durationMinutes: 30 },
      { key: "coloring", priceCents: 6000, durationMinutes: 90 },
      { key: "blowDry", priceCents: 2000, durationMinutes: 30 },
    ],
  },
  BARBERSHOP: {
    palettes: [
      { primary: "#111827", secondary: "#d4a373" },
      { primary: "#1e3a8a", secondary: "#e5e7eb" },
      { primary: "#7f1d1d", secondary: "#f5f5f4" },
      { primary: "#14532d", secondary: "#fde68a" },
    ],
    exampleServices: [
      { key: "haircut", priceCents: 1800, durationMinutes: 30 },
      { key: "beardTrim", priceCents: 1200, durationMinutes: 20 },
      { key: "haircutAndBeard", priceCents: 2800, durationMinutes: 45 },
    ],
  },
  AUTO_REPAIR: {
    palettes: [
      { primary: "#b91c1c", secondary: "#1f2937" },
      { primary: "#1d4ed8", secondary: "#f97316" },
      { primary: "#374151", secondary: "#facc15" },
      { primary: "#0f766e", secondary: "#e5e7eb" },
    ],
    exampleServices: [
      { key: "oilChange", priceCents: 6000, durationMinutes: 45 },
      { key: "inspection", priceCents: 4000, durationMinutes: 60 },
      { key: "tireChange", priceCents: 3000, durationMinutes: 30 },
    ],
  },
  BEAUTY_CENTER: {
    palettes: [
      { primary: "#be185d", secondary: "#fdf2f8" },
      { primary: "#a16207", secondary: "#fefce8" },
      { primary: "#7c3aed", secondary: "#ede9fe" },
      { primary: "#0e7490", secondary: "#ecfeff" },
    ],
    exampleServices: [
      { key: "facial", priceCents: 5000, durationMinutes: 60 },
      { key: "manicure", priceCents: 2500, durationMinutes: 45 },
      { key: "waxing", priceCents: 2000, durationMinutes: 30 },
    ],
  },
  CLINIC: {
    palettes: [
      { primary: "#0f766e", secondary: "#f0fdfa" },
      { primary: "#1d4ed8", secondary: "#eff6ff" },
      { primary: "#0369a1", secondary: "#f0f9ff" },
      { primary: "#4338ca", secondary: "#eef2ff" },
    ],
    exampleServices: [
      { key: "consultation", priceCents: 6000, durationMinutes: 30 },
      { key: "followUp", priceCents: 4000, durationMinutes: 20 },
      { key: "checkup", priceCents: 9000, durationMinutes: 60 },
    ],
  },
  VETERINARY: {
    palettes: [
      { primary: "#15803d", secondary: "#f0fdf4" },
      { primary: "#c2410c", secondary: "#fff7ed" },
      { primary: "#0369a1", secondary: "#fef9c3" },
      { primary: "#6d28d9", secondary: "#f5f3ff" },
    ],
    exampleServices: [
      { key: "consultation", priceCents: 4000, durationMinutes: 30 },
      { key: "vaccination", priceCents: 3500, durationMinutes: 20 },
      { key: "grooming", priceCents: 3000, durationMinutes: 60 },
    ],
  },
  RESTAURANT: {
    palettes: [
      { primary: "#9a3412", secondary: "#fef3c7" },
      { primary: "#3f6212", secondary: "#fefce8" },
      { primary: "#7f1d1d", secondary: "#fafaf9" },
      { primary: "#1c1917", secondary: "#fbbf24" },
    ],
    exampleServices: [
      { key: "tableForTwo", priceCents: 0, durationMinutes: 90 },
      { key: "tableForFour", priceCents: 0, durationMinutes: 90 },
      { key: "tastingMenu", priceCents: 5500, durationMinutes: 120 },
    ],
  },
  GYM: {
    palettes: [
      { primary: "#111827", secondary: "#a3e635" },
      { primary: "#dc2626", secondary: "#111827" },
      { primary: "#1e40af", secondary: "#fbbf24" },
      { primary: "#ea580c", secondary: "#f5f5f4" },
    ],
    exampleServices: [
      { key: "personalTraining", priceCents: 4000, durationMinutes: 60 },
      { key: "trialClass", priceCents: 0, durationMinutes: 60 },
      { key: "nutritionConsultation", priceCents: 3500, durationMinutes: 45 },
    ],
  },
  OTHER: {
    palettes: [
      { primary: "#1f2937", secondary: "#f3f4f6" },
      { primary: "#1d4ed8", secondary: "#dbeafe" },
      { primary: "#047857", secondary: "#d1fae5" },
      { primary: "#b45309", secondary: "#fef3c7" },
    ],
    exampleServices: [
      { key: "consultation", priceCents: 3000, durationMinutes: 30 },
      { key: "standardService", priceCents: 5000, durationMinutes: 60 },
    ],
  },
};
