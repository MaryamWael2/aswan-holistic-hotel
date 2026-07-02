interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

/**
 * Consistent editorial heading used at the top of each homepage section:
 * a small gold eyebrow label, a serif title, and a short brushed-gold
 * decorative rule.
 */
export default function SectionHeading({
  eyebrow,
  title,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${
            light ? "text-gold" : "text-terracotta"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-4xl font-medium leading-tight sm:text-5xl ${
          light ? "text-ivory" : "text-nile-deep"
        }`}
      >
        {title}
      </h2>
      <span className="mt-5 h-px w-16 bg-gold" aria-hidden="true" />
    </div>
  );
}
