"use client";

import { useEffect, useRef, useState } from "react";
import { isMobileViewport } from "@/lib/device";

// Portrait clip for phones, landscape clip for desktop — both muted, looping,
// no audio track, encoded +faststart so playback starts without buffering.
const DESKTOP = { src: "/constructiondesktop.mp4", poster: "/constructiondesktop-poster.jpg" };
const MOBILE = { src: "/constructionMobile.mp4", poster: "/constructionMobile-poster.jpg" };

/**
 * Full-bleed background video for the cinematic zones. Absolutely positioned —
 * drop it as the first child of a `relative overflow-hidden` container.
 *
 * Must be rendered client-side only (its host zones are dynamic ssr:false), so
 * the matchMedia read in the initializer is safe and picks the right clip on
 * the first paint with no desktop→mobile swap flash.
 */
export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [clip] = useState(() =>
    typeof window !== "undefined" && isMobileViewport() ? MOBILE : DESKTOP,
  );

  // Start playback as soon as the clip can play. `poster` (frame 0 of the same
  // video) covers the gap before then, so there is never a blank frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // belt-and-suspenders: satisfies the muted-autoplay policy
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // hold the poster
    const play = () => {
      v.play().catch(() => {
        /* autoplay may still be blocked — poster remains, no crash */
      });
    };
    if (v.readyState >= 2) play();
    else v.addEventListener("canplay", play, { once: true });
    return () => v.removeEventListener("canplay", play);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      poster={clip.poster}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src={clip.src} type="video/mp4" />
    </video>
  );
}
