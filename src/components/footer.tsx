import { LiveClock } from "./live-clock";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer id="kontak" className="w-full pt-16 sm:pt-24 pb-12 border-t border-[var(--bp-line)]/15">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* Intro narrative */}
        <div className="max-w-2xl space-y-3">
          <p className="text-[17px] text-[var(--bp-line)]/90 leading-relaxed font-sans">
            {siteConfig.about}
          </p>
        </div>

        {/* Heading: Mari bicara. */}
        <div className="space-y-6">
          <h2
            className="text-5xl sm:text-7xl text-[var(--bp-line)] tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Mari bicara.
          </h2>

          {/* Action Row: Single Main Button & Links */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="px-6 py-3 bg-[var(--accent)] hover:brightness-105 active:brightness-95 text-[#182c5a] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md focus-visible:outline-white"
            >
              Kirim Email
            </a>

            <div className="flex items-center gap-6 font-mono text-xs">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                GitHub &nearr;
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                LinkedIn &nearr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Technical Status Bar */}
        <div className="pt-12 border-t border-[var(--bp-line)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--bp-muted)]">
          {/* Left: Location & Live Time */}
          <div className="flex items-center gap-2">
            <span>{siteConfig.location}</span>
            <span>&bull;</span>
            <LiveClock />
          </div>

          {/* Right: Revision mark & Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-[var(--bp-line)] font-semibold">{siteConfig.revision}</span>
            <span>&bull;</span>
            <span>&copy; 2026 {siteConfig.name}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
