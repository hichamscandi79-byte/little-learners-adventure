import type { ReactNode } from "react";
import { Button, IconButton } from "../ui";
import type { WorldMeta } from "../../types/content";

interface ActivityShellProps {
  title: string;
  icon: string;
  world: WorldMeta;
  index: number;
  total: number;
  phase: "active" | "success";
  successMessage: string;
  onClose: () => void;
  onNext: () => void;
  hasNext: boolean;
  children: ReactNode;
}

/**
 * Shared full-screen chrome for the Trace and Play activities: a close
 * button, a "N of total" progress readout, and a common success state with
 * Next/Done navigation so a child can flow through an entire world's worth
 * of activities without returning to the World screen each time.
 */
export function ActivityShell({
  title,
  icon,
  world,
  index,
  total,
  phase,
  successMessage,
  onClose,
  onNext,
  hasNext,
  children,
}: ActivityShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cream">
      <header
        className="safe-top flex items-center justify-between gap-3 px-4 pb-4 pt-4 sm:px-8"
        style={{ backgroundColor: world.colorSoft }}
      >
        <IconButton label="Close activity" onClick={onClose}>
          <span aria-hidden="true">✖️</span>
        </IconButton>
        <p className="font-display text-center text-base font-bold text-navy sm:text-lg">
          <span aria-hidden="true">{icon}</span> {title} · {index + 1} of {total}
        </p>
        <span className="h-14 w-14 shrink-0" aria-hidden="true" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto p-4 sm:p-8">
        {phase === "active" ? (
          children
        ) : (
          <div className="flex flex-col items-center gap-5 text-center">
            <span className="text-7xl sm:text-8xl" aria-hidden="true">
              ⭐
            </span>
            <p className="font-display text-2xl font-extrabold text-navy sm:text-4xl">
              {successMessage}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasNext && (
                <Button variant="accent" style={{ backgroundColor: world.color }} onClick={onNext}>
                  Next ➡️
                </Button>
              )}
              <Button variant="soft" onClick={onClose}>
                {hasNext ? "Take a break" : "Done 🎉"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
