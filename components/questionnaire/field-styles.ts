export const inputClassName =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 outline-none transition focus:border-neutral-950 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.15)]";

export const labelClassName = "text-sm font-medium text-neutral-700";

export function optionClassName(selected: boolean) {
  return `rounded-full border px-5 py-2.5 text-sm transition duration-300 ${
    selected
      ? "border-neutral-950 bg-neutral-950 text-white shadow-[0_8px_24px_-8px_rgba(56,189,248,0.55)]"
      : "border-neutral-300 bg-white text-neutral-800 hover:-translate-y-0.5 hover:border-neutral-950"
  }`;
}

export function cardOptionClassName(selected: boolean) {
  return `w-full rounded-2xl border p-5 text-left transition duration-300 ${
    selected
      ? "border-neutral-950 bg-neutral-950 text-white shadow-[0_12px_32px_-12px_rgba(56,189,248,0.55)]"
      : "border-neutral-200 bg-white text-neutral-900 hover:-translate-y-0.5 hover:border-neutral-950"
  }`;
}

export const secondaryButtonClassName =
  "rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm transition duration-300 hover:-translate-y-0.5 hover:border-neutral-950";
