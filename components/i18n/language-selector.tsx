"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/lib/i18n/actions";
import { locales } from "@/lib/i18n/config";

function nativeName(locale: string) {
  const name = new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

export function LanguageSelector() {
  const t = useTranslations("LanguageSelector");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm">
      {t("label")}
      <select
        className="rounded border px-2 py-1"
        value={locale}
        disabled={isPending}
        onChange={(event) => {
          const next = event.target.value;
          startTransition(() => setLocale(next));
        }}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {nativeName(code)}
          </option>
        ))}
      </select>
    </label>
  );
}
