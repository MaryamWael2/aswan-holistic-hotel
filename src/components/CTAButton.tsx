import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "gold" | "ivory" | "outline-dark";
}

/**
 * Primary call-to-action button used across the site.
 * "gold" is a filled brushed-gold button; "ivory" is a soft outline
 * variant for use over darker/photographic backgrounds; "outline-dark"
 * is the same idea for use over pale/light backgrounds (e.g. the hero's
 * sky-and-sand scene).
 */
export default function CTAButton({ children, variant = "gold", className = "", ...rest }: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  const variantClass =
    variant === "gold"
      ? "bg-gold text-brown hover:bg-terracotta hover:text-ivory"
      : variant === "ivory"
        ? "border border-ivory/70 text-ivory hover:bg-ivory hover:text-nile-deep"
        : "border border-nile-deep/40 text-nile-deep hover:bg-nile-deep hover:text-ivory hover:border-nile-deep";

  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
