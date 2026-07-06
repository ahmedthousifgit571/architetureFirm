"use client";

import { useRef } from "react";
import { CINEMATIC_VH } from "@/lib/constants";
import { useCanvasSequence } from "@/hooks/useCanvasSequence";
import { useSequence } from "./SequenceProvider";
import Hero from "./Hero";

export default function CinematicZone() {
  const { frames } = useSequence();
  const cinematicRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useCanvasSequence({ frames, canvasRef, scrollContainerRef: cinematicRef });

  return (
    <section
      ref={cinematicRef}
      data-nav-dark
      style={{ height: `${CINEMATIC_VH}vh` }}
      className="relative bg-graphite"
      aria-label="Cinematic flythrough — foundation to finished villa"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {/* Scrim for hero legibility — graphite-tinted */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.55) 0%, rgba(26,26,26,0.15) 42%, rgba(26,26,26,0.65) 100%)",
          }}
        />
        <Hero cinematicRef={cinematicRef} />
      </div>
    </section>
  );
}
