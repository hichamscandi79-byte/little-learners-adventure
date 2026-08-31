import type { ReactNode } from "react";

interface StatBadgeProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  onClick?: () => void;
}

export function StatBadge({ icon, label, value, onClick }: StatBadgeProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      aria-label={`${label}: ${value}`}
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-card transition-transform duration-150 active:scale-95"
    >
      <span className="text-xl" aria-hidden="true">
        {icon}
      </span>
      <span className="font-display text-lg font-bold text-navy">{value}</span>
    </Tag>
  );
}
