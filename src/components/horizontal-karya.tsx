"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";

interface HorizontalKaryaProps {
  projects: Project[];
}

export function HorizontalKarya({ projects }: HorizontalKaryaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeSheet, setActiveSheet] = useState(1);

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;

    if (totalScrollableDistance <= 0) return;

    // How far we have scrolled inside the sticky container
    const currentScroll = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
    setDisplayProgress(rawProgress);

    // Active sheet detection
    setActiveSheet(rawProgress > 0.45 ? 2 : 1);

    const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
    if (maxTranslate > 0) {
      // Calibrated easing mapping:
      // 0.00 -> 0.10: Sheet 01 is resting
      // 0.10 -> 0.80: Smooth translation across the blueprint roll to Sheet 02
      // 0.80 -> 1.00: Sheet 02 is resting at full view
      let t = 0;
      if (rawProgress < 0.10) {
        t = 0;
      } else if (rawProgress > 0.80) {
        t = 1;
      } else {
        t = (rawProgress - 0.10) / (0.80 - 0.10);
      }

      const translateX = t * maxTranslate;
      trackRef.current.style.transform = `translate3d(-${translateX}px, 0, 0)`;
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updatePosition]);

  // Click to jump smoothly to Sheet 1 or Sheet 2
  const scrollToSheet = (sheetIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;

    const targetProgress = sheetIndex === 1 ? 0.05 : 0.85;
    const targetY = absoluteTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section id="karya" className="relative w-full">
      {/* ==================================================== */}
      {/* DESKTOP & TABLET: Horizontal Sticky Roll (md and up)  */}
      {/* ==================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[320vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-4 pb-6">
          
          {/* Top Architectural Scale Ruler & Navigation Header */}
          <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between border-b border-[var(--bp-line)]/20 pb-2.5 font-mono text-xs text-[var(--bp-muted)]">
            <div className="flex items-center gap-4">
              <span className="text-white font-semibold uppercase tracking-widest">
                [02] KARYA
              </span>
              <span className="opacity-40">&bull;</span>
              <span className="text-[11px] text-[var(--bp-line)]">
                GULIR MOUSE KE BAWAH UNTUK MENGGESER LEMBAR &rarr;
              </span>
            </div>

            {/* Scale Bar Progress + Direct Sheet Jump Buttons */}
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5 border border-[var(--bp-line)]/30 p-0.5 bg-[var(--bp-dark)]">
                <button
                  type="button"
                  onClick={() => scrollToSheet(1)}
                  className={`px-2 py-0.5 font-bold transition-colors ${
                    activeSheet === 1
                      ? "bg-[var(--accent)] text-[#182c5a]"
                      : "text-[var(--bp-line)] hover:text-white"
                  }`}
                >
                  LEMBAR 01
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSheet(2)}
                  className={`px-2 py-0.5 font-bold transition-colors ${
                    activeSheet === 2
                      ? "bg-[var(--accent)] text-[#182c5a]"
                      : "text-[var(--bp-line)] hover:text-white"
                  }`}
                >
                  LEMBAR 02
                </button>
              </div>

              {/* Progress bar */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-24 h-2 border border-[var(--bp-line)]/30 p-0.5 bg-[var(--bp-dark)]">
                  <div
                    className="h-full bg-[var(--accent)] transition-all duration-75"
                    style={{ width: `${Math.round(displayProgress * 100)}%` }}
                  />
                </div>
                <span className="w-8 text-right text-white font-semibold">
                  {Math.round(displayProgress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Horizontal Track Canvas: Taller cards filling the viewport */}
          <div className="w-full flex-1 flex items-center overflow-visible my-auto py-2">
            <div
              ref={trackRef}
              className="flex items-center gap-12 lg:gap-16 px-10 lg:px-20 will-change-transform transition-transform ease-out duration-75"
              style={{ width: "max-content" }}
            >
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="w-[88vw] max-w-[1080px] h-[75vh] max-h-[660px] min-h-[500px] flex-shrink-0"
                >
                  <article className="h-full border border-[var(--bp-line)]/35 p-6 lg:p-8 bg-[var(--bp-dark)]/50 relative rounded-sm shadow-2xl flex flex-col justify-between">
                    {/* Drafting Corner Ticks */}
                    <span className="absolute -top-1.5 -left-1.5 size-3.5 border-t-2 border-l-2 border-[var(--bp-line)]" />
                    <span className="absolute -top-1.5 -right-1.5 size-3.5 border-t-2 border-r-2 border-[var(--bp-line)]" />
                    <span className="absolute -bottom-1.5 -left-1.5 size-3.5 border-b-2 border-l-2 border-[var(--bp-line)]" />
                    <span className="absolute -bottom-1.5 -right-1.5 size-3.5 border-b-2 border-r-2 border-[var(--bp-line)]" />

                    {/* Top Sheet Header */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--bp-muted)] pb-3 mb-4 border-b border-[var(--bp-line)]/20">
                      <span className="tracking-wider">
                        LEMBAR {project.number} DARI {String(projects.length).padStart(2, "0")} &bull; SISTEM AKTIF
                      </span>
                      <span>1440 &times; 900 PX CANVAS</span>
                    </div>

                    {/* Two-column layout filling available card height */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
                      
                      {/* Left: Screenshot Frame */}
                      <div className="lg:col-span-7 h-full flex flex-col justify-center">
                        <div className="relative group border border-[var(--bp-line)]/40 p-2 bg-[var(--bp-deep)] shadow-inner">
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bp-deep)]">
                            <Image
                              src={project.image}
                              alt={`Screenshot antarmuka ${project.title}`}
                              fill
                              sizes="(max-width: 1024px) 80vw, 620px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            {/* Blueprint line overlay fading out on hover */}
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

                      {/* Right: Project Content */}
                      <div className="lg:col-span-5 space-y-4">
                        <span className="font-mono text-sm tracking-widest text-[var(--bp-muted)] block">
                          {project.number}
                        </span>

                        <h3
                          className="text-3xl lg:text-4xl text-[var(--bp-line)] leading-tight tracking-tight"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {project.title}
                        </h3>

                        <p className="text-[17px] text-[var(--bp-line)]/90 leading-relaxed font-sans">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--bp-muted)] pt-1">
                          {project.tags.map((tag, tIdx) => (
                            <span key={tag} className="inline-flex items-center">
                              <span>{tag}</span>
                              {tIdx < project.tags.length - 1 && (
                                <span className="mx-1.5 opacity-40">&bull;</span>
                              )}
                            </span>
                          ))}
                        </div>

                        <div className="pt-3">
                          <Link
                            href={`/karya/${project.slug}`}
                            className="px-5 py-2.5 bg-[var(--accent)] hover:brightness-105 active:brightness-95 text-[#182c5a] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-2 group shadow-md"
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
                </div>
              ))}

              {/* End of Roll Spacer / Indicator */}
              <div className="w-[32vw] max-w-[300px] h-[75vh] max-h-[660px] min-h-[500px] flex-shrink-0 flex flex-col items-center justify-center p-8 border border-dashed border-[var(--bp-line)]/25 text-center space-y-3 font-mono text-xs text-[var(--bp-muted)] bg-[var(--bp-dark)]/20">
                <span className="block text-sm font-bold text-white tracking-widest">
                  [ AKHIR GULUNGAN ]
                </span>
                <span className="text-[11px] leading-relaxed text-[var(--bp-line)]/70">
                  Kedua lembar sistem selesai diperiksa.
                </span>
                <span className="text-[var(--accent)] font-semibold pt-2 inline-flex items-center gap-1">
                  LANJUT KE KONTAK &darr;
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Dimension Ticks */}
          <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between border-t border-[var(--bp-line)]/20 pt-2.5 font-mono text-[11px] text-[var(--bp-muted)]">
            <span>|&larr; LEMBAR 01 : BREWPOS</span>
            <span className="text-[var(--accent)] font-semibold hidden sm:inline">
              GULIR KE BAWAH UNTUK MELIHAT LEMBAR BERIKUTNYA
            </span>
            <span>LEMBAR 02 : PAYMENT GATEWAY &rarr;|</span>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE FALLBACK (< 768px): Clean Natural Vertical    */}
      {/* ==================================================== */}
      <div className="block md:hidden px-6 space-y-10 py-6">
        <div className="flex items-center justify-between border-b border-[var(--bp-line)]/20 pb-3 font-mono text-xs text-[var(--bp-muted)]">
          <span className="text-white font-semibold uppercase tracking-widest">
            [02] KARYA
          </span>
          <span>DRAFTING SHEETS</span>
        </div>

        {projects.map((project) => (
          <article
            key={project.slug}
            className="border border-[var(--bp-line)]/30 p-5 bg-[var(--bp-dark)]/40 relative rounded-sm space-y-5"
          >
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-[var(--bp-line)]" />
            <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-[var(--bp-line)]" />
            <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-[var(--bp-line)]" />
            <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-[var(--bp-line)]" />

            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--bp-muted)] border-b border-[var(--bp-line)]/15 pb-2">
              <span>SHEET {project.number}</span>
              <span>1440 &times; 900 PX</span>
            </div>

            <div className="relative border border-[var(--bp-line)]/40 p-1 bg-[var(--bp-deep)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bp-deep)]">
                <Image
                  src={project.image}
                  alt={`Screenshot antarmuka ${project.title}`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3
                className="text-2xl text-[var(--bp-line)] leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.title}
              </h3>

              <p className="text-[16px] text-[var(--bp-line)]/90 leading-relaxed font-sans">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-[var(--bp-muted)]">
                {project.tags.map((tag, tIdx) => (
                  <span key={tag} className="inline-flex items-center">
                    <span>{tag}</span>
                    {tIdx < project.tags.length - 1 && (
                      <span className="mx-1 opacity-40">&bull;</span>
                    )}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={`/karya/${project.slug}`}
                  className="text-[var(--accent)] hover:underline font-mono text-xs uppercase font-medium inline-flex items-center gap-1.5"
                >
                  <span>Baca studi kasus</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
