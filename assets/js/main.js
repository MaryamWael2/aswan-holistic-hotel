/* ==========================================================
   Aswan Holistic Hotel — Page init
   ========================================================== */

(function () {
  "use strict";

  // ----------------------------------------------------------
  // Hero building image: fall back to the marked placeholder
  // if assets/images/hero-hotel-building.png hasn't been added yet.
  // ----------------------------------------------------------
  const buildingFrame = document.querySelector(".hero__building-frame");
  const buildingImage = document.getElementById("heroBuildingImage");

  if (buildingFrame && buildingImage) {
    const markAsMissing = function () {
      buildingFrame.classList.add("has-error");
    };

    // The image starts loading as soon as the HTML is parsed, which can be
    // before this deferred script runs — so check for an already-failed
    // load in addition to listening for a future one.
    if (buildingImage.complete && buildingImage.naturalWidth === 0) {
      markAsMissing();
    } else {
      buildingImage.addEventListener("error", markAsMissing);
    }
  }

  // ----------------------------------------------------------
  // Hero scroll animation: only run the pinned/parallax version
  // when the user hasn't asked for reduced motion. Otherwise the
  // CSS .hero--static rules present everything statically, with
  // no scroll-jacking and no motion.
  // ----------------------------------------------------------
  const hero = document.getElementById("hero");
  const track = document.getElementById("heroScrollTrack");
  const stage = document.getElementById("heroStage");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (hero && track && stage) {
    if (prefersReducedMotion) {
      hero.classList.add("hero--static");
    } else {
      window.AswanHeroScroll.init({ track, stage });
    }
  }
})();
