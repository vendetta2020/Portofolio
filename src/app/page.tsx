import { BackgroundLayer } from "@/components/background-layer";
import { Navbar } from "@/components/navbar";
import { PixelHero } from "@/components/pixel-hero";
import { HeroDiagram } from "@/components/hero-diagram";
import { HorizontalKarya } from "@/components/horizontal-karya";
import { Footer } from "@/components/footer";
import { PixelDitherLoader } from "@/components/pixel-dither-loader";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-transparent">
      {/* 1-Bit Pixel Dither Avatar Loader (Inspired by Hulusi Tunç) */}
      <PixelDitherLoader />

      {/* Global Background Sunset Pixel Sky Layer */}
      <BackgroundLayer />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <main className="flex-1">
          {/* 16-Bit Pixel Hero (3D Extruded Title, Floating Mascot & Mission Dialog) */}
          <PixelHero />

          {/* Interactive Backend Architecture Diagram */}
          <section id="arsitektur" className="py-6 sm:py-10 px-4 sm:px-6 max-w-6xl mx-auto w-full">
            <HeroDiagram />
          </section>

          {/* Karya (Horizontal Sticky Roll Showcase) */}
          <section id="karya" className="w-full">
            <HorizontalKarya projects={projects} />
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
