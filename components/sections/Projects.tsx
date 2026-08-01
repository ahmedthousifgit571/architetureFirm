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
    image: "/images/two_blocks_g10_apartments.png",
    span: "md:col-span-7",
    height: "h-72 md:h-[480px]",
  },
  {
    index: "02",
    name: "VLUX 3 STAR HOTEL",
    spec: "BASEL · 2024 · 380 M²",
    material: "BOARD-FORMED CONCRETE",
    image: "/images/vlux_3_star_hotel.png",
    span: "md:col-span-5 md:mt-12",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "03",
    name: "DUSA SPORTS ACADEMY",
    spec: "TICINO · 2023 · 520 M²",
    material: "RAMMED EARTH",
    image: "/images/dusa.png",
    span: "md:col-span-5",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "04",
    name: "PEACOCK GARDEN",
    spec: "ERODE · 2025 · 3,500 SQ FT",
    material: "TIMBER & STONE",
    image: "/images/residential/peacock1.jpg",
    span: "md:col-span-7 md:-mt-12",
    height: "h-72 md:h-[480px]",
  },
  {
    index: "05",
    name: "AMMAN STEELS",
    spec: "MADURAI · 2024 · 4,100 SQ FT",
    material: "TIMBER & STONE",
    image: "/images/residential/res3.png",
    span: "md:col-span-7",
    height: "h-72 md:h-[480px]",
  },
  {
    index: "06",
    name: "SANRAKS MAHAL",
    spec: "SIVAGANGAI · 2024 · 32,000 SQ FT",
    material: "GLASS & STEEL",
    image: "/images/commercial/commercial-2.png",
    span: "md:col-span-5 md:mt-12",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "07",
    name: "THIRUPARANKUNDRAM ROUND ABOUT",
    spec: "MADURAI · 2022 · 30,000 SQ FT",
    material: "EXPOSED BRICK",
    image: "/images/govt/govt5.png",
    span: "md:col-span-5",
    height: "h-72 md:h-[360px]",
  },
  {
    index: "08",
    name: "MASJID RENOVATION",
    spec: "ERODE · 2024 · 8,500 SQ FT",
    material: "SANDSTONE",
    image: "/images/religious/rel1.png",
    span: "md:col-span-7 md:-mt-12",
    height: "h-72 md:h-[480px]",
  },
];

// oxide-filled CTA — highlighted by default, outlines on hover
const CTA_CLASS =
  "group inline-flex items-center gap-3 border border-oxide bg-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-plaster transition-colors duration-300 hover:bg-transparent hover:text-oxide focus-visible:bg-transparent focus-visible:text-oxide";

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
        <div className="mt-0 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
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
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                  <span className="mr-3 font-grotesk text-xs text-oxide">{p.index}</span>
                  {p.name}
                </h3>
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
