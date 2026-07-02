/* ==========================================================
   Aswan Holistic Hotel — Hero scroll animation controller
   ==========================================================
   Maps scroll position inside #heroScrollTrack to a 0 → 1
   "progress" value, then drives each layer purely through CSS
   custom properties (see assets/css/hero.css). No layout
   thrashing beyond one getBoundingClientRect() per frame, and
   updates are throttled to requestAnimationFrame.

   This file does nothing if the user prefers reduced motion —
   main.js only calls init() when animation is appropriate.
   ========================================================== */

window.AswanHeroScroll = (function () {
  "use strict";

  // ----------------------------------------------------------
  // Stage boundaries, expressed as fractions of overall scroll
  // progress (0 = top of hero, 1 = hero fully scrolled past).
  // Adjust these to re-time the sequence.
  // ----------------------------------------------------------
  const STAGES = {
    quoteFadeEnd: 0.22, // quote has fully faded/moved away by here

    buildingFadeStart: 0.12, // building starts appearing (slight overlap with quote)
    buildingFadeEnd: 0.34, // building is fully opaque
    buildingZoomEnd: 0.62, // building finishes its slow "coming closer" scale

    waterStart: 0.58, // Nile water begins rising from the bottom
    waterEnd: 0.88, // water has fully risen; sequence settles into place
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  // Maps `value` from [inMin, inMax] to [outMin, outMax], clamped.
  function mapRange(value, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMax;
    const t = clamp((value - inMin) / (inMax - inMin), 0, 1);
    return outMin + t * (outMax - outMin);
  }

  function init({ track, stage }) {
    let ticking = false;

    function computeProgress() {
      const rect = track.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return 0;
      return clamp(-rect.top / scrollableDistance, 0, 1);
    }

    function render() {
      ticking = false;
      const progress = computeProgress();

      // --- Layer 1: quote fades up and out early in the scroll ---
      const quoteOpacity = 1 - mapRange(progress, 0, STAGES.quoteFadeEnd, 0, 1);
      const quoteY = mapRange(progress, 0, STAGES.quoteFadeEnd, 0, -60);

      // --- Layer 2: building fades in, then keeps a slow gentle zoom ---
      const buildingOpacity = mapRange(
        progress,
        STAGES.buildingFadeStart,
        STAGES.buildingFadeEnd,
        0,
        1
      );
      const buildingY = mapRange(
        progress,
        STAGES.buildingFadeStart,
        STAGES.buildingFadeEnd,
        48,
        0
      );
      const buildingScale = mapRange(
        progress,
        STAGES.buildingFadeStart,
        STAGES.buildingZoomEnd,
        0.92,
        1.06
      );

      // --- Layer 3: Nile water rises from the bottom, two layers for
      //     a soft parallax depth (back layer arrives slightly ahead). ---
      const waterFrontProgress = mapRange(progress, STAGES.waterStart, STAGES.waterEnd, 0, 1);
      const waterBackProgress = mapRange(
        progress,
        STAGES.waterStart - 0.05,
        STAGES.waterEnd - 0.05,
        0,
        1
      );

      stage.style.setProperty("--quote-opacity", quoteOpacity.toFixed(3));
      stage.style.setProperty("--quote-y", `${quoteY.toFixed(1)}px`);

      stage.style.setProperty("--building-opacity", buildingOpacity.toFixed(3));
      stage.style.setProperty("--building-y", `${buildingY.toFixed(1)}px`);
      stage.style.setProperty("--building-scale", buildingScale.toFixed(3));

      stage.style.setProperty("--water-y-front", `${((1 - waterFrontProgress) * 100).toFixed(1)}%`);
      stage.style.setProperty("--water-y-back", `${((1 - waterBackProgress) * 100).toFixed(1)}%`);
    }

    function requestRender() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(render);
      }
    }

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    render();

    return {
      destroy() {
        window.removeEventListener("scroll", requestRender);
        window.removeEventListener("resize", requestRender);
      },
    };
  }

  return { init };
})();
