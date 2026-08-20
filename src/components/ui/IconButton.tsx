import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label: string;
}

export function IconButton({
  children,
  label,
  className = "",
  ...rest
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-card transition-transform duration-150 active:scale-90 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
