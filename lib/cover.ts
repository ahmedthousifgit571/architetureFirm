import { ZOOM_FACTOR } from "./constants";

// Cover mode crops the frame to fill the canvas. On portrait phones a 16:9
// frame loses ~70% of its width that way, destroying the composition. Past
// this crop fraction we switch to "ambient letterbox": the full frame,
// centered over a blurred + dimmed cover fill of itself, so the screen stays
// cinematic without hiding the shot.
const MAX_COVER_CROP = 0.45;
const LETTERBOX_ZOOM = 1.25; // crops ~20% of the frame width in exchange for a larger image
const AMBIENT_SAMPLE_W = 64; // offscreen buffer width — smaller = blurrier fill, larger = sharper
const AMBIENT_DIM = "rgba(26, 26, 26, 0.35)"; // graphite, matches the zone scrims
const AMBIENT_BLEED = 24; // ≥ MAX_PARALLAX so parallax never reveals edges
const FRAME_CENTER_Y = 0.44; // frame sits slightly high — captions anchor to the bottom

let ambient: HTMLCanvasElement | null = null; // shared scratch buffer (draws are synchronous)

function drawAmbientFill(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  parallaxX: number,
  parallaxY: number,
): void {
  ambient ??= document.createElement("canvas");
  const aw = AMBIENT_SAMPLE_W;
  const ah = Math.max(1, Math.round((aw * ch) / cw));
  if (ambient.width !== aw || ambient.height !== ah) {
    ambient.width = aw;
    ambient.height = ah;
  }
  const actx = ambient.getContext("2d");
  if (!actx) return;

  const scale = Math.max(aw / img.naturalWidth, ah / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  actx.drawImage(img, (aw - dw) / 2, (ah - dh) / 2, dw, dh);

  ctx.save();
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    ambient,
    -AMBIENT_BLEED + parallaxX,
    -AMBIENT_BLEED + parallaxY,
    cw + AMBIENT_BLEED * 2,
    ch + AMBIENT_BLEED * 2,
  );
  ctx.restore();

  ctx.fillStyle = AMBIENT_DIM;
  ctx.fillRect(0, 0, cw, ch);
}

export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  parallaxX = 0,
  parallaxY = 0,
): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2 for perf
  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;

  // Only resize backing store when needed — expensive allocation
  if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
    canvas.width = cw * dpr;
    canvas.height = ch * dpr;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (iw === 0 || ih === 0) return;

  const coverScale = Math.max(cw / iw, ch / ih);
  const containScale = Math.min(cw / iw, ch / ih);
  const cropRatio = 1 - containScale / coverScale;

  ctx.clearRect(0, 0, cw, ch);

  if (cropRatio <= MAX_COVER_CROP) {
    const scale = coverScale * ZOOM_FACTOR;
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, (cw - dw) / 2 + parallaxX, (ch - dh) / 2 + parallaxY, dw, dh);
    return;
  }

  // Ambient letterbox — parallax moves the fill only; the frame stays locked
  drawAmbientFill(ctx, img, cw, ch, parallaxX, parallaxY);
  const scale = Math.min(containScale * LETTERBOX_ZOOM, coverScale);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (cw - dw) / 2, ch * FRAME_CENTER_Y - dh / 2, dw, dh);
}
