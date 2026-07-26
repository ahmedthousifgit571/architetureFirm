"use client";

import { useEffect, useRef, useState } from "react";
import { isMobileViewport } from "@/lib/device";

// Portrait clip for phones, landscape clip for desktop — both muted, looping,
// no audio track, encoded +faststart so playback starts without buffering.
const DEFAULT_DESKTOP = { src: "/constructiondesktop.mp4", poster: "/constructiondesktop-poster.jpg" };
const DEFAULT_MOBILE = { src: "/constructionMobile.mp4", poster: "/constructionMobile-poster.jpg" };

interface VideoBackgroundProps {
  desktop?: { src: string; poster?: string };
  mobile?: { src: string; poster?: string };
  className?: string;
}

/**
 * Full-bleed background video for the cinematic zones. Absolutely positioned —
 * drop it as the first child of a `relative overflow-hidden` container.
 *
 * Must be rendered client-side only (its host zones are dynamic ssr:false), so
 * the matchMedia read in the initializer is safe and picks the right clip on
 * the first paint with no desktop→mobile swap flash.
 */
export default function VideoBackground({ desktop = DEFAULT_DESKTOP, mobile = DEFAULT_MOBILE, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [clip] = useState(() =>
    typeof window !== "undefined" && isMobileViewport() ? mobile : desktop,
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // React does not reliably reflect the `muted` attribute to the DOM property,
    // and iOS refuses inline autoplay unless the element is genuinely muted.
    v.muted = true;
    v.defaultMuted = true;

    // Respect reduced motion: hold the poster, don't play.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.removeAttribute("autoplay");
      v.pause();
      return;
    }

    // If even muted autoplay is blocked (iOS Low Power Mode, data-saver, strict
    // policies), start on the first user gesture. The poster holds until then.
    const gestures = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
    const removeGestures = () =>
      gestures.forEach((g) => window.removeEventListener(g, startOnGesture));
    const startOnGesture = () => {
      v.play().catch(() => {});
      removeGestures();
    };
    const addGestures = () =>
      gestures.forEach((g) => window.addEventListener(g, startOnGesture, { passive: true }));

    // Call play() directly — on iOS this also kicks off loading, which the
    // browser may otherwise defer (so waiting for `canplay` can hang forever).
    const attempt = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(addGestures);
    };
    attempt();
    // Retry once the media is actually ready, in case the first call was too early.
    v.addEventListener("loadeddata", attempt, { once: true });
    v.addEventListener("canplay", attempt, { once: true });

    return () => {
      v.removeEventListener("loadeddata", attempt);
      v.removeEventListener("canplay", attempt);
      removeGestures();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      poster={clip.poster}
      autoPlay
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
