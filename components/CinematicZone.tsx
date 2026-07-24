"use client";

import { useRef } from "react";
import { CINEMATIC_VH } from "@/lib/constants";
import VideoBackground from "./VideoBackground";
import Hero from "./Hero";

export default function CinematicZone() {
  const cinematicRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={cinematicRef}
      data-nav-dark
      style={{ height: `${CINEMATIC_VH}vh` }}
      className="relative bg-graphite"
      aria-label="Cinematic flythrough — foundation to finished villa"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <VideoBackground />
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
