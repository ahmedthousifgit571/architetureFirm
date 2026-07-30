"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BRAND_NAME } from "@/lib/constants";
import { useSequence } from "./SequenceProvider";

export default function Loader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { progress, ready } = useSequence();
  const exited = useRef(false);

  useEffect(() => {
    if (ready && !exited.current && ref.current) {
      exited.current = true;
      gsap.to(ref.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.inOut",
        onComplete: () => {
          if (ref.current) ref.current.style.display = "none";
        },
      });
    }
  }, [ready]);

  const pct = Math.min(Math.round(progress * 100), 100);

  // Dynamic architectural loading steps
  let statusText = "READING SURVEY POINTS...";
  if (pct >= 15 && pct < 35) {
    statusText = "ESTABLISHING AXIS GRIDS...";
  } else if (pct >= 35 && pct < 55) {
    statusText = "EXTRUDING FOUNDATION & SLABS...";
  } else if (pct >= 55 && pct < 75) {
    statusText = "ASSEMBLING COLUMNS & BEAMS...";
  } else if (pct >= 75 && pct < 90) {
    statusText = "INSTALLING GLAZING & OVERHANGS...";
  } else if (pct >= 90) {
    statusText = "COMPILING BLUEPRINTS...";
  }

  // Calculate dynamic coordinates for drawing lines in SVG
  const pA = getLineProgress(progress, 0.0, 0.15);
  const pB = getLineProgress(progress, 0.02, 0.17);
  const pC = getLineProgress(progress, 0.04, 0.19);
  const pD = getLineProgress(progress, 0.06, 0.21);

  const p1 = getLineProgress(progress, 0.08, 0.22);
  const p2 = getLineProgress(progress, 0.1, 0.24);
  const p3 = getLineProgress(progress, 0.12, 0.26);

  const pFound = getLineProgress(progress, 0.26, 0.32);
  const pLeftWall = getLineProgress(progress, 0.32, 0.4);
  const pRightWall = getLineProgress(progress, 0.32, 0.4);
  const pRoof = getLineProgress(progress, 0.4, 0.48);
  const pMidFloor = getLineProgress(progress, 0.48, 0.56);

  const pCol1 = getLineProgress(progress, 0.56, 0.62);
  const pCol2 = getLineProgress(progress, 0.56, 0.62);

  const pOverhang = getLineProgress(progress, 0.62, 0.68);

  const pDoor1 = getLineProgress(progress, 0.68, 0.72);
  const pDoor2 = getLineProgress(progress, 0.72, 0.76);
  const pDoor3 = getLineProgress(progress, 0.76, 0.8);

  const pWin1 = getLineProgress(progress, 0.68, 0.73);
  const pWin2 = getLineProgress(progress, 0.73, 0.77);
  const pWin3 = getLineProgress(progress, 0.77, 0.81);
  const pWin4 = getLineProgress(progress, 0.81, 0.85);

  const pDimLine = getLineProgress(progress, 0.85, 0.9);
  const pDetails = getLineProgress(progress, 0.9, 1.0);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-graphite text-plaster select-none"
      aria-hidden={ready}
    >
      <div className="relative flex flex-col items-center p-8 border border-plaster/10 max-w-[90vw] md:max-w-2xl w-full bg-graphite/40 backdrop-blur-sm">
        <div className="w-full flex items-baseline justify-between border-b border-plaster/10 pb-4 mb-6">
          <span className="font-grotesk text-[10px] tracking-[0.25em] text-oxide">SHT 00 — LOADING SCHEMA</span>
          <span className="font-grotesk text-[10px] tracking-[0.25em] text-concrete">DWG.A-000</span>
        </div>

        <div className="relative w-full aspect-[4/3] max-w-[500px] border border-plaster/5 bg-graphite/60 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <svg viewBox="0 0 500 350" className="w-full h-full font-grotesk">
            {pA > 0 && (
              <line
                x1="100" y1="300"
                x2="100" y2={300 - 250 * pA}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}
            {pB > 0 && (
              <line
                x1="200" y1="300"
                x2="200" y2={300 - 250 * pB}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}
            {pC > 0 && (
              <line
                x1="300" y1="300"
                x2="300" y2={300 - 250 * pC}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}
            {pD > 0 && (
              <line
                x1="400" y1="300"
                x2="400" y2={300 - 250 * pD}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}

            {p1 > 0 && (
              <line
                x1="50" y1="90"
                x2={50 + 400 * p1} y2="90"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}
            {p2 > 0 && (
              <line
                x1="50" y1="170"
                x2={50 + 400 * p2} y2="170"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}
            {p3 > 0 && (
              <line
                x1="50" y1="250"
                x2={50 + 400 * p3} y2="250"
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
            )}

            {pA >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="100" cy="40" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="100" y="43" textAnchor="middle">A</text>
              </g>
            )}
            {pB >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="200" cy="40" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="200" y="43" textAnchor="middle">B</text>
              </g>
            )}
            {pC >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="300" cy="40" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="300" y="43" textAnchor="middle">C</text>
              </g>
            )}
            {pD >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="400" cy="40" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="400" y="43" textAnchor="middle">D</text>
              </g>
            )}

            {p1 >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="35" cy="90" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="35" y="93" textAnchor="middle">1</text>
              </g>
            )}
            {p2 >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="35" cy="170" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="35" y="173" textAnchor="middle">2</text>
              </g>
            )}
            {p3 >= 1 && (
              <g className="transition-opacity duration-300 opacity-60 text-[9px] fill-concrete">
                <circle cx="35" cy="250" r="8" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <text x="35" y="253" textAnchor="middle">3</text>
              </g>
            )}

            {pFound > 0 && (
              <line
                x1="80" y1="270"
                x2={80 + 340 * pFound} y2="270"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
            )}
            {pLeftWall > 0 && (
              <line
                x1="140" y1="270"
                x2="140" y2={270 - 160 * pLeftWall}
                stroke="#e84c17"
                strokeWidth="1.5"
              />
            )}
            {pRightWall > 0 && (
              <line
                x1="360" y1="270"
                x2="360" y2={270 - 160 * pRightWall}
                stroke="#e84c17"
                strokeWidth="1.5"
              />
            )}
            {pRoof > 0 && (
              <line
                x1="140" y1="110"
                x2={140 + 220 * pRoof} y2="110"
                stroke="#e84c17"
                strokeWidth="1.5"
              />
            )}
            {pMidFloor > 0 && (
              <line
                x1="140" y1="190"
                x2={140 + 220 * pMidFloor} y2="190"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.5"
              />
            )}

            {pCol1 > 0 && (
              <line
                x1="210" y1="270"
                x2="210" y2={270 - 80 * pCol1}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
              />
            )}
            {pCol2 > 0 && (
              <line
                x1="290" y1="270"
                x2="290" y2={270 - 80 * pCol2}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
              />
            )}

            {pOverhang > 0 && (
              <line
                x1="120" y1="100"
                x2={120 + 260 * pOverhang} y2="100"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
              />
            )}

            {pDoor1 > 0 && (
              <line
                x1="230" y1="270"
                x2="230" y2={270 - 70 * pDoor1}
                stroke="#e84c17"
                strokeWidth="1"
              />
            )}
            {pDoor2 > 0 && (
              <line
                x1="230" y1="200"
                x2={230 + 40 * pDoor2} y2="200"
                stroke="#e84c17"
                strokeWidth="1"
              />
            )}
            {pDoor3 > 0 && (
              <line
                x1="270" y1="200"
                x2="270" y2={200 + 70 * pDoor3}
                stroke="#e84c17"
                strokeWidth="1"
              />
            )}

            {pWin1 > 0 && (
              <line
                x1="160" y1="170"
                x2={160 + 180 * pWin1} y2="170"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
            )}
            {pWin2 > 0 && (
              <line
                x1="340" y1="170"
                x2="340" y2={170 - 40 * pWin2}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
            )}
            {pWin3 > 0 && (
              <line
                x1="340" y1="130"
                x2={340 - 180 * pWin3} y2="130"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
            )}
            {pWin4 > 0 && (
              <line
                x1="160" y1="130"
                x2="160" y2={130 + 40 * pWin4}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1"
              />
            )}

            {pDimLine > 0 && (
              <g className="opacity-50">
                <line
                  x1="80" y1="300"
                  x2={80 + 340 * pDimLine} y2="300"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="0.75"
                />
                <line x1="77" y1="303" x2="83" y2="297" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                {pDimLine >= 1 && (
                  <line x1="417" y1="303" x2="423" y2="297" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                )}
                <line x1="80" y1="275" x2="80" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                <line x1="420" y1="275" x2="420" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              </g>
            )}

            {pDimLine >= 0.8 && (
              <text
                x="250" y="296"
                textAnchor="middle"
                className="fill-plaster text-[8px] tracking-[0.1em] opacity-70"
              >
                24 000 MM
              </text>
            )}

            {pDetails > 0 && (
              <g style={{ opacity: pDetails }} className="fill-concrete text-[8px]">
                <text x="360" y="325" className="font-semibold tracking-[0.05em]">DWG NO: A-001</text>
                <text x="360" y="335">SCALE: 1:100</text>
                <text x="50" y="325" className="fill-oxide tracking-[0.15em] font-semibold">{BRAND_NAME.toUpperCase()}</text>
                <text x="50" y="335">SURVEY & ELEVATIONS</text>
              </g>
            )}
          </svg>
        </div>

        <div className="mt-8 w-full">
          <div className="h-[2px] w-full bg-plaster/10 overflow-hidden">
            <div
              className="h-full bg-oxide"
              style={{ width: `${pct}%`, transition: "width 0.2s linear" }}
            />
          </div>
          <div className="mt-3 flex items-baseline justify-between font-grotesk text-[10px] tracking-[0.25em]">
            <span className="text-concrete animate-pulse">{statusText}</span>
            <span className="tabular-nums text-plaster font-semibold">{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getLineProgress(progress: number, start: number, end: number) {
  if (progress < start) return 0;
  if (progress > end) return 1;
  return (progress - start) / (end - start);
}
