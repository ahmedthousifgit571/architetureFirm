"use client";

import dynamic from "next/dynamic";
import { CINEMATIC_VH } from "@/lib/constants";

// ssr: false — canvas/window access must never run on the server.
// The loading placeholder reserves the full 600vh so there is zero layout shift.
const CinematicZone = dynamic(() => import("./CinematicZone"), {
  ssr: false,
  loading: () => (
    <div style={{ height: `${CINEMATIC_VH}vh` }} className="bg-graphite" data-nav-dark aria-hidden />
  ),
});

export default function CinematicZoneLoader() {
  return <CinematicZone />;
}
