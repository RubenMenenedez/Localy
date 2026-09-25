import type { FontPairing, TextAlign, WebsiteStyle } from "@/lib/generated/prisma/enums";

type StyleLook = {
  radius: string;
  headingCase: "none" | "uppercase";
  headingTracking: string;
  // Applied when the style is chosen; the owner can change each one afterwards.
  defaults: { fontPairing: FontPairing; textAlign: TextAlign; boldHeadings: boolean };
};

// Visual rules each website style applies; shared by the questionnaire preview and the public template.
export const websiteStyles: Record<WebsiteStyle, StyleLook> = {
  MINIMAL: {
    radius: "0.5rem",
    headingCase: "none",
    headingTracking: "-0.02em",
    defaults: { fontPairing: "MODERN", textAlign: "LEFT", boldHeadings: false },
  },
  BOLD: {
    radius: "0",
    headingCase: "uppercase",
    headingTracking: "-0.01em",
    defaults: { fontPairing: "TECHNICAL", textAlign: "LEFT", boldHeadings: true },
  },
  ELEGANT: {
    radius: "0",
    headingCase: "none",
    headingTracking: "0.02em",
    defaults: { fontPairing: "CLASSIC", textAlign: "CENTER", boldHeadings: false },
  },
  PLAYFUL: {
    radius: "9999px",
    headingCase: "none",
    headingTracking: "0",
    defaults: { fontPairing: "FRIENDLY", textAlign: "CENTER", boldHeadings: true },
  },
};

export function headingWeight(boldHeadings: boolean) {
  return boldHeadings ? 800 : 400;
}
