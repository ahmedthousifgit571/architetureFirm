"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { PROJECT_CATEGORIES } from "@/lib/projectsData";

export default function ProjectsPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  useReveal(ref);

  return (
    <div ref={ref}>
      {/* ─── HERO BANNER ─── */}
      <section className="relative overflow-hidden bg-graphite px-6 py-20 md:px-12 md:py-28" data-nav-dark>
        {/* Atmospheric gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(180,85,45,0.15) 0%, transparent 40%, rgba(26,26,26,0.9) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          {/* Breadcrumb */}
          <nav data-reveal aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 font-grotesk text-[10px] tracking-[0.25em] text-plaster/50">
              <li>
                <Link href="/" className="transition-colors duration-200 hover:text-oxide">
                  HOME
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="text-oxide">PROJECTS</li>
            </ol>
          </nav>

          <div data-reveal className="flex items-baseline justify-between">
            <p className="sheet-label text-oxide">SHT 03 — PROJECT INDEX</p>
            <p className="font-grotesk text-[10px] tracking-[0.25em] text-plaster/40">
              A-301 · {PROJECT_CATEGORIES.length} CATEGORIES
            </p>
          </div>

          <h1
            data-reveal
            className="mt-8 font-display font-semibold leading-[1.05] tracking-[-0.035em] text-plaster"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            OUR PROJECTS
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-plaster/60"
          >
            From foundation to finish — explore our portfolio across residential,
            commercial, civic, and interior disciplines.
          </p>

          {/* Decorative dimension line */}
          <div data-reveal className="mt-10 text-oxide">
            <div className="dim-line w-32" aria-hidden />
          </div>
        </div>
      </section>

      {/* ─── CATEGORY GRID ─── */}
      <section className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_CATEGORIES.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/projects/${cat.slug}`}
                data-reveal
                className="project-card group relative block overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-limewash">
                  <Image
                    src={cat.coverImage}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Project count badge */}
                  <span className="absolute right-4 top-4 rounded-full border border-plaster/30 bg-graphite/60 px-3 py-1 font-grotesk text-[10px] tracking-[0.2em] text-plaster/80 backdrop-blur-sm">
                    {cat.projects.length} PROJECTS
                  </span>

                  {/* Category number — surfaces on hover */}
                  <span
                    className="absolute left-5 top-4 font-grotesk text-5xl tabular-nums text-oxide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Bottom info bar */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="font-display text-xl font-medium tracking-[-0.01em] text-plaster transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">
                      {cat.name}
                    </h2>
                    <p className="mt-1 font-grotesk text-[10px] tracking-[0.2em] text-plaster/60 transition-all duration-500 group-hover:text-plaster/80">
                      VIEW PROJECTS →
                    </p>
                  </div>
                </div>

                {/* Oxide accent line on bottom — draws on hover */}
                <div className="h-[2px] w-0 bg-oxide transition-all duration-500 ease-out group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
