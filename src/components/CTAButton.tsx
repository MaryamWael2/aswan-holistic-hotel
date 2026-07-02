import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "gold" | "ivory";
}

/**
 * Primary call-to-action button used in the navbar and booking section.
 * "gold" is a filled brushed-gold button; "ivory" is a soft outline
 * variant for use over darker/photographic backgrounds.
 */
export default function CTAButton({ children, variant = "gold", className = "", ...rest }: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  const variantClass =
    variant === "gold"
      ? "bg-gold text-brown hover:bg-terracotta hover:text-ivory"
      : "border border-ivory/70 text-ivory hover:bg-ivory hover:text-nile-deep";

  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
}
