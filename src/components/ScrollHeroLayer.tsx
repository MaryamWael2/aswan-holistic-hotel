import { motion, type MotionStyle } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollHeroLayerProps {
  style?: MotionStyle;
  className?: string;
  children?: ReactNode;
  ariaHidden?: boolean;
}

/**
 * Thin wrapper for a single absolutely-positioned hero layer (quote,
 * building, clouds, water, overlay). Keeps HeroScrollSection's JSX focused
 * on *which* scroll-mapped values drive each layer rather than repeating
 * the positioning boilerplate for every layer.
 */
export default function ScrollHeroLayer({ style, className = "", children, ariaHidden }: ScrollHeroLayerProps) {
  return (
    <motion.div className={`absolute inset-0 ${className}`} style={style} aria-hidden={ariaHidden}>
      {children}
    </motion.div>
  );
}
