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

/* Three registers, alternating travel direction. Cells are 1/6 of the sheet
   width, so six logos read at a time on desktop. */
const ROWS: { logos: string[]; direction: "left" | "right"; duration: string }[] = [
  { logos: CLIENTS.slice(0, 6), direction: "left", duration: "28s" },
  { logos: CLIENTS.slice(6, 11), direction: "right", duration: "32s" },
  { logos: CLIENTS.slice(11, 16), direction: "left", duration: "30s" },
];

/* Must stay in sync with the -33.3333% end state of @keyframes marquee-x. */
const COPIES = 3;

function ClientCell({ file }: { file: string; }) {
  return (
    <div className="flex h-[110px] w-[clamp(9rem,16.6667vw,14.5833rem)] shrink-0 items-center justify-center border-r border-graphite/10 px-6 md:h-[150px] md:px-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/clients/${file}`}
        alt="client logo"
        loading="lazy"
        className="max-h-12 w-auto max-w-full object-contain md:max-h-14"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  duration,
}: {
  logos: string[];
  direction: "left" | "right";
  duration: string;
}) {
  return (
    <div data-reveal className="marquee border-t border-graphite/10">
      <div
        className="marquee-track"
        data-direction={direction}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {Array.from({ length: COPIES }).map((_, copy) => (
          <div
            key={copy}
            className="flex"
            aria-hidden={copy > 0 ? true : undefined}
          >
            {logos.map((file) => (
              <ClientCell key={file} file={file} />
            ))}
          </div>
        ))}
      </div>
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
        <h2
          data-reveal
          className="max-w-3xl font-display font-medium leading-[1.05] tracking-[-0.03em]"
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

        {/* Client register — hairline rows travelling in alternating directions */}
        <div className="mt-16 border-b border-graphite/10">
          {ROWS.map((row) => (
            <MarqueeRow key={row.logos[0]} {...row} />
          ))}
        </div>
      </div>
    </section>
  );
}
