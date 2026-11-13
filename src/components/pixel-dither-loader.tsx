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
    const gridW = 72;
    const gridH = 82;

    let animFrameId: number;
    let startTime: number | null = null;
    const totalDuration = 2400; // 2.4s to reach 100%
    const holdDuration = 320; // 320ms hold at 100% before explosive detonation
    let hasPlayedChime = false;

    // Radial explosive scatter physics state
    let scatterStartTime: number | null = null;
    const centerX = gridW / 2;
    const centerY = gridH / 2;

    const velocities = points.map((pt, idx) => {
      const dx = pt.x - centerX;
      const dy = pt.y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const baseAngle = Math.atan2(dy, dx);

      // Organic spread jitter (+/- 0.35 rad)
      const jitter = ((idx * 7919) % 100) / 100 - 0.5;
      const angle = baseAngle + jitter * 0.75;

      // High-velocity explosion speed in px/sec: 500 to 1400 px/sec across viewport
      const baseSpeed = 500 + ((idx * 104729) % 800);
      const speed = baseSpeed * (0.85 + (dist / 32) * 0.45);

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

      // Start explosive scatter after hold
      const isHolding = rawP >= 1.0 && elapsed < totalDuration + holdDuration;
      const isScatter = elapsed >= totalDuration + holdDuration;

      if (isScatter && scatterStartTime === null) {
        scatterStartTime = now;
        // Let the explosion visibly shoot across the screen for 380ms before starting crossfade
        setTimeout(() => {
          finishBoot();
        }, 380);
      }

      // Elapsed scatter time in seconds (0.0 to ~0.9s)
      const scatterElapsedSec = scatterStartTime !== null ? (now - scatterStartTime) / 1000 : 0;

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

      // Clear canvas (deep midnight background)
      ctx.clearRect(0, 0, displayW, displayH);

      // Calculate cell scale to center the portrait gracefully
      const isMobile = displayW < 640;
      const cell = isMobile
        ? Math.max(3.2, Math.floor(Math.min((displayW - 32) / gridW, 4.4)))
        : Math.min(5.4, Math.max(4.0, Math.floor((displayH * 0.65) / gridH)));
      const dot = Math.max(2.2, cell - 1.1);

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
          // Supernova impulse curve (fast burst then wide expansion across screen)
          const travel = Math.pow(scatterElapsedSec, 0.85);
          x += vel.vx * travel;
          y += vel.vy * travel;
          // Smooth fade as embers dissipate
          opacity = Math.max(0, 1.0 - Math.pow(scatterElapsedSec / 0.85, 1.5));
        }

        if (opacity <= 0.02) continue;

        // Ember scale decay during explosion
        const currentDot = isScatter
          ? Math.max(1.8, dot * (1.0 - scatterElapsedSec * 0.45))
          : dot;

        // Detonation core flash (first 100ms)
        const isFlash = isScatter && scatterElapsedSec < 0.10;
        ctx.fillStyle = isFlash
          ? `rgba(255, 252, 214, ${opacity})`
          : `rgba(250, 204, 21, ${opacity})`;

        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(currentDot), Math.ceil(currentDot));
      }

      ctx.restore();

      if (scatterElapsedSec < 0.9) {
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
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#0B031A] text-[#F8FAFC] font-mono select-none cursor-pointer overflow-hidden transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 
        Subtle Twinkling Background Pixel Stars (Twilight Ambience)
      */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-[14%] left-[12%] w-1.5 h-1.5 bg-[#FACC15] animate-ping" style={{ animationDuration: "3s" }} />
        <span className="absolute top-[22%] right-[18%] w-1 h-1 bg-[#F8FAFC] animate-pulse" />
        <span className="absolute top-[38%] left-[8%] w-1 h-1 bg-[#FACC15] opacity-60" />
        <span className="absolute top-[65%] right-[10%] w-1.5 h-1.5 bg-[#FEF08A] animate-pulse" style={{ animationDuration: "2.4s" }} />
        <span className="absolute bottom-[20%] left-[16%] w-1 h-1 bg-[#F8FAFC] opacity-75" />
        <span className="absolute top-[18%] left-[75%] w-1 h-1 bg-[#FACC15] opacity-50" />
      </div>

      {/* 
        TOP HEADER BAR
        Minimal typographic framing 
      */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-8 md:px-12 pt-4 sm:pt-6 text-[10px] sm:text-[11px] text-[#94A3B8] tracking-wider uppercase border-b border-[#261545]">
        <div className="flex items-center gap-2 pb-3">
          <span className="w-2 h-2 bg-[#FACC15] inline-block animate-pulse shadow-[0_0_8px_#FACC15]" />
          <span
            className="font-bold text-[#FACC15] tracking-wide"
            style={{ fontFamily: "var(--font-pixel-arcade)" }}
          >
            AFIF.OS // BIOMETRIC POST
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 pb-3 text-[#94A3B8]">
          <span>ALGORITHM: BAYER_8X8</span>
          <span>&bull;</span>
          <span>DITHER: 1-BIT AMBER</span>
        </div>
      </header>

      {/* 
        CENTER CANVAS AREA
        Progressive Pixel Dither Portrait
      */}
      <main className="relative z-10 flex-1 w-full h-full flex items-center justify-center p-2 sm:p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-4xl max-h-[75vh] block mx-auto pointer-events-none drop-shadow-[0_0_12px_rgba(250,204,21,0.2)]"
          style={{ imageRendering: "pixelated" }}
        />
      </main>

      {/* 
        BOTTOM FOOTER BAR
        Minimal percentage counter in the bottom-left corner (like Hulusi Tunç)
      */}
      <footer className="relative z-10 flex items-end justify-between px-4 sm:px-8 md:px-12 pl-14 sm:pl-8 pb-5 sm:pb-8 border-t border-[#261545] pt-4">
        {/* Big Minimalist Percentage Counter */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FACC15] leading-none drop-shadow-[0_0_10px_rgba(250,204,21,0.35)]"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              {String(percent).padStart(2, "0")}
            </span>
            <span
              className="text-xs sm:text-sm font-bold text-[#FEF08A]/75"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              %
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] text-[#94A3B8] uppercase tracking-wider mt-1.5">
            DECODING AVATAR MATRIX &bull; TELKOM UNIVERSITY
          </span>
        </div>

        {/* Skip Affordance */}
        <div className="text-[9.5px] sm:text-[11px] font-bold text-[#64748B] hover:text-[#FACC15] uppercase tracking-wider transition-colors pb-1">
          [TAP / ESC TO SKIP]
        </div>
      </footer>
    </div>
  );
}
