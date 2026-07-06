"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND_NAME } from "@/lib/constants";
import { useSequence } from "./SequenceProvider";

export default function Loader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { progress, ready } = useSequence();
  const exited = useRef(false);

  useEffect(() => {
    if (ready && !exited.current && ref.current) {
      exited.current = true;
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          if (ref.current) ref.current.style.display = "none";
        },
      });
    }
  }, [ready]);

  const pct = Math.min(Math.round(progress * 100), 100);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-graphite"
      aria-hidden={ready}
    >
      <p className="sheet-label text-concrete">SHT 00 — {BRAND_NAME}</p>

      <div className="mt-10 w-64 md:w-80">
        {/* Thin progress rule — no spinner */}
        <div className="h-px w-full bg-plaster/10">
          <div
            className="h-full bg-oxide"
            style={{ width: `${pct}%`, transition: "width 0.2s linear" }}
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between font-grotesk text-[11px] tracking-[0.2em] text-concrete">
          <span>LOADING FRAMES</span>
          <span className="tabular-nums text-plaster">{String(pct).padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
}
