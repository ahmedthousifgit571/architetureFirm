"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const CLIENTS = [
  "client1.png",
  "client2.png",
  "client3.png",
  "client4.png",
  "client5.png",
  "client6.png",
  "client7.png",
  "client8.png",
  "client9.png",
  "client10.png",
  "client11.png",
  "client12.png",
  "client13.png",
  "client14.png",
  "client15.png",
  "client16.png",
];

function ClientCell({ file }: { file: string }) {
  return (
    <div
      data-reveal
      className="group flex min-h-[120px] items-center justify-center border-b border-r border-graphite/10 px-6 py-10 md:min-h-[150px] md:py-14"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/clients/${file}`}
        alt={`client logo`}
        loading="lazy"
        className="max-h-12 w-auto max-w-[75%] object-contain transition-all duration-500 md:max-h-14"
      />
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
          {CLIENTS.map((file) => (
            <ClientCell key={file} file={file} />
          ))}
        </div>
      </div>
    </section>
  );
}

