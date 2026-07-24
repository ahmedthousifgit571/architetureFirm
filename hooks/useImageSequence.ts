"use client";

import { useState, useEffect } from "react";
import { buildFrameUrls, type FrameSet } from "@/lib/constants";
import { isMobileViewport, isPortraitViewport } from "@/lib/device";

interface Options {
  // When true, the sequence is never loaded — a video background replaces the
  // frame scrub, so pulling the frames would just be wasted bandwidth. `ready`
  // flips immediately so the loader clears.
  skip?: boolean;
}

export function useImageSequence(set: FrameSet, options: Options = {}) {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (options.skip) {
      setReady(true); // no frames to load — clear the loader right away
      return;
    }

    let cancelled = false;
    const urls = buildFrameUrls(set, isMobileViewport(), isPortraitViewport());
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
