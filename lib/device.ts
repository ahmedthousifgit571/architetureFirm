// Shared viewport detection. Client-only — guard callers so it never runs on
// the server. Kept in one place so the frame-loading skip (useImageSequence)
// and the mobile video swap (CinematicZone) always agree on what "mobile" is.

export function isMobileViewport(): boolean {
  return window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches;
}

export function isPortraitViewport(): boolean {
  return window.matchMedia("(orientation: portrait)").matches;
}
