"use client";

import React from "react";
import { siteConfig } from "@/lib/site";
import { PixelDialogBox } from "./pixel-dialog-box";

export function PixelHero() {
  return (
    <section className="relative min-h-[calc(100dvh-0px)] md:h-[100dvh] md:max-h-[100dvh] pt-16 sm:pt-14 md:pt-14 pb-3 sm:pb-5 px-3 sm:px-6 max-w-6xl mx-auto w-full flex flex-col justify-center items-center select-none overflow-hidden">
      {/* 
        1. Top Kicker Branding (In English, Clean 16-Bit Title Kicker)
        Direct pixel typography with hard black outline & golden pixel stars,
        nestled right on the moon without any box.
      */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2.5 sm:mb-3.5 select-none">
        {/* Left Golden Pixel Diamond */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: "crispEdges" }}
          aria-hidden="true"
        >
          <rect x="2" y="0" width="1" height="5" fill="#FACC15" />
          <rect x="0" y="2" width="5" height="1" fill="#FACC15" />
          <rect x="1" y="1" width="3" height="3" fill="#FEF08A" />
        </svg>

        <span
          className="text-white text-[10px] sm:text-[13px] md:text-[14px] font-bold tracking-[0.12em] sm:tracking-[0.22em] uppercase text-center"
          style={{
            fontFamily: "var(--font-pixel-arcade)",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 2px 0 #3b0764",
          }}
        >
          {siteConfig.role}
        </span>

        {/* Right Golden Pixel Diamond */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 5 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: "crispEdges" }}
          aria-hidden="true"
        >
          <rect x="2" y="0" width="1" height="5" fill="#FACC15" />
          <rect x="0" y="2" width="5" height="1" fill="#FACC15" />
          <rect x="1" y="1" width="3" height="3" fill="#FEF08A" />
        </svg>
      </div>

      {/* 
        2. Giant Chunky 3D Extruded Pixel Title With Organic Per-Letter Dark Silhouette Contour
        (WorkOS "LAUNCH WEEK" Style - Scaled UP to gracefully fill the upper viewport space)
      */}
      <div className="relative select-none flex flex-col items-center my-1 sm:my-1.5">
        <h1
          className="pixel-title-3d pixel-title-contour font-bold tracking-tight leading-[0.88] sm:leading-[0.89] text-center uppercase select-none"
          aria-label={siteConfig.name}
        >
          <span className="block text-[clamp(58px,9.5vw,126px)]">AFIF</span>
          <span className="block text-[clamp(42px,7.0vw,96px)] -mt-1 sm:-mt-2">
            FAKHRIYADH
          </span>
        </h1>
      </div>

      {/* 
        3. Dialog Card (Windows XP System Properties Window - Profile Default)
        Spacious, interactive, and beautifully filling the screen Above-the-Fold
      */}
      <div className="relative w-full flex flex-col items-center mt-4 sm:mt-6">
        <PixelDialogBox />
      </div>
    </section>
  );
}
