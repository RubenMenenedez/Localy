import { getTranslations } from "next-intl/server";

const FEATURES = ["booking", "staff", "messages", "languages", "design", "hosting"] as const;

export async function Features() {
  const t = await getTranslations("Landing.features");

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <h2 className="reveal max-w-2xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">{t("title")}</h2>
      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature} className="reveal space-y-3 border-t border-neutral-900 pt-6">
            <h3 className="text-lg font-medium text-neutral-900">{t(`items.${feature}.title`)}</h3>
            <p className="leading-relaxed text-neutral-600">{t(`items.${feature}.text`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
