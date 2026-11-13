"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { pixelAudio } from "@/lib/pixel-audio";

export function Navbar() {
  const [soundOn, setSoundOn] = useState(false);

  // Toggle Audio Synthesizer
  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    pixelAudio.enabled = nextState;
    if (nextState) {
      pixelAudio.playToggle(true);
    }
  };

  const handleNavClick = () => {
    if (soundOn) {
      pixelAudio.playClick();
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-40 px-3 sm:px-6 w-full flex items-center justify-between pointer-events-none select-none">
      {/* 
        1. Left Anchor: [🏠 AFIF.DEV]
      */}
      <div className="pointer-events-auto">
        <Link
          href="/"
          onClick={handleNavClick}
          className="pixel-btn bg-white hover:bg-[#fef08a] text-[#0a0a0f] inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2"
          aria-label="Return to Homepage"
        >
          {/* Pixel Home Icon */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden="true"
            className="shrink-0 -translate-y-[1px]"
          >
            <rect x="7" y="1" width="2" height="2" fill="#0A0A0F" />
            <rect x="5" y="3" width="6" height="2" fill="#0A0A0F" />
            <rect x="3" y="5" width="10" height="2" fill="#0A0A0F" />
            <rect x="1" y="7" width="14" height="2" fill="#0A0A0F" />
            <rect x="2" y="9" width="12" height="6" fill="#0A0A0F" />
            <rect x="6" y="11" width="4" height="4" fill="#FFFFFF" />
          </svg>

          <span
            className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#0a0a0f] leading-none"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            AFIF<span className="hidden xs:inline">.DEV</span>
          </span>
        </Link>
      </div>

      {/* 
        2. Center Anchor: Floating Code Pill [<> PROJECTS]
        Dead-center in viewport, jumps directly to project showcase (hidden on mobile to prevent navbar collision)
      */}
      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 hidden sm:flex">
        <a
          href="/#karya"
          onClick={handleNavClick}
          className="pixel-btn bg-white hover:bg-[#fef08a] text-[#0a0a0f] px-3 py-1.5 sm:px-3.5 sm:py-2 inline-flex items-center justify-center gap-1.5"
          title="View Projects / Quests"
          aria-label="View Projects and Case Studies"
        >
          {/* Pixel Code Diamond <> Icon */}
          <svg
            width="15"
            height="13"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden="true"
            className="shrink-0 -translate-y-[1px]"
          >
            <rect x="4" y="2" width="2" height="2" fill="#0A0A0F" />
            <rect x="2" y="4" width="2" height="2" fill="#0A0A0F" />
            <rect x="0" y="6" width="2" height="2" fill="#0A0A0F" />
            <rect x="2" y="8" width="2" height="2" fill="#0A0A0F" />
            <rect x="4" y="10" width="2" height="2" fill="#0A0A0F" />

            <rect x="10" y="2" width="2" height="2" fill="#0A0A0F" />
            <rect x="12" y="4" width="2" height="2" fill="#0A0A0F" />
            <rect x="14" y="6" width="2" height="2" fill="#0A0A0F" />
            <rect x="12" y="8" width="2" height="2" fill="#0A0A0F" />
            <rect x="10" y="10" width="2" height="2" fill="#0A0A0F" />
          </svg>

          <span
            className="hidden sm:inline text-[10px] font-bold tracking-wider uppercase text-[#0a0a0f] leading-none"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            PROJECTS
          </span>
        </a>
      </div>

      {/* 
        3. Right Anchor: High-Value Actions ([🐙 GITHUB], [💾 CV], [🔊 SFX])
      */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        {/* GitHub Link (direct to vendetta2020) */}
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleNavClick}
          className="pixel-btn bg-white hover:bg-[#fef08a] text-[#0a0a0f] px-2.5 sm:px-3 py-1.5 sm:py-2 inline-flex items-center justify-center gap-1.5"
          title="Kunjungi GitHub (@vendetta2020)"
          aria-label="GitHub @vendetta2020"
        >
          {/* Pixel GitHub Cat Icon */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden="true"
            className="shrink-0 -translate-y-[1px]"
          >
            <rect x="5" y="1" width="6" height="2" fill="#0A0A0F" />
            <rect x="3" y="3" width="10" height="2" fill="#0A0A0F" />
            <rect x="2" y="5" width="12" height="6" fill="#0A0A0F" />
            <rect x="4" y="11" width="8" height="2" fill="#0A0A0F" />
            <rect x="3" y="13" width="4" height="2" fill="#0A0A0F" />
            <rect x="9" y="13" width="4" height="2" fill="#0A0A0F" />
            <rect x="2" y="1" width="2" height="2" fill="#0A0A0F" />
            <rect x="12" y="1" width="2" height="2" fill="#0A0A0F" />
            <rect x="5" y="7" width="2" height="2" fill="#FFFFFF" />
            <rect x="9" y="7" width="2" height="2" fill="#FFFFFF" />
          </svg>

          <span
            className="hidden md:inline text-[10px] font-bold tracking-wider uppercase text-[#0a0a0f] leading-none"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            GITHUB
          </span>
        </a>

        {/* Download CV CTA Button */}
        <a
          href={siteConfig.cvUrl || "/cv.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          download
          onClick={handleNavClick}
          className="pixel-btn bg-[#fef08a] hover:bg-[#facc15] text-[#0a0a0f] px-2.5 sm:px-3.5 py-1.5 sm:py-2 inline-flex items-center justify-center gap-1.5 font-bold"
          title="Download Curriculum Vitae (CV)"
          aria-label="Download CV"
        >
          {/* Pixel Floppy Disk Icon */}
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden="true"
            className="shrink-0 -translate-y-[1px]"
          >
            <rect x="2" y="1" width="11" height="14" fill="#0A0A0F" />
            <rect x="13" y="3" width="1" height="12" fill="#0A0A0F" />
            <rect x="5" y="2" width="6" height="4" fill="#FFFFFF" />
            <rect x="8" y="3" width="2" height="2" fill="#0A0A0F" />
            <rect x="4" y="8" width="8" height="6" fill="#FFFFFF" />
            <rect x="5" y="10" width="6" height="1" fill="#0A0A0F" />
            <rect x="5" y="12" width="4" height="1" fill="#0A0A0F" />
          </svg>

          <span
            className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-[#0a0a0f] leading-none"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            CV
          </span>
        </a>

        {/* Audio Synthesizer SFX Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className={`pixel-btn transition-colors px-2 sm:px-2.5 py-1.5 sm:py-2 inline-flex items-center justify-center gap-1.5 ${
            soundOn
              ? "bg-[#4ade80] text-[#0a0a0f]"
              : "bg-white hover:bg-[#fef08a] text-[#0a0a0f]"
          }`}
          title="Toggle 8-Bit Synthesizer Sound Effects"
        >
          {/* Pixel Audio Speaker Icon */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ shapeRendering: "crispEdges" }}
            aria-hidden="true"
            className="shrink-0 -translate-y-[1px]"
          >
            <rect x="2" y="5" width="3" height="6" fill="#0A0A0F" />
            <rect x="5" y="3" width="4" height="10" fill="#0A0A0F" />
            {soundOn ? (
              <>
                <rect x="10" y="5" width="2" height="2" fill="#0A0A0F" />
                <rect x="12" y="3" width="2" height="2" fill="#0A0A0F" />
                <rect x="10" y="9" width="2" height="2" fill="#0A0A0F" />
                <rect x="12" y="11" width="2" height="2" fill="#0A0A0F" />
              </>
            ) : (
              <rect x="10" y="7" width="4" height="2" fill="#EF4444" />
            )}
          </svg>

          <span
            className="text-[9px] sm:text-[10px] font-bold text-[#0a0a0f] leading-none"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            {soundOn ? "SFX" : "MUTE"}
          </span>
        </button>
      </div>
    </header>
  );
}
