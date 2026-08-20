import { useNavigate } from "react-router-dom";
import type { WorldMeta } from "../../types/content";
import { IconButton } from "./IconButton";

interface WorldHeaderProps {
  world: WorldMeta;
}

export function WorldHeader({ world }: WorldHeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="safe-top flex items-center gap-4 px-4 pb-6 pt-6 sm:px-8"
      style={{ backgroundColor: world.colorSoft }}
    >
      <IconButton label="Back to home" onClick={() => navigate("/home")}>
        <span aria-hidden="true">⬅️</span>
      </IconButton>
      <div className="flex items-center gap-3">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl shadow-pressed sm:h-14 sm:w-14 sm:text-3xl"
          style={{ backgroundColor: world.color }}
          aria-hidden="true"
        >
          {world.emoji}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            {world.title}
          </h1>
          <p className="text-sm font-semibold text-navy-soft sm:text-base">
            {world.tagline}
          </p>
        </div>
      </div>
    </header>
  );
}
