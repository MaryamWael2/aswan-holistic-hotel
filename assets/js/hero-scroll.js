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

    // The building emerges through a soft haze that gathers then clears —
    // front layer peaks earlier and dissolves sooner than the back layer,
    // so the mist feels like it drifts past the camera as the building
    // settles into focus.
    hazeBackPeakStart: 0.12,
    hazeBackPeak: 0.22,
    hazeBackFadeEnd: 0.62,
    hazeFrontPeakStart: 0.14,
    hazeFrontPeak: 0.24,
    hazeFrontFadeEnd: 0.46,

    waterStart: 0.58, // Nile water begins rising from the bottom
    waterEnd: 0.88, // water has fully risen; sequence settles into place

    boatsFadeEnd: 0.7, // boats have fully appeared this far into the water rise
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

  // Rises 0 → peakValue between [start, peak], then falls peakValue → 0
  // between [peak, end]. Used for the haze, which gathers and then clears.
  function triangleEnvelope(value, start, peak, end, peakValue) {
    if (value < peak) return mapRange(value, start, peak, 0, peakValue);
    return mapRange(value, peak, end, peakValue, 0);
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

      // --- Layer 0: background sky (clouds + distant palms) fades in as
      //     an ambient backdrop and drifts the least of any layer — the
      //     slow parallax rate reads as "furthest from camera". ---
      const skyOpacity = mapRange(progress, 0, STAGES.buildingFadeEnd, 0.12, 0.55);
      const skyDrift = mapRange(progress, 0, 1, 0, -60);

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

      // --- Haze: soft mist gathers around the building, then clears as
      //     it settles into focus. Front layer dissolves sooner and
      //     drifts further for a sense of depth (parallax). ---
      const hazeOpacityBack = triangleEnvelope(
        progress,
        STAGES.hazeBackPeakStart,
        STAGES.hazeBackPeak,
        STAGES.hazeBackFadeEnd,
        0.75
      );
      const hazeYBack = mapRange(progress, STAGES.hazeBackPeakStart, STAGES.hazeBackFadeEnd, 30, -10);
      const hazeScaleBack = mapRange(progress, STAGES.hazeBackPeakStart, STAGES.hazeBackFadeEnd, 0.9, 1.15);

      const hazeOpacityFront = triangleEnvelope(
        progress,
        STAGES.hazeFrontPeakStart,
        STAGES.hazeFrontPeak,
        STAGES.hazeFrontFadeEnd,
        0.85
      );
      const hazeYFront = mapRange(progress, STAGES.hazeFrontPeakStart, STAGES.hazeFrontFadeEnd, 50, -30);
      const hazeScaleFront = mapRange(progress, STAGES.hazeFrontPeakStart, STAGES.hazeFrontFadeEnd, 1, 1.3);

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

      stage.style.setProperty("--haze-opacity-back", hazeOpacityBack.toFixed(3));
      stage.style.setProperty("--haze-y-back", `${hazeYBack.toFixed(1)}px`);
      stage.style.setProperty("--haze-scale-back", hazeScaleBack.toFixed(3));

      stage.style.setProperty("--haze-opacity-front", hazeOpacityFront.toFixed(3));
      stage.style.setProperty("--haze-y-front", `${hazeYFront.toFixed(1)}px`);
      stage.style.setProperty("--haze-scale-front", hazeScaleFront.toFixed(3));

      stage.style.setProperty("--water-y-front", `${((1 - waterFrontProgress) * 100).toFixed(1)}%`);
      stage.style.setProperty("--water-y-back", `${((1 - waterBackProgress) * 100).toFixed(1)}%`);

      // --- Foreground: boats fade in as the water arrives, then drift
      //     across it faster than the waves — a foreground parallax rate,
      //     reading as "closer to camera" than the water they float on. ---
      const boatsOpacity = mapRange(progress, STAGES.waterStart, STAGES.boatsFadeEnd, 0, 1);
      const boat1Drift = mapRange(progress, STAGES.waterStart, 1, 0, -90);
      const boat2Drift = mapRange(progress, STAGES.waterStart, 1, 0, 70);

      stage.style.setProperty("--sky-opacity", skyOpacity.toFixed(3));
      stage.style.setProperty("--sky-drift", `${skyDrift.toFixed(1)}px`);

      stage.style.setProperty("--boats-opacity", boatsOpacity.toFixed(3));
      stage.style.setProperty("--boat1-drift", `${boat1Drift.toFixed(1)}px`);
      stage.style.setProperty("--boat2-drift", `${boat2Drift.toFixed(1)}px`);
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
