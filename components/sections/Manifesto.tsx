"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import DimLine from "@/components/DimLine";

const STATEMENT = "From poured foundation to finished form  precision is the material.";

const SCOPE = [
  { no: "01", name: "RESIDENTIAL PROJECTS", href: "/projects/residential" },
  { no: "02", name: "COMMERCIAL PROJECTS", href: "/projects/commercial" },
  { no: "03", name: "APARTMENT PROJECTS", href: "/projects/apartment" },
  { no: "04", name: "ROADS & CULVERTS", href: "/projects/roads-culverts" },
  { no: "05", name: "GOVERNMENT PROJECTS", href: "/projects/government" },
  { no: "06", name: "INTERIOR PROJECTS", href: "/projects/interior" },
  { no: "07", name: "RELIGIOUS PROJECTS", href: "/projects/religious" },
];

export default function Manifesto() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    // Reduced motion: statement renders fully inked, rows visible — no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Statement — words ink in one by one, scrubbed to scroll position
      gsap.fromTo(
        "[data-w]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: "[data-statement]",
            start: "top 75%",
            end: "top 25%",
            scrub: true,
          },
        },
      );

      // Dimension line draws itself as it enters, scrubbed
      gsap.fromTo(
        ".dim-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".dim-line", start: "top 92%", end: "top 55%", scrub: true },
        },
      );

      // Scope table — rows rise in sequence
      gsap.from("[data-row]", {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-table]", start: "top 82%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="philosophy" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <h2
          data-statement
          className="font-display font-medium leading-[1.05] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.5rem, 6.5vw, 6.5rem)" }}
        >
          {STATEMENT.split(" ").map((word, i) => (
            <span key={i} data-w>
              {word}{" "}
            </span>
          ))}
        </h2>

        <div data-reveal className="mt-12 text-oxide">
          <DimLine label="24 000 MM — OVERALL" />
        </div>

        <p data-reveal className="mt-14 max-w-xl font-body text-base leading-relaxed text-concrete">
          We practice architecture as construction, not decoration. Every project begins in the
          ground  soil, datum, load  and rises through a discipline of grids, junctions and
          honest material. What remains is quiet, exact, and built to outlast its authors.
        </p>

        {/* Scope table — drafting-register rows */}
        <div data-table className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <p data-reveal className="sheet-label text-concrete md:col-span-3">
            SCOPE OF WORK
          </p>
          <div className="md:col-span-9">
            {SCOPE.map((row) => (
              <Link
                key={row.no}
                href={row.href}
                data-row
                className="group flex items-center justify-between border-b border-graphite/10 py-5 transition-colors duration-300 first:border-t hover:bg-oxide px-4 -mx-4 block"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-grotesk w-8 text-[10px] tracking-[0.25em] text-oxide shrink-0 transition-colors duration-300 group-hover:text-white">
                    {row.no}
                  </span>
                  <span className="font-display text-lg uppercase font-medium tracking-[-0.01em] transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-white md:text-xl">
                    {row.name}
                  </span>
                </div>
                <span className="font-grotesk text-[10px] tracking-[0.2em] text-concrete transition-colors duration-300 group-hover:text-white">
                  VIEW DETAILS ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
