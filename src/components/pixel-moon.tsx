import React from "react";

interface PixelMoonProps {
  className?: string;
  size?: number;
}

export function PixelMoon({ className = "", size = 120 }: PixelMoonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      {/* Outer Glow / Halo Pixels */}
      <rect x="10" y="1" width="12" height="1" fill="#FFFFFF" opacity="0.3" />
      <rect x="6" y="3" width="20" height="1" fill="#FFFFFF" opacity="0.3" />

      {/* Main Moon Disc Base (Pure Pale White) */}
      <rect x="10" y="2" width="12" height="2" fill="#FFFFFF" />
      <rect x="6" y="4" width="20" height="2" fill="#FFFFFF" />
      <rect x="4" y="6" width="24" height="2" fill="#FFFFFF" />
      <rect x="2" y="8" width="28" height="2" fill="#FFFFFF" />
      <rect x="2" y="10" width="28" height="12" fill="#FFFFFF" />
      <rect x="4" y="22" width="24" height="2" fill="#FFFFFF" />
      <rect x="6" y="24" width="20" height="2" fill="#FFFFFF" />
      <rect x="10" y="26" width="12" height="2" fill="#FFFFFF" />

      {/* Crater & Shadow Accents (Soft Lavender / Ice Shading) */}
      <rect x="8" y="6" width="4" height="4" fill="#E2E8F0" />
      <rect x="18" y="8" width="6" height="4" fill="#E2E8F0" />
      <rect x="6" y="14" width="4" height="6" fill="#CBD5E1" />
      <rect x="16" y="18" width="8" height="4" fill="#E2E8F0" />
      <rect x="10" y="22" width="10" height="2" fill="#CBD5E1" />
    </svg>
  );
}
