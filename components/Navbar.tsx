"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { BRAND_NAME } from "@/lib/constants";
import { getLenis } from "@/hooks/useLenis";

const LINKS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "PROCESS", href: "#process" },
  { label: "STUDIO", href: "#studio" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  // true while the navbar sits over a dark zone ([data-nav-dark]: cinematic
  // zones, footer) — light wordmark, transparent bar. Over plaster content
  // it flips to a solid plaster bar with graphite ink.
  const [dark, setDark] = useState(true);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      let isDark = false;
      document.querySelectorAll("[data-nav-dark]").forEach((zone) => {
        const r = zone.getBoundingClientRect();
        if (r.top <= 64 && r.bottom >= 64) isDark = true;
      });
      setDark(isDark);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href === "#top" ? 0 : href, { offset: href === "#top" ? 0 : -64 });
    } else {
      // reduced-motion fallback: native jump
      if (href === "#top") window.scrollTo(0, 0);
      else document.querySelector(href)?.scrollIntoView();
    }
  };

  const ink = dark ? "text-plaster" : "text-graphite";
  const inkDim = dark ? "text-plaster/70 hover:text-plaster" : "text-graphite/60 hover:text-oxide";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        dark ? "border-b border-transparent bg-transparent" : "border-b border-graphite/10 bg-plaster/95"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-6 md:px-12" aria-label="Main">
        <a
          href="#top"
          onClick={(e) => scrollTo(e, "#top")}
          className={`font-display text-sm font-semibold tracking-[-0.01em] ${ink}`}
        >
          {BRAND_NAME}
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className={`sheet-label transition-colors duration-200 ${inkDim}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile: contact only */}
        <a
          href="#contact"
          onClick={(e) => scrollTo(e, "#contact")}
          className={`sheet-label md:hidden ${inkDim}`}
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
