// Single source of truth for brand + cinematic configuration.
// Pure module — safe to import from server and client code.

export const BRAND_NAME = "SRRI POSITIVE BUILDERS";
export const BRAND_TAGLINE = "We take you from foundation to masterpiece.";
export const BRAND_EMAIL = "info@srripositivebuilders.com";

// WhatsApp: wa.me needs the country code with no "+" (India = 91). The prefilled
// message avoids double dashes so it reads cleanly in the WhatsApp composer.
export const BRAND_PHONE = "+91 98431 51533";
export const BRAND_WHATSAPP = "919843151533";
export const BRAND_WHATSAPP_MESSAGE =
  "Hello SRRI Positive Builders, I'm interested in starting a construction project and would like to know more about your services.";
export const BRAND_CITY = "ZÜRICH";
export const BRAND_COORDS = "47.3769° N / 8.5417° E";

export const ZOOM_FACTOR = 1.15; // hides edge artifacts; provides parallax headroom
// Foundation hero: a looping background video (no scroll scrub), so it only
// needs a short pin — one viewport for the video + ~half a viewport for the
// hero to fade out, then it releases into content. (Was 600vh for the old
// frame scrub, which left ~5 screens of dead scroll once the video replaced it.)
export const CINEMATIC_VH = 150; // height of the foundation hero section in vh
export const INTERIOR_VH = 150; // height of the interior video section in vh (was a 500vh scrub)

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
