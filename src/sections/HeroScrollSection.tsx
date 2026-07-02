import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ScrollHeroLayer from "../components/ScrollHeroLayer";
import PlaceholderImage from "../components/PlaceholderImage";
import CTAButton from "../components/CTAButton";
import { useMediaQuery } from "../hooks/useMediaQuery";

/**
 * Full-screen cinematic scroll hero.
 *
 * A tall track (`heroTrackHeight`) creates scroll distance; a `sticky`
 * inner stage stays pinned to the viewport while `scrollYProgress` (0 → 1,
 * via useScroll) drives every layer's opacity/position through
 * useTransform. See the "STAGE:" comments below for where each part of
 * the sequence described in the brief is implemented:
 *   1. background sky/distant riverbank drifts slowly (parallax lag)
 *   2. the hotel building scales up gently, as if the visitor is arriving
 *   3. the foreground island, Nile mist and water reflection rise in from
 *      the bottom edge
 *   4. the opening quote fades upward and out
 *   5. the rest of the homepage continues normally once the track ends
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
  // building scale, and a shorter/lighter water reveal.
  const heroTrackHeight = isMobile ? "220vh" : "320vh";
  const buildingMaxScale = isMobile ? 1.05 : 1.14;

  // --- STAGE 1: quote (and its CTA/scroll cue) fades out and lifts as
  //     scroll begins (0 → 25%) ---
  const quoteOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const quoteY = useTransform(scrollYProgress, [0, 0.25], [0, -70]);

  // --- background sky + distant riverbank: a slow, barely-there drift so
  //     it reads as "far away" against everything moving in front of it ---
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // --- STAGE 2: the hotel building settles in and slowly grows closer
  //     (15% → 75%) ---
  const buildingOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const buildingY = useTransform(scrollYProgress, [0.15, 0.45], [60, 0]);
  const buildingScale = useTransform(scrollYProgress, [0.25, 0.75], [0.9, buildingMaxScale]);

  // A soft warm haze gathers around the building as it arrives, echoing
  // buildingOpacity so it reads as atmosphere rather than a hard edge.
  const hazeOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.75], [0, 0.45, 0.15]);

  // --- STAGE 3: the island shoreline settles in with the building, then
  //     Nile mist and water rise gently from the bottom (35% → 90%) ---
  const shorelineOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const shorelineY = useTransform(scrollYProgress, [0.2, 1], [40, -10]);

  const mistY = useTransform(scrollYProgress, [0.4, isMobile ? 0.75 : 0.85], ["55%", "0%"]);
  const mistOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.95], [0, 0.85, 0.6]);

  const waterY = useTransform(scrollYProgress, [0.55, isMobile ? 0.8 : 0.92], ["100%", "0%"]);
  const waterYBack = useTransform(scrollYProgress, [0.5, isMobile ? 0.75 : 0.88], ["100%", "0%"]);

  // --- STAGE 5: a subtle warm overlay fades in right at the end, cueing
  //     the transition into the rest of the homepage ---
  const finalOverlayOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 0.18]);

  if (prefersReducedMotion) {
    return (
      <section
        id="top"
        className="relative flex flex-col items-center gap-10 overflow-hidden bg-gradient-to-b from-sky via-sand/30 to-ivory px-6 py-28 text-center"
      >
        <blockquote className="max-w-2xl font-serif text-4xl italic leading-[1.3] tracking-wide text-nile-deep sm:text-5xl">
          Enter with a calm heart,
          <br />
          and leave with a renewed soul.
        </blockquote>
        <CTAButton
          variant="outline-dark"
          onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
        >
          Discover the Experience
        </CTAButton>
        <div className="relative aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-3xl">
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
    <section id="top" ref={containerRef} className="relative bg-sky" style={{ height: heroTrackHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base sky: pale-blue Aswan sunrise fading into warm sand at the
            horizon, static so it always reads as "sky", not a moving prop */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky via-sand/30 to-ivory" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-[30%] mx-auto h-[45vh] w-[75vw] rounded-full bg-gold/15 blur-[110px]"
          aria-hidden="true"
        />
        {/* A faint scrim behind the fixed navbar keeps its light text
            readable against the pale sky */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-nile-deep/25 to-transparent" aria-hidden="true" />

        {/* Distant riverbank + greenery: the slowest-moving layer */}
        <ScrollHeroLayer style={{ y: bgY, scale: bgScale }} ariaHidden>
          {/* PLACEHOLDER ASSET: a wide photographic panorama of the Nile
              with distant hills and palms along the banks, pale sky above,
              at public/images/hero/hero-bg-panorama.jpg */}
          <PlaceholderImage
            src="/images/hero/hero-bg-panorama.jpg"
            alt="A wide view of the Nile at Aswan, with soft hills and palm-lined banks under a pale morning sky."
            label="Background: distant Nile panorama"
            className="h-full w-full object-cover object-bottom opacity-80"
            eager
          />
        </ScrollHeroLayer>

        {/* Warm haze gathering around the building's arrival */}
        <ScrollHeroLayer
          style={{ opacity: hazeOpacity }}
          className="flex items-center justify-center blur-3xl"
          ariaHidden
        >
          <div className="h-[55vh] w-[55vw] rounded-full bg-gold/35" />
        </ScrollHeroLayer>

        {/* Soft grounded shadow beneath the building, sold as depth rather
            than a hard drop-shadow */}
        <ScrollHeroLayer
          style={{ opacity: buildingOpacity }}
          className="flex items-end justify-center pb-[17vh] sm:pb-[19vh]"
          ariaHidden
        >
          <motion.div
            style={{ scaleX: buildingScale }}
            className="h-6 w-[34vw] rounded-[100%] bg-brown/25 blur-2xl sm:h-8"
          />
        </ScrollHeroLayer>

        {/* STAGE 2: the hotel building, central and slightly enlarged,
            slowly scaling as the visitor "arrives" */}
        <ScrollHeroLayer
          style={{ opacity: buildingOpacity, y: buildingY }}
          className="flex items-center justify-center px-6 pb-[10vh]"
          ariaHidden
        >
          <motion.div style={{ scale: buildingScale }} className="w-full max-w-3xl sm:max-w-4xl">
            {/* PLACEHOLDER ASSET: the 3D hotel building render, transparent
                background PNG/WebP, at
                public/images/hero/hero-hotel-building.png */}
            <PlaceholderImage
              src="/images/hero/hero-hotel-building.png"
              alt="A three-story Egyptian-inspired hotel building rendered in warm sandstone tones, with Nile-blue window glass and gold hieroglyph-style wall details."
              label="3D hotel building render"
              className="aspect-[4/3] h-auto w-full !object-contain drop-shadow-[0_35px_45px_rgba(36,26,19,0.25)]"
              eager
            />
          </motion.div>
        </ScrollHeroLayer>

        {/* STAGE 3: the island shoreline the building sits on — steps,
            palms and rock along the water's edge */}
        <ScrollHeroLayer
          style={{ opacity: shorelineOpacity, y: shorelineY }}
          className="flex items-end justify-center"
          ariaHidden
        >
          {/* PLACEHOLDER ASSET: a transparent-background foreground layer
              of the stone steps, shoreline rock and palms the building
              sits among, at
              public/images/hero/hero-shoreline-foreground.png */}
          <PlaceholderImage
            src="/images/hero/hero-shoreline-foreground.png"
            alt="Stone steps and palm-lined shoreline rock at the water's edge."
            label="Foreground: island shoreline"
            className="h-[26vh] w-full !object-contain object-bottom sm:h-[30vh]"
            eager
          />
        </ScrollHeroLayer>

        {/* Nile mist rising softly from the bottom edge */}
        <ScrollHeroLayer ariaHidden>
          <motion.div
            style={{ y: mistY, opacity: mistOpacity }}
            className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-ivory/85 via-sand/30 to-transparent blur-md sm:h-[34vh]"
          />
        </ScrollHeroLayer>

        {/* Water and its warm reflection, two soft layers for gentle depth */}
        <ScrollHeroLayer className="flex items-end justify-center" ariaHidden>
          <motion.div
            style={{ y: waterYBack }}
            className="absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-nile-deep/70 to-transparent blur-sm sm:h-[22vh]"
          />
          <motion.div
            style={{ y: waterY }}
            className="absolute inset-x-0 bottom-0 h-[14vh] bg-gradient-to-t from-nile-deep via-nile/70 to-transparent sm:h-[16vh]"
          />
          <motion.div
            style={{ y: waterY, opacity: 0.35 }}
            className="absolute inset-x-0 bottom-0 h-[10vh] bg-gradient-to-t from-gold/40 to-transparent mix-blend-overlay sm:h-[12vh]"
          />
        </ScrollHeroLayer>

        {/* STAGE 1: the opening quote, editorial and left-set like a title
            page, with its call to action and scroll cue */}
        <ScrollHeroLayer
          style={{ opacity: quoteOpacity, y: quoteY }}
          className="flex flex-col justify-center px-6 sm:px-12 lg:px-24"
        >
          <div className="max-w-xl text-center sm:text-left">
            <blockquote className="font-serif text-4xl italic leading-[1.3] tracking-wide text-nile-deep sm:text-5xl md:text-[3.4rem]">
              Enter with a calm heart,
              <br />
              and leave with a renewed soul.
            </blockquote>
            <div className="mt-10 flex justify-center sm:justify-start">
              <CTAButton
                variant="outline-dark"
                onClick={() => document.querySelector("#rooms")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discover the Experience
              </CTAButton>
            </div>
          </div>
        </ScrollHeroLayer>

        {/* Scroll cue, centered at the very bottom */}
        <ScrollHeroLayer
          style={{ opacity: quoteOpacity }}
          className="flex flex-col items-center justify-end gap-3 pb-8 sm:pb-10"
          ariaHidden
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-nile-deep/70">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-nile-deep/40"
          />
        </ScrollHeroLayer>

        {/* STAGE 5: subtle overlay cueing the transition into the rest of
            the homepage */}
        <ScrollHeroLayer style={{ opacity: finalOverlayOpacity }} className="bg-brown" ariaHidden />
      </div>
    </section>
  );
}
