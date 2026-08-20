import type { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  /** Tailwind column-count classes per breakpoint; sensible defaults provided. */
  className?: string;
}

/**
 * Shared grid used by the Home world-picker and every world's item grid.
 * ~2 columns on phones, ~3 on tablets, up to 4-6 on desktop depending on
 * content density — callers can override via className.
 */
export function ResponsiveGrid({ children, className = "" }: ResponsiveGridProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {children}
    </div>
  );
}
