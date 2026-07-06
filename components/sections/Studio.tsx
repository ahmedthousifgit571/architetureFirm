"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import { BRAND_CITY } from "@/lib/constants";
import DimLine from "@/components/DimLine";

const HEADLINE = "A small studio that builds like a large one thinks.";

const STATS = [
  { value: 18, unit: "YRS", label: "01 — IN PRACTICE" },
  { value: 47, unit: "NO.", label: "02 — BUILT WORKS" },
  { value: 12, unit: "AWD", label: "03 — HONOURS & AWARDS" },
];

export default function Studio() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    // Reduced motion: server markup already shows final values — no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Headline — word-by-word rise out of overflow masks
      gsap.from("[data-word]", {
        yPercent: 130,
        duration: 1.05,
        ease: "power4.out",
        stagger: 0.045,
        scrollTrigger: { trigger: "[data-headline]", start: "top 85%" },
      });

      // Each stat: block fades up, dimension line draws, number counts
      section.querySelectorAll<HTMLElement>("[data-stat]").forEach((block) => {
        const numEl = block.querySelector<HTMLElement>("[data-count]");
        const line = block.querySelector<HTMLElement>(".dim-line");
        const label = block.querySelector<HTMLElement>(".dim-line + p");
        if (!numEl) return;

        const target = Number(numEl.dataset.count);
        const counter = { v: 0 };
        numEl.textContent = "0";

        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: "top 88%" },
        });
        tl.from(block, { opacity: 0, y: 28, duration: 0.7, ease: "power2.out" }, 0)
          .to(
            counter,
            {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = String(Math.round(counter.v));
              },
            },
            0.1,
          );
        if (line) {
          tl.from(
            line,
            { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.inOut" },
            0.15,
          );
        }
        if (label) {
          tl.from(label, { opacity: 0, y: 8, duration: 0.6, ease: "power2.out" }, 0.55);
        }
      });

      // Desktop: stats column drifts slower than the copy — subtle depth
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          "[data-stats-col]",
          { y: 56 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
      // ctx.revert() restores transforms but not textContent
      section.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        el.textContent = el.dataset.count ?? el.textContent;
      });
    };
  }, []);

  return (
    <section
      ref={ref}
      id="studio"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 04 — STUDIO</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">A-401 · {BRAND_CITY}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2
              data-headline
              className="font-display font-medium leading-[1.12] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 3.25rem)" }}
            >
              {HEADLINE.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="mb-[-0.12em] mr-[0.28em] inline-block overflow-hidden pb-[0.12em] align-top last:mr-0"
                >
                  <span data-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <p data-reveal className="mt-8 max-w-xl font-body text-base leading-relaxed text-concrete">
              Founded on a construction site, not in a seminar room. Architects, engineers and
              makers under one roof — we carry each project from the first soil report to the
              final door handle, and we stay accountable for every millimetre in between.
            </p>
            <p data-reveal className="mt-5 max-w-xl font-body text-base leading-relaxed text-concrete">
              We take on few commissions and finish all of them. The work is residential at heart:
              houses, villas and quiet civic rooms that hold their ground for a century.
            </p>
          </div>

          <div
            data-stats-col
            className="md:col-span-4 md:col-start-9 md:border-l md:border-graphite/10 md:pl-10"
          >
            <dl className="flex flex-col gap-14">
              {STATS.map((s) => (
                <div key={s.label} data-stat>
                  <dd className="flex items-baseline gap-3 font-grotesk text-7xl tabular-nums tracking-tight md:text-[5.25rem] md:leading-none">
                    <span data-count={s.value}>{s.value}</span>
                    <span className="text-sm tracking-[0.25em] text-oxide">{s.unit}</span>
                  </dd>
                  <DimLine className="mt-5 text-graphite/30" label={s.label} />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
