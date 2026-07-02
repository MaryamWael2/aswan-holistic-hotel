import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScrollHeroLayer from "../components/ScrollHeroLayer";
import PlaceholderImage from "../components/PlaceholderImage";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Full-screen cinematic scroll hero.
 *
 * A tall track (`heroTrackHeight`) creates scroll distance; a `sticky`
 * inner stage stays pinned to the viewport while `scrollYProgress` (0 → 1,
 * via useScroll) drives every layer's opacity/position through
 * useTransform. See the "STAGE:" comments below for where each part of
 * the sequence described in the brief is implemented.
 *
 * Reduced-motion users get a simplified static stack instead of the
 * pinned/scroll-jacked version — see the early return below.
 */
export default function HeroScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Mobile gets a shorter, lighter sequence: less scroll distance, less
  // building scale, and a shorter/lighter water reveal (per brief).
  const heroTrackHeight = isMobile ? "220vh" : "320vh";
  const buildingMaxScale = isMobile ? 1.06 : 1.18;

  // --- STAGE 1: quote fades out and lifts as scroll begins (0 → 25%) ---
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const quoteY = useTransform(scrollYProgress, [0, 0.25], [0, -80]);

  // --- STAGE 2/3: the hotel building fades in, rises, and slowly scales
  //     up as if the visitor is moving closer (15% → 75%) ---
  const buildingOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const buildingY = useTransform(scrollYProgress, [0.15, 0.45], [80, 0]);
  const buildingScale = useTransform(scrollYProgress, [0.25, 0.75], [0.85, buildingMaxScale]);

  // A soft warm haze gathers around the building as it arrives, echoing
  // buildingOpacity so it reads as atmosphere rather than a hard edge.
  const hazeOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.7], [0, 0.5, 0.1]);

  // --- STAGE 4: golden clouds drift slowly across the sky (35% → 65% in,
  //     drifting the whole time after) ---
  const cloudsOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const cloudsX = useTransform(scrollYProgress, [0.35, 1], [-40, 40]);

  // --- STAGE 5/6/7: Nile water rises from the bottom, calm and layered
  //     (55% → 90%) ---
  const waterY = useTransform(scrollYProgress, [0.55, isMobile ? 0.8 : 0.9], ["100%", "0%"]);
  const waterYBack = useTransform(scrollYProgress, [0.5, isMobile ? 0.75 : 0.85], ["100%", "0%"]);

  // --- STAGE 8: a subtle warm overlay fades in right at the end, cueing
  //     the transition into the rest of the homepage ---
  const finalOverlayOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 0.15]);

  if (prefersReducedMotion) {
    return (
      <section id="top" className="relative flex flex-col items-center gap-10 bg-gradient-to-b from-sand/40 via-ivory to-ivory px-6 py-24 text-center">
        <p className="max-w-3xl font-serif text-3xl italic leading-relaxed text-nile-deep sm:text-4xl">
          &ldquo;Enter with a calm heart, and leave with a renewed soul.&rdquo;
        </p>
        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl">
          {/* PLACEHOLDER ASSET: add the 3D hotel building render at
              public/images/hero/hero-hotel-building.png */}
          <PlaceholderImage
            src="/images/hero/hero-hotel-building.png"
            alt="A three-story Egyptian-inspired hotel building in warm sandstone tones beside the Nile."
            label="3D hotel building render"
            className="h-full w-full"
            eager
          />
        </div>
        <div className="h-24 w-full max-w-4xl rounded-3xl bg-gradient-to-b from-nile/70 to-nile-deep" aria-hidden="true" />
      </section>
    );
  }

  return (
    <section id="top" ref={containerRef} className="relative" style={{ height: heroTrackHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background sky: soft sunrise gradient over Aswan, static base layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta/30 via-sand/40 to-ivory" aria-hidden="true" />

        {/* Ambient warm haze around the building's arrival */}
        <ScrollHeroLayer
          style={{ opacity: hazeOpacity }}
          className="flex items-center justify-center blur-3xl"
          ariaHidden
        >
          <div className="h-[60vh] w-[60vw] rounded-full bg-gold/40" />
        </ScrollHeroLayer>

        {/* STAGE 4: drifting golden clouds */}
        <ScrollHeroLayer style={{ opacity: cloudsOpacity }} ariaHidden>
          <motion.div
            style={{ x: cloudsX }}
            className="absolute left-[8%] top-[14%] h-24 w-72 rounded-full bg-gold/30 blur-2xl"
          />
          <motion.div
            style={{ x: cloudsX }}
            className="absolute right-[10%] top-[22%] h-20 w-56 rounded-full bg-ivory/50 blur-2xl"
          />
        </ScrollHeroLayer>

        {/* STAGE 1: opening quote */}
        <ScrollHeroLayer
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-terracotta">
            Aswan Holistic Hotel
          </p>
          <blockquote className="mt-6 max-w-3xl font-serif text-4xl italic leading-relaxed tracking-wide text-nile-deep sm:text-5xl md:text-6xl">
            &ldquo;Enter with a calm heart, and leave with a renewed soul.&rdquo;
          </blockquote>
        </ScrollHeroLayer>

        {/* STAGE 2/3: the hotel building, rising and slowly scaling closer */}
        <ScrollHeroLayer
          style={{ opacity: buildingOpacity, y: buildingY }}
          className="flex items-center justify-center px-6"
          ariaHidden
        >
          <motion.div style={{ scale: buildingScale }} className="w-full max-w-3xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-nile-deep/30">
              {/* PLACEHOLDER ASSET: add the 3D hotel building render at
                  public/images/hero/hero-hotel-building.png (transparent
                  background PNG/WebP recommended) */}
              <PlaceholderImage
                src="/images/hero/hero-hotel-building.png"
                alt="A three-story Egyptian-inspired hotel building rendered in warm sandstone tones, with Nile-blue window glass and gold hieroglyph-style wall details."
                label="3D hotel building render"
                className="h-full w-full"
                eager
              />
            </div>
          </motion.div>
        </ScrollHeroLayer>

        {/* STAGE 5/6/7: Nile water rising from the bottom, two soft layers
            for gentle parallax depth */}
        <ScrollHeroLayer className="flex items-end justify-center" ariaHidden>
          {/* PLACEHOLDER ASSET (optional): a photographic Nile water layer
              can replace this gradient at public/images/hero/nile-water.jpg */}
          <motion.div
            style={{ y: waterYBack }}
            className="absolute inset-x-0 bottom-0 h-[38vh] rounded-t-[50%] bg-nile-deep/50 blur-sm sm:h-[42vh]"
          />
          <motion.div
            style={{ y: waterY }}
            className="absolute inset-x-0 bottom-0 h-[30vh] rounded-t-[50%] bg-gradient-to-t from-nile-deep to-nile sm:h-[34vh]"
          />
        </ScrollHeroLayer>

        {/* STAGE 8: subtle overlay cueing the transition into the rest of the page */}
        <ScrollHeroLayer style={{ opacity: finalOverlayOpacity }} className="bg-brown" ariaHidden />
      </div>
    </section>
  );
}
