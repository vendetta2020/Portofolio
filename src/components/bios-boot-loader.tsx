"use client";

import React, { useState, useEffect, useCallback } from "react";
import { pixelAudio } from "@/lib/pixel-audio";

interface PostLine {
  text: string;
  badge?: string;
  badgeColor?: string;
}

const BOOT_LINES: PostLine[] = [
  {
    text: ">> AFIF.OS BIOS v2.4 // POST CHECK",
    badge: "[BOOT]",
    badgeColor: "text-[#38BDF8]",
  },
  {
    text: ">> CPU CONCURRENCY ENGINE ....................",
    badge: "64-BIT [OK]",
    badgeColor: "text-[#4ADE80]",
  },
  {
    text: ">> MEMORY: 640KB BASE + 15MB EXTENDED .........",
    badge: "PASS [OK]",
    badgeColor: "text-[#4ADE80]",
  },
  {
    text: ">> ACID ROW LOCKING (POSTGRESQL + MYSQL) ......",
    badge: "ACTIVE",
    badgeColor: "text-[#FACC15]",
  },
  {
    text: ">> MATHEMATICAL IDEMPOTENCY ENGINE ............",
    badge: "100% RECONCILED",
    badgeColor: "text-[#4ADE80]",
  },
  {
    text: ">> TRANSACTION BUS (BREWPOS <-> GATEWAY) ......",
    badge: "ONLINE",
    badgeColor: "text-[#38BDF8]",
  },
  {
    text: ">> MOUNTING RUNTIME ASSETS: [■■■■■■■■■■] .......",
    badge: "100%",
    badgeColor: "text-[#FACC15]",
  },
  {
    text: ">> SYSTEM READY. WELCOME PLAYER 01!",
    badge: "[START]",
    badgeColor: "text-[#22C55E]",
  },
];

export function BiosBootLoader() {
  // Start with visibleLines = 1 so the BIOS header and terminal are rendered on SSR frame 0
  const [visibleLines, setVisibleLines] = useState<number>(1);
  const [isFadingHud, setIsFadingHud] = useState<boolean>(false);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const finishBoot = useCallback(() => {
    setIsFadingHud(true);
    setIsSplitting((prev) => {
      if (prev) return prev;
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("afif_bios_booted", "true");
        } catch {
          // Silently ignore storage issues
        }
      }
      pixelAudio.playBootChime();

      // After curtain split animation completes (650ms), unmount completely
      setTimeout(() => {
        setIsDismissed(true);
      }, 700);

      return true;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if user already saw the boot sequence in this session (or prefers reduced motion)
    const isSkipped =
      document.documentElement.classList.contains("bios-skip") ||
      (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (isSkipped) {
      setIsDismissed(true);
      return;
    }

    // Paced line progression (longer & more readable retro arcade cadence)
    // Line 1 is already visible from SSR frame 0
    const lineIntervals = [
      { line: 2, delay: 280 },
      { line: 3, delay: 580 },
      { line: 4, delay: 880 },
      { line: 5, delay: 1180 },
      { line: 6, delay: 1480 },
      { line: 7, delay: 1800 },
      { line: 8, delay: 2150 },
    ];
    const timers: NodeJS.Timeout[] = [];

    lineIntervals.forEach(({ line, delay }) => {
      const timer = setTimeout(() => {
        setVisibleLines(line);
        pixelAudio.playClick();
      }, delay);
      timers.push(timer);
    });

    // Fade out HUD cleanly before parting curtains
    const fadeTimer = setTimeout(() => {
      setIsFadingHud(true);
    }, 2720);
    timers.push(fadeTimer);

    // Auto finish and split curtain at ~2920ms (giving 570ms to savor "SYSTEM READY")
    const finishTimer = setTimeout(() => {
      finishBoot();
    }, 2920);
    timers.push(finishTimer);

    // Escape or Space key listener to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        timers.forEach((t) => clearTimeout(t));
        finishBoot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot]);

  if (isDismissed) return null;

  return (
    <div
      id="bios-boot-overlay"
      role="dialog"
      aria-label="System Initializing"
      aria-modal="true"
      onClick={finishBoot}
      className="fixed inset-0 z-50 overflow-hidden select-none cursor-pointer"
    >
      {/* 
        TOP CURTAIN HALF 
        Slides straight UP (-100% translateY) when boot completes
      */}
      <div
        className={`absolute inset-x-0 top-0 h-[50.5vh] bg-[#070A0F] border-b-2 border-[#22C55E]/50 ${
          isSplitting ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          willChange: "transform",
          transition: isSplitting
            ? "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      />

      {/* 
        BOTTOM CURTAIN HALF 
        Slides straight DOWN (+100% translateY) when boot completes
      */}
      <div
        className={`absolute inset-x-0 bottom-0 h-[50.5vh] bg-[#070A0F] border-t-2 border-[#22C55E]/50 ${
          isSplitting ? "translate-y-full" : "translate-y-0"
        }`}
        style={{
          willChange: "transform",
          transition: isSplitting
            ? "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      />

      {/* 
        CENTER TERMINAL HUD CONTENT
        Positioned fixed in viewport, fades out smoothly before blast doors part
      */}
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono pointer-events-auto transition-all duration-200 ${
          isFadingHud
            ? "opacity-0 scale-[0.98] pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] border-b border-[#1E293B] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#22C55E] inline-block animate-ping" />
            <span
              className="text-[#4ADE80] font-bold tracking-wider"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              AFIF.OS // ARCADE BIOS
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] text-[#94A3B8]">
            <span className="hidden sm:inline">ARCHITECTURE: 64-BIT</span>
            <span>&bull;</span>
            <span className="text-[#FACC15]">MODE: HARDWARE_POST</span>
          </div>
        </div>

        {/* Central POST Diagnostics Feed */}
        <div className="max-w-3xl mx-auto w-full my-auto space-y-2 py-4">
          <div className="bg-[#0B0F19] border-2 border-[#1E293B] shadow-[6px_6px_0px_#000] p-3 sm:p-6 space-y-2 text-[10px] sm:text-[12px] leading-relaxed">
            {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 font-mono text-[#E2E8F0]"
              >
                <span className="truncate">{line.text}</span>
                {line.badge && (
                  <span
                    className={`shrink-0 font-bold ${
                      line.badgeColor || "text-[#22C55E]"
                    }`}
                  >
                    {line.badge}
                  </span>
                )}
              </div>
            ))}

            {/* Blinking Cursor at the prompt */}
            {visibleLines < BOOT_LINES.length && (
              <div className="flex items-center gap-1 text-[#22C55E]">
                <span>&gt;&gt;</span>
                <span className="inline-block w-2.5 h-3.5 bg-[#22C55E] animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Terminal Footer Bar with Escape/Click affordance */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] border-t border-[#1E293B] pt-3 pb-4 sm:pb-0 gap-2">
          <div className="flex items-center gap-2 text-[#94A3B8] min-w-0">
            <span className="w-1.5 h-1.5 bg-[#FACC15] inline-block shrink-0" />
            <span className="truncate">INITIALIZING HIGH-CONCURRENCY ENVIRONMENT...</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#FDE047] font-bold hover:underline cursor-pointer shrink-0">
            <span className="text-[9.5px] sm:text-[11px] uppercase tracking-wider">
              [TAP / ESC TO SKIP]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
