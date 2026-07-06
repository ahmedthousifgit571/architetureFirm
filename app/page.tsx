import CinematicZoneLoader from "@/components/CinematicZoneLoader";
import InteriorZoneLoader from "@/components/InteriorZoneLoader";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Studio from "@/components/sections/Studio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* CINEMATIC ZONE — scroll here scrubs the flythrough */}
      <CinematicZoneLoader />

      {/* CONTENT ZONE — normal flow, never bound to the frame scrub window */}
      <main className="relative z-10 bg-plaster text-graphite">
        <Manifesto />
        <Projects />

        {/* INTERIOR CINEMATIC ZONE — second scrubbed flythrough, inside the villa */}
        <InteriorZoneLoader />

        <Process />
        <Studio />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
