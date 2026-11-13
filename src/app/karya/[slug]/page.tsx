import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BackgroundLayer } from "@/components/background-layer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { projects, getProjectBySlug } from "@/lib/projects";

/* =========================================================================
   16-BIT RETRO SVG PIXEL ART ICONS
   ========================================================================= */

function IconPixelBackArrow({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="4" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="5" fill="currentColor" />
      <rect x="2" y="2" width="1" height="3" fill="currentColor" />
      <rect x="1" y="3" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function IconPixelGitHub({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="2" y="1" width="2" height="2" fill="currentColor" />
      <rect x="10" y="1" width="2" height="2" fill="currentColor" />
      <rect x="1" y="3" width="12" height="6" fill="currentColor" />
      <rect x="3" y="5" width="2" height="2" fill="#FACC15" />
      <rect x="9" y="5" width="2" height="2" fill="#FACC15" />
      <rect x="3" y="9" width="8" height="3" fill="currentColor" />
      <rect x="5" y="11" width="1" height="2" fill="#FACC15" />
      <rect x="8" y="11" width="1" height="2" fill="#FACC15" />
    </svg>
  );
}

function IconPixelDiagonalArrow({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="2" y="0" width="5" height="1" fill="currentColor" />
      <rect x="6" y="1" width="1" height="4" fill="currentColor" />
      <rect x="0" y="5" width="2" height="2" fill="currentColor" />
      <rect x="2" y="3" width="2" height="2" fill="currentColor" />
      <rect x="4" y="1" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — 16-Bit Architecture Dossier`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const githubUrl =
    project.slug === "payment-gateway"
      ? "https://github.com/vendetta2020/PaymentGateway_Sandbox"
      : project.githubUrl;

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-transparent overflow-x-hidden select-none">
      {/* Global Background Sunset Pixel Sky Layer */}
      <BackgroundLayer />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-8">
          {/* Top navigation back link */}
          <div className="pt-2">
            <Link
              href="/#karya"
              className="pixel-btn bg-white hover:bg-[#FEF08A] text-[#0A0A0F] px-3.5 py-1.5 text-[10px] font-bold tracking-wider inline-flex items-center gap-1.5 uppercase"
            >
              <IconPixelBackArrow className="w-2.5 h-2.5 text-[#0A0A0F] shrink-0 -translate-y-[1px]" />
              <span className="leading-none">BACK TO QUEST BOARD</span>
            </Link>
          </div>

          {/* Retro OS Dossier Enclosure */}
          <article className="bg-[#ECE9D8] text-[#0A0A0F] border-[3px] border-[#0A0A0F] shadow-[8px_8px_0px_#0A0A0F] overflow-hidden">
            {/* Window Titlebar */}
            <div className="bg-[#0055EA] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b-2 border-[#0A0A0F]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#22C55E] border border-black inline-block animate-pulse" />
                <span
                  className="text-[10px] sm:text-[11.5px] font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-pixel-arcade)" }}
                >
                  SYSTEM DOSSIER // QUEST #{project.number} : {project.title.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#93C5FD] hidden sm:inline">
                VERIFIED PRODUCTION SPEC
              </span>
            </div>

            {/* Main Content Area */}
            <div className="p-5 sm:p-7 md:p-9 space-y-8">
              {/* Header Specification */}
              <div className="space-y-3 pb-6 border-b-2 border-[#0A0A0F]">
                <div className="inline-block px-2.5 py-0.5 bg-[#FEF08A] text-[#0A0A0F] border border-[#0A0A0F] text-[10px] font-bold uppercase">
                  QUEST #{project.number} &bull; PRODUCTION SPECIFICATION
                </div>

                <h1
                  className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0A0A0F] tracking-tight uppercase leading-tight"
                  style={{ fontFamily: "var(--font-pixel-arcade)" }}
                >
                  {project.title}
                </h1>

                <p className="font-mono text-[13.5px] sm:text-[15px] text-[#334155] leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Stack Tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 font-mono text-[10.5px]">
                  {project.fullTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white border border-[#0A0A0F] text-[#0A0A0F] font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Large Screenshot Frame */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10.5px] font-mono text-[#475569] px-1 font-bold">
                  <span>CANVAS PREVIEW // 16-BIT SCANLINE MATRIX</span>
                  <span>1440 &times; 900 PX</span>
                </div>

                <div className="relative border-2 border-[#0A0A0F] bg-black p-1.5 shadow-[4px_4px_0_#0A0A0F]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <Image
                      src={project.image}
                      alt={`Interface screenshot of ${project.title}`}
                      fill
                      sizes="(max-width: 1200px) 100vw, 1000px"
                      className="object-cover object-top"
                      priority
                    />
                    {/* CRT Scanline Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%)",
                        backgroundSize: "100% 4px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Four Architectural Breakdown Sections (2x2 Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {project.sections.map((section, idx) => {
                  const sectionNumber = String(idx + 1).padStart(2, "0");
                  return (
                    <div
                      key={section.title}
                      className="bg-white border-2 border-[#0A0A0F] p-4 shadow-[3px_3px_0_#0A0A0F] space-y-2"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A0A0F]/15 pb-1.5">
                        <span
                          className="text-[10px] font-bold text-[#2563EB]"
                          style={{ fontFamily: "var(--font-pixel-arcade)" }}
                        >
                          MODULE [{sectionNumber}]
                        </span>
                        <span className="w-2 h-2 bg-[#22C55E] inline-block" />
                      </div>

                      <h2
                        className="text-[12px] sm:text-[13px] font-bold text-[#0A0A0F] uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-pixel-arcade)" }}
                      >
                        {section.title}
                      </h2>

                      <p className="font-mono text-[12px] text-[#334155] leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-4 border-t-2 border-[#0A0A0F] flex flex-wrap items-center justify-between gap-4">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-btn bg-[#0A0A0F] hover:bg-[#1E1B4B] text-white px-4 py-2 text-[10.5px] font-bold uppercase inline-flex items-center gap-2"
                >
                  <IconPixelGitHub className="w-3.5 h-3.5 text-white shrink-0 -translate-y-[1px]" />
                  <span className="leading-none">VIEW ON GITHUB</span>
                  <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-white shrink-0 -translate-y-[1px]" />
                </a>

                <Link
                  href="/#karya"
                  className="pixel-btn bg-white hover:bg-[#FEF08A] text-[#0A0A0F] px-4 py-2 text-[10.5px] font-bold uppercase inline-flex items-center gap-1.5"
                >
                  <IconPixelBackArrow className="w-2.5 h-2.5 text-[#0A0A0F] shrink-0 -translate-y-[1px]" />
                  <span className="leading-none">BACK TO QUEST BOARD</span>
                </Link>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </div>
  );
}
