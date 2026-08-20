import { Link } from "react-router-dom";
import type { WorldMeta } from "../../types/content";

interface WorldCardProps {
  world: WorldMeta;
}

export function WorldCard({ world }: WorldCardProps) {
  return (
    <Link
      to={world.route}
      className="group flex min-h-40 flex-col items-start justify-between rounded-3xl p-5 shadow-card outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-4 focus-visible:ring-navy/30 sm:min-h-48 sm:p-6"
      style={{ backgroundColor: world.colorSoft }}
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-pressed sm:h-16 sm:w-16 sm:text-4xl"
        style={{ backgroundColor: world.color }}
        aria-hidden="true"
      >
        {world.emoji}
      </span>
      <span>
        <span className="font-display block text-xl font-bold text-navy sm:text-2xl">
          {world.title}
        </span>
        <span className="block text-sm font-semibold text-navy-soft sm:text-base">
          {world.tagline}
        </span>
      </span>
    </Link>
  );
}
