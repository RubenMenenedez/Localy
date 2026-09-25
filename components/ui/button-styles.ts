const base =
  "btn-shine group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition duration-300 disabled:pointer-events-none disabled:opacity-40";

export const buttonStyles = {
  // Dark solid button for light backgrounds.
  primary: `${base} bg-neutral-950 text-white ring-1 ring-white/10 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(56,189,248,0.45)]`,
  // White solid button for dark or photo backgrounds.
  light: `${base} bg-white text-neutral-950 shadow-[0_8px_30px_-8px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-6px_rgba(125,211,252,0.6)]`,
  // Translucent glass button for photo backgrounds.
  glass: `${base} border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-white/60 hover:bg-white/20`,
  // Quiet text button.
  ghost: "group inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-950 disabled:invisible",
};

export const buttonSizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};
