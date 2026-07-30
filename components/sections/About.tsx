"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import { getLenis } from "@/hooks/useLenis";
import DimLine from "@/components/DimLine";

const RENOWNED = [
  "Reliability in quality services",
  "Supported by experienced professionals",
  "State of the art facilities",
  "Competitive pricing",
];

const QUALITY = [
  "Delivery of non problematic services as per the specifications of the clients",
  "Consistent quality improvement",
  "Innovative and cost effective services",
  "Timely execution of services",
];

const VALUES = [
  "To enhance the quality of constructions",
  "To serve with best value for money",
  "To serve with an environment of professionalism, team work and excellence",
  "To respect all environmental rules, regulations and legal requirements",
  "To enhance customer values",
];

const MISSION =
  "To perform for our customers the highest level of quality construction service at fair and market competitive prices by maintaining the highest levels of professionalism, integrity, honesty and fairness in our relationships with our suppliers, subcontractors, professional associates and customers.";

// Vertical carousel on the pinned right column — the firm's real projects.
// Exact filename casing matters (case-sensitive in production).
const SLIDES = [
  { src: "/images/sanskarmahal.png", name: "SANSKAR MAHAL" },
  { src: "/images/ongoingHome.png", name: "ONGOING HOME" },
  { src: "/images/yellowflat.png", name: "YELLOW FLAT" },
  { src: "/images/bustand.png", name: "BUS STAND" },
];
// Clone the first slide at the end so the vertical loop resets seamlessly.
const SLIDES_LOOP = [...SLIDES, SLIDES[0]];

// oxide-outlined CTA — visible at rest (oxide border + oxide ink), fills oxide on hover
const CTA_CLASS =
  "group inline-flex items-center gap-3 border border-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-oxide transition-colors duration-300 hover:bg-oxide hover:text-plaster focus-visible:bg-oxide focus-visible:text-plaster";

// Small oxide hairline used as a list marker — echoes the dimension-line motif
function Tick() {
  return <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-oxide" />;
}

// Reference-style card: title in a filled graphite square + big oxide index,
// with the copy in a separate bordered box stepped below.
function ShowcaseCard({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <article data-item>
      <div className="flex items-start gap-5 md:gap-8">
        <div className="flex aspect-square w-[62%] max-w-[320px] shrink-0 flex-col justify-end bg-oxide p-6 md:p-8">
          <h3 className="font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-plaster md:text-[2rem]">
            {title}
          </h3>
        </div>
        <span
          aria-hidden
          className="font-display text-[3.5rem] font-semibold leading-none text-oxide md:text-[6rem]"
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 border border-oxide/60 p-6 md:ml-[14%] md:p-8">{children}</div>
    </article>
  );
}

export default function About() {
  const ref = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLParagraphElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  useReveal(ref);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (reduce) return;

      // Left column — each card rises + inks in as it enters the viewport
      section.querySelectorAll<HTMLElement>("[data-item]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 48,
          filter: "blur(6px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Mission statement — words ink in one by one, scrubbed to scroll position
      if (missionRef.current) {
        gsap.fromTo(
          "[data-mw]",
          { opacity: 0.15 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.04,
            scrollTrigger: {
              trigger: missionRef.current,
              start: "top 82%",
              end: "top 35%",
              scrub: true,
            },
          },
        );
      }

      // Right column — slow vertical carousel through the project images
      const strip = stripRef.current;
      if (strip) {
        const total = SLIDES_LOOP.length; // includes the trailing clone
        const step = 100 / total;
        const tl = gsap.timeline({ repeat: -1 });
        for (let i = 1; i < total; i++) {
          tl.to(strip, { yPercent: -step * i, duration: 1.1, ease: "power2.inOut" }, "+=2.4");
        }
        tl.set(strip, { yPercent: 0 }); // seamless jump back (clone == slide 0)
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Smooth in-page scroll via Lenis, matching the navbar. If the target section
  // does not exist yet (e.g. Services is built later), do nothing.
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
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 04 — ABOUT</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">
            A-401 · MADURAI
          </p>
        </div>

        {/* Intro — proprietor portrait + lead copy */}
        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-12">
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

        {/*
          Pinned showcase — left column of reference-style cards scrolls (each
          reveals on entry), right column stays sticky and cycles the projects.
        */}
        <div className="mt-24 grid grid-cols-1 gap-x-16 gap-y-14 border-t border-graphite/10 pt-20 md:mt-32 md:grid-cols-12 md:pt-28">
          {/* LEFT — scrolling cards */}
          <div className="flex flex-col gap-16 md:col-span-7 md:gap-24">
            <ShowcaseCard index={1} title="Our Team">
              <p className="font-body text-base leading-relaxed text-concrete md:text-lg">
                Our team of professional engineers and experts have been gaining experience over many
                years in the field of civil engineering. The team is managed and guided by our expert
                mentor, P.T. Subramanian, who has achieved excellent exposure in civil engineering
                services by delivering complete client satisfaction.
              </p>
            </ShowcaseCard>

            <ShowcaseCard index={2} title="Quality Guidelines">
              <ul className="flex flex-col gap-4">
                {QUALITY.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-base leading-relaxed text-concrete md:text-lg"
                  >
                    <Tick />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ShowcaseCard>

            <ShowcaseCard index={3} title="Our Mission">
              <p
                ref={missionRef}
                className="font-display font-medium leading-[1.35] tracking-[-0.01em] text-graphite"
                style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.5rem)" }}
              >
                {MISSION.split(" ").map((word, i) => (
                  <span key={i} data-mw>
                    {word}{" "}
                  </span>
                ))}
              </p>
            </ShowcaseCard>

            <ShowcaseCard index={4} title="Our Values">
              <ul className="flex flex-col gap-4">
                {VALUES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-body text-base leading-relaxed text-concrete md:text-lg"
                  >
                    <Tick />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ShowcaseCard>

            <div data-item>
              <a href="#philosophy" onClick={(e) => goTo(e, "#philosophy")} className={CTA_CLASS}>
                EXPLORE SERVICES
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT — sticky vertical carousel */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="relative aspect-[4/3] overflow-hidden bg-limewash">
                <div
                  ref={stripRef}
                  className="absolute inset-x-0 top-0 flex flex-col will-change-transform"
                >
                  {SLIDES_LOOP.map((slide, i) => (
                    <div key={i} className="relative aspect-[4/3] w-full shrink-0">
                      <Image
                        src={slide.src}
                        alt={slide.name.toLowerCase()}
                        fill
                        sizes="(min-width: 768px) 42vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">
                  SELECTED WORKS
                </p>
                <p className="font-grotesk text-[10px] tracking-[0.25em] text-oxide">A-402</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
