"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { setLocale } from "@/lib/i18n/actions";
import { locales } from "@/lib/i18n/config";
import { nativeLanguageName } from "@/lib/i18n/native-name";

const VARIANTS = {
  dark: {
    trigger: "border-neutral-300 bg-white/70 text-neutral-800 hover:border-neutral-900",
    menu: "border-neutral-200 bg-white/90 text-neutral-800",
    active: "bg-neutral-950 text-white",
    item: "hover:bg-neutral-100",
  },
  light: {
    trigger: "border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/20",
    menu: "border-white/20 bg-neutral-950/80 text-white",
    active: "bg-white text-neutral-950",
    item: "hover:bg-white/10",
  },
};

export function LanguageSelector({ variant = "dark" }: { variant?: keyof typeof VARIANTS }) {
  const t = useTranslations("LanguageSelector");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const container = useRef<HTMLDivElement>(null);
  const styles = VARIANTS[variant];

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !container.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  function choose(code: string) {
    setOpen(false);
    if (code !== locale) startTransition(() => setLocale(code));
  }

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        aria-label={t("label")}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-widest uppercase backdrop-blur-md transition duration-300 ${styles.trigger}`}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5M8 1.75c1.8 1.9 2.6 3.9 2.6 6.25S9.8 12.35 8 14.25C6.2 12.35 5.4 10.35 5.4 8S6.2 3.65 8 1.75z" />
        </svg>
        {locale}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("label")}
          className={`animate-fade-in absolute right-0 z-30 mt-2 min-w-40 space-y-1 rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl ${styles.menu}`}
        >
          {locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => choose(code)}
                className={`flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-left text-sm transition ${
                  code === locale ? styles.active : styles.item
                }`}
              >
                {nativeLanguageName(code)}
                <span className="text-[10px] tracking-widest uppercase opacity-60">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
