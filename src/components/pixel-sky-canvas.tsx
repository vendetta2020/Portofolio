"use client";

import React, { useEffect, useRef } from "react";

// Authentic 13-color 16-bit sunset palette extracted directly from reference
const SKY_PALETTE: [number, number, number][] = [
  [0x17, 0x08, 0x36], // 0: Space Midnight Indigo
  [0x2e, 0x0d, 0x68], // 1: Deep Indigo
  [0x52, 0x12, 0x8a], // 2: Royal Purple
  [0x7a, 0x1a, 0xb6], // 3: Rich Violet
  [0x9b, 0x2e, 0xc7], // 4: Orchid Violet
  [0xc1, 0x38, 0xbe], // 5: Magenta Pink
  [0xf5, 0x3f, 0xa5], // 6: Hot Sunset Rose
  [0xff, 0x69, 0x57], // 7: Vivid Coral Sunset Red-Orange
  [0xfe, 0x8c, 0x50], // 8: Sunset Orange
  [0xff, 0xa1, 0x69], // 9: Golden Apricot Peach
  [0xff, 0xc3, 0x8d], // 10: Warm Peach Cream
  [0xff, 0xe7, 0xa5], // 11: Soft Sunlight Yellow
  [0xfc, 0xf7, 0xbd], // 12: Pale Dawn Horizon Cream
];

// 4x4 Bayer Dither Matrix
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function PixelSkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const renderDitheredSky = () => {
      // Chunkiness factor: 3.5px - 4px virtual pixel size for crisp 16-bit feel
      const pixelSize = window.innerWidth < 640 ? 3 : 4;
      const vWidth = Math.ceil(window.innerWidth / pixelSize);
      const vHeight = Math.ceil(window.innerHeight / pixelSize);

      canvas.width = vWidth;
      canvas.height = vHeight;

      const imgData = ctx.createImageData(vWidth, vHeight);
      const data32 = new Uint32Array(imgData.data.buffer);

      const nBands = SKY_PALETTE.length;
      const bandHeight = vHeight / (nBands - 1);
      // Dither transition zone height (about 50% transition, 50% solid core)
      const ditherHeight = bandHeight * 0.52;

      for (let y = 0; y < vHeight; y++) {
        const pos = y / bandHeight;
        let bandIdx = Math.floor(pos);
        if (bandIdx >= nBands - 1) bandIdx = nBands - 2;

        const boundaryY = (bandIdx + 1) * bandHeight;
        const distToBoundary = y - (boundaryY - ditherHeight / 2);

        const c1 = SKY_PALETTE[bandIdx];
        const c2 = SKY_PALETTE[bandIdx + 1];

        const rowOffset = y * vWidth;
        const bayerRow = BAYER_4X4[y % 4];

        for (let x = 0; x < vWidth; x++) {
          let r: number, g: number, b: number;

          if (distToBoundary < 0) {
            // Solid Upper Band
            r = c1[0];
            g = c1[1];
            b = c1[2];
          } else if (distToBoundary >= ditherHeight) {
            // Solid Lower Band
            r = c2[0];
            g = c2[1];
            b = c2[2];
          } else {
            // Bayer Dither Transition Zone
            const dy = distToBoundary / ditherHeight;
            const threshold = (bayerRow[x % 4] + 0.5) / 16.0;
            const chosen = dy > threshold ? c2 : c1;
            r = chosen[0];
            g = chosen[1];
            b = chosen[2];
          }

          // Little-endian RGBA: 0xAABBGGRR
          data32[rowOffset + x] = 0xff000000 | (b << 16) | (g << 8) | r;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    renderDitheredSky();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderDitheredSky, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        imageRendering: "pixelated",
        // Fallback CSS gradient while canvas renders
        background: `linear-gradient(180deg, #170836 0%, #52128a 25%, #c138be 45%, #ff6957 60%, #fe8c50 75%, #fcf7bd 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
