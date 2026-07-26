# SRRI Positive Builders — Cinematic Architecture Portfolio

A single-page portfolio for a fictional Zürich architecture studio, built around two
scroll-scrubbed cinematic flythroughs (exterior foundation-to-roof, and an interior
drone pass). Scrolling drives a canvas-rendered image sequence frame by frame, while
the content sections in between use a drafting-sheet design language — sheet labels,
dimension lines, title blocks — with GSAP-driven reveals throughout.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config via `@theme` in `globals.css`
- [GSAP](https://gsap.com/) + ScrollTrigger — scrubbed sequences, reveals, counters
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling, driven by the GSAP ticker

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Project Structure

```
app/
  layout.tsx              Root layout, fonts, providers
  page.tsx                Section order — cinematic zones + content zones
  globals.css             Design tokens (@theme), drafting-sheet motifs
components/
  CinematicZone(.Loader)  Exterior flythrough — sticky canvas, scrubbed by scroll
  InteriorZone(.Loader)   Interior flythrough, same engine second instance
  Hero.tsx                Overlay hero, fades during the flythrough
  Loader.tsx              Frame preload gate
  Navbar.tsx              Fixed bar; flips ink over dark zones ([data-nav-dark])
  DimLine.tsx             Dimension-line motif (1px rule + end ticks + label)
  sections/               Manifesto, Projects, Process, Studio, Contact, Footer
hooks/
  useCanvasSequence.ts    The scrub engine — draws frames on scroll progress
  useImageSequence.ts     Loads + decodes frames before reveal
  useLenis.ts             Lenis ⇄ GSAP ticker bridge (single RAF driver)
  useReveal.ts            Generic [data-reveal] entrance animation per section
lib/
  constants.ts            Brand + frame-set config — single source of truth
  cover.ts                drawImage cover-fit with zoom + retina scaling
public/
  frames/                 300 exterior frames (JPEG, 1280×720)
  frames-interior/        300 interior frames
  images/                 Project stills
```

## Frame Sequences

Both flythroughs ship 300 frames each and subsample by device to stay inside
decoded-image memory budgets (see `lib/constants.ts`):

| | Desktop (step 3) | Mobile (step 8) |
|---|---|---|
| Frames used | 100 per zone | 38 per zone |
| Decoded memory | ≈ 740 MB total | ≈ 280 MB total |

Tuning knobs live in `lib/constants.ts`: `ZOOM_FACTOR` (edge-artifact crop /
parallax headroom), `CINEMATIC_VH` / `INTERIOR_VH` (scrub length per zone), and the
`FrameSet` definitions. The raw frame exports (`foundationFrames/`,
`interiordroneFrames/`) are gitignored — only the optimized copies under `public/`
are tracked.

## Motion & Accessibility

- All animation is gated behind `prefers-reduced-motion` — with it set, content
  renders complete and static; the site works fully without JS (server-rendered).
- Only `transform` and `opacity` are animated; sequences render to a single canvas.
- `reactStrictMode` is intentionally off (see `next.config.ts`) — dev double-mount
  duplicates ScrollTriggers.

See [BUILD-GUIDE.md](BUILD-GUIDE.md) for the full build walkthrough, the frame
export spec, and the catalog of known bugs and fixes.
