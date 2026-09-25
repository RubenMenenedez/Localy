import { BusinessType } from "@/lib/generated/prisma/enums";

export type Palette = { primary: string; secondary: string; accent: string; background: string };

export type PaletteMood = "light" | "dark" | "warm" | "cool";

// `key` indexes the translated name in messages: BusinessTypes.<type>.services.<key>
export type ExampleService = { key: string; priceCents: number; durationMinutes: number };

type Sector = "beauty" | "health" | "pets" | "auto" | "food" | "fitness" | "services" | "retail" | "general";

export const businessTypes = Object.values(BusinessType);

const p = (primary: string, secondary: string, accent: string, background: string): Palette => ({
  primary,
  secondary,
  accent,
  background,
});

const sectorPalettes: Record<Sector, Palette[]> = {
  beauty: [
    p("#9f1239", "#1c1917", "#d6a77a", "#fdf8f5"),
    p("#6b21a8", "#18181b", "#c4b5fd", "#faf7ff"),
    p("#b45309", "#292524", "#fcd34d", "#fffbeb"),
    p("#0f766e", "#134e4a", "#99f6e4", "#f7fdfc"),
    p("#1f2937", "#111827", "#d4a373", "#f9f7f4"),
    p("#be123c", "#3f3f46", "#fecdd3", "#ffffff"),
  ],
  health: [
    p("#0f766e", "#0f172a", "#5eead4", "#f8fafc"),
    p("#1d4ed8", "#0f172a", "#93c5fd", "#ffffff"),
    p("#0369a1", "#082f49", "#7dd3fc", "#f0f9ff"),
    p("#15803d", "#14532d", "#bbf7d0", "#f7fef9"),
    p("#4338ca", "#1e1b4b", "#a5b4fc", "#f8f9ff"),
    p("#334155", "#0f172a", "#38bdf8", "#f8fafc"),
  ],
  pets: [
    p("#15803d", "#1c1917", "#fbbf24", "#fefdf8"),
    p("#c2410c", "#1c1917", "#fdba74", "#fffaf5"),
    p("#0369a1", "#0c4a6e", "#fde047", "#f8fcff"),
    p("#7c3aed", "#1e1b4b", "#fcd34d", "#fbfaff"),
    p("#0f766e", "#042f2e", "#fb923c", "#f7fefd"),
    p("#854d0e", "#292524", "#bef264", "#fdfcf7"),
  ],
  auto: [
    p("#b91c1c", "#111827", "#f59e0b", "#f9fafb"),
    p("#1d4ed8", "#0f172a", "#f97316", "#f8fafc"),
    p("#facc15", "#18181b", "#3f3f46", "#fafaf9"),
    p("#0f766e", "#111827", "#e5e7eb", "#f9fafb"),
    p("#ea580c", "#1c1917", "#a8a29e", "#fafaf9"),
    p("#0ea5e9", "#020617", "#e2e8f0", "#0b1120"),
  ],
  food: [
    p("#9a3412", "#1c1917", "#fbbf24", "#fffbf5"),
    p("#3f6212", "#1a2e05", "#fde68a", "#fbfdf5"),
    p("#7f1d1d", "#1c1917", "#d6a77a", "#fdf8f3"),
    p("#1c1917", "#0c0a09", "#f59e0b", "#fafaf9"),
    p("#b45309", "#451a03", "#fef3c7", "#fffdf7"),
    p("#065f46", "#022c22", "#fca5a5", "#f7fdfa"),
  ],
  fitness: [
    p("#111827", "#030712", "#a3e635", "#f9fafb"),
    p("#dc2626", "#111827", "#fbbf24", "#fafafa"),
    p("#1e40af", "#0f172a", "#fbbf24", "#f8fafc"),
    p("#ea580c", "#1c1917", "#fde68a", "#fafaf9"),
    p("#0f766e", "#042f2e", "#a7f3d0", "#f7fdfb"),
    p("#a3e635", "#0a0a0a", "#22d3ee", "#0a0a0a"),
  ],
  services: [
    p("#1d4ed8", "#0f172a", "#fbbf24", "#ffffff"),
    p("#0f172a", "#020617", "#38bdf8", "#f8fafc"),
    p("#047857", "#022c22", "#fcd34d", "#f7fdfa"),
    p("#6d28d9", "#1e1b4b", "#fde68a", "#faf9ff"),
    p("#b45309", "#1c1917", "#e7e5e4", "#fffdf8"),
    p("#0e7490", "#083344", "#f0abfc", "#f5fdff"),
  ],
  retail: [
    p("#1c1917", "#0c0a09", "#d4a373", "#faf8f5"),
    p("#14532d", "#052e16", "#fde68a", "#fbfdf8"),
    p("#1e3a8a", "#0f172a", "#e2e8f0", "#f8fafc"),
    p("#78350f", "#1c1917", "#fcd34d", "#fffbf2"),
    p("#3f3f46", "#18181b", "#a1a1aa", "#fafafa"),
    p("#0f766e", "#134e4a", "#fecaca", "#fdfcfb"),
  ],
  general: [
    p("#1f2937", "#111827", "#38bdf8", "#f9fafb"),
    p("#1d4ed8", "#0f172a", "#fbbf24", "#ffffff"),
    p("#047857", "#022c22", "#a7f3d0", "#f7fdfa"),
    p("#b45309", "#1c1917", "#fde68a", "#fffbf5"),
    p("#6d28d9", "#1e1b4b", "#ddd6fe", "#faf9ff"),
    p("#38bdf8", "#1e293b", "#fbbf24", "#0f172a"),
  ],
};

// Suggestions not tied to a sector, grouped by mood for the filter in the colors step.
export const moodPalettes: { mood: PaletteMood; palette: Palette }[] = [
  { mood: "light", palette: p("#2563eb", "#1e293b", "#f59e0b", "#ffffff") },
  { mood: "light", palette: p("#0d9488", "#134e4a", "#fcd34d", "#f8fffe") },
  { mood: "light", palette: p("#4f46e5", "#1e1b4b", "#22d3ee", "#fbfbff") },
  { mood: "light", palette: p("#16a34a", "#14532d", "#fde047", "#fbfffb") },
  { mood: "light", palette: p("#475569", "#0f172a", "#94a3b8", "#ffffff") },
  { mood: "dark", palette: p("#38bdf8", "#e2e8f0", "#fbbf24", "#0b1120") },
  { mood: "dark", palette: p("#a3e635", "#f4f4f5", "#22d3ee", "#09090b") },
  { mood: "dark", palette: p("#f59e0b", "#fafaf9", "#fb923c", "#1c1917") },
  { mood: "dark", palette: p("#818cf8", "#e0e7ff", "#2dd4bf", "#0f0d1f") },
  { mood: "dark", palette: p("#34d399", "#ecfdf5", "#fde68a", "#022c22") },
  { mood: "warm", palette: p("#c2410c", "#431407", "#fdba74", "#fff7ed") },
  { mood: "warm", palette: p("#b45309", "#451a03", "#fde68a", "#fffbeb") },
  { mood: "warm", palette: p("#a16207", "#292524", "#d6d3d1", "#fafaf9") },
  { mood: "warm", palette: p("#991b1b", "#1c1917", "#fcd34d", "#fef9f3") },
  { mood: "warm", palette: p("#854d0e", "#422006", "#a3e635", "#fefce8") },
  { mood: "cool", palette: p("#0369a1", "#082f49", "#67e8f9", "#f0f9ff") },
  { mood: "cool", palette: p("#0f766e", "#042f2e", "#7dd3fc", "#f0fdfa") },
  { mood: "cool", palette: p("#1e40af", "#172554", "#a5b4fc", "#eff6ff") },
  { mood: "cool", palette: p("#155e75", "#083344", "#99f6e4", "#ecfeff") },
  { mood: "cool", palette: p("#4338ca", "#1e1b4b", "#5eead4", "#eef2ff") },
];

const s = (key: string, price: number, durationMinutes: number): ExampleService => ({
  key,
  priceCents: Math.round(price * 100),
  durationMinutes,
});

const typeConfig: Record<BusinessType, { sector: Sector; exampleServices: ExampleService[] }> = {
  HAIR_SALON: {
    sector: "beauty",
    exampleServices: [s("haircut", 25, 30), s("coloring", 60, 90), s("highlights", 75, 120), s("blowDry", 20, 30), s("treatment", 35, 45), s("updo", 45, 60)],
  },
  BARBERSHOP: {
    sector: "beauty",
    exampleServices: [s("haircut", 18, 30), s("beardTrim", 12, 20), s("haircutAndBeard", 28, 45), s("hotTowelShave", 22, 30), s("kidsCut", 14, 20)],
  },
  BEAUTY_CENTER: {
    sector: "beauty",
    exampleServices: [s("facial", 50, 60), s("manicure", 25, 45), s("waxing", 20, 30), s("massage", 55, 60), s("eyebrows", 15, 20), s("makeup", 40, 45)],
  },
  NAIL_SALON: {
    sector: "beauty",
    exampleServices: [s("manicure", 20, 30), s("gelManicure", 30, 45), s("pedicure", 30, 45), s("nailArt", 15, 20), s("acrylics", 45, 75)],
  },
  SPA: {
    sector: "beauty",
    exampleServices: [s("relaxingMassage", 60, 60), s("hotStones", 75, 75), s("facial", 55, 60), s("bodyScrub", 50, 45), s("spaCircuit", 35, 90)],
  },
  TATTOO_STUDIO: {
    sector: "beauty",
    exampleServices: [s("consultation", 0, 30), s("smallTattoo", 80, 60), s("mediumTattoo", 180, 180), s("touchUp", 40, 45), s("piercing", 30, 20)],
  },
  CLINIC: {
    sector: "health",
    exampleServices: [s("consultation", 60, 30), s("followUp", 40, 20), s("checkup", 90, 60), s("bloodTest", 35, 15), s("videoConsultation", 45, 20)],
  },
  DENTIST: {
    sector: "health",
    exampleServices: [s("checkup", 40, 30), s("cleaning", 60, 45), s("filling", 70, 45), s("whitening", 250, 60), s("orthodonticsConsultation", 0, 30)],
  },
  PHYSIOTHERAPY: {
    sector: "health",
    exampleServices: [s("assessment", 50, 45), s("session", 40, 45), s("sportsMassage", 45, 45), s("dryNeedling", 45, 30), s("rehabilitation", 50, 60)],
  },
  PSYCHOLOGIST: {
    sector: "health",
    exampleServices: [s("firstSession", 50, 60), s("individualTherapy", 60, 50), s("coupleTherapy", 80, 60), s("onlineSession", 55, 50), s("childTherapy", 60, 50)],
  },
  VETERINARY: {
    sector: "pets",
    exampleServices: [s("consultation", 40, 30), s("vaccination", 35, 20), s("checkup", 50, 30), s("microchip", 30, 15), s("dentalCleaning", 120, 60), s("grooming", 30, 60)],
  },
  PET_GROOMING: {
    sector: "pets",
    exampleServices: [s("bathSmall", 25, 45), s("bathLarge", 40, 60), s("fullGrooming", 50, 90), s("nailTrim", 10, 15), s("deshedding", 35, 60)],
  },
  AUTO_REPAIR: {
    sector: "auto",
    exampleServices: [s("oilChange", 60, 45), s("inspection", 40, 60), s("tireChange", 30, 30), s("brakes", 120, 90), s("diagnostics", 45, 45), s("airConditioning", 70, 60)],
  },
  CAR_WASH: {
    sector: "auto",
    exampleServices: [s("exteriorWash", 15, 20), s("interiorCleaning", 30, 45), s("fullDetail", 90, 150), s("waxPolish", 50, 60), s("upholstery", 60, 90)],
  },
  RESTAURANT: {
    sector: "food",
    exampleServices: [s("tableForTwo", 0, 90), s("tableForFour", 0, 90), s("largeGroup", 0, 120), s("tastingMenu", 55, 120), s("privateDinner", 0, 180)],
  },
  CAFE: {
    sector: "food",
    exampleServices: [s("tableReservation", 0, 60), s("brunch", 18, 90), s("afternoonTea", 15, 60), s("baristaWorkshop", 35, 90), s("privateEvent", 0, 180)],
  },
  BAKERY: {
    sector: "food",
    exampleServices: [s("cakeOrder", 35, 15), s("celebrationCake", 60, 20), s("breadWorkshop", 40, 120), s("pickupOrder", 0, 10), s("tasting", 20, 30)],
  },
  GYM: {
    sector: "fitness",
    exampleServices: [s("personalTraining", 40, 60), s("trialClass", 0, 60), s("nutritionConsultation", 35, 45), s("groupClass", 10, 60), s("bodyAssessment", 25, 30)],
  },
  YOGA_STUDIO: {
    sector: "fitness",
    exampleServices: [s("yogaClass", 12, 60), s("pilatesClass", 14, 55), s("privateSession", 50, 60), s("meditation", 10, 45), s("beginnersClass", 10, 60)],
  },
  PERSONAL_TRAINER: {
    sector: "fitness",
    exampleServices: [s("firstSession", 0, 45), s("trainingSession", 40, 60), s("couplesSession", 60, 60), s("onlineSession", 30, 45), s("trainingPlan", 60, 30)],
  },
  PHOTOGRAPHER: {
    sector: "services",
    exampleServices: [s("portraitSession", 120, 60), s("familySession", 150, 90), s("productPhotos", 180, 120), s("eventCoverage", 400, 240), s("headshots", 90, 45)],
  },
  DRIVING_SCHOOL: {
    sector: "services",
    exampleServices: [s("drivingLesson", 35, 45), s("theoryClass", 20, 60), s("motorbikeLesson", 40, 45), s("examPrep", 45, 60), s("refresherLesson", 35, 45)],
  },
  TUTORING: {
    sector: "services",
    exampleServices: [s("privateClass", 25, 60), s("groupClass", 15, 60), s("examPrep", 30, 90), s("languageClass", 25, 60), s("trialClass", 0, 30)],
  },
  FLORIST: {
    sector: "retail",
    exampleServices: [s("bouquetOrder", 35, 15), s("weddingConsultation", 0, 45), s("eventFlowers", 150, 60), s("workshop", 40, 120), s("plantCare", 25, 30)],
  },
  JEWELRY: {
    sector: "retail",
    exampleServices: [s("privateAppointment", 0, 45), s("engagementRings", 0, 60), s("repair", 30, 20), s("resizing", 25, 20), s("customDesign", 0, 60)],
  },
  OTHER: {
    sector: "general",
    exampleServices: [s("consultation", 30, 30), s("standardService", 50, 60), s("premiumService", 90, 90), s("followUp", 25, 30), s("onlineSession", 30, 30)],
  },
};

export function sectorPalettesFor(type: BusinessType) {
  return sectorPalettes[typeConfig[type].sector];
}

export function exampleServicesFor(type: BusinessType) {
  return typeConfig[type].exampleServices;
}
