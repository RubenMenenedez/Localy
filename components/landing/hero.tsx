import { getTranslations } from "next-intl/server";
import { HeroSlideshow } from "@/components/landing/hero-slideshow";

export async function Hero() {
  const t = await getTranslations("Landing.hero");

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-neutral-950">
      <HeroSlideshow />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-40 pb-28 sm:pb-36">
        <p className="animate-fade-up text-sm tracking-[0.2em] text-white/70 uppercase">{t("eyebrow")}</p>
        <h1 className="animate-fade-up mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-balance text-white [animation-delay:150ms] sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-pretty text-white/80 [animation-delay:300ms] sm:text-xl">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
