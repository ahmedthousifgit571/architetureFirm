"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

/**
 * Client register.
 * Drop each logo (transparent PNG preferred) into `public/images/clients/`
 * using the `file` name below. Until a logo file exists, the cell gracefully
 * falls back to the client's name in type — so the section is never broken.
 */
const CLIENTS = [
  { name: "Notch India Projects", file: "notch-india-projects.png" },
  { name: "Raja Steel", file: "raja-steel.png" },
  { name: "Southern Properties & Developers", file: "southern-properties.png" },
  { name: "ZamZam Sweets", file: "zamzam-sweets.png" },
  { name: "Vishaal Promoters", file: "vishaal-promoters.png" },
  { name: "Sun Infraa", file: "sun-infraa.png" },
  { name: "Hi-Tech Arai Pvt Ltd", file: "hi-tech-arai.png" },
  { name: "Saathveeka Apartments", file: "saathveeka-apartments.png" },
  { name: "Hyatt Clothing Co", file: "hyatt-clothing.png" },
  { name: "AK Ahmed & Co", file: "ak-ahmed.png" },
  { name: "VGP Housing", file: "vgp-housing.png" },
  { name: "Sahayarani Multispeciality Hospital", file: "sahayarani-hospital.png" },
  { name: "Pranav Cards", file: "pranav-cards.png" },
  { name: "MP Steels Corporation", file: "mp-steels.png" },
  { name: "JS Housing", file: "js-housing.png" },
  { name: "SR Sanraks", file: "sr-sanraks.png" },
];

function ClientCell({ name, file }: { name: string; file: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      data-reveal
      title={name}
      className="group flex min-h-[120px] items-center justify-center border-b border-r border-graphite/10 px-6 py-10 md:min-h-[150px] md:py-14"
    >
      {failed ? (
        <span className="text-center font-display text-sm font-medium uppercase leading-tight tracking-[0.02em] text-concrete transition-colors duration-300 group-hover:text-graphite md:text-base">
          {name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/images/clients/${file}`}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-12 w-auto max-w-[75%] object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-14"
        />
      )}
    </div>
  );
}

export default function Clients() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="clients"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 03 — CLIENTS</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">
            A-301 · REGISTER
          </p>
        </div>

        <h2
          data-reveal
          className="mt-16 max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
        >
          Trusted by{" "}
          <span className="box-decoration-clone bg-oxide px-2 py-0.5 text-plaster">
            builders
          </span>
          , developers and institutions.
        </h2>

        <p
          data-reveal
          className="mt-6 max-w-xl font-body text-base leading-relaxed text-concrete"
        >
          A partial register of the clients we have built for — across residential,
          commercial, industrial and institutional work.
        </p>

        <div data-reveal className="mt-12 text-graphite/30">
          <div className="dim-line" />
        </div>

        {/* Client register — hairline grid, logos in mono, colour on hover */}
        <div className="mt-16 grid grid-cols-2 border-l border-t border-graphite/10 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <ClientCell key={c.file} name={c.name} file={c.file} />
          ))}
        </div>
      </div>
    </section>
  );
}
