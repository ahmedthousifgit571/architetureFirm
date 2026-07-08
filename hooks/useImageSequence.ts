"use client";

import { useState, useEffect } from "react";
import { buildFrameUrls, type FrameSet } from "@/lib/constants";

function detectMobile(): boolean {
  return window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
}

function detectPortrait(): boolean {
  return window.matchMedia("(orientation: portrait)").matches;
}

export function useImageSequence(set: FrameSet) {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const urls = buildFrameUrls(set, detectMobile(), detectPortrait());
    const imgs: HTMLImageElement[] = new Array(urls.length);
    let loaded = 0;

    Promise.all(
      urls.map(
        (url, i) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = async () => {
              try {
                await img.decode(); // pre-decode off the main thread — avoids first-draw hitch
              } catch {
                /* decode can reject on some browsers — safe to ignore */
              }
              loaded++;
              if (!cancelled) setProgress(loaded / urls.length);
              resolve();
            };
            img.onerror = () => {
              // Surfaces 404s immediately — check the console if frames don't load
              console.error("[useImageSequence] FRAME FAILED:", url);
              loaded++;
              if (!cancelled) setProgress(loaded / urls.length);
              resolve();
            };
            img.src = url;
            imgs[i] = img;
          }),
      ),
    ).then(() => {
      if (cancelled) return;
      const valid = imgs.filter((img) => img && img.naturalWidth > 0);
      console.log(`[useImageSequence] ${valid.length}/${urls.length} frames ready`);
      setFrames(valid);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // frame set is fixed for the lifetime of the page

  return { frames, progress, ready };
}
