import React from "react";

interface StarItem {
  top: string;
  left: string;
  type: 1 | 2 | 3 | 4 | 5;
  delay: string;
  duration: string;
}

// Deterministic star field across the upper night sky
const STARS: StarItem[] = [
  // Big sparkling diamond cross stars (Matching Star 3 from reference crop)
  { top: "5%", left: "14%", type: 3, delay: "0.2s", duration: "2.6s" },
  { top: "12%", left: "48%", type: 3, delay: "1.4s", duration: "3.0s" },
  { top: "8%", left: "76%", type: 3, delay: "0.8s", duration: "2.8s" },
  { top: "18%", left: "91%", type: 3, delay: "1.8s", duration: "2.5s" },
  { top: "24%", left: "62%", type: 3, delay: "0.4s", duration: "3.2s" },

  // Medium cross stars (Matching Star 2 from reference crop)
  { top: "4%", left: "32%", type: 2, delay: "1.1s", duration: "2.2s" },
  { top: "16%", left: "22%", type: 2, delay: "0.5s", duration: "2.4s" },
  { top: "22%", left: "38%", type: 2, delay: "1.6s", duration: "2.9s" },
  { top: "15%", left: "82%", type: 2, delay: "0.3s", duration: "2.1s" },
  { top: "28%", left: "12%", type: 2, delay: "1.9s", duration: "2.7s" },
  { top: "34%", left: "86%", type: 2, delay: "0.7s", duration: "2.3s" },

  // Small vertical / 2x2 pips (Matching Star 4 & 5)
  { top: "7%", left: "25%", type: 4, delay: "0.9s", duration: "1.8s" },
  { top: "11%", left: "68%", type: 5, delay: "1.3s", duration: "2.0s" },
  { top: "26%", left: "80%", type: 4, delay: "0.1s", duration: "1.9s" },
  { top: "32%", left: "28%", type: 5, delay: "1.5s", duration: "2.2s" },
  { top: "38%", left: "54%", type: 4, delay: "0.6s", duration: "1.7s" },

  // Tiny single 1x1 pixel dots (Matching Star 1)
  { top: "3%", left: "8%", type: 1, delay: "0.4s", duration: "1.6s" },
  { top: "6%", left: "42%", type: 1, delay: "1.7s", duration: "2.1s" },
  { top: "10%", left: "88%", type: 1, delay: "0.2s", duration: "1.5s" },
  { top: "19%", left: "6%", type: 1, delay: "1.2s", duration: "2.0s" },
  { top: "21%", left: "71%", type: 1, delay: "0.8s", duration: "1.8s" },
  { top: "29%", left: "46%", type: 1, delay: "1.4s", duration: "2.2s" },
  { top: "35%", left: "18%", type: 1, delay: "0.5s", duration: "1.7s" },
  { top: "42%", left: "74%", type: 1, delay: "1.0s", duration: "1.9s" },
];

export function PixelStarfield() {
  return (
    <div
      className="absolute inset-x-0 top-0 h-[52vh] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {STARS.map((star, idx) => (
        <div
          key={idx}
          className="absolute animate-pixel-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          {/* Star 1: Single Pixel 1x1 */}
          {star.type === 1 && (
            <div className="w-[3px] h-[3px] bg-white shadow-[0_0_2px_#fff]" />
          )}

          {/* Star 2: 5x6 Stepped Cross Star */}
          {star.type === 2 && (
            <svg
              width="15"
              height="18"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ shapeRendering: "crispEdges" }}
            >
              <rect x="2" y="0" width="1" height="2" fill="#FFFFFF" />
              <rect x="0" y="2" width="5" height="1" fill="#FFFFFF" />
              <rect x="1" y="3" width="3" height="1" fill="#FFFFFF" />
              <rect x="2" y="4" width="1" height="2" fill="#FFFFFF" />
              {/* Central glint */}
              <rect x="2" y="2" width="1" height="2" fill="#FEF08A" />
            </svg>
          )}

          {/* Star 3: 7x6 Big Diamond Sparkling Star */}
          {star.type === 3 && (
            <svg
              width="21"
              height="18"
              viewBox="0 0 7 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ shapeRendering: "crispEdges" }}
            >
              <rect x="3" y="0" width="1" height="1" fill="#FFFFFF" />
              <rect x="3" y="1" width="2" height="1" fill="#FFFFFF" />
              <rect x="1" y="2" width="5" height="1" fill="#FFFFFF" />
              <rect x="0" y="3" width="7" height="1" fill="#FFFFFF" />
              <rect x="3" y="4" width="2" height="1" fill="#FFFFFF" />
              <rect x="3" y="5" width="2" height="1" fill="#FFFFFF" />
              {/* Warm core */}
              <rect x="3" y="2" width="2" height="2" fill="#FEF08A" />
            </svg>
          )}

          {/* Star 4: 1x3 Vertical Pip */}
          {star.type === 4 && (
            <div className="w-[3px] h-[9px] bg-white opacity-90" />
          )}

          {/* Star 5: 2x2 Small Diamond Pip */}
          {star.type === 5 && (
            <div className="w-[6px] h-[6px] bg-white opacity-95" />
          )}
        </div>
      ))}
    </div>
  );
}
