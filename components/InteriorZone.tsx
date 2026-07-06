"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTERIOR_VH, INTERIOR_FRAMES } from "@/lib/constants";
import { useImageSequence } from "@/hooks/useImageSequence";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";

/**
 * Second cinematic zone: interior drone flythrough, scrubbed by scroll.
 * Loads its own frame set independently — it does not gate the page loader,
 * it simply paints as soon as its frames arrive (long before the viewer
 * scrolls past Projects).
 */
export default function InteriorZone() {
  const { frames } = useImageSequence(INTERIOR_FRAMES);
  const zoneRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  useCanvasSequence({ frames, canvasRef, scrollContainerRef: zoneRef });

  // Caption fades + blurs out over the first 25% of the zone — same
  // language as the hero, so the camera travel is unobstructed.
  useEffect(() => {
    if (!captionRef.current || !zoneRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(captionRef.current, {
        opacity: 0,
        y: -30,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: zoneRef.current,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={zoneRef}
      data-nav-dark
      style={{ height: `${INTERIOR_VH}vh` }}
      className="relative bg-graphite"
      aria-label="Interior flythrough — inside the finished villa"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {/* Scrim for caption legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.1) 40%, rgba(26,26,26,0.55) 100%)",
          }}
        />
        <div
          ref={captionRef}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12"
        >
          <p className="sheet-label text-plaster/60">SHT 02A — INTERIOR SURVEY · LEVEL 01</p>
          <h2
            className="mt-5 max-w-3xl font-display font-medium leading-[1.02] tracking-[-0.03em] text-plaster"
            style={{ fontSize: "clamp(2rem, 5vw, 4.25rem)" }}
          >
            The masterpiece, from within.
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <div className="scroll-cue h-10 w-px bg-oxide" aria-hidden />
            <p className="sheet-label text-plaster/50">SCROLL TO WALK THROUGH</p>
          </div>
        </div>
      </div>
    </section>
  );
}
