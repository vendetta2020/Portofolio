import React from "react";

interface PixelCloudProps {
  className?: string;
  variant?: 1 | 2 | 3;
  width?: number;
  height?: number;
}

export function PixelCloud({
  className = "",
  variant = 1,
  width = 160,
  height = 64,
}: PixelCloudProps) {
  if (variant === 1) {
    // Cloud Shape 1: Classic horizontal stepped cumulus (WorkOS style)
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 80 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pixel-perfect ${className}`}
        style={{ shapeRendering: "crispEdges" }}
        aria-hidden="true"
      >
        {/* Top White Highlights */}
        <rect x="24" y="4" width="20" height="4" fill="#FFFFFF" />
        <rect x="20" y="8" width="32" height="4" fill="#FFFFFF" />
        <rect x="12" y="12" width="48" height="4" fill="#FFFFFF" />
        <rect x="8" y="16" width="60" height="4" fill="#FFFFFF" />
        <rect x="4" y="20" width="68" height="4" fill="#FFFFFF" />

        {/* Cloud Mid Shading (Ice Blue) */}
        <rect x="8" y="20" width="16" height="4" fill="#E0F2FE" />
        <rect x="44" y="20" width="28" height="4" fill="#E0F2FE" />
        <rect x="8" y="24" width="64" height="4" fill="#93C5FD" />
        <rect x="16" y="28" width="48" height="4" fill="#60A5FA" />
      </svg>
    );
  }

  if (variant === 2) {
    // Cloud Shape 2: Compact high-altitude puffy cloud
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`pixel-perfect ${className}`}
        style={{ shapeRendering: "crispEdges" }}
        aria-hidden="true"
      >
        {/* White Puffs */}
        <rect x="16" y="4" width="16" height="4" fill="#FFFFFF" />
        <rect x="36" y="8" width="16" height="4" fill="#FFFFFF" />
        <rect x="12" y="8" width="44" height="4" fill="#FFFFFF" />
        <rect x="8" y="12" width="52" height="4" fill="#FFFFFF" />
        <rect x="4" y="16" width="56" height="4" fill="#FFFFFF" />

        {/* Ice Blue Shading */}
        <rect x="8" y="20" width="48" height="4" fill="#93C5FD" />
        <rect x="16" y="24" width="32" height="4" fill="#60A5FA" />
      </svg>
    );
  }

  // Cloud Shape 3: Elongated sunset wispy cloud
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 96 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pixel-perfect ${className}`}
      style={{ shapeRendering: "crispEdges" }}
      aria-hidden="true"
    >
      <rect x="20" y="4" width="48" height="4" fill="#FFFFFF" />
      <rect x="12" y="8" width="72" height="4" fill="#FFFFFF" />
      <rect x="8" y="12" width="80" height="4" fill="#FFFFFF" />
      <rect x="12" y="16" width="68" height="4" fill="#93C5FD" />
      <rect x="24" y="20" width="44" height="4" fill="#60A5FA" />
    </svg>
  );
}
