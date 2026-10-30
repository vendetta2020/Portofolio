import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export function ProjectCard({ project, reverse = false }: ProjectCardProps) {
  return (
    <article className="w-full py-10 sm:py-14 border-t border-[var(--bp-line)]/15">
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* ========================================= */}
        {/* Screenshot with Dimension Frame           */}
        {/* ========================================= */}
        <div
          className={`lg:col-span-7 ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Dimension Header Label */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--bp-muted)] mb-1.5 px-1">
            <span>&lt;&mdash; PLT-{project.number}: SCREEN_VIEW &mdash;&gt;</span>
            <span>1440 &times; 900 PX</span>
          </div>

          {/* Technical Drawing Blueprint Frame */}
          <div className="relative group border border-[var(--bp-line)]/40 p-1.5 bg-[var(--bp-dark)]/50">
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-[var(--bp-line)]" />
            <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-[var(--bp-line)]" />
            <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-[var(--bp-line)]" />
            <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-[var(--bp-line)]" />

            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bp-deep)]">
              {/* Full brightness screenshot */}
              <Image
                src={project.image}
                alt={`Screenshot antarmuka ${project.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                priority={project.number === "01"}
              />

              {/* Blueprint line overlay that fades out on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-25 group-hover:opacity-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(233,236,243,0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(233,236,243,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* Project Description Content               */}
        {/* ========================================= */}
        <div
          className={`lg:col-span-5 space-y-4 ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Mono number */}
          <div className="font-mono text-sm tracking-widest text-[var(--bp-muted)]">
            {project.number}
          </div>

          {/* Display title with Archivo Black */}
          <h3
            className="text-3xl sm:text-4xl text-[var(--bp-line)] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>

          {/* One-sentence summary */}
          <p className="text-[17px] text-[var(--bp-line)]/90 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--bp-muted)] pt-1">
            {project.tags.map((tag, idx) => (
              <span key={tag} className="inline-flex items-center">
                <span>{tag}</span>
                {idx < project.tags.length - 1 && (
                  <span className="mx-1.5 opacity-40">&bull;</span>
                )}
              </span>
            ))}
          </div>

          {/* Terracotta Link */}
          <div className="pt-2">
            <Link
              href={`/karya/${project.slug}`}
              className="text-[var(--accent)] hover:brightness-110 font-mono text-sm inline-flex items-center gap-2 group transition-all"
            >
              <span>Baca studi kasus</span>
              <span className="transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
