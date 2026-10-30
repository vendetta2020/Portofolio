export function BackgroundLayer() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Base cobalt blue surface */}
      <div className="absolute inset-0 bg-[#2b4a8c]" />

      {/* Layered uneven darker blotches using --bp-dark (#213a73) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_10%,#213a73_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_85%_85%,#213a73_0%,transparent_65%),radial-gradient(circle_at_50%_45%,#213a73_0%,transparent_60%)] opacity-85" />

      {/* Faint double grid: 20px and 100px squares, off-white at 3% and 7% opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(233, 236, 243, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(233, 236, 243, 0.07) 1px, transparent 1px),
            linear-gradient(to right, rgba(233, 236, 243, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(233, 236, 243, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />

      {/* Subtle edge vignette using --bp-deep (#182c5a) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(24,44,90,0.7)_100%)]" />

      {/* Paper grain: inline SVG feTurbulence noise overlay at ~10% opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="bp-paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bp-paper-grain)" />
      </svg>
    </div>
  );
}
