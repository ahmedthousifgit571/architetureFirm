import Footer from "@/components/sections/Footer";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="relative z-10 min-h-screen bg-plaster text-graphite">
        {/* Offset for the fixed navbar (h-16 = 64px) */}
        <div className="pt-16">{children}</div>
      </main>
      <footer className="relative z-10 bg-plaster text-graphite">
        <Footer />
      </footer>
    </>
  );
}
