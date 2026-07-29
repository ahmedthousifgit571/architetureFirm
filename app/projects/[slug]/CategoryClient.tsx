"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useReveal } from "@/hooks/useReveal";
import { getCategoryBySlug, PROJECT_CATEGORIES } from "@/lib/projectsData";

// Grid layout patterns — cycles through different span configs for visual variety
const GRID_SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-6",
];

const GRID_HEIGHTS = [
  "h-64 md:h-[440px]",
  "h-64 md:h-[340px]",
  "h-64 md:h-[340px]",
  "h-64 md:h-[440px]",
  "h-64 md:h-[380px]",
  "h-64 md:h-[380px]",
];

export default function CategoryClient() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);
  const ref = useRef<HTMLDivElement | null>(null);
  useReveal(ref);

  if (!category) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="font-grotesk text-[10px] tracking-[0.25em] text-oxide">ERROR 404</p>
          <h1 className="mt-4 font-display text-4xl font-semibold">Category Not Found</h1>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-3 border border-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-oxide transition-colors duration-300 hover:bg-oxide hover:text-plaster"
          >
            ← BACK TO PROJECTS
          </Link>
        </div>
      </div>
    );
  }

  // Find this category's index for the sheet label
  const catIndex = PROJECT_CATEGORIES.findIndex((c) => c.slug === slug);

  return (
    <div ref={ref}>
      {/* ─── HERO BANNER ─── */}
      <section className="relative overflow-hidden bg-graphite px-6 py-20 md:px-12 md:py-28" data-nav-dark>
        {/* Background image — blurred & dimmed */}
        <div className="absolute inset-0">
          <Image
            src={category.coverImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/80 to-graphite" />
        </div>

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
              <li>
                <Link href="/projects" className="transition-colors duration-200 hover:text-oxide">
                  PROJECTS
                </Link>
              </li>
              <li aria-hidden>·</li>
              <li className="text-oxide">{category.shortName}</li>
            </ol>
          </nav>

          <div data-reveal className="flex items-baseline justify-between">
            <p className="sheet-label text-oxide">
              SHT 03.{String(catIndex + 1).padStart(2, "0")} — {category.shortName}
            </p>
            <p className="font-grotesk text-[10px] tracking-[0.25em] text-plaster/40">
              {category.projects.length} WORKS
            </p>
          </div>

          <h1
            data-reveal
            className="mt-8 font-display font-semibold leading-[1.05] tracking-[-0.035em] text-plaster"
            style={{ fontSize: "clamp(2rem, 5.5vw, 5rem)" }}
          >
            {category.name}
          </h1>

          <p
            data-reveal
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-plaster/60"
          >
            {category.description}
          </p>

          {/* Decorative dimension line */}
          <div data-reveal className="mt-10 text-oxide">
            <div className="dim-line w-32" aria-hidden />
          </div>
        </div>
      </section>

      {/* ─── PROJECT GRID ─── */}
      <section className="px-6 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
            {category.projects.map((project, i) => {
              const spanClass = GRID_SPANS[i % GRID_SPANS.length];
              const heightClass = GRID_HEIGHTS[i % GRID_HEIGHTS.length];
              const projectNumber = String(i + 1).padStart(2, "0");

              return (
                <article
                  key={`${project.name}-${i}`}
                  data-reveal
                  className={`group ${spanClass}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`relative overflow-hidden bg-limewash ${heightClass}`}>
                    <Image
                      src={project.image}
                      alt={`${project.name} — ${project.location}`}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Oxide index — surfaces on hover */}
                    <span
                      className="absolute left-5 top-4 font-grotesk text-4xl tabular-nums text-oxide opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2"
                      aria-hidden
                    >
                      {projectNumber}
                    </span>

                    {/* Project details on hover */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-grotesk text-[10px] tracking-[0.2em] text-plaster/80">
                        {project.location} · {project.year} · {project.area}
                      </p>
                    </div>
                  </div>

                  {/* Oxide accent line */}
                  <div className="mt-2 h-[1px] w-0 bg-oxide transition-all duration-500 ease-out group-hover:w-full" />
                </article>
              );
            })}
          </div>

          {/* Back button */}
          <div data-reveal className="mt-20 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 border border-oxide px-7 py-4 font-grotesk text-[11px] tracking-[0.25em] text-oxide transition-colors duration-300 hover:bg-oxide hover:text-plaster focus-visible:bg-oxide focus-visible:text-plaster"
            >
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
