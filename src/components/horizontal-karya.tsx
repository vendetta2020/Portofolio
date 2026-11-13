"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { pixelAudio } from "@/lib/pixel-audio";

interface HorizontalKaryaProps {
  projects: Project[];
}

/* =========================================================================
   16-BIT RETRO SVG PIXEL ART ICONS (Crisp Pixel Grid Alignment)
   ========================================================================= */

function IconPixelPlay({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="1" y="0" width="1" height="8" fill="currentColor" />
      <rect x="2" y="1" width="1" height="6" fill="currentColor" />
      <rect x="3" y="2" width="1" height="4" fill="currentColor" />
      <rect x="4" y="3" width="1" height="2" fill="currentColor" />
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

function IconPixelArrowRight({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="0" y="3" width="4" height="1" fill="currentColor" />
      <rect x="3" y="1" width="1" height="5" fill="currentColor" />
      <rect x="4" y="2" width="1" height="3" fill="currentColor" />
      <rect x="5" y="3" width="1" height="1" fill="currentColor" />
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

function IconPixelDownArrow({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="3" y="0" width="1" height="4" fill="currentColor" />
      <rect x="0" y="3" width="7" height="1" fill="currentColor" />
      <rect x="1" y="4" width="5" height="1" fill="currentColor" />
      <rect x="2" y="5" width="3" height="1" fill="currentColor" />
      <rect x="3" y="6" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

function IconPixelCheck({ className = "w-3 h-3 text-[#22C55E]" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="6" y="1" width="1" height="2" fill="currentColor" />
      <rect x="5" y="3" width="1" height="2" fill="currentColor" />
      <rect x="4" y="5" width="1" height="2" fill="currentColor" />
      <rect x="3" y="4" width="1" height="2" fill="currentColor" />
      <rect x="2" y="3" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

export function HorizontalKarya({ projects }: HorizontalKaryaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [activeCartridge, setActiveCartridge] = useState(1);

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;

    if (totalScrollableDistance <= 0) return;

    const currentScroll = -rect.top;
    const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
    setDisplayProgress(rawProgress);

    // Active cartridge detection
    setActiveCartridge(rawProgress > 0.45 ? 2 : 1);

    const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
    if (maxTranslate > 0) {
      let t = 0;
      if (rawProgress < 0.08) {
        t = 0;
      } else if (rawProgress > 0.82) {
        t = 1;
      } else {
        t = (rawProgress - 0.08) / (0.82 - 0.08);
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

  // Jump to Cartridge 1 or 2
  const scrollToCartridge = (index: number) => {
    pixelAudio.playClick();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;

    const targetProgress = index === 1 ? 0.04 : 0.86;
    const targetY = absoluteTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section id="karya" className="relative w-full select-none">
      {/* ==================================================== */}
      {/* DESKTOP & TABLET: Horizontal Cartridge Roll (md+)    */}
      {/* ==================================================== */}
      <div
        ref={containerRef}
        className="hidden md:block relative h-[300vh] w-full"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 pb-6">
          {/* 
            Top Arcade HUD Bar: Cartridge Selectors & Energy Progress Bar
          */}
          <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between border-b-2 border-[#0A0A0F] pb-3 bg-[#ECE9D8]/90 backdrop-blur-none shadow-[0_4px_0_#0A0A0F]">
            <div className="flex items-center gap-3">
              <span
                className="text-[12px] font-bold text-[#0A0A0F] uppercase tracking-wider bg-[#FEF08A] px-2.5 py-1 border border-[#0A0A0F]"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                [02] QUEST BOARD
              </span>
              <span className="text-[11px] font-mono text-[#334155] font-semibold hidden lg:inline">
                SCROLL DOWN TO ADVANCE CARTRIDGE &rarr;
              </span>
            </div>

            {/* Cartridge Jump Switches */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-[#D4D0C8] p-1 border-2 border-[#0A0A0F]">
                <button
                  type="button"
                  onClick={() => scrollToCartridge(1)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    activeCartridge === 1
                      ? "bg-[#0055EA] text-white shadow-[1px_1px_0_#0A0A0F]"
                      : "bg-[#ECE9D8] text-[#334155] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
                  }`}
                  style={{ fontFamily: "var(--font-pixel-arcade)" }}
                >
                  QUEST 01: BREWPOS
                </button>
                <button
                  type="button"
                  onClick={() => scrollToCartridge(2)}
                  className={`px-3 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    activeCartridge === 2
                      ? "bg-[#0055EA] text-white shadow-[1px_1px_0_#0A0A0F]"
                      : "bg-[#ECE9D8] text-[#334155] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
                  }`}
                  style={{ fontFamily: "var(--font-pixel-arcade)" }}
                >
                  QUEST 02: GATEWAY
                </button>
              </div>

              {/* Segmented 16-Bit Health / Energy Bar */}
              <div className="hidden lg:flex items-center gap-2 font-mono text-[11px]">
                <span className="text-[#0A0A0F] font-bold">POWER</span>
                <div className="w-24 h-4 border-2 border-[#0A0A0F] p-0.5 bg-black">
                  <div
                    className="h-full bg-[#22C55E] transition-all duration-75"
                    style={{ width: `${Math.round(displayProgress * 100)}%` }}
                  />
                </div>
                <span className="w-8 text-right font-bold text-[#0A0A0F]">
                  {Math.round(displayProgress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* 
            Horizontal Track: Cartridge Showcase
          */}
          <div className="w-full flex-1 flex items-center overflow-visible my-auto py-2">
            <div
              ref={trackRef}
              className="flex items-center gap-12 lg:gap-16 px-10 lg:px-20 will-change-transform transition-transform ease-out duration-75"
              style={{ width: "max-content" }}
            >
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="w-[88vw] max-w-[1020px] h-[72vh] max-h-[620px] min-h-[480px] flex-shrink-0"
                >
                  {/* Outer Cartridge Box: 16-bit stepped border & shadow */}
                  <article className="h-full bg-[#ECE9D8] border-[3px] border-[#0A0A0F] shadow-[8px_8px_0px_#0A0A0F] p-6 lg:p-7 flex flex-col justify-between relative">
                    {/* Top Cartridge Header Strip */}
                    <div className="bg-[#0A246A] text-white px-3 py-1.5 flex items-center justify-between border-2 border-[#0A0A0F] mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-[#EF4444] border border-black inline-block animate-pulse" />
                        <span
                          className="text-[10.5px] font-bold uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-pixel-arcade)" }}
                        >
                          CARTRIDGE #{project.number} &bull; {project.title.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#93C5FD]">
                        16-BIT HIGH CONCURRENCY ARCHITECTURE
                      </span>
                    </div>

                    {/* Main Content Grid: 12 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1">
                      {/* Left: Pixel Screenshot Frame (7 cols) */}
                      <div className="lg:col-span-7 h-full flex flex-col justify-center">
                        <div className="relative border-2 border-[#0A0A0F] bg-black p-1 shadow-[4px_4px_0_#0A0A0F]">
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                            <Image
                              src={project.image}
                              alt={`Interface screenshot of ${project.title}`}
                              fill
                              sizes="(max-width: 1024px) 80vw, 600px"
                              className="object-cover object-top"
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

                      {/* Right: Technical Breakdown & Reliability Metrics (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full py-1 space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 bg-[#FEF08A] text-[#0A0A0F] border border-[#0A0A0F] uppercase"
                              style={{ fontFamily: "var(--font-pixel-arcade)" }}
                            >
                              QUEST 0{project.number}
                            </span>
                          </div>

                          <h3
                            className="text-[20px] lg:text-[24px] font-bold text-[#0A0A0F] tracking-tight uppercase leading-tight"
                            style={{ fontFamily: "var(--font-pixel-arcade)" }}
                          >
                            {project.title}
                          </h3>

                          <p className="font-mono text-[12px] text-[#334155] leading-relaxed mt-2">
                            {project.subtitle || project.description}
                          </p>
                        </div>

                        {/* Reliability Checklist */}
                        <div className="bg-white border border-[#0A0A0F] p-3 space-y-2 font-mono text-[11px] shadow-[2px_2px_0_#0A0A0F]">
                          <strong className="block text-[10px] uppercase font-bold text-[#0A0A0F] border-b border-[#0A0A0F]/15 pb-1">
                            Verified Production Engineering
                          </strong>
                          {project.slug === "brewpos" ? (
                            <>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#334155]">
                                  Pessimistic DB Row Locking (<code>SELECT ... FOR UPDATE</code>)
                                </span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#334155]">
                                  Automated recipe ingredient deduction per SKU
                                </span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#16A34A] font-bold">
                                  60 Automated Tests (380 Assertions passed)
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#334155]">
                                  Mathematical Idempotency (<code>Idempotency-Key</code>)
                                </span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#334155]">
                                  Anti-SSRF Webhook Dispatcher &amp; HMAC-SHA256
                                </span>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <IconPixelCheck className="w-3 h-3 text-[#16A34A] mt-0.5" />
                                <span className="text-[#16A34A] font-bold">
                                  222 Automated Tests (123 Unit + 99 E2E)
                                </span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#F1F5F9] border border-[#0A0A0F] text-[#0A0A0F] font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap items-center gap-2.5">
                          <Link
                            href={`/karya/${project.slug}`}
                            onClick={() => pixelAudio.playClick()}
                            className="pixel-btn bg-[#FEF08A] hover:bg-[#FACC15] text-[#0A0A0F] px-4 py-2 text-[10px] font-bold uppercase inline-flex items-center justify-center gap-1.5"
                          >
                            <IconPixelPlay className="w-2.5 h-2.5 shrink-0 -translate-y-[1px]" />
                            <span className="leading-none">READ CASE STUDY</span>
                            <IconPixelArrowRight className="w-2.5 h-2.5 shrink-0 -translate-y-[1px]" />
                          </Link>

                          <a
                            href={
                              project.slug === "payment-gateway"
                                ? "https://github.com/vendetta2020/PaymentGateway_Sandbox"
                                : project.githubUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => pixelAudio.playClick()}
                            className="pixel-btn bg-[#0A0A0F] hover:bg-[#1E1B4B] text-white px-3.5 py-2 text-[10px] font-bold uppercase inline-flex items-center justify-center gap-1.5"
                          >
                            <IconPixelGitHub className="w-3 h-3 text-white shrink-0 -translate-y-[1px]" />
                            <span className="leading-none">GITHUB</span>
                            <IconPixelDiagonalArrow className="w-2 h-2 text-white shrink-0 -translate-y-[1px]" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}

              {/* End of Quest Board Card */}
              <div className="w-[30vw] max-w-[280px] h-[72vh] max-h-[620px] min-h-[480px] flex-shrink-0 flex flex-col items-center justify-center p-6 bg-[#ECE9D8] border-[3px] border-dashed border-[#0A0A0F] text-center space-y-3 font-mono text-xs">
                <span
                  className="block text-xs font-bold text-[#0A0A0F] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-pixel-arcade)" }}
                >
                  QUESTS COMPLETED
                </span>
                <span className="text-[11px] leading-relaxed text-[#475569]">
                  Both high-concurrency systems verified.
                </span>
                <a
                  href="#contact"
                  onClick={() => pixelAudio.playClick()}
                  className="pixel-btn bg-[#4ADE80] hover:bg-[#22C55E] text-[#0A0A0F] px-3.5 py-2 text-[10px] font-bold uppercase inline-flex items-center justify-center gap-1.5 mt-2"
                >
                  <span className="leading-none">CONNECT</span>
                  <IconPixelDownArrow className="w-2.5 h-2.5 text-[#0A0A0F] shrink-0 -translate-y-[1px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* MOBILE FALLBACK (< 768px): Stacked Cartridges        */}
      {/* ==================================================== */}
      <div className="block md:hidden px-4 space-y-6 py-8">
        <div className="flex items-center justify-between border-b-2 border-[#0A0A0F] pb-2 font-mono text-xs">
          <span
            className="text-[#0A0A0F] font-bold uppercase tracking-wider bg-[#FEF08A] px-2 py-0.5 border border-[#0A0A0F]"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            [02] QUEST BOARD
          </span>
          <span className="font-bold text-[#0A0A0F]">2 CARTRIDGES</span>
        </div>

        {projects.map((project) => (
          <article
            key={project.slug}
            className="bg-[#ECE9D8] border-[3px] border-[#0A0A0F] shadow-[5px_5px_0_#0A0A0F] p-4 space-y-4"
          >
            {/* Header */}
            <div className="bg-[#0A246A] text-white px-2.5 py-1 flex items-center justify-between border border-[#0A0A0F]">
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                QUEST 0{project.number} &bull; {project.title}
              </span>
            </div>

            {/* Screenshot */}
            <div className="relative border-2 border-[#0A0A0F] bg-black p-1 shadow-[2px_2px_0_#0A0A0F]">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={project.image}
                  alt={`Interface screenshot of ${project.title}`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3
                className="text-lg font-bold text-[#0A0A0F] uppercase"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                {project.title}
              </h3>
              <p className="font-mono text-[12px] text-[#334155] leading-relaxed">
                {project.subtitle || project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 font-mono text-[10px] pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-white border border-[#0A0A0F] text-[#0A0A0F] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <Link
                  href={`/karya/${project.slug}`}
                  onClick={() => pixelAudio.playClick()}
                  className="pixel-btn bg-[#FEF08A] hover:bg-[#FACC15] text-[#0A0A0F] px-3.5 py-1.5 text-[9.5px] font-bold uppercase inline-flex items-center justify-center gap-1.5"
                >
                  <IconPixelPlay className="w-2.5 h-2.5 shrink-0 -translate-y-[1px]" />
                  <span className="leading-none">CASE STUDY</span>
                  <IconPixelArrowRight className="w-2 h-2 shrink-0 -translate-y-[1px]" />
                </Link>

                <a
                  href={
                    project.slug === "payment-gateway"
                      ? "https://github.com/vendetta2020/PaymentGateway_Sandbox"
                      : project.githubUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pixelAudio.playClick()}
                  className="pixel-btn bg-[#0A0A0F] hover:bg-[#1E1B4B] text-white px-3 py-1.5 text-[9.5px] font-bold uppercase inline-flex items-center justify-center gap-1.5"
                >
                  <IconPixelGitHub className="w-2.5 h-2.5 text-white shrink-0 -translate-y-[1px]" />
                  <span className="leading-none">GITHUB</span>
                  <IconPixelDiagonalArrow className="w-2 h-2 text-white shrink-0 -translate-y-[1px]" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
