import { Link } from "react-router-dom";
import type { WorldMeta } from "../../types/content";

interface WorldCardProps {
  world: WorldMeta;
  starsEarned?: number;
  starsTotal?: number;
  isComplete?: boolean;
}

export function WorldCard({ world, starsEarned = 0, starsTotal = 0, isComplete = false }: WorldCardProps) {
  const progressRatio = starsTotal > 0 ? Math.min(1, starsEarned / starsTotal) : 0;

  return (
    <Link
      to={world.route}
      className="group relative flex min-h-40 flex-col items-start justify-between rounded-3xl p-5 shadow-card outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-4 focus-visible:ring-navy/30 sm:min-h-48 sm:p-6"
      style={{ backgroundColor: world.colorSoft }}
    >
      {isComplete && (
        <span
          className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow text-lg shadow-pressed"
          aria-label="World completed"
        >
          🏅
        </span>
      )}
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-pressed sm:h-16 sm:w-16 sm:text-4xl"
        style={{ backgroundColor: world.color }}
        aria-hidden="true"
      >
        {world.emoji}
      </span>
      <span className="w-full">
        <span className="font-display block text-xl font-bold text-navy sm:text-2xl">
          {world.title}
        </span>
        <span className="block text-sm font-semibold text-navy-soft sm:text-base">
          {world.tagline}
        </span>
        {starsTotal > 0 && (
          <span className="mt-2 block">
            <span className="block h-2 w-full overflow-hidden rounded-full bg-white/70" aria-hidden="true">
              <span
                className="block h-full rounded-full"
                style={{ width: `${progressRatio * 100}%`, backgroundColor: world.color }}
              />
            </span>
            <span className="mt-1 block text-xs font-bold text-navy-soft">
              ⭐ {starsEarned}/{starsTotal}
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}
