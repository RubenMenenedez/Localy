import Image, { type StaticImageData } from "next/image";
import { getTranslations } from "next-intl/server";
import { businessTypes } from "@/lib/business-types";
import barbershop from "@/public/landing/barbershop.jpg";
import florist from "@/public/landing/florist.png";
import jewelry from "@/public/landing/jewelry.jpg";
import veterinary from "@/public/landing/veterinary.jpg";

// Laid out in two CSS columns (top to bottom), so each column pairs a short and a tall photo.
const TILES: { key: "jewelry" | "veterinary" | "florist" | "barbershop"; image: StaticImageData; tall: boolean }[] = [
  { key: "jewelry", image: jewelry, tall: false },
  { key: "florist", image: florist, tall: true },
  { key: "veterinary", image: veterinary, tall: true },
  { key: "barbershop", image: barbershop, tall: false },
];

export async function Showcase() {
  const t = await getTranslations("Landing");
  const types = await getTranslations("BusinessTypes");

  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">{t("showcase.title")}</h2>
        <p className="max-w-md text-lg text-neutral-600">{t("showcase.text")}</p>
      </div>

      <div className="mt-14 gap-6 md:columns-2">
        {TILES.map(({ key, image, tall }) => (
          <figure key={key} className="reveal group mb-10 break-inside-avoid">
            <div className={`relative overflow-hidden rounded-sm bg-neutral-100 ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Image
                src={image}
                alt={t(`images.${key}`)}
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-4 text-sm tracking-wide text-neutral-600">{t(`showcase.captions.${key}`)}</figcaption>
          </figure>
        ))}
      </div>

      <ul className="reveal mt-16 flex flex-wrap gap-3 border-t border-neutral-200 pt-10">
        {businessTypes.map((type) => (
          <li key={type} className="rounded-full border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:border-neutral-900">
            {types(`${type}.name`)}
          </li>
        ))}
      </ul>
    </section>
  );
}
