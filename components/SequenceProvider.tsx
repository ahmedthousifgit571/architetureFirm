"use client";

import { createContext, useContext } from "react";
import { useImageSequence } from "@/hooks/useImageSequence";
import { FOUNDATION_FRAMES } from "@/lib/constants";

interface SequenceState {
  frames: HTMLImageElement[];
  progress: number;
  ready: boolean;
}

const SequenceContext = createContext<SequenceState>({
  frames: [],
  progress: 0,
  ready: false,
});

export function useSequence(): SequenceState {
  return useContext(SequenceContext);
}

/**
 * Owns the foundation-sequence preload (the one the Loader gates on).
 * Loader (in layout) reads progress/ready, CinematicZone (in page) reads
 * frames — one load, shared everywhere. The interior sequence loads
 * independently inside InteriorZone and does not block the loader.
 */
export default function SequenceProvider({ children }: { children: React.ReactNode }) {
  const state = useImageSequence(FOUNDATION_FRAMES);
  return <SequenceContext.Provider value={state}>{children}</SequenceContext.Provider>;
}
