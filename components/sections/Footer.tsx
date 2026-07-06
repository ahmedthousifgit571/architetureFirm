"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { getLenis } from "@/hooks/useLenis";
import { BRAND_NAME, BRAND_TAGLINE, BRAND_EMAIL, BRAND_CITY, BRAND_COORDS } from "@/lib/constants";

const NAV = [
  { label: "INDEX", href: "#top" },
  { label: "PROJECTS", href: "#projects" },
  { label: "PROCESS", href: "#process" },
  { label: "STUDIO", href: "#studio" },
  { label: "CONTACT", href: "#contact" },
];

const MEDIA = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "BEHANCE", href: "https://behance.net" },
  { label: "PINTEREST", href: "https://pinterest.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
];

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-reveal>
      <p className="sheet-label text-plaster/40">{label}</p>
      <div className="mt-5 flex flex-col items-start gap-2.5">{children}</div>
    </div>
  );
}

const itemClass =
  "font-grotesk text-[11px] tracking-[0.2em] text-plaster/75 transition-colors duration-200";

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href === "#top" ? 0 : href, { offset: href === "#top" ? 0 : -64 });
    } else {
      if (href === "#top") window.scrollTo(0, 0);
      else document.querySelector(href)?.scrollIntoView();
    }
  };

  return (
    <footer ref={ref} data-nav-dark className="bg-graphite pt-20 text-plaster md:pt-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Info columns — brand left, grouped details right */}
        <div className="flex flex-col gap-14 xl:flex-row xl:justify-between">
          <div data-reveal className="max-w-xs shrink-0 xl:w-72">
            <p className="font-display text-xl font-semibold leading-snug tracking-[-0.01em]">
              {BRAND_NAME}
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-plaster/50">
              {BRAND_TAGLINE}
            </p>
          </div>

          <div className="grid grow gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:max-w-4xl">
            <Group label="NAVIGATION">
              {NAV.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scrollTo(e, l.href)}
                  className={`${itemClass} hover:text-plaster`}
                >
                  {l.label}
                </a>
              ))}
            </Group>

            <Group label="MEDIA">
              {MEDIA.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${itemClass} hover:text-plaster`}
                >
                  {l.label} <span className="text-plaster/40">↗</span>
                </a>
              ))}
              <a href={`mailto:${BRAND_EMAIL}`} className={`${itemClass} hover:text-oxide`}>
                EMAIL
              </a>
            </Group>

            <Group label="ADDRESS">
              <span className={itemClass}>{BRAND_CITY}</span>
              <span className={itemClass}>SWITZERLAND</span>
              <span className={`${itemClass} text-plaster/45`}>{BRAND_COORDS}</span>
            </Group>

            <Group label="HOURS">
              <span className={itemClass}>MON – FRI</span>
              <span className={`${itemClass} text-plaster/45`}>08:00 – 18:00 CET</span>
              <span className={`${itemClass} mt-3`}>SAT – SUN</span>
              <span className={`${itemClass} text-plaster/45`}>BY APPOINTMENT</span>
            </Group>
          </div>
        </div>

        {/* Legal row */}
        <div
          data-reveal
          className="mt-20 flex flex-col gap-3 border-t border-plaster/15 pt-6 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-plaster/40">
            © 2026 {BRAND_NAME} · ALL RIGHTS RESERVED
          </p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-plaster/40">
            DRAWN IN {BRAND_CITY} · {BRAND_COORDS}
          </p>
        </div>
      </div>

      {/* Monumental wordmark — cropped by the footer's bottom edge */}
      <div aria-hidden className="select-none overflow-hidden">
        <p className="mb-[-0.28em] cursor-default whitespace-nowrap text-center font-display text-[31vw] font-semibold leading-[0.9] tracking-[-0.03em] text-plaster transition-colors duration-300 hover:text-oxide">
          FORM
        </p>
      </div>
    </footer>
  );
}
