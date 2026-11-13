"use client";

import React from "react";

interface PixelMascotProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PixelMascot({
  className = "",
  width = 76,
  height = 94,
}: PixelMascotProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* 
        1. Floating Golden Pixel Heart
        Pulses rhythmically with an authentic 8-bit stepped keyframe
      */}
      <div className="relative -mb-1 animate-pixel-heart z-20">
        <svg
          width="20"
          height="18"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ shapeRendering: "crispEdges" }}
          aria-hidden="true"
        >
          {/* Heart Solid Black Border */}
          <rect x="2" y="1" width="3" height="1" fill="#0A0A0F" />
          <rect x="9" y="1" width="3" height="1" fill="#0A0A0F" />
          <rect x="1" y="2" width="1" height="3" fill="#0A0A0F" />
          <rect x="5" y="2" width="1" height="2" fill="#0A0A0F" />
          <rect x="8" y="2" width="1" height="2" fill="#0A0A0F" />
          <rect x="12" y="2" width="1" height="3" fill="#0A0A0F" />
          <rect x="2" y="5" width="1" height="2" fill="#0A0A0F" />
          <rect x="11" y="5" width="1" height="2" fill="#0A0A0F" />
          <rect x="3" y="7" width="1" height="2" fill="#0A0A0F" />
          <rect x="10" y="7" width="1" height="2" fill="#0A0A0F" />
          <rect x="4" y="9" width="1" height="2" fill="#0A0A0F" />
          <rect x="9" y="9" width="1" height="2" fill="#0A0A0F" />
          <rect x="5" y="11" width="1" height="1" fill="#0A0A0F" />
          <rect x="8" y="11" width="1" height="1" fill="#0A0A0F" />
          <rect x="6" y="12" width="2" height="1" fill="#0A0A0F" />

          {/* Golden Heart Body */}
          <rect x="2" y="2" width="3" height="3" fill="#FACC15" />
          <rect x="9" y="2" width="3" height="3" fill="#FACC15" />
          <rect x="3" y="5" width="8" height="2" fill="#FACC15" />
          <rect x="4" y="7" width="6" height="2" fill="#FACC15" />
          <rect x="5" y="9" width="4" height="2" fill="#FACC15" />
          <rect x="6" y="11" width="2" height="1" fill="#FACC15" />

          {/* Top-Left Specular Pixel Highlight */}
          <rect x="2" y="2" width="2" height="2" fill="#FEF9C3" />
          <rect x="3" y="4" width="1" height="1" fill="#FEF9C3" />
        </svg>

        {/* 1px Tether Line pointing to console */}
        <div className="w-[2px] h-1.5 bg-[#0A0A0F] mx-auto opacity-75" />
      </div>

      {/* 
        2. Retro 16-Bit Handheld Console
        Calibrated compact height so the whole hero section fits within 1 screen (100vh)
      */}
      <div className="relative animate-pixel-float z-10">
        <svg
          width={width}
          height={height}
          viewBox="0 0 52 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_6px_10px_rgba(10,10,15,0.4)]"
          style={{ shapeRendering: "crispEdges" }}
          aria-hidden="true"
        >
          {/* Main Console Body: Deep Navy/Slate */}
          <rect x="4" y="2" width="44" height="60" fill="#0A0A0F" />
          <rect x="6" y="4" width="40" height="56" fill="#1E1B4B" />

          {/* Beveled Side Highlights */}
          <rect x="6" y="4" width="2" height="56" fill="#312E81" />
          <rect x="6" y="4" width="40" height="2" fill="#4338CA" />
          <rect x="44" y="6" width="2" height="54" fill="#0F0E2A" />
          <rect x="8" y="58" width="38" height="2" fill="#0F0E2A" />

          {/* Screen Outer Frame */}
          <rect x="10" y="8" width="32" height="26" fill="#0A0A0F" />
          <rect x="11" y="9" width="30" height="24" fill="#18181B" />

          {/* Terminal Screen (Glowing Retro Emerald Matrix) */}
          <rect x="13" y="11" width="26" height="20" fill="#022C22" />

          {/* Code Scanlines / Pixels */}
          <rect x="15" y="13" width="10" height="2" fill="#34D399" />
          <rect x="15" y="16" width="18" height="2" fill="#10B981" />
          <rect x="15" y="19" width="14" height="2" fill="#6EE7B7" />
          <rect x="15" y="22" width="8" height="2" fill="#34D399" />
          <rect x="15" y="25" width="20" height="2" fill="#10B981" />
          {/* Blinking Cursor */}
          <rect x="24" y="22" width="3" height="2" fill="#A7F3D0" className="animate-pulse" />

          {/* Screen Power LED (Green) */}
          <rect x="13" y="32" width="2" height="1" fill="#4ADE80" />

          {/* D-Pad (Left Controller) */}
          <rect x="12" y="42" width="10" height="4" fill="#0A0A0F" />
          <rect x="15" y="39" width="4" height="10" fill="#0A0A0F" />
          <rect x="13" y="43" width="8" height="2" fill="#475569" />
          <rect x="16" y="40" width="2" height="8" fill="#475569" />

          {/* Action Buttons (Right Controller: Magenta & Gold) */}
          <rect x="36" y="41" width="4" height="4" fill="#0A0A0F" />
          <rect x="37" y="42" width="2" height="2" fill="#F43F5E" />

          <rect x="31" y="45" width="4" height="4" fill="#0A0A0F" />
          <rect x="32" y="46" width="2" height="2" fill="#FACC15" />

          {/* Speaker Slits */}
          <rect x="35" y="53" width="6" height="1" fill="#0A0A0F" />
          <rect x="35" y="55" width="6" height="1" fill="#0A0A0F" />
        </svg>
      </div>
    </div>
  );
}
