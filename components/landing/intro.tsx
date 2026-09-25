import { getTranslations } from "next-intl/server";

export async function Intro() {
  const t = await getTranslations("Landing.intro");

  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-center sm:py-36">
      <p className="reveal text-3xl leading-snug font-medium tracking-tight text-balance text-neutral-900 sm:text-4xl lg:text-5xl">
        {t("text")}
      </p>
    </section>
  );
}
