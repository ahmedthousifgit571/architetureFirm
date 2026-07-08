// Single source of truth for brand + cinematic configuration.
// Pure module — safe to import from server and client code.

export const BRAND_NAME = "ATELIER FORM";
export const BRAND_TAGLINE = "We take you from foundation to masterpiece.";
export const BRAND_EMAIL = "studio@atelierform.com";
export const BRAND_CITY = "ZÜRICH";
export const BRAND_COORDS = "47.3769° N / 8.5417° E";

export const ZOOM_FACTOR = 1.15; // hides edge artifacts; provides parallax headroom
export const CINEMATIC_VH = 600; // height of the foundation sticky-canvas section in vh
export const INTERIOR_VH = 500; // height of the interior flythrough section in vh

export interface FrameSet {
  basePath: string;
  mobileBasePath?: string; // portrait 9:16 set, same naming/count — served to portrait mobile viewports
  prefix: string;
  ext: string;
  pad: number;
  total: number;
  desktopStep: number;
  mobileStep: number;
}

// Both sets: 300 frames on disk, downscaled to 1280×720 (~3.7 MB decoded each).
// Two sequences live on the page, so budgets are per-zone:
//   desktopStep 3 → 100 frames ≈ 370 MB × 2 zones = 740 MB (≤ 850 MB budget)
//   mobileStep  8 →  38 frames ≈ 140 MB × 2 zones = 280 MB (≤ 400 MB budget)
export const FOUNDATION_FRAMES: FrameSet = {
  basePath: "/frames/",
  mobileBasePath: "/frames-mobile/", // 720×1280 portrait renders of the same flythrough
  prefix: "frame-",
  ext: "jpg",
  pad: 3,
  total: 300,
  desktopStep: 3,
  mobileStep: 8,
};

export const INTERIOR_FRAMES: FrameSet = {
  basePath: "/frames-interior/",
  mobileBasePath: "/frames-interior-mobile/", // 720×1280 portrait renders of the same walkthrough
  prefix: "frame-",
  ext: "jpg",
  pad: 3,
  total: 300,
  desktopStep: 3,
  mobileStep: 8,
};

export function buildFrameUrls(set: FrameSet, isMobile: boolean, isPortrait = false): string[] {
  const step = isMobile ? set.mobileStep : set.desktopStep;
  // Portrait phones get the vertical frame set when one exists; landscape
  // mobile and desktop always use the base set (cover.ts letterboxes odd fits)
  const base = isMobile && isPortrait && set.mobileBasePath ? set.mobileBasePath : set.basePath;
  const urls: string[] = [];
  for (let n = 1; n <= set.total; n += step) {
    const padded = String(n).padStart(set.pad, "0");
    urls.push(`${base}${set.prefix}${padded}.${set.ext}`);
  }
  return urls;
}
