"use client";

import React from "react";
import { PixelSkyCanvas } from "./pixel-sky-canvas";
import { PixelCloud } from "./pixel-cloud";
import { PixelStarfield } from "./pixel-starfield";
import { PixelMoon } from "./pixel-moon";

export function PixelSkyBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 
        Layer 1: Authentic 16-Bit Bayer Dithered Pixel Sky Canvas
        Renders real chunky 16-bit solid bands with checkerboard dither transitions
      */}
      <PixelSkyCanvas />

      {/* 
        Layer 2: Authentic 16-Bit Starfield
        Exact pixel-cross and diamond star sprites extracted from the reference crop
      */}
      <PixelStarfield />

      {/* 
        Layer 3: Giant Pixel Moon (Anchored behind the upper hero area)
      */}
      <div className="absolute top-7 sm:top-10 left-1/2 -translate-x-1/2 opacity-95 drop-shadow-[0_0_18px_rgba(255,255,255,0.45)]">
        <PixelMoon size={128} />
      </div>

      {/* 
        Layer 4: Pixel Cloud Fleet at Multi-Tier Altitudes
      */}
      {/* Tier 1: High Atmosphere Wispy Clouds (Indigo / Violet band) */}
      <div className="absolute top-[7%] left-[3%] opacity-90 animate-pixel-float">
        <PixelCloud variant={2} width={135} height={50} />
      </div>

      <div
        className="absolute top-[11%] right-[7%] opacity-90 animate-pixel-float"
        style={{ animationDelay: "1.2s" }}
      >
        <PixelCloud variant={1} width={165} height={58} />
      </div>

      {/* Tier 2: Mid-Atmosphere Magenta/Rose Band Clouds */}
      <div
        className="absolute top-[27%] left-[10%] opacity-95 animate-pixel-float"
        style={{ animationDelay: "0.6s" }}
      >
        <PixelCloud variant={1} width={185} height={66} />
      </div>

      <div
        className="absolute top-[33%] right-[12%] opacity-95 animate-pixel-float"
        style={{ animationDelay: "1.8s" }}
      >
        <PixelCloud variant={3} width={195} height={54} />
      </div>

      {/* Tier 3: Sunset Horizon Clouds (Floating along orange/peach bands) */}
      <div
        className="absolute top-[47%] left-[2%] opacity-85 animate-pixel-float"
        style={{ animationDelay: "2.4s" }}
      >
        <PixelCloud variant={2} width={125} height={46} />
      </div>

      <div
        className="absolute top-[51%] right-[4%] opacity-90 animate-pixel-float"
        style={{ animationDelay: "1.0s" }}
      >
        <PixelCloud variant={1} width={175} height={60} />
      </div>

      <div
        className="absolute top-[67%] left-[22%] opacity-80 animate-pixel-float"
        style={{ animationDelay: "1.5s" }}
      >
        <PixelCloud variant={3} width={145} height={44} />
      </div>

      <div
        className="absolute top-[74%] right-[20%] opacity-85 animate-pixel-float"
        style={{ animationDelay: "2.1s" }}
      >
        <PixelCloud variant={2} width={140} height={48} />
      </div>

      {/* 
        Layer 5: Soft Sunlight Horizon Glow
      */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--sky-horizon-sun)]/30 to-transparent" />
    </div>
  );
}

// Re-export as BackgroundLayer for backward-compatibility
export { PixelSkyBackground as BackgroundLayer };
