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
    text: ">> AFIF.OS BIOS v2.4 (C) 2026 // HARDWARE POST CHECK",
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
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  const finishBoot = useCallback(() => {
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

      // After curtain split animation completes, unmount completely
      setTimeout(() => {
        setMounted(false);
      }, 500);

      return true;
    });
  }, []);

  useEffect(() => {
    // 1. Check if user already saw the boot sequence in this session
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const forceReplay = urlParams.get("boot") === "1";
      const forceSkip = urlParams.get("noboot") === "1";
      const isDev = process.env.NODE_ENV === "development";
      const hasBooted = sessionStorage.getItem("afif_bios_booted");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (forceSkip || prefersReducedMotion) {
        return;
      }

      // In production (Vercel), only show once per tab session.
      // In development (localhost), allow showing on refresh so you can preview changes immediately.
      if (!isDev && hasBooted && !forceReplay) {
        return;
      }

      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Line stepped progression
    const lineIntervals = [0, 140, 280, 420, 560, 700, 840, 980];
    const timers: NodeJS.Timeout[] = [];

    lineIntervals.forEach((delay, idx) => {
      const timer = setTimeout(() => {
        setVisibleLines(idx + 1);
        pixelAudio.playClick();
      }, delay);
      timers.push(timer);
    });

    // Auto finish and split curtain at ~1200ms
    const finishTimer = setTimeout(() => {
      finishBoot();
    }, 1220);
    timers.push(finishTimer);

    // Escape key listener to skip
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
  }, [mounted, finishBoot]);

  if (!mounted) return null;

  return (
    <div
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
            ? "transform 480ms cubic-bezier(0.16, 1, 0.3, 1)"
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
            ? "transform 480ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        }}
      />

      {/* 
        CENTER TERMINAL HUD CONTENT
        Positioned fixed in viewport, fades out smoothly as curtains part
      */}
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12 font-mono pointer-events-auto ${
          isSplitting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          transition: isSplitting ? "opacity 160ms linear" : "none",
        }}
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
          <div className="bg-[#0B0F19] border-2 border-[#1E293B] shadow-[6px_6px_0px_#000] p-4 sm:p-6 space-y-2 text-[10px] sm:text-[12px] leading-relaxed">
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
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#64748B] border-t border-[#1E293B] pt-3">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span className="w-1.5 h-1.5 bg-[#FACC15] inline-block" />
            <span>INITIALIZING HIGH-CONCURRENCY ENVIRONMENT...</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#FDE047] font-bold hover:underline cursor-pointer">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider">
              [CLICK / ESC TO SKIP]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
