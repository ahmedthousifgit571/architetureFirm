"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import DimLine from "@/components/DimLine";

const REASONS = [
  {
    title: "Leader in Construction Services",
    description: "Creating successful, long-term partnerships with our clients by collaborating closely at every phase of the construction process."
  },
  {
    title: "Trust Through Performance",
    description: "Our pledge is to establish lasting relationships by exceeding expectations and maintaining absolute transparency and integrity."
  },
  {
    title: "Rigorous Resource Planning",
    description: "Developing detailed schedules and optimal resource allocation plans to align precisely with client objectives."
  },
  {
    title: "Transparent Communication",
    description: "Establishing clear, open, and robust internal and external communication channels to keep all stakeholders aligned."
  },
  {
    title: "Performance & Deviation Tracking",
    description: "Continuously monitoring execution metrics to proactively adjust workflows and resolve deviations before they impact timelines."
  },
  {
    title: "Meticulous Quality Supervision",
    description: "Supervising craftsmanship and structural parameters closely at every milestone to ensure defect-free handover."
  },
  {
    title: "On-Time Commissioning",
    description: "Completing projects systematically and handing them over on schedule, without compromising on building standards."
  }
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement | null>(null);
  useReveal(ref);

  return (
    <section
      ref={ref}
      id="why-choose-us"
      className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div data-reveal className="flex items-baseline justify-between">
          <p className="sheet-label text-oxide">SHT 05 — PERFORMANCE ADVANTAGE</p>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">A-501 · WHY CHOOSE US</p>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-12">
          {/* Left Column - List of points */}
          <div className="md:col-span-7">
            <h2
              data-reveal
              className="font-display font-semibold leading-[1.08] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}
            >
              Why to choose us
            </h2>
            <p
              data-reveal
              className="font-body text-base leading-relaxed text-concrete mb-10 max-w-xl"
            >
              We are recognized as one of the premier construction and engineering firms in Madurai, built on a foundation of reliability, transparency, and execution excellence.
            </p>

            <div data-reveal className="flex flex-col border-t border-graphite/10">
              {REASONS.map((reason, index) => (
                <div
                  key={index}
                  className="flex gap-6 border-b border-graphite/10 py-6 last:border-0"
                >
                  <span className="font-grotesk text-[11px] tracking-[0.2em] text-oxide shrink-0 mt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-lg tracking-tight text-graphite">
                      {reason.title}
                    </h3>
                    <p className="font-body text-sm text-concrete mt-1.5 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Award & Tamil Caption */}
          <div className="md:col-span-5 md:col-start-8">
            <div className="md:sticky md:top-24 mt-8 md:mt-0">
              <div data-reveal className="relative aspect-[4/3] w-full overflow-hidden bg-limewash border border-graphite/10">
                <Image
                  src="/images/award.jpg"
                  alt="Ramco Supercrete and Hindu Tamil Thisai Best Engineer Award Ceremony"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-center"
                />
              </div>

              <div data-reveal className="mt-6 border-l-2 border-oxide pl-4 py-1">
                <p className="font-body text-sm leading-relaxed text-graphite/80 italic font-medium">
                  மாநில அளவில் நடைபெற்ற ராம்கோ சூப்பர்கிரீட் மற்றும் இந்து தமிழ் திசை நாளிதழ் நடத்திய சீர்மிகு பொறியாளர் விருதினை வென்ற ஒரு மகிழ்ச்சியான தருணம்..
                </p>
              </div>

              <div data-reveal className="mt-4">
                <DimLine
                  className="text-graphite/20"
                  label="RAMCO SUPERCRETE & HINDU TAMIL AWARD"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
