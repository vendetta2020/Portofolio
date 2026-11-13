"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LiveClock } from "./live-clock";
import { siteConfig } from "@/lib/site";
import { pixelAudio } from "@/lib/pixel-audio";

/* =========================================================================
   FOOTER PIXEL ART ICONS & AVATAR
   ========================================================================= */

function IconPixelHeart({ className = "w-3 h-3 text-[#EF4444]" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="1" y="0" width="3" height="1" fill="currentColor" />
      <rect x="6" y="0" width="3" height="1" fill="currentColor" />
      <rect x="0" y="1" width="5" height="3" fill="currentColor" />
      <rect x="5" y="1" width="5" height="3" fill="currentColor" />
      <rect x="1" y="4" width="8" height="2" fill="currentColor" />
      <rect x="2" y="6" width="6" height="1" fill="currentColor" />
      <rect x="3" y="7" width="4" height="1" fill="currentColor" />
      <rect x="4" y="8" width="2" height="1" fill="currentColor" />
      <rect x="2" y="1" width="1" height="1" fill="#FFFFFF" />
    </svg>
  );
}

function IconPixelCopy({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="3" y="0" width="4" height="2" fill="currentColor" />
      <rect x="1" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="3" y="4" width="4" height="1" fill="currentColor" />
      <rect x="3" y="6" width="4" height="1" fill="currentColor" />
    </svg>
  );
}

function PixelAvatarAfif({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="16" height="16" fill="#1E1B4B" />
      <rect x="4" y="2" width="8" height="3" fill="#0A0A0F" />
      <rect x="3" y="3" width="2" height="4" fill="#0A0A0F" />
      <rect x="11" y="3" width="2" height="4" fill="#0A0A0F" />
      <rect x="5" y="4" width="6" height="6" fill="#FBBF24" />
      <rect x="4" y="5" width="8" height="4" fill="#FBBF24" />
      <rect x="4" y="6" width="3" height="2" fill="#0A0A0F" />
      <rect x="9" y="6" width="3" height="2" fill="#0A0A0F" />
      <rect x="7" y="6" width="2" height="1" fill="#0A0A0F" />
      <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="6" width="1" height="1" fill="#FFFFFF" />
      <rect x="7" y="9" width="2" height="1" fill="#92400E" />
      <rect x="6" y="10" width="4" height="2" fill="#FBBF24" />
      <rect x="2" y="11" width="12" height="5" fill="#2563EB" />
      <rect x="4" y="12" width="8" height="4" fill="#1D4ED8" />
      <rect x="7" y="13" width="2" height="2" fill="#FEF08A" />
    </svg>
  );
}

function IconPixelMail({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="14" height="10" fill="#0A0A0F" />
      <rect x="1" y="1" width="12" height="8" fill="#FFFFFF" />
      <rect x="2" y="2" width="2" height="1" fill="#2563EB" />
      <rect x="10" y="2" width="2" height="1" fill="#2563EB" />
      <rect x="4" y="3" width="6" height="1" fill="#2563EB" />
      <rect x="5" y="4" width="4" height="1" fill="#2563EB" />
      <rect x="6" y="5" width="2" height="1" fill="#2563EB" />
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

function IconPixelLinkedIn({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="12" height="12" fill="#0A0A0F" />
      <rect x="2" y="2" width="10" height="10" fill="#0A66C2" />
      {/* "i" dot & stem */}
      <rect x="4" y="4" width="1" height="1" fill="#FFFFFF" />
      <rect x="4" y="6" width="1" height="4" fill="#FFFFFF" />
      {/* "n" stem & curve */}
      <rect x="6" y="6" width="1" height="4" fill="#FFFFFF" />
      <rect x="7" y="6" width="2" height="1" fill="#FFFFFF" />
      <rect x="9" y="7" width="1" height="3" fill="#FFFFFF" />
    </svg>
  );
}

function IconPixelInstagram({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Outer camera body */}
      <rect x="2" y="1" width="10" height="12" fill="#0A0A0F" />
      <rect x="1" y="2" width="12" height="10" fill="#0A0A0F" />
      {/* Colorful retro sunset gradient fill */}
      <rect x="2" y="2" width="10" height="10" fill="#E1306C" />
      <rect x="2" y="7" width="10" height="5" fill="#F77737" />
      <rect x="2" y="10" width="10" height="2" fill="#FCAF45" />
      {/* White camera lens ring */}
      <rect x="4" y="4" width="6" height="6" fill="#0A0A0F" />
      <rect x="5" y="5" width="4" height="4" fill="#FFFFFF" />
      <rect x="6" y="6" width="2" height="2" fill="#E1306C" />
      {/* Flash dot top right */}
      <rect x="9" y="3" width="2" height="2" fill="#FFFFFF" />
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

function IconPixelTopArrow({ className = "w-2.5 h-2.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="3" y="0" width="1" height="1" fill="currentColor" />
      <rect x="2" y="1" width="3" height="1" fill="currentColor" />
      <rect x="1" y="2" width="5" height="1" fill="currentColor" />
      <rect x="0" y="3" width="7" height="1" fill="currentColor" />
      <rect x="3" y="4" width="1" height="3" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    pixelAudio.playClick();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    pixelAudio.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full min-h-[100dvh] flex flex-col justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto select-none">
      <div id="kontak" />
      {/* 
        Game Over / Arcade Terminal Enclosure
      */}
      <div className="bg-[#ECE9D8] border-[3px] border-[#0A0A0F] shadow-[8px_8px_0px_#0A0A0F] p-6 sm:p-8 md:p-10 space-y-8">
        {/* Terminal Header */}
        <div className="bg-[#0A246A] text-white px-2.5 sm:px-3 py-1.5 flex items-center justify-between border-2 border-[#0A0A0F] gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 bg-[#22C55E] border border-black inline-block animate-pulse shrink-0" />
            <span
              className="text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider truncate"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              <span className="sm:hidden">[03] COMMUNICATOR</span>
              <span className="hidden sm:inline">[03] STAGE COMPLETE // COMMUNICATOR TERMINAL</span>
            </span>
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#93C5FD] shrink-0 font-bold">
            <span className="sm:hidden">READY</span>
            <span className="hidden sm:inline">READY FOR INCOMING SIGNALS</span>
          </span>
        </div>

        {/* Main Content: 12-Column Grid (Left: Big Heading & Bio, Right: Arcade Character Dossier Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols): Heading & Description */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-block px-3 py-1 bg-[#FEF08A] border-2 border-[#0A0A0F] shadow-[2px_2px_0_#0A0A0F]">
              <span
                className="text-[11px] sm:text-[12px] font-bold text-[#0A0A0F] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                ✦ PRESS START TO CONNECT ✦
              </span>
            </div>

            <h2
              className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl text-[#0A0A0F] tracking-tight uppercase leading-[1.12] sm:leading-[0.95] font-bold"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              LET&apos;S BUILD SOMETHING RESILIENT.
            </h2>

            <p className="font-mono text-[13px] sm:text-[13.5px] text-[#334155] leading-relaxed">
              Open to full-time Backend and Fullstack engineering roles focusing on high-concurrency systems, financial transaction rails, and database integrity. Available worldwide for remote, hybrid, or on-site opportunities.
            </p>
          </div>

          {/* Right Column (5 cols): Arcade Character Dossier / Player 01 Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B0F19] border-[3px] border-[#0A0A0F] shadow-[6px_6px_0_#0A0A0F] p-4 text-white font-mono text-xs space-y-3">
              {/* Card Titlebar */}
              <div className="bg-[#1E1B4B] border border-[#38BDF8] px-3 py-1.5 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#22C55E] inline-block animate-pulse" />
                  <span
                    className="text-[#FEF08A] font-bold uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-pixel-arcade)" }}
                  >
                    PLAYER 01 // DOSSIER
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <IconPixelHeart className="w-2.5 h-2.5 text-[#EF4444]" />
                  <IconPixelHeart className="w-2.5 h-2.5 text-[#EF4444]" />
                  <IconPixelHeart className="w-2.5 h-2.5 text-[#EF4444]" />
                  <span className="text-[#93C5FD] font-bold ml-1">LVL 99</span>
                </div>
              </div>

              {/* Character Header: Avatar + Identity */}
              <div className="flex items-center gap-3 bg-[#111827] p-2.5 border border-[#374151]">
                <div className="border-2 border-[#FEF08A] p-0.5 bg-black shrink-0 shadow-[2px_2px_0_#0A0A0F]">
                  <Image
                    src="/images/afif-avatar.png"
                    alt="Afif Fakhriyadh"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover pixel-perfect block"
                    priority
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <h3
                    className="text-[11px] sm:text-[13px] font-bold text-[#FEF08A] tracking-normal sm:tracking-wider uppercase leading-tight"
                    style={{ fontFamily: "var(--font-pixel-arcade)" }}
                  >
                    AFIF FAKHRIYADH
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-[#93C5FD] font-bold">
                    Telkom University Informatics Student
                  </p>
                </div>
              </div>

              {/* RPG Stat Attributes */}
              <div className="space-y-1.5 text-[10.5px]">
                <div className="bg-[#1F2937] p-2 border border-[#374151] flex items-start justify-between gap-2">
                  <span className="text-[#9CA3AF] shrink-0 uppercase text-[9.5px]">ROLE:</span>
                  <span className="text-[#FDE047] font-bold text-right">Backend &amp; Concurrency Architect</span>
                </div>
                <div className="bg-[#1F2937] p-2 border border-[#374151] flex items-start justify-between gap-2">
                  <span className="text-[#9CA3AF] shrink-0 uppercase text-[9.5px]">SPECIALTY:</span>
                  <span className="text-[#6EE7B7] font-bold text-right">ACID Row Locking • Idempotency</span>
                </div>
                <div className="bg-[#1F2937] p-2 border border-[#374151] flex items-start justify-between gap-2">
                  <span className="text-[#9CA3AF] shrink-0 uppercase text-[9.5px]">LOCATION:</span>
                  <span className="text-[#BAE6FD] font-bold text-right">Bandung, ID (Remote / Hybrid)</span>
                </div>
              </div>

              {/* Quick Interactive Copy Email CTA */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`w-full pixel-btn py-2 px-2 uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  copied
                    ? "bg-[#22C55E] text-[#0A0A0F]"
                    : "bg-[#FEF08A] hover:bg-[#FACC15] text-[#0A0A0F]"
                }`}
                title={`Click to copy ${siteConfig.email} to clipboard`}
              >
                <IconPixelCopy className="w-3 h-3 text-[#0A0A0F] shrink-0 -translate-y-[0.5px]" />
                <span
                  style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "10.5px" }}
                  className="font-bold tracking-tight whitespace-nowrap leading-none"
                >
                  {copied ? "✓ COPIED TO CLIPBOARD!" : `COPY: ${siteConfig.email}`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Email CTA Button */}
          <a
            href={`mailto:${siteConfig.email}`}
            onClick={() => pixelAudio.playClick()}
            className="pixel-btn bg-[#FEF08A] hover:bg-[#FACC15] text-[#0A0A0F] px-4 py-2.5 text-[11px] font-bold uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelMail className="w-3.5 h-3.5 shrink-0 -translate-y-[1px]" />
            <span className="leading-none">SEND EMAIL</span>
          </a>

          {/* GitHub CTA Button */}
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pixelAudio.playClick()}
            className="pixel-btn bg-[#0A0A0F] hover:bg-[#1E1B4B] text-white px-4 py-2.5 text-[11px] font-bold uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelGitHub className="w-3.5 h-3.5 text-white shrink-0 -translate-y-[1px]" />
            <span className="leading-none">GITHUB</span>
            <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-white shrink-0 -translate-y-[1px]" />
          </a>

          {/* LinkedIn CTA Button */}
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pixelAudio.playClick()}
            className="pixel-btn bg-white hover:bg-[#FEF08A] text-[#0A0A0F] px-4 py-2.5 text-[11px] font-bold uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelLinkedIn className="w-3.5 h-3.5 shrink-0 -translate-y-[1px]" />
            <span className="leading-none">LINKEDIN</span>
            <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-[#0A0A0F] shrink-0 -translate-y-[1px]" />
          </a>

          {/* Instagram CTA Button */}
          <a
            href={siteConfig.instagram || "https://instagram.com/nocentdumpp"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => pixelAudio.playClick()}
            className="pixel-btn bg-[#E1306C] hover:bg-[#C13584] text-white px-4 py-2.5 text-[11px] font-bold uppercase inline-flex items-center justify-center gap-2"
            title="Follow on Instagram @nocentdumpp"
            aria-label="Instagram @nocentdumpp"
          >
            <IconPixelInstagram className="w-3.5 h-3.5 shrink-0 -translate-y-[1px]" />
            <span className="leading-none">INSTAGRAM</span>
            <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-white shrink-0 -translate-y-[1px]" />
          </a>

          {/* Scroll to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="pixel-btn bg-[#D4D0C8] hover:bg-[#FEF08A] text-[#0A0A0F] px-3.5 py-2.5 text-[10px] font-bold uppercase inline-flex items-center justify-center gap-1.5 sm:ml-auto cursor-pointer"
          >
            <IconPixelTopArrow className="w-2.5 h-2.5 shrink-0 -translate-y-[1px]" />
            <span className="leading-none">TOP</span>
          </button>
        </div>

        {/* Bottom Hardware Diagnostic Status Strip */}
        <div className="pt-6 border-t-2 border-[#0A0A0F]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] text-[#475569]">
          <div className="flex items-center gap-2">
            <span>{siteConfig.location}</span>
            <span>&bull;</span>
            <LiveClock />
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[#0A0A0F] font-bold">REVISION: 2.0 PIXEL EDITION</span>
            <span className="hidden xs:inline">&bull;</span>
            <span>&copy; 2026 {siteConfig.name}.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
