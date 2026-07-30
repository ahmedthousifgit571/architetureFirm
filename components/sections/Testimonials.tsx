"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    name: "Malarvizhi Ramesh",
    location: "Madurai",
    quote: "I would like to express my sincere appreciation to Srri Positive Builders for their professional work & approach. They delivered my project with the promised quality. Good customer support explaining all construction details clearly and correctly. I strongly recommend, yes they are the best builders in Madurai.",
    image: "/images/avatar_malarvizhi.png"
  },
  {
    name: "Mohammed Sithik",
    location: "Madurai",
    quote: "I agreed, that srri positive builders are the best builders in Madurai. It's well known for adding value to every project with excellence and quality. They are delivering my project on time. Thank you, team.",
    image: "/images/avatar_sithik.png"
  },
  {
    name: "Muthu Kumaran",
    location: "Madurai",
    quote: "A highly reputable builder in the Madurai region. I had a great experience with Srri Positive Builders from start to finish for my home project. They are very Very knowledgeable and friendly approach. 100% transparency for buying materials and bills. They check every issue and give an active response. Love my new home., thank you, team.",
    image: "/images/avatar_muthu.png"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".testimonial-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%"
        }
      });

      // Cards stagger animation
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        filter: "blur(4px)",
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 75%"
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="testimonials" className="border-t border-graphite/10 px-6 py-28 md:px-12 md:py-40 bg-[#f9f8f6]">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="testimonial-header flex items-baseline justify-between mb-16">
          <div>
            <p className="sheet-label text-oxide">SHT 06 — CLIENT REVIEWS</p>
            <h2 className="mt-6 font-display font-semibold leading-[1.08] tracking-[-0.03em] text-graphite" style={{ fontSize: "clamp(2rem, 3.8vw, 3.25rem)" }}>
              What Our Clients Say
            </h2>
          </div>
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-concrete hidden sm:block">A-601 · TESTIMONIALS</p>
        </div>

        {/* Grid */}
        <div className="testimonial-grid grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-card group relative overflow-hidden aspect-[3/4.5] w-full rounded-[2rem] bg-limewash border border-graphite/10 flex flex-col justify-end p-6 md:p-8"
            >
              {/* Background Image */}
              <Image
                src={t.image}
                alt={t.name}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Darker Contrast Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/90 to-graphite/40 opacity-95 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="relative z-10 flex flex-col justify-end h-full">
                {/* SVG Quote Icon */}
                <svg className="h-6 w-6 text-oxide fill-current mb-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Quote Text */}
                <p className="font-body text-xs md:text-sm text-plaster/95 leading-relaxed font-light mb-6 italic">
                  "{t.quote}"
                </p>

                {/* Divider Line */}
                <div className="w-full h-px bg-plaster/10 mb-4" />

                {/* Author Info */}
                <div>
                  <h4 className="font-display font-semibold text-base md:text-lg text-plaster tracking-tight">
                    {t.name}
                  </h4>
                  <p className="font-grotesk text-[9px] tracking-[0.2em] text-oxide/90 uppercase mt-0.5">
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
