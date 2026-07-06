"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawImageCover } from "@/lib/cover";

interface Options {
  frames: HTMLImageElement[];
  canvasRef: RefObject<HTMLCanvasElement | null>;
  scrollContainerRef: RefObject<HTMLElement | null>; // the cinematic <section>
}

const MAX_PARALLAX = 20;
const PARALLAX_LERP = 0.08;

export function useCanvasSequence({ frames, canvasRef, scrollContainerRef }: Options) {
  const rafRef = useRef<number>(0);
  const parallax = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!frames.length || !canvasRef.current || !scrollContainerRef.current) return;

    // Idempotent — guarantees registration regardless of effect ordering
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const seq = { frame: 0 }; // plain object — NEVER React state
    let last = -1;
    const p = parallax.current;

    const draw = (i: number) => {
      const img = frames[i];
      if (!img) return;
      drawImageCover(ctx, canvas, img, p.x, p.y);
    };

    const render = () => {
      const i = Math.round(seq.frame);
      if (i === last) return; // skip if index unchanged
      last = i;
      draw(i);
    };

    draw(0); // paint frame 0 immediately — never a blank canvas
    last = 0;

    const ctx2 = gsap.context(() => {
      gsap.to(seq, {
        frame: frames.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          // NO pin option — CSS sticky handles pinning
        },
        onUpdate: render,
      });
    });

    ScrollTrigger.refresh(); // recalculate scroll positions after mount

    // Mouse parallax — fine pointer (desktop) only, skipped under reduced motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onMouseMove = (e: MouseEvent) => {
      p.targetX = (e.clientX / window.innerWidth - 0.5) * 2 * MAX_PARALLAX;
      p.targetY = (e.clientY / window.innerHeight - 0.5) * 2 * MAX_PARALLAX;
    };
    const parallaxLoop = () => {
      const prevX = p.x,
        prevY = p.y;
      p.x += (p.targetX - p.x) * PARALLAX_LERP;
      p.y += (p.targetY - p.y) * PARALLAX_LERP;
      if (Math.abs(p.x - prevX) > 0.05 || Math.abs(p.y - prevY) > 0.05) {
        draw(Math.round(seq.frame));
      }
      rafRef.current = requestAnimationFrame(parallaxLoop);
    };

    if (isFinePointer && !reducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      rafRef.current = requestAnimationFrame(parallaxLoop);
    }

    // Resize: refit current frame to new viewport
    let resizeTimer: number;
    const onResize = () => {
      draw(Math.round(seq.frame));
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctx2.revert();
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [frames, canvasRef, scrollContainerRef]);
}
