import type { ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

/** Centers and caps content width on large screens; full-bleed on mobile. */
export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
