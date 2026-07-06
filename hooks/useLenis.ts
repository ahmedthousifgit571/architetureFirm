"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Module-level handle so the navbar can drive anchor scrolls through Lenis
// instead of fighting it with native scrollIntoView.
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis() {
  useEffect(() => {
    // Reduced motion: native scrolling, no smoothing layer
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update); // keeps ScrollTrigger in sync with Lenis position

    const ticker = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0); // prevents large delta spikes causing frame jumps

    // NOTE: no separate requestAnimationFrame loop — the GSAP ticker is the
    // only driver, otherwise Lenis advances double time and scrub desyncs.
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
