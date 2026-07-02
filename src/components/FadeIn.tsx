import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, useful when several FadeIns reveal in sequence. */
  delay?: number;
  /** Direction the content gently rises from. */
  from?: "up" | "down" | "none";
}

/**
 * Gentle scroll-reveal wrapper used throughout the homepage below the hero.
 * Animates once, when ~20% of the element enters the viewport, and collapses
 * to a simple opacity fade (no movement) when the user prefers reduced motion.
 */
export default function FadeIn({ children, className, delay = 0, from = "up" }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  const offset = from === "up" ? 28 : from === "down" ? -28 : 0;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : offset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
