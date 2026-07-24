"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTERIOR_VH } from "@/lib/constants";
import VideoBackground from "./VideoBackground";

/**
 * Second cinematic zone: a looping background video (the interior frame set was
 * removed, so it shares the construction clip). Short pin — the caption fades
 * out over the first stretch of scroll, then the section releases into content.
 */
export default function InteriorZone() {
  const zoneRef = useRef<HTMLElement | null>(null);
  const captionRef = useRef<HTMLDivElement | null>(null);

  // Caption fades + blurs out over the first 25% of the zone — same language as
  // the hero, so the footage is unobstructed as you scroll on.
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
        <VideoBackground />
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
