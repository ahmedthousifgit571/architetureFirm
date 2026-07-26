"use client";

import { INTERIOR_VH } from "@/lib/constants";
import VideoBackground from "./VideoBackground";

/**
 * Second cinematic zone: a looping background video (the interior frame set was
 * removed, so it shares the construction clip). Short pin — the caption stays
 * fully visible over the footage while the section is held.
 */
export default function InteriorZone() {
  return (
    <section
      data-nav-dark
      style={{ height: `${INTERIOR_VH}vh` }}
      className="relative bg-graphite"
      aria-label="Interior flythrough — inside the finished villa"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <VideoBackground
          desktop={{ src: "/sitetransformation.mp4" }}
          mobile={{ src: "/siteMobileview.mp4" }}
          className="scale-[1.35] md:scale-100"
        />
        {/* Scrim for caption legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.45) 0%, rgba(26,26,26,0.1) 40%, rgba(26,26,26,0.55) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-12">
          <p className="sheet-label text-plaster/60">SHT 02A — INTERIOR SURVEY · LEVEL 01</p>
          <h2
            className="mt-5 max-w-5xl font-display font-semibold leading-[0.95] tracking-[-0.03em] text-plaster"
            style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}
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
