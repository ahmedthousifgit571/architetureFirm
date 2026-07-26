"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { getLenis } from "@/hooks/useLenis";
import { BRAND_NAME } from "@/lib/constants";

const QUICK_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#" },
  { label: "Our Services", href: "#" },
  { label: "Our Projects", href: "#" },
  { label: "Our Clients", href: "#" },
  { label: "Contact Us", href: "#" },
];

const OUR_PROJECTS = [
  { label: "Residential Projects", href: "#" },
  { label: "Commercial Projects", href: "#" },
  { label: "Apartment Projects", href: "#" },
  { label: "Roads & Culverts", href: "#" },
  { label: "Government Projects", href: "#" },
  { label: "Interior Projects", href: "#" },
  { label: "Religious Projects", href: "#" },
];

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-reveal>
      <p className="sheet-label text-plaster/40 uppercase">{label}</p>
      <div className="mt-5 flex flex-col items-start gap-2.5">{children}</div>
    </div>
  );
}

const itemClass = "font-grotesk text-[11px] tracking-[0.2em] text-plaster/75 transition-colors duration-200 flex items-center gap-2";

const SocialIcon = ({ children }: { children: ReactNode }) => (
  <a href="#" className="flex h-8 w-8 items-center justify-center bg-[#e84c17] text-white hover:opacity-80 transition-opacity">
    {children}
  </a>
);

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  const scrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") return;
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
        <div className="flex flex-col gap-14 xl:flex-row xl:justify-between">
          <div data-reveal className="max-w-xs shrink-0 xl:w-72">
            <p className="font-display text-xl font-semibold leading-snug tracking-[-0.01em]">
              {BRAND_NAME}
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-plaster/50">
              Srri Positive Builders has been providing its consultancy and civil engineering services more than 25 years, building up its expertise its radiation of services in south tamilnadu..
            </p>

            <div className="flex gap-2 mt-6">
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.902 4.902 0 0 1 1.153-1.772A4.887 4.887 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="grid grow gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:max-w-4xl">
            <Group label="QUICK LINKS">
              {QUICK_LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={(e) => scrollTo(e, l.href)} className={`${itemClass} hover:text-plaster`}>
                  <span className="text-[#e84c17] text-[10px]">▶</span> <span className="uppercase">{l.label}</span>
                </a>
              ))}
            </Group>

            <Group label="OUR PROJECTS">
              {OUR_PROJECTS.map((l) => (
                <a key={l.label} href={l.href} className={`${itemClass} hover:text-plaster`}>
                  <span className="text-[#e84c17] text-[10px]">▶</span> <span className="uppercase">{l.label}</span>
                </a>
              ))}
            </Group>

            <Group label="CONTACTS">
              <div className="flex gap-4 items-start">
                <div className="flex shrink-0 h-6 w-6 items-center justify-center bg-[#e84c17] text-white font-bold text-[10px]">
                  A
                </div>
                <p className={`${itemClass} !items-start uppercase`}>
                  <span>
                    #633, First Floor, 9th North<br />
                    Cross Street, Anna Nagar,<br />
                    Madurai - 625020.
                  </span>
                </p>
              </div>
              
              <div className="flex gap-4 items-center">
                <div className="flex shrink-0 h-6 w-6 items-center justify-center bg-[#e84c17] text-white font-bold text-[10px]">
                  P
                </div>
                <p className={`${itemClass} uppercase`}>
                  (+91) 98431-51533
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex shrink-0 h-6 w-6 items-center justify-center bg-[#e84c17] text-white font-bold text-[10px]">
                  E
                </div>
                <p className={`${itemClass} break-all uppercase`}>
                  info@srripositivebuilders.com
                </p>
              </div>
            </Group>
          </div>
        </div>

        <div data-reveal className="mt-20 flex flex-col gap-3 border-t border-plaster/15 pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-plaster/40 uppercase">
            Copyright @2026. Powered By <span className="text-[#e84c17]">SCMAI Digital</span>
          </p>
        </div>
      </div>

      <div aria-hidden className="select-none overflow-hidden">
        <p className="mb-[-0.28em] cursor-default whitespace-nowrap text-center font-display text-[15vw] font-semibold leading-[0.9] tracking-[-0.03em] text-plaster transition-colors duration-300 hover:text-oxide">
          SRRI
        </p>
      </div>
    </footer>
  );
}

