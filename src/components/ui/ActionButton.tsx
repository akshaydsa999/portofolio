import type { ButtonHTMLAttributes } from "react";

export function ActionButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-md border border-line px-3.5 py-2 font-mono text-xs transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text ${className}`}
      {...props}
    />
  );
}