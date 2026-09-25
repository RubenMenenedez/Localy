import { Inter, Nunito, Playfair_Display, Space_Grotesk } from "next/font/google";
import type { FontPairing } from "@/lib/generated/prisma/enums";

export const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const fontPairings: Record<FontPairing, { heading: string; body: string }> = {
  MODERN: { heading: inter.style.fontFamily, body: inter.style.fontFamily },
  CLASSIC: { heading: playfair.style.fontFamily, body: inter.style.fontFamily },
  FRIENDLY: { heading: nunito.style.fontFamily, body: nunito.style.fontFamily },
  TECHNICAL: { heading: spaceGrotesk.style.fontFamily, body: inter.style.fontFamily },
};
