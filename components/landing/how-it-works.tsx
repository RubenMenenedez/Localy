import { getTranslations } from "next-intl/server";

const STEPS = ["answer", "publish", "manage"] as const;

export async function HowItWorks() {
  const t = await getTranslations("Landing.howItWorks");

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-28 lg:grid-cols-[1fr_1.4fr]">
        <h2 className="reveal max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h2>
        <ol className="divide-y divide-white/15 border-y border-white/15">
          {STEPS.map((step, index) => (
            <li key={step} className="reveal grid gap-4 py-10 sm:grid-cols-[5rem_1fr]">
              <span className="text-sm text-white/50 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium">{t(`steps.${step}.title`)}</h3>
                <p className="max-w-lg leading-relaxed text-white/70">{t(`steps.${step}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
