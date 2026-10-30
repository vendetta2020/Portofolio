import { BackgroundLayer } from "@/components/background-layer";
import { BlueprintLoader } from "@/components/blueprint-loader";
import { Navbar } from "@/components/navbar";
import { HeroDiagram } from "@/components/hero-diagram";
import { HorizontalKarya } from "@/components/horizontal-karya";
import { Footer } from "@/components/footer";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[var(--bp-base)]">
      {/* Blueprint Opening Downward Animation */}
      <BlueprintLoader />

      {/* Global Background Blueprint Texture Layer */}
      <BackgroundLayer />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <main className="flex-1">
          <section className="pt-12 sm:pt-16 pb-2 sm:pb-4 px-6 max-w-6xl mx-auto w-full space-y-6">
            
            {/* Top Label & Headline */}
            <div className="space-y-4 max-w-4xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--bp-muted)] block">
                PORTOFOLIO
              </span>

              <h1
                className="text-white tracking-normal leading-[1.08]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(42px, 6.2vw, 92px)",
                  letterSpacing: "-0.01em",
                }}
              >
                {siteConfig.name}
              </h1>

              <div className="space-y-2.5 pt-1">
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[var(--bp-line)] font-semibold">
                  {siteConfig.role}
                </p>

                <p className="text-[17px] text-[var(--bp-line)]/95 leading-relaxed font-sans max-w-2xl">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            {/* Inline SVG Integration Architecture Diagram */}
            <HeroDiagram />
          </section>

          {/* Karya (Horizontal Sticky Roll Showcase) */}
          <HorizontalKarya projects={projects} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
