import { ZOOM_FACTOR } from "./constants";

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

  const scale = Math.max(cw / iw, ch / ih) * ZOOM_FACTOR;
  const dw = iw * scale;
  const dh = ih * scale;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, (cw - dw) / 2 + parallaxX, (ch - dh) / 2 + parallaxY, dw, dh);
}
