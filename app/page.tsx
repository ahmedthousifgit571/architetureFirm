import CinematicZoneLoader from "@/components/CinematicZoneLoader";
import InteriorZoneLoader from "@/components/InteriorZoneLoader";
import Manifesto from "@/components/sections/Manifesto";
import Projects from "@/components/sections/Projects";
import Clients from "@/components/sections/Clients";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* CINEMATIC ZONE — scroll here scrubs the flythrough */}
      <CinematicZoneLoader />

      {/* CONTENT ZONE — normal flow, never bound to the frame scrub window */}
      <main className="relative z-10 bg-plaster text-graphite">
        <Projects />
        <About />
        <Clients />
        <WhyChooseUs />
        <Manifesto />

        {/* INTERIOR CINEMATIC ZONE — second scrubbed flythrough, inside the villa */}
        <InteriorZoneLoader />

        <Team />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
