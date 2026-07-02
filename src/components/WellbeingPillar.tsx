import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface WellbeingPillarProps {
  icon: LucideIcon;
  label: string;
  description: string;
  delay?: number;
}

/**
 * A single floating pillar card in the Wellbeing section grid — an icon,
 * a short label, and one line of supporting text. Rises gently into view.
 */
export default function WellbeingPillar({ icon: Icon, label, description, delay = 0 }: WellbeingPillarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center gap-3 rounded-2xl border border-gold/20 bg-ivory/60 px-6 py-8 text-center shadow-sm"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0.4 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-palm/15 text-palm">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="font-serif text-xl text-nile-deep">{label}</h3>
      <p className="text-sm leading-relaxed text-brown/75">{description}</p>
    </motion.div>
  );
}
