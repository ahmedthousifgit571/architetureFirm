"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

interface Project {
  index: string;
  name: string;
  spec: string;
  material: string;
  image: string;
  span: string;
  height: string;
}

const PROJECTS: Project[] = [
  {
    index: "01",
    name: "BVK BRINDAVAN",
    spec: "LAKE ZÜRICH · 2025 · 640 M²",
    material: "LIMEWASH PLASTER",
    image: "/images/TWO BLOCKS. OF G+10 APARTMENTS.png",
    span: "md:col-span-7",
    height: "h-72 md:h-[480px]",
  },
  {
    index: "02",
    name: "VLUX 3 STAR HOTEL",
    spec: "BASEL · 2024 · 380 M²",
    material: "BOARD-FORMED CONCRETE",
    image: "/images/VLUX – 3 STAR HOTEL.png",
    span: "md:col-span-5 md:mt-12",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "03",
    name: "GOVT HALL",
    spec: "TICINO · 2023 · 520 M²",
    material: "RAMMED EARTH",
    image: "/images/govt1.png",
    span: "md:col-span-5",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "04",
    name: "INTERIOR FOLD",
    spec: "KYOTO · 2023 · 290 M²",
    material: "CHARRED TIMBER",
    image: "/images/interior.png",
    span: "md:col-span-7 md:-mt-12",
    height: "h-72 md:h-[480px]",
  },
];

// oxide-outlined CTA — visible at rest (oxide border + oxide ink), fills oxide on hover
const CTA_CLASS =
  "group inline-flex items-center gap-3 border border-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-oxide transition-colors duration-300 hover:bg-oxide hover:text-plaster focus-visible:bg-oxide focus-visible:text-plaster";

export default function Projects() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="projects"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 02 — SELECTED PROJECTS</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">A-201 · 4 WORKS</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          {PROJECTS.map((p) => (
            <article key={p.index} data-reveal className={`group ${p.span}`}>
              <div className={`relative overflow-hidden ${p.height}`}>
                <Image
                  src={p.image}
                  alt={`${p.name} — ${p.material.toLowerCase()}`}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Oxide index — surfaces on hover */}
                <span
                  className="absolute left-5 top-4 font-grotesk text-4xl tabular-nums text-oxide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2"
                  aria-hidden
                >
                  {p.index}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                  <span className="mr-3 font-grotesk text-xs text-oxide">{p.index}</span>
                  {p.name}
                </h3>
                <p className="font-grotesk text-[10px] tracking-[0.2em] text-concrete">{p.spec}</p>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-20 flex justify-center">
          <Link href="/projects" className={CTA_CLASS}>
            VIEW MORE
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
