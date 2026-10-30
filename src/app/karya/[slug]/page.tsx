import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BackgroundLayer } from "@/components/background-layer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { projects, getProjectBySlug } from "@/lib/projects";

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
    title: `${project.title} — Studi Kasus Arsitektur Rekayasa`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[var(--bp-base)] overflow-x-hidden">
      {/* Global Background Blueprint Texture Layer */}
      <BackgroundLayer />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 py-10 sm:py-16 px-6 max-w-6xl mx-auto w-full space-y-12">
          
          {/* Top navigation back link */}
          <div className="pt-2">
            <Link
              href="/#karya"
              className="text-[var(--accent)] hover:underline font-mono text-xs tracking-wider inline-flex items-center gap-1.5 uppercase transition-colors"
            >
              &larr; KEMBALI KE KARYA
            </Link>
          </div>

          {/* Header Specification */}
          <section className="space-y-4 max-w-3xl border-b border-[var(--bp-line)]/15 pb-8">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl text-[var(--bp-line)] tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--bp-line)]/90 font-light font-sans">
              {project.subtitle}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--bp-muted)] pt-2">
              {project.fullTags.map((tag, idx) => (
                <span key={tag} className="inline-flex items-center">
                  <span>{tag}</span>
                  {idx < project.fullTags.length - 1 && (
                    <span className="mx-2 opacity-40">&bull;</span>
                  )}
                </span>
              ))}
            </div>
          </section>

          {/* Large Screenshot with Technical Dimension Frame */}
          <section className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--bp-muted)] px-1">
              <span>&lt;&mdash; PLT-{project.number}: ELEVATION CANVAS &mdash;&gt;</span>
              <span>1440 &times; 900 PX</span>
            </div>

            <div className="relative border border-[var(--bp-line)]/40 p-2 sm:p-3 bg-[var(--bp-dark)]/50">
              {/* Corner ticks */}
              <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-[var(--bp-line)]" />
              <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-[var(--bp-line)]" />
              <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-[var(--bp-line)]" />
              <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-[var(--bp-line)]" />

              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bp-deep)]">
                <Image
                  src={project.image}
                  alt={`Screenshot antarmuka ${project.title}`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Four Breakdown Sections (2x2 Grid) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-4 pb-8 border-b border-[var(--bp-line)]/15">
            {project.sections.map((section, idx) => {
              const sectionNumber = String(idx + 1).padStart(2, "0");
              return (
                <div key={section.title} className="space-y-2.5">
                  <span className="font-mono text-xs tracking-widest text-[var(--bp-muted)] block">
                    {sectionNumber}
                  </span>

                  <h2
                    className="text-2xl sm:text-3xl text-[var(--bp-line)] tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {section.title}
                  </h2>

                  <p className="text-[17px] text-[var(--bp-line)]/90 leading-relaxed font-sans">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </section>

          {/* Action Links Row */}
          <section className="flex flex-wrap items-center justify-between gap-6 pt-2">
            <div className="flex flex-wrap items-center gap-8 font-mono text-xs sm:text-sm">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-1.5 uppercase font-medium"
              >
                LIHAT DI GITHUB &rarr;
              </a>

              <Link
                href="/#karya"
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-1.5 uppercase font-medium"
              >
                &larr; KEMBALI KE KARYA
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
