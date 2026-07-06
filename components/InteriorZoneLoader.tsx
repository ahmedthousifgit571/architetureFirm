"use client";

import dynamic from "next/dynamic";
import { INTERIOR_VH } from "@/lib/constants";

// ssr: false — canvas/window access must never run on the server.
// The loading placeholder reserves the full height so there is zero layout shift.
const InteriorZone = dynamic(() => import("./InteriorZone"), {
  ssr: false,
  loading: () => (
    <div style={{ height: `${INTERIOR_VH}vh` }} className="bg-graphite" data-nav-dark aria-hidden />
  ),
});

export default function InteriorZoneLoader() {
  return <InteriorZone />;
}
