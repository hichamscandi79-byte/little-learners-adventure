import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "soft" | "ghost" | "accent";
type Size = "lg" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children?: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-navy text-cream shadow-soft hover:brightness-110 active:shadow-pressed",
  soft: "bg-white text-navy shadow-card hover:brightness-105 active:shadow-pressed",
  ghost: "bg-transparent text-navy hover:bg-navy/5",
  /** Caller supplies background via inline style (e.g. per-world color). */
  accent: "text-navy shadow-soft hover:brightness-105 active:shadow-pressed",
};

const SIZE_CLASSES: Record<Size, string> = {
  lg: "min-h-16 px-8 text-xl gap-3",
  md: "min-h-12 px-5 text-base gap-2",
};

export function Button({
  variant = "primary",
  size = "lg",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`font-display inline-flex items-center justify-center rounded-full font-bold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
