import type { LearningItem } from "../../types/content";

interface ItemVisualProps {
  item: LearningItem;
  worldColor: string;
  size?: "sm" | "lg";
}

/**
 * Shared swatch/count-dots/emoji rendering rule for a `LearningItem`,
 * matching the visual logic already used by the World screen's main card.
 * Used by the Play matching game so its prompt/choice cards look identical
 * to the rest of the app rather than introducing a second visual language.
 */
export function ItemVisual({ item, worldColor, size = "lg" }: ItemVisualProps) {
  if (item.colorHex) {
    const dimension = size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-9 w-9 sm:h-10 sm:w-10";
    return (
      <span
        className={`rounded-full shadow-pressed ${dimension}`}
        style={{ backgroundColor: item.colorHex }}
        aria-hidden="true"
      />
    );
  }

  if (typeof item.meta?.count === "number") {
    const dotSize = size === "lg" ? "h-4 w-4 sm:h-5 sm:w-5" : "h-2.5 w-2.5";
    return (
      <div
        className={`flex max-w-24 flex-wrap justify-center gap-1 sm:max-w-28 ${size === "lg" ? "" : "max-w-16"}`}
        aria-hidden="true"
      >
        {Array.from({ length: item.meta.count }).map((_, index) => (
          <span
            key={index}
            className={`rounded-full shadow-pressed ${dotSize}`}
            style={{ backgroundColor: worldColor }}
          />
        ))}
      </div>
    );
  }

  return (
    <span className={size === "lg" ? "text-6xl sm:text-7xl" : "text-3xl sm:text-4xl"} aria-hidden="true">
      {item.emoji}
    </span>
  );
}
