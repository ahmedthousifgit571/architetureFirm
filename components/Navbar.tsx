"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND_NAME, BRAND_CITY, BRAND_COORDS } from "@/lib/constants";
import { getLenis } from "@/hooks/useLenis";

const LINKS = [
  { label: "ABOUT", href: "#about", route: null },
  { label: "PROJECTS", href: "#projects", route: "/projects" },
  { label: "SERVICES", href: "#philosophy", route: null },
  { label: "CLIENTS", href: "#clients", route: null },
  { label: "CONTACT", href: "#contact", route: null },
];

export default function Navbar() {
  // true while the navbar sits over a dark zone ([data-nav-dark]: cinematic
  // zones, footer) — light wordmark, transparent bar. Over plaster content
  // it flips to a solid plaster bar with graphite ink.
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  // Menu open: freeze the page (Lenis + native fallback), Esc to close,
  // auto-close if the viewport grows past the md breakpoint.
  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);

    return () => {
      getLenis()?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

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

  const onMenuLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // Unlock before scrolling — a stopped Lenis ignores scrollTo
    document.body.style.overflow = "";
    getLenis()?.start();
    setOpen(false);
    scrollTo(e, href);
  };

  const lightInk = dark || open;
  const ink = lightInk ? "text-plaster" : "text-graphite";
  const inkDim = lightInk
    ? "text-plaster/70 hover:text-oxide"
    : "text-graphite/60 hover:text-oxide";
  const barInk = lightInk ? "bg-plaster" : "bg-graphite";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        dark || open
          ? "border-b border-transparent bg-transparent"
          : "border-b border-graphite/10 bg-plaster/95"
      }`}
    >
      <nav className="flex h-16 items-center justify-between px-6 md:px-12" aria-label="Main">
          <Link
            href="/"
            className={`font-display text-sm font-semibold tracking-[-0.01em] ${ink}`}
          >
            {BRAND_NAME}
          </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            // On homepage: scroll to the section. Off homepage: navigate to route if available.
            if (isHome || !l.route) {
              return (
                <li key={l.href}>
                  <a
                    href={isHome ? l.href : `/${l.href}`}
                    onClick={(e) => {
                      if (isHome) scrollTo(e, l.href);
                      // Off-home, anchor links like #about won't exist — let
                      // them fall through as regular navigation to /<hash>
                    }}
                    className={`sheet-label transition-colors duration-200 ${inkDim}`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            }
            return (
              <li key={l.href}>
                <Link
                  href={l.route}
                  className={`sheet-label transition-colors duration-200 ${inkDim}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: menu toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            aria-hidden
            className={`absolute h-px w-6 transition-transform duration-300 ${barInk} ${
              open ? "rotate-45" : "-translate-y-1"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-px w-6 transition-transform duration-300 ${barInk} ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay — sheet-index style, under the bar so the X stays visible */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 -z-10 flex flex-col justify-between bg-graphite px-6 pb-10 pt-28 transition-[clip-path] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "[clip-path:inset(0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile">
          <p className="sheet-label mb-8 text-plaster/40">SHT IX — INDEX</p>
          <ul className="flex flex-col">
            {LINKS.map((l, i) => {
              const linkHref = (!isHome && l.route) ? l.route : l.href;
              const isRoute = !isHome && l.route;
              const inner = (
                <>
                  <span className="sheet-label text-oxide">0{i + 1}</span>
                  <span className="font-display text-4xl font-medium tracking-[-0.02em] text-plaster transition-colors duration-200 group-hover:text-plaster/70">
                    {l.label}
                  </span>
                </>
              );

              return (
                <li
                  key={l.href}
                  className={`border-b border-plaster/10 transition-all duration-500 ${
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                >
                  {isRoute ? (
                    <Link
                      href={linkHref}
                      onClick={() => {
                        document.body.style.overflow = "";
                        getLenis()?.start();
                        setOpen(false);
                      }}
                      tabIndex={open ? 0 : -1}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={linkHref}
                      onClick={(e) => onMenuLink(e, l.href)}
                      tabIndex={open ? 0 : -1}
                      className="group flex items-baseline gap-5 py-5"
                    >
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`transition-all delay-300 duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="dim-line mb-6 w-16 text-oxide" aria-hidden />
          <p className="sheet-label text-plaster/50">
            {BRAND_COORDS}&ensp;·&ensp;{BRAND_CITY}
          </p>
        </div>
      </div>
    </header>
  );
}
