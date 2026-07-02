import { motion, useReducedMotion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";

interface ExperienceCardProps {
  src: string;
  alt: string;
  label: string;
  title: string;
  description: string;
  className?: string;
}

/**
 * Immersive, cinematic card used in the Aswan Experiences section —
 * taller aspect ratio and a title/description that sit over the image.
 */
export default function ExperienceCard({
  src,
  alt,
  label,
  title,
  description,
  className = "",
}: ExperienceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`group relative shrink-0 overflow-hidden rounded-3xl ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <PlaceholderImage
          src={src}
          alt={alt}
          label={label}
          className={`h-full w-full transition-transform duration-700 ease-out ${
            prefersReducedMotion ? "" : "group-hover:scale-105"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brown/75 via-brown/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-serif text-2xl text-ivory">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ivory/85">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
