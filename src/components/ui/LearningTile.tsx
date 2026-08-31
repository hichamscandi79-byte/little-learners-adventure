import type { LearningItem } from "../../types/content";

interface LearningTileProps {
  item: LearningItem;
  accentColor: string;
  selected?: boolean;
  complete?: boolean;
  onSelect: (item: LearningItem) => void;
}

export function LearningTile({
  item,
  accentColor,
  selected = false,
  complete = false,
  onSelect,
}: LearningTileProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-pressed={selected}
      aria-label={complete ? `${item.label}, completed` : item.label}
      className="relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl bg-white p-3 shadow-card transition-all duration-150 active:scale-95 sm:min-h-28"
      style={
        selected
          ? { boxShadow: `0 0 0 4px white, 0 0 0 7px ${accentColor}` }
          : undefined
      }
    >
      {complete && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow text-xs shadow-pressed"
          aria-hidden="true"
        >
          ⭐
        </span>
      )}
      {item.colorHex ? (
        <span
          className="h-9 w-9 rounded-full shadow-pressed sm:h-10 sm:w-10"
          style={{ backgroundColor: item.colorHex }}
          aria-hidden="true"
        />
      ) : (
        <span className="text-3xl sm:text-4xl" aria-hidden="true">
          {item.emoji}
        </span>
      )}
      <span className="font-display text-lg font-bold text-navy sm:text-xl">
        {item.primary}
      </span>
    </button>
  );
}
