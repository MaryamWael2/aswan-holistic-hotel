import { motion, useReducedMotion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";

interface ImageCardProps {
  src: string;
  alt: string;
  label: string;
  title: string;
  tags?: string[];
  className?: string;
}

/**
 * Large image-led card used in the Rooms & Suites section. Rounded
 * corners, a soft lift + zoom on hover (desktop only, disabled under
 * prefers-reduced-motion), and small pill tags like "Nile View".
 */
export default function ImageCard({ src, alt, label, title, tags = [], className = "" }: ImageCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`group overflow-hidden rounded-3xl bg-white/40 shadow-sm ${className}`}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <PlaceholderImage
          src={src}
          alt={alt}
          label={label}
          className={`h-full w-full transition-transform duration-700 ease-out ${
            prefersReducedMotion ? "" : "group-hover:scale-105"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brown/60 via-brown/0 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-serif text-2xl text-ivory">{title}</h3>
          {tags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-ivory/15 px-3 py-1 text-xs font-medium tracking-wide text-ivory backdrop-blur-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
}
