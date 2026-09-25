import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { buttonSizes, buttonStyles } from "@/components/ui/button-styles";
import barbershop from "@/public/landing/barbershop.jpg";

export async function FinalCta() {
  const t = await getTranslations("Landing");

  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <Image
        src={barbershop}
        alt={t("images.barbershop")}
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="reveal relative mx-auto max-w-7xl px-6 py-36 sm:py-44">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">{t("cta.title")}</h2>
        <p className="mt-6 max-w-lg text-lg text-white/80">{t("cta.text")}</p>
        <Link href="/start" className={`mt-10 ${buttonStyles.light} ${buttonSizes.lg}`}>
          {t("cta.button")}
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
