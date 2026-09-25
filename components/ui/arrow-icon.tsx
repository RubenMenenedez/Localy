// Slides in the pointing direction when its parent has the `group` class and is hovered.
export function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  const isLeft = direction === "left";

  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`h-4 w-4 transition-transform duration-300 ${
        isLeft ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
