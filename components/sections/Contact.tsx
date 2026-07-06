"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import { BRAND_EMAIL, BRAND_CITY, BRAND_COORDS } from "@/lib/constants";

export default function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 05 — CONTACT</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">A-501</p>
        </div>

        <p data-reveal className="mt-16 font-body text-base text-concrete">
          Start with the ground. Write to us —
        </p>

        <a
          data-reveal
          href={`mailto:${BRAND_EMAIL}`}
          className="mt-6 inline-block break-all font-display font-medium tracking-[-0.03em] text-graphite transition-colors duration-300 hover:text-oxide focus-visible:text-oxide"
          style={{ fontSize: "clamp(1.5rem, 5.5vw, 4.75rem)" }}
        >
          {BRAND_EMAIL}
        </a>

        <div
          data-reveal
          className="mt-16 flex flex-col gap-2 font-grotesk text-[11px] tracking-[0.25em] text-concrete sm:flex-row sm:gap-10"
        >
          <span>{BRAND_CITY}</span>
          <span>{BRAND_COORDS}</span>
          <span>MON–FRI · 08:00–18:00 CET</span>
        </div>
      </div>
    </section>
  );
}
