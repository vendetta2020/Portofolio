"use client";

import { useEffect, useState } from "react";

export function BlueprintLoader() {
  const [stage, setStage] = useState<"rolling" | "fading" | "complete">("rolling");

  useEffect(() => {
    // Stage 1: The blueprint unrolls downward for 1.1s
    const timer1 = setTimeout(() => {
      setStage("fading");
    }, 1100);

    // Stage 2: Smooth fade out and unmount at 1.5s
    const timer2 = setTimeout(() => {
      setStage("complete");
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (stage === "complete") return null;

  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none overflow-hidden transition-opacity duration-400 ${
        stage === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* 
        Top-to-Bottom Unrolling Curtain
        The curtain expands from top to bottom using transform scaleY or translateY
      */}
      <div
        className="absolute inset-0 bg-[#1c3366] origin-top will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(233, 236, 243, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(233, 236, 243, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(233, 236, 243, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(233, 236, 243, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
          animation: "unrollDownward 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Top Fixed Blueprint Banner */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-2 border border-[#e9ecf3]/30 bg-[#14264e]/90 font-mono text-xs text-[#e9ecf3]">
          <span className="font-bold tracking-widest uppercase">DWG NO. AF-2026-SYS</span>
          <span className="opacity-40">&bull;</span>
          <span className="text-[11px] text-[#d9a77a] uppercase tracking-wider">
            MEMBUKA BLUEPRINT TEKNIK
          </span>
          <span className="opacity-40">&bull;</span>
          <span className="text-[11px] text-[#e9ecf3]/70">SCALE 1:1</span>
        </div>

        {/* Center Technical Blueprint Compass & Callouts */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-3">
          <div className="size-16 mx-auto border-2 border-[#e9ecf3]/60 rounded-full flex items-center justify-center font-mono text-xs text-[#e9ecf3] shadow-lg">
            &empty; 2026
          </div>
          <h2
            className="text-2xl sm:text-3xl text-white font-bold tracking-wider uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Afif Fakhriyadh Asri
          </h2>
          <p className="font-mono text-xs text-[#e9ecf3]/70 tracking-widest uppercase">
            ARCHITECTURAL SYSTEM &bull; UNROLLING SHEET
          </p>
        </div>

        {/* Bottom Rolling Rod / Cylinder with Paper Shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-9 bg-gradient-to-b from-[#2a4d96] via-[#1c3366] to-[#122244] border-t border-b border-[#e9ecf3]/70 shadow-[0_18px_36px_rgba(0,0,0,0.65)] flex items-center justify-between px-6 font-mono text-[10px] text-[#e9ecf3]/90">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#d9a77a] animate-pulse" />
            <span className="tracking-widest">ROLLING DRAFT DOWNWARD</span>
          </div>

          {/* Scale Ruler ticks on the rolling rod */}
          <div className="hidden sm:flex items-center gap-2 border-l border-r border-[#e9ecf3]/40 px-4">
            <span>0</span>
            <span className="w-12 h-1 bg-[#e9ecf3]/40 inline-block" />
            <span>1M</span>
            <span className="w-12 h-1 bg-[#e9ecf3]/40 inline-block" />
            <span>5M</span>
          </div>

          <span className="tracking-wider">REV 01 &bull; 2026</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes unrollDownward {
          0% {
            clip-path: inset(0 0 100% 0);
          }
          100% {
            clip-path: inset(0 0 0% 0);
          }
        }
      `}</style>
    </div>
  );
}
