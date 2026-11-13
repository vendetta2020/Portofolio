"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { pixelAudio } from "@/lib/pixel-audio";
import avatarPoints from "@/lib/avatar-dither-points.json";

interface DitherPoint {
  x: number;
  y: number;
  t: number;
}

export function PixelDitherLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [percent, setPercent] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);

  const finishBoot = useCallback(() => {
    setIsFading((prev) => {
      if (prev) return prev;
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("afif_dither_booted", "true");
        } catch {
          // Silently ignore storage issues
        }
      }
      pixelAudio.playBootChime();

      // After scatter and fade out completes (650ms), unmount completely
      setTimeout(() => {
        setIsDismissed(true);
      }, 700);

      return true;
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Check if user already saw the loader in this session or prefers reduced motion
    const isSkipped =
      document.documentElement.classList.contains("dither-skip") ||
      (window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    if (isSkipped) {
      setIsDismissed(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Enable crisp pixel rendering
    ctx.imageSmoothingEnabled = false;

    const points: DitherPoint[] = avatarPoints as DitherPoint[];
    const gridW = 56;
    const gridH = 68;

    let animFrameId: number;
    let startTime: number | null = null;
    const totalDuration = 2400; // 2.4s to reach 100%
    const holdDuration = 450; // 450ms hold at 100%
    let hasPlayedChime = false;

    // Scatter physics state
    let scatterStartTime: number | null = null;
    const velocities = points.map((_, idx) => {
      const angle = (idx * 0.31 + idx * idx * 0.007) % (Math.PI * 2);
      const speed = 25 + (idx % 35) * 2;
      return {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });

    let lastSoundPercent = 0;

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      // Calculate progress (0.0 to 1.0)
      const rawP = Math.min(1.0, elapsed / totalDuration);
      // Ease out slightly for natural deceleration into 100%
      const p = Math.min(1.0, 1 - Math.pow(1 - rawP, 1.4));
      const currentPct = Math.min(100, Math.floor(p * 100));

      setPercent(currentPct);

      // Sound click cadence every ~15%
      if (currentPct - lastSoundPercent >= 14 && currentPct < 100) {
        pixelAudio.playClick();
        lastSoundPercent = currentPct;
      }

      // Check if animation reached completion
      if (rawP >= 1.0 && !hasPlayedChime) {
        hasPlayedChime = true;
        pixelAudio.playClick();
      }

      // Start scatter after hold
      const isHolding = rawP >= 1.0 && elapsed < totalDuration + holdDuration;
      const isScatter = elapsed >= totalDuration + holdDuration;

      if (isScatter && scatterStartTime === null) {
        scatterStartTime = now;
        setTimeout(() => {
          finishBoot();
        }, 180);
      }

      const scatterElapsed = scatterStartTime !== null ? (now - scatterStartTime) / 600 : 0;

      // Canvas dimensions and responsive cell scale
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const displayW = rect.width;
      const displayH = rect.height;

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear canvas (clean ivory background)
      ctx.clearRect(0, 0, displayW, displayH);

      // Calculate cell scale to center the portrait gracefully
      const isMobile = displayW < 640;
      const cell = isMobile ? Math.floor(Math.min(displayW / 70, 4.4)) : 5.4;
      const dot = Math.max(2.2, cell - 1.2);

      const portraitW = gridW * cell;
      const portraitH = gridH * cell;
      const originX = (displayW - portraitW) / 2;
      const originY = (displayH - portraitH) / 2;

      // Render dots
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Progressive threshold check
        if (pt.t > p && !isScatter) {
          continue;
        }

        let x = originX + pt.x * cell + (cell - dot) / 2;
        let y = originY + pt.y * cell + (cell - dot) / 2;
        let opacity = 1.0;

        if (isScatter) {
          const vel = velocities[i];
          const dist = scatterElapsed;
          x += vel.vx * dist;
          y += vel.vy * dist;
          opacity = Math.max(0, 1.0 - scatterElapsed * 1.6);
        }

        if (opacity <= 0.02) continue;

        // Draw crisp 1-bit obsidian dot
        ctx.fillStyle = `rgba(10, 10, 15, ${opacity})`;
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(dot), Math.ceil(dot));
      }

      ctx.restore();

      if (scatterElapsed < 1.0) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    animFrameId = requestAnimationFrame(render);

    // Escape or Space key listener to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        finishBoot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishBoot]);

  if (isDismissed) return null;

  return (
    <div
      id="dither-boot-overlay"
      role="dialog"
      aria-label="Loading Portrait"
      aria-modal="true"
      onClick={finishBoot}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#FAFAF9] text-[#0A0A0F] font-mono select-none cursor-pointer overflow-hidden transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 
        TOP HEADER BAR
        Minimal typographic framing 
      */}
      <header className="flex items-center justify-between px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 text-[10px] sm:text-[11px] text-[#71717A] tracking-wider uppercase border-b border-[#E4E4E7]">
        <div className="flex items-center gap-2 pb-3">
          <span className="w-2 h-2 bg-[#0A0A0F] inline-block animate-pulse" />
          <span
            className="font-bold text-[#0A0A0F]"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            AFIF.OS // BIOMETRIC POST
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 pb-3 text-[#A1A1AA]">
          <span>ALGORITHM: BAYER_8X8</span>
          <span>&bull;</span>
          <span>DITHER: 1-BIT MONOCHROME</span>
        </div>
      </header>

      {/* 
        CENTER CANVAS AREA
        Progressive Pixel Dither Portrait
      */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center p-2 sm:p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-4xl max-h-[75vh] block mx-auto pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />
      </main>

      {/* 
        BOTTOM FOOTER BAR
        Minimal percentage counter in the bottom-left corner (like Hulusi Tunç)
      */}
      <footer className="flex items-end justify-between px-4 sm:px-8 md:px-12 pl-14 sm:pl-8 pb-5 sm:pb-8 border-t border-[#E4E4E7] pt-4">
        {/* Big Minimalist Percentage Counter */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0A0A0F] leading-none"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              {String(percent).padStart(2, "0")}
            </span>
            <span
              className="text-xs sm:text-sm font-bold text-[#71717A]"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              %
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-[#A1A1AA] uppercase tracking-wider mt-1.5">
            DECODING AVATAR MATRIX &bull; TELKOM UNIVERSITY
          </span>
        </div>

        {/* Skip Affordance */}
        <div className="text-[9.5px] sm:text-[11px] font-bold text-[#71717A] hover:text-[#0A0A0F] uppercase tracking-wider hover:underline pb-1">
          [TAP / ESC TO SKIP]
        </div>
      </footer>
    </div>
  );
}
