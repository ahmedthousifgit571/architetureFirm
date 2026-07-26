"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_CITY, BRAND_COORDS } from "@/lib/constants";
import { useSequence } from "./SequenceProvider";

interface Props {
  cinematicRef: RefObject<HTMLElement | null>;
}

export default function Hero({ cinematicRef }: Props) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { ready } = useSequence();
  const entered = useRef(false);

  // Scrub fade-out: hero is gone by 25% of the cinematic scroll.
  // Targets the wrapper — the entrance tween targets children, so they never fight.
  useEffect(() => {
    if (!heroRef.current || !cinematicRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 0,
        y: -40,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: cinematicRef.current,
          start: "top top",
          end: "25% top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [cinematicRef]);

  // Entrance — gated behind the loader's `ready`
  useEffect(() => {
    if (!ready || entered.current || !heroRef.current) return;
    entered.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(heroRef.current.querySelectorAll("[data-hero]"), {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.2,
    });
  }, [ready]);

  return (
    <div
      ref={heroRef}
      className="absolute inset-0 flex flex-col justify-end px-6 pb-14 pt-24 md:px-12 md:pb-16"
    >
      <div className="max-w-5xl">
        <p data-hero className="sheet-label text-plaster/60">
          SHT 00 — SITE&ensp;·&ensp;{BRAND_COORDS}&ensp;·&ensp;{BRAND_CITY}
        </p>
        <h1
          data-hero
          className="mt-6 font-display font-semibold leading-[0.95] tracking-[-0.03em] text-plaster"
          style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}
        >
          {BRAND_NAME}
        </h1>
        <div data-hero className="mt-8 flex items-center gap-6">
          <div className="dim-line w-24 text-oxide md:w-40" aria-hidden />
          <p className="max-w-md font-body text-sm text-plaster/80 md:text-base">{BRAND_TAGLINE}</p>
        </div>
      </div>

      <div data-hero className="mt-14 flex items-end justify-end">
        <p className="sheet-label hidden text-plaster/40 sm:block">
          FOUNDATION —&gt; MASTERPIECE&ensp;·&ensp;360° SURVEY
        </p>
      </div>
    </div>
  );
}
