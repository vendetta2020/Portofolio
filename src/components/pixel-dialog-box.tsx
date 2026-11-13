"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/site";
import { pixelAudio } from "@/lib/pixel-audio";

type TabKey = "profile" | "brewpos" | "gateway" | "stack";

/* =========================================================================
   AUTHENTIC 16-BIT PIXEL ART ICONS (Zero Emojis, Crisp Pixel Grid Alignment)
   ========================================================================= */

// 1. Pixel User Profile Sprite (for Profile Tab)
function IconPixelProfile({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Head */}
      <rect x="4" y="1" width="4" height="4" fill="#0A0A0F" />
      <rect x="5" y="2" width="2" height="2" fill="#3B82F6" />
      {/* Body / Torso */}
      <rect x="2" y="6" width="8" height="1" fill="#0A0A0F" />
      <rect x="1" y="7" width="10" height="4" fill="#0A0A0F" />
      <rect x="3" y="7" width="6" height="3" fill="#3B82F6" />
    </svg>
  );
}

// 2. Pixel Coffee Cup Sprite (for BrewPOS Tab)
function IconPixelCoffee({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Steam */}
      <rect x="3" y="0" width="1" height="2" fill="#D97706" />
      <rect x="6" y="0" width="1" height="2" fill="#D97706" />
      {/* Cup Body */}
      <rect x="1" y="3" width="8" height="6" fill="#0A0A0F" />
      <rect x="2" y="4" width="6" height="4" fill="#F59E0B" />
      {/* Handle */}
      <rect x="8" y="4" width="3" height="4" fill="#0A0A0F" />
      <rect x="9" y="5" width="1" height="2" fill="#ECE9D8" />
      {/* Saucer */}
      <rect x="0" y="10" width="10" height="1" fill="#0A0A0F" />
    </svg>
  );
}

// 3. Pixel Credit Card / Payment Rails Sprite (for Gateway Tab)
function IconPixelCard({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="0" y="2" width="12" height="8" fill="#0A0A0F" />
      <rect x="1" y="3" width="10" height="6" fill="#10B981" />
      <rect x="0" y="4" width="12" height="2" fill="#0A0A0F" />
      <rect x="2" y="7" width="2" height="1" fill="#FACC15" />
    </svg>
  );
}

// 4. Pixel Lightning Bolt Sprite (for Stack Tab)
function IconPixelBolt({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="5" y="0" width="3" height="1" fill="#0A0A0F" />
      <rect x="4" y="1" width="3" height="2" fill="#FACC15" />
      <rect x="3" y="3" width="4" height="2" fill="#FACC15" />
      <rect x="2" y="5" width="8" height="2" fill="#0A0A0F" />
      <rect x="3" y="5" width="6" height="1" fill="#FACC15" />
      <rect x="5" y="7" width="3" height="2" fill="#FACC15" />
      <rect x="6" y="9" width="2" height="2" fill="#FACC15" />
      <rect x="7" y="11" width="1" height="1" fill="#FACC15" />
    </svg>
  );
}

// 5. Pixel Folder Sprite (for VIEW WORK button)
function IconPixelFolder({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Folder Tab */}
      <rect x="1" y="2" width="5" height="2" fill="#0A0A0F" />
      <rect x="2" y="3" width="3" height="1" fill="#D97706" />
      {/* Folder Back */}
      <rect x="1" y="4" width="12" height="8" fill="#0A0A0F" />
      <rect x="2" y="5" width="10" height="6" fill="#F59E0B" />
      {/* Inner White Paper Sheet */}
      <rect x="3" y="3" width="8" height="4" fill="#FFFFFF" />
      <rect x="4" y="4" width="5" height="1" fill="#2563EB" />
      {/* Front Folder Lip */}
      <rect x="1" y="6" width="12" height="6" fill="#0A0A0F" />
      <rect x="2" y="7" width="10" height="4" fill="#D97706" />
    </svg>
  );
}

// 6. Pixel Blueprint / Server Rack Sprite (for ARCHITECTURE button)
function IconPixelArchitecture({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Server Unit 1 */}
      <rect x="1" y="2" width="12" height="3" fill="#0A0A0F" />
      <rect x="2" y="3" width="10" height="1" fill="#0284C7" />
      <rect x="3" y="3" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="3" width="1" height="1" fill="#22C55E" />
      {/* Server Unit 2 */}
      <rect x="1" y="6" width="12" height="3" fill="#0A0A0F" />
      <rect x="2" y="7" width="10" height="1" fill="#0284C7" />
      <rect x="3" y="7" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="7" width="1" height="1" fill="#22C55E" />
      {/* Server Unit 3 */}
      <rect x="1" y="10" width="12" height="3" fill="#0A0A0F" />
      <rect x="2" y="11" width="10" height="1" fill="#0284C7" />
      <rect x="3" y="11" width="1" height="1" fill="#FFFFFF" />
      <rect x="10" y="11" width="1" height="1" fill="#22C55E" />
    </svg>
  );
}

// 7. Pixel Floppy Diskette Sprite (for CV.PDF button)
function IconPixelFloppy({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`pixel-svg shrink-0 ${className}`}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Outer Shell */}
      <rect x="1" y="1" width="11" height="1" fill="#0A0A0F" />
      <rect x="1" y="2" width="12" height="11" fill="#0A0A0F" />
      <rect x="2" y="2" width="10" height="10" fill="#1E293B" />
      {/* Metal Shutter Slider */}
      <rect x="4" y="1" width="5" height="4" fill="#E2E8F0" />
      <rect x="5" y="2" width="2" height="2" fill="#0A0A0F" />
      {/* Paper Label */}
      <rect x="3" y="7" width="8" height="4" fill="#FFFFFF" />
      <rect x="4" y="8" width="6" height="1" fill="#2563EB" />
    </svg>
  );
}

// 8. Pixel GitHub Octocat Sprite (for GITHUB button - adapts with currentColor)
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
      {/* Ears */}
      <rect x="2" y="1" width="2" height="2" fill="currentColor" />
      <rect x="10" y="1" width="2" height="2" fill="currentColor" />
      {/* Head */}
      <rect x="1" y="3" width="12" height="6" fill="currentColor" />
      {/* Pixel Eyes - high contrast golden accents */}
      <rect x="3" y="5" width="2" height="2" fill="#FACC15" />
      <rect x="9" y="5" width="2" height="2" fill="#FACC15" />
      {/* Body & Tentacles */}
      <rect x="3" y="9" width="8" height="3" fill="currentColor" />
      <rect x="5" y="11" width="1" height="2" fill="#FACC15" />
      <rect x="8" y="11" width="1" height="2" fill="#FACC15" />
    </svg>
  );
}

// 9. Pixel Down Arrow (True 8-Bit Downward Chevron)
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
      {/* Stem from top down to arrowhead */}
      <rect x="3" y="0" width="1" height="3" fill="currentColor" />
      {/* Arrowhead pointing downward */}
      <rect x="0" y="3" width="7" height="1" fill="currentColor" />
      <rect x="1" y="4" width="5" height="1" fill="currentColor" />
      <rect x="2" y="5" width="3" height="1" fill="currentColor" />
      <rect x="3" y="6" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

// 10. Pixel Diagonal Arrow (True 8-Bit External Jump Arrow ↗)
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
      {/* Top arrowhead bar */}
      <rect x="2" y="0" width="5" height="1" fill="currentColor" />
      {/* Right arrowhead bar */}
      <rect x="6" y="1" width="1" height="4" fill="currentColor" />
      {/* Diagonal shaft from bottom-left to top-right */}
      <rect x="0" y="5" width="2" height="2" fill="currentColor" />
      <rect x="2" y="3" width="2" height="2" fill="currentColor" />
      <rect x="4" y="1" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

/* =========================================================================
   MAIN COMPONENT: RETRO WINDOWS XP SYSTEM PROPERTIES DIALOG
   ========================================================================= */

export function PixelDialogBox() {
  // Profile is the default and first tab
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  const handleTabChange = (tab: TabKey) => {
    pixelAudio.playClick();
    setActiveTab(tab);
  };

  const handleBtnClick = () => {
    pixelAudio.playClick();
  };

  return (
    <div className="relative w-full max-w-4xl lg:max-w-[960px] mx-auto flex flex-col items-center select-none">
      {/* 
        Windows XP / Retro OS Window Container
        Beveled 3px border, 6px hard pixel shadow, authentic retro titlebar & tabs
      */}
      <div className="relative w-full bg-[#ECE9D8] text-[#0A0A0F] border-[3px] border-[#0A0A0F] shadow-[6px_6px_0px_#0A0A0F]">
        {/* 
          1. Windows XP Classic Title Bar
          Deep navy to blue gradient with crisp white pixel font and control buttons
        */}
        <div className="bg-gradient-to-r from-[#0055EA] via-[#0A246A] to-[#0055EA] text-white px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between border-b-2 border-[#0A0A0F] gap-2">
          {/* Title and Icon */}
          <div className="flex items-center gap-2 min-w-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ shapeRendering: "crispEdges" }}
              aria-hidden="true"
              className="shrink-0"
            >
              <rect x="2" y="2" width="12" height="10" fill="#FFFFFF" />
              <rect x="3" y="3" width="10" height="8" fill="#3B82F6" />
              <rect x="4" y="12" width="8" height="2" fill="#0A0A0F" />
              <rect x="6" y="14" width="4" height="1" fill="#0A0A0F" />
            </svg>
            <span
              className="text-[10px] sm:text-[12px] font-bold tracking-wider text-white uppercase drop-shadow-[1px_1px_0px_#000] truncate"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              <span className="sm:hidden">AFIF.OS — SYS PROPS</span>
              <span className="hidden sm:inline">AFIF.OS — SYSTEM PROPERTIES [PROD v2.4]</span>
            </span>
          </div>

          {/* Windows XP Window Buttons: Minimize [_], Maximize [□], Close [✕] */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Minimize */}
            <button
              type="button"
              onClick={handleBtnClick}
              className="w-5 h-5 bg-[#ECE9D8] border border-[#0A0A0F] shadow-[1px_1px_0px_#0A0A0F] hover:bg-[#FEF08A] flex items-center justify-center text-[#0A0A0F] text-[10px] font-bold leading-none cursor-pointer"
              title="Minimize"
              aria-label="Minimize"
            >
              _
            </button>
            {/* Maximize */}
            <button
              type="button"
              onClick={handleBtnClick}
              className="w-5 h-5 bg-[#ECE9D8] border border-[#0A0A0F] shadow-[1px_1px_0px_#0A0A0F] hover:bg-[#FEF08A] flex items-center justify-center text-[#0A0A0F] text-[10px] font-bold leading-none cursor-pointer"
              title="Maximize"
              aria-label="Maximize"
            >
              &#9633;
            </button>
            {/* Close (Red Button) */}
            <button
              type="button"
              onClick={handleBtnClick}
              className="w-5 h-5 bg-[#EF4444] border border-[#0A0A0F] shadow-[1px_1px_0px_#0A0A0F] hover:bg-[#DC2626] flex items-center justify-center text-white text-[10px] font-bold leading-none cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              &#10005;
            </button>
          </div>
        </div>

        {/* 
          2. Windows XP Style Tab Strip
          PROFILE is the FIRST tab and DEFAULT. Balanced 1-row layout on all devices
        */}
        <div className="bg-[#D4D0C8] px-1 sm:px-2.5 pt-2 sm:pt-2.5 flex items-end gap-1 sm:gap-1.5 border-b-2 border-[#0A0A0F]">
          {/* Tab 1: Engineer Profile (FIRST & DEFAULT) */}
          <button
            type="button"
            onClick={() => handleTabChange("profile")}
            className={`flex-1 sm:flex-none px-1 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[11.5px] font-bold tracking-tight sm:tracking-wider uppercase inline-flex items-center justify-center gap-1 sm:gap-2 border-t-2 border-x-2 border-[#0A0A0F] cursor-pointer transition-all whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-white text-[#0A0A0F] -mb-[2px] pb-2 sm:pb-2.5 z-10 shadow-[0_-2px_0px_#0A0A0F]"
                : "bg-[#ECE9D8] text-[#475569] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
            }`}
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            <IconPixelProfile className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-y-[1px] shrink-0" />
            <span className="leading-none">Profile<span className="hidden xs:inline">.txt</span></span>
          </button>

          {/* Tab 2: BrewPOS */}
          <button
            type="button"
            onClick={() => handleTabChange("brewpos")}
            className={`flex-1 sm:flex-none px-1 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[11.5px] font-bold tracking-tight sm:tracking-wider uppercase inline-flex items-center justify-center gap-1 sm:gap-2 border-t-2 border-x-2 border-[#0A0A0F] cursor-pointer transition-all whitespace-nowrap ${
              activeTab === "brewpos"
                ? "bg-white text-[#0A0A0F] -mb-[2px] pb-2 sm:pb-2.5 z-10 shadow-[0_-2px_0px_#0A0A0F]"
                : "bg-[#ECE9D8] text-[#475569] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
            }`}
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            <IconPixelCoffee className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-y-[1px] shrink-0" />
            <span className="leading-none">BrewPOS<span className="hidden xs:inline">.exe</span></span>
          </button>

          {/* Tab 3: Payment Gateway */}
          <button
            type="button"
            onClick={() => handleTabChange("gateway")}
            className={`flex-1 sm:flex-none px-1 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[11.5px] font-bold tracking-tight sm:tracking-wider uppercase inline-flex items-center justify-center gap-1.5 sm:gap-2 border-t-2 border-x-2 border-[#0A0A0F] cursor-pointer transition-all whitespace-nowrap ${
              activeTab === "gateway"
                ? "bg-white text-[#0A0A0F] -mb-[2px] pb-2 sm:pb-2.5 z-10 shadow-[0_-2px_0px_#0A0A0F]"
                : "bg-[#ECE9D8] text-[#475569] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
            }`}
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            <IconPixelCard className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-y-[1px] shrink-0" />
            <span className="leading-none">Gateway<span className="hidden xs:inline">.exe</span></span>
          </button>

          {/* Tab 4: Tech Stack */}
          <button
            type="button"
            onClick={() => handleTabChange("stack")}
            className={`flex-1 sm:flex-none px-1 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[11.5px] font-bold tracking-tight sm:tracking-wider uppercase inline-flex items-center justify-center gap-1 sm:gap-2 border-t-2 border-x-2 border-[#0A0A0F] cursor-pointer transition-all whitespace-nowrap ${
              activeTab === "stack"
                ? "bg-white text-[#0A0A0F] -mb-[2px] pb-2 sm:pb-2.5 z-10 shadow-[0_-2px_0px_#0A0A0F]"
                : "bg-[#ECE9D8] text-[#475569] hover:bg-[#FEF08A] hover:text-[#0A0A0F]"
            }`}
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            <IconPixelBolt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-y-[1px] shrink-0" />
            <span className="leading-none">Stack<span className="hidden xs:inline">.ini</span></span>
          </button>
        </div>

        {/* 
          3. Tab Content Pane (Generous, readable padding with sharp contrast)
        */}
        <div className="bg-white p-4 sm:p-5 md:p-6 min-h-[160px] flex flex-col justify-between">
          {/* TAB 1: PROFILE (DEFAULT) */}
          {activeTab === "profile" && (
            <div className="space-y-3 text-left animate-fadeIn">
              <div className="pb-2 border-b border-[#0A0A0F]/15">
                <div>
                  <div className="flex items-center gap-2">
                    <IconPixelProfile className="w-4 h-4 shrink-0 -translate-y-[1px]" />
                    <h3
                      className="text-[13px] sm:text-[15px] font-bold text-[#0A0A0F] uppercase tracking-wide leading-none"
                      style={{ fontFamily: "var(--font-pixel-arcade)" }}
                    >
                      Afif Fakhriyadh Asri
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] sm:text-[12px] text-[#2563EB] font-bold mt-1 ml-6">
                    Telkom University Informatics Student &bull; Bandung, Indonesia
                  </p>
                </div>
              </div>

              <p className="font-mono text-[12.5px] sm:text-[13.5px] text-[#334155] leading-relaxed">
                Backend &amp; Fullstack Engineer focused on building resilient web software, concurrency-safe database architectures, and automated financial transaction pipelines. Proven track record eliminating race conditions and testing critical paths thoroughly.
              </p>

              <div className="pt-2.5 border-t border-dashed border-[#0A0A0F]/15 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#475569]">
                  Contact: <strong className="text-[#0A0A0F]">{siteConfig.email}</strong>
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.cvUrl || "/cv.pdf"}
                    target="_blank"
                    download
                    onClick={handleBtnClick}
                    className="font-bold text-[#059669] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Download CV</span>
                    <IconPixelDownArrow className="w-2.5 h-2.5 text-[#059669] -translate-y-[0.5px]" />
                  </a>
                  <span className="text-[#94A3B8]">&bull;</span>
                  <a
                    href="https://www.linkedin.com/in/afif-fakhriyadh-asri"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleBtnClick}
                    className="font-bold text-[#0A0A0F] hover:text-[#2563EB] inline-flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-[#0A0A0F] -translate-y-[0.5px]" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BREWPOS */}
          {activeTab === "brewpos" && (
            <div className="space-y-3 text-left animate-fadeIn">
              <div className="pb-2 border-b border-[#0A0A0F]/15">
                <div>
                  <div className="flex items-center gap-2">
                    <IconPixelCoffee className="w-4 h-4 shrink-0 -translate-y-[1px]" />
                    <h3
                      className="text-[13px] sm:text-[15px] font-bold text-[#0A0A0F] uppercase tracking-wide leading-none"
                      style={{ fontFamily: "var(--font-pixel-arcade)" }}
                    >
                      BrewPOS — Coffee POS &amp; Real-Time KDS
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] sm:text-[12px] text-[#4338CA] font-bold mt-1 ml-6">
                    Laravel 11 &bull; Livewire 3 &bull; Alpine.js &bull; MySQL 8
                  </p>
                </div>
              </div>

              <p className="font-mono text-[12.5px] sm:text-[13.5px] text-[#334155] leading-relaxed">
                Full-stack coffee shop POS engineered for high-concurrency checkout. Employs pessimistic row locking (<code className="text-[#0A0A0F] font-bold bg-[#FEF3C7] px-1">SELECT FOR UPDATE</code>) and database check constraints to prevent stock race conditions, coupled with live barista kitchen ticketing.
              </p>

              <div className="pt-2.5 border-t border-dashed border-[#0A0A0F]/15 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#059669] font-bold">
                  ✓ 60 Tests (380 Assertions)
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="#karya"
                    onClick={handleBtnClick}
                    className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>View Case Study</span>
                    <IconPixelDownArrow className="w-2.5 h-2.5 text-[#2563EB] -translate-y-[0.5px]" />
                  </a>
                  <span className="text-[#94A3B8]">&bull;</span>
                  <a
                    href="https://github.com/vendetta2020/BrewPOS"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleBtnClick}
                    className="font-bold text-[#0A0A0F] hover:text-[#2563EB] inline-flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-[#0A0A0F] -translate-y-[0.5px]" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT GATEWAY */}
          {activeTab === "gateway" && (
            <div className="space-y-3 text-left animate-fadeIn">
              <div className="pb-2 border-b border-[#0A0A0F]/15">
                <div>
                  <div className="flex items-center gap-2">
                    <IconPixelCard className="w-4 h-4 shrink-0 -translate-y-[1px]" />
                    <h3
                      className="text-[13px] sm:text-[15px] font-bold text-[#0A0A0F] uppercase tracking-wide leading-none"
                      style={{ fontFamily: "var(--font-pixel-arcade)" }}
                    >
                      Modular Payment Gateway &amp; Merchant Rails
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] sm:text-[12px] text-[#047857] font-bold mt-1 ml-6">
                    NestJS &bull; TypeScript &bull; PostgreSQL &bull; Next.js &bull; Redis
                  </p>
                </div>
              </div>

              <p className="font-mono text-[12.5px] sm:text-[13.5px] text-[#334155] leading-relaxed">
                Multi-tenant financial transaction rails with strict mathematical idempotency (<code className="text-[#0A0A0F] font-bold bg-[#DCFCE7] px-1">Idempotency-Key</code>) preventing duplicate network charges. Features an anti-SSRF webhook dispatcher, ACID state machines, and O(N+M) ledger reconciliation.
              </p>

              <div className="pt-2.5 border-t border-dashed border-[#0A0A0F]/15 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#059669] font-bold">
                  ✓ 222 Automated Tests (123 Unit + 99 E2E)
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="#karya"
                    onClick={handleBtnClick}
                    className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>View Case Study</span>
                    <IconPixelDownArrow className="w-2.5 h-2.5 text-[#2563EB] -translate-y-[0.5px]" />
                  </a>
                  <span className="text-[#94A3B8]">&bull;</span>
                  <a
                    href="https://github.com/vendetta2020/PaymentGateway_Sandbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleBtnClick}
                    className="font-bold text-[#0A0A0F] hover:text-[#2563EB] inline-flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-[#0A0A0F] -translate-y-[0.5px]" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TECH STACK */}
          {activeTab === "stack" && (
            <div className="space-y-3 text-left animate-fadeIn">
              <div className="pb-2 border-b border-[#0A0A0F]/15">
                <div className="flex items-center gap-2">
                  <IconPixelBolt className="w-4 h-4 shrink-0 -translate-y-[1px]" />
                  <h3
                    className="text-[13px] sm:text-[15px] font-bold text-[#0A0A0F] uppercase tracking-wide leading-none"
                    style={{ fontFamily: "var(--font-pixel-arcade)" }}
                  >
                    Core Production Stack &amp; Tooling
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-[11.5px] text-[#334155]">
                <div className="p-2 bg-[#F8FAFC] border border-[#0A0A0F]">
                  <strong className="block text-[#0A0A0F] text-[10.5px] uppercase font-bold">Backend</strong>
                  <span>Laravel 11, NestJS, Node.js, Express</span>
                </div>
                <div className="p-2 bg-[#F8FAFC] border border-[#0A0A0F]">
                  <strong className="block text-[#0A0A0F] text-[10.5px] uppercase font-bold">Databases</strong>
                  <span>PostgreSQL, MySQL 8, Redis, TypeORM</span>
                </div>
                <div className="p-2 bg-[#F8FAFC] border border-[#0A0A0F]">
                  <strong className="block text-[#0A0A0F] text-[10.5px] uppercase font-bold">Frontend</strong>
                  <span>Next.js App Router, Livewire 3, Alpine.js</span>
                </div>
                <div className="p-2 bg-[#F8FAFC] border border-[#0A0A0F]">
                  <strong className="block text-[#0A0A0F] text-[10.5px] uppercase font-bold">DevOps</strong>
                  <span>Docker, Git, CI/CD, Linux CLI</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-dashed border-[#0A0A0F]/15 flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#059669] font-bold">
                  Zero Runtime Dependencies in SFX &bull; Canvas Bayer Dither
                </span>
                <a
                  href="#arsitektur"
                  onClick={handleBtnClick}
                  className="font-bold text-[#2563EB] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>View Interactive Architecture</span>
                  <IconPixelDownArrow className="w-2.5 h-2.5 text-[#2563EB] -translate-y-[0.5px]" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 
          4. Windows XP Dialog Button Row
          Each button has its pixel art logo and text perfectly centered both vertically & horizontally
        */}
        <div className="bg-[#ECE9D8] px-4 py-3 border-t-2 border-[#0A0A0F] flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
          {/* Button 1: VIEW WORK */}
          <a
            href="#karya"
            onClick={handleBtnClick}
            className="pixel-btn bg-[#FEF08A] hover:bg-[#FACC15] text-[#0A0A0F] px-4 py-2 text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelFolder className="w-3.5 h-3.5 text-[#0A0A0F] -translate-y-[1.5px]" />
            <span className="leading-none">VIEW WORK</span>
            <IconPixelDownArrow className="w-2.5 h-2.5 text-[#0A0A0F] -translate-y-[1.5px]" />
          </a>

          {/* Button 2: ARCHITECTURE */}
          <a
            href="#arsitektur"
            onClick={handleBtnClick}
            className="pixel-btn bg-white hover:bg-[#FEF08A] text-[#0A0A0F] px-4 py-2 text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelArchitecture className="w-3.5 h-3.5 text-[#0A0A0F] -translate-y-[1.5px]" />
            <span className="leading-none">ARCHITECTURE</span>
            <IconPixelDownArrow className="w-2.5 h-2.5 text-[#0A0A0F] -translate-y-[1.5px]" />
          </a>

          {/* Button 3: CV.PDF */}
          <a
            href={siteConfig.cvUrl || "/cv.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={handleBtnClick}
            className="pixel-btn bg-[#4ADE80] hover:bg-[#22C55E] text-[#0A0A0F] px-4 py-2 text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelFloppy className="w-3.5 h-3.5 text-[#0A0A0F] -translate-y-[1.5px]" />
            <span className="leading-none">CV.PDF</span>
          </a>

          {/* Button 4: GITHUB */}
          <a
            href={siteConfig.github || "https://github.com/vendetta2020"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBtnClick}
            className="pixel-btn bg-[#0A0A0F] hover:bg-[#1E1B4B] text-white px-4 py-2 text-[10.5px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2"
          >
            <IconPixelGitHub className="w-3.5 h-3.5 text-white -translate-y-[1.5px]" />
            <span className="leading-none">GITHUB</span>
            <IconPixelDiagonalArrow className="w-2.5 h-2.5 text-white -translate-y-[1.5px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
