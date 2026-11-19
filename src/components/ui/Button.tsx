import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "ghost", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors";
  const looks =
    variant === "primary"
      ? "bg-accent text-ink hover:bg-white"
      : "border border-line text-text hover:border-accent hover:text-accent";
  return <a className={`${base} ${looks} ${className}`} {...props} />;
}