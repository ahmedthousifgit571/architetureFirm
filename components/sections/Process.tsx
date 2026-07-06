"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const STEPS = [
  {
    index: "01",
    title: "Site Study",
    body: "Survey, soil, sun path. We read the ground before we draw a line.",
    phase: "PHASE 01 · WKS 01–04",
  },
  {
    index: "02",
    title: "Concept",
    body: "Massing, light and material logic distilled into one clear idea.",
    phase: "PHASE 02 · WKS 05–10",
  },
  {
    index: "03",
    title: "Documentation",
    body: "Every junction resolved on paper before it exists in the world.",
    phase: "PHASE 03 · WKS 11–22",
  },
  {
    index: "04",
    title: "Build",
    body: "On site every week. The drawing set is a promise — we keep it.",
    phase: "PHASE 04 · WKS 23–60",
  },
];

export default function Process() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="process"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 03 — PROCESS</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">A-301 · SEQUENCE</p>
        </div>

        {/* One continuous dimension line ties the four phases into a true sequence */}
        <div data-reveal className="mt-16 text-graphite/30">
          <div className="dim-line" />
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.index} data-reveal>
              <p className="font-grotesk text-sm text-oxide">{s.index}</p>
              <h3 className="mt-3 font-display text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-concrete">{s.body}</p>
              <p className="mt-5 font-grotesk text-[10px] tracking-[0.25em] text-concrete/80">
                {s.phase}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
