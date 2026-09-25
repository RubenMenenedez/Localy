"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/lib/i18n/actions";
import { locales } from "@/lib/i18n/config";
import { nativeLanguageName } from "@/lib/i18n/native-name";

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
            {nativeLanguageName(code)}
          </option>
        ))}
      </select>
    </label>
  );
}
