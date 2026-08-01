"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { getLenis } from "@/hooks/useLenis";
import DimLine from "@/components/DimLine";

const RENOWNED = [
  "Reliability in quality services",
  "Supported by experienced professionals",
  "State of the art facilities",
  "Competitive pricing",
];

// oxide-outlined CTA — visible at rest (oxide border + oxide ink), fills oxide on hover
const CTA_CLASS =
  "group inline-flex items-center gap-3 border border-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-oxide transition-colors duration-300 hover:bg-oxide hover:text-plaster focus-visible:bg-oxide focus-visible:text-plaster";

// Small oxide hairline used as a list marker
function Tick() {
  return <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-oxide" />;
}

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  // Smooth in-page scroll via Lenis, matching the navbar.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -64 });
    else el.scrollIntoView();
  };

  return (
    <section
      ref={ref}
      id="about"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Intro — proprietor portrait + lead copy */}
        <div className="mt-0 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-12">
          <div data-reveal className="md:col-span-5">
            <div className="relative aspect-[11/10] overflow-hidden bg-limewash">
              <Image
                src="/images/ceo.png"
                alt="Er. P.T. Subramanian, Proprietor of Srri Positive Builders"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-medium tracking-[-0.01em]">
                Er. P.T. Subramanian
              </h3>
              <p className="font-grotesk text-[10px] tracking-[0.25em] text-oxide">
                PROPRIETOR
              </p>
            </div>
            <DimLine
              className="mt-3 text-graphite/30"
              label="30 YEARS · CIVIL CONSTRUCTION · MADURAI"
            />
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h2
              data-reveal
              className="font-display font-semibold leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            >
              Building trust, from foundation to finish.
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-xl font-body text-base leading-relaxed text-concrete md:text-lg"
            >
              Srri Positive Builders is a general contracting firm offering construction services
              including site analysis, feasibility studies, preliminary design studies and more.
            </p>
            <p
              data-reveal
              className="mt-5 max-w-xl font-body text-base leading-relaxed text-concrete md:text-lg"
            >
              We are the leaders in providing construction services to our customers by creating a
              successful partnership with them throughout the construction process. Our pledge is to
              establish a lasting relationship with our customers by exceeding their expectations and
              gaining their trust through exceptional performance by every member of our construction
              team.
            </p>

            <p data-reveal className="mt-10 sheet-label text-oxide">
              WE ARE RENOWNED FOR
            </p>
            <ul
              data-reveal
              className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
            >
              {RENOWNED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-base leading-relaxed text-concrete"
                >
                  <Tick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10">
              <a href="#projects" onClick={(e) => goTo(e, "#projects")} className={CTA_CLASS}>
                EXPLORE PROJECTS
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
