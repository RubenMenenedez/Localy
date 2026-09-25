"use client";

import { useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import barbershop from "@/public/landing/barbershop.jpg";
import florist from "@/public/landing/florist.png";
import jewelry from "@/public/landing/jewelry.jpg";
import ownerLaptop from "@/public/landing/owner-laptop.png";
import veterinary from "@/public/landing/veterinary.jpg";
import type { Palette } from "@/lib/business-types";

const INTERVAL_MS = 6000;

// Each photo comes with the colors of a website that would suit it, used by the sketch below the hero.
const SLIDES: { image: StaticImageData; palette: Palette }[] = [
  { image: ownerLaptop, palette: { primary: "#38bdf8", secondary: "#0f172a", accent: "#94a3b8", background: "#e2e8f0" } },
  { image: jewelry, palette: { primary: "#1e3a8a", secondary: "#27272a", accent: "#d4d4d8", background: "#f4f4f5" } },
  { image: veterinary, palette: { primary: "#1e3a8a", secondary: "#f1f5f9", accent: "#14b8a6", background: "#ffffff" } },
  { image: florist, palette: { primary: "#166534", secondary: "#0c0a09", accent: "#e7e5e4", background: "#fafaf5" } },
  { image: barbershop, palette: { primary: "#b45309", secondary: "#0c0a09", accent: "#a8a29e", background: "#1c1917" } },
];

function WebsiteSketch({ image, palette }: { image: StaticImageData; palette: Palette }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20" style={{ backgroundColor: palette.background }}>
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ backgroundColor: palette.secondary }}>
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
        <span className="h-2 w-2 rounded-full bg-white/40" />
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="h-3 w-20 rounded-full" style={{ backgroundColor: palette.primary }} />
        <span className="flex gap-3">
          <span className="h-2 w-10 rounded-full" style={{ backgroundColor: palette.accent }} />
          <span className="h-2 w-10 rounded-full" style={{ backgroundColor: palette.accent }} />
          <span className="h-2 w-10 rounded-full" style={{ backgroundColor: palette.accent }} />
        </span>
      </div>
      <div className="relative mx-6 h-40 overflow-hidden rounded-xl">
        <Image src={image} alt="" fill sizes="32rem" className="object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: `${palette.secondary}66` }} />
        <div className="absolute bottom-5 left-5 space-y-2">
          <span className="block h-4 w-44 rounded-full bg-white/90" />
          <span className="block h-2.5 w-32 rounded-full bg-white/60" />
          <span className="mt-3 block h-7 w-24 rounded-full" style={{ backgroundColor: palette.primary }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 p-6">
        {[0, 1, 2].map((card) => (
          <span key={card} className="space-y-2 rounded-xl p-3" style={{ backgroundColor: `${palette.accent}33` }}>
            <span className="block h-2 w-3/4 rounded-full" style={{ backgroundColor: palette.primary }} />
            <span className="block h-2 w-1/2 rounded-full" style={{ backgroundColor: palette.accent }} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroSlideshow() {
  const t = useTranslations("Landing.hero");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <>
      <div aria-hidden className="absolute inset-0">
        {SLIDES.map(({ image }, index) => (
          <Image
            key={index}
            src={image}
            alt=""
            fill
            priority={index === 0}
            placeholder="blur"
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] ease-out ${
              index === active ? "scale-100 opacity-100 duration-[1500ms,7000ms]" : "scale-110 opacity-0 duration-[1500ms]"
            }`}
          />
        ))}
      </div>

      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

      <div aria-hidden className="pointer-events-none absolute right-8 -bottom-12 hidden w-[32rem] blur-[3px] md:block lg:right-16">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`transition-all duration-[1500ms] ease-out ${index === 0 ? "relative" : "absolute inset-0"} ${
              index === active ? "translate-y-0 opacity-90" : "translate-y-8 opacity-0"
            }`}
          >
            <WebsiteSketch {...slide} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={t("slide", { number: index + 1 })}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className="group py-2"
          >
            <span
              className={`block h-0.5 rounded-full transition-all duration-500 ${
                index === active ? "w-10 bg-white" : "w-5 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
