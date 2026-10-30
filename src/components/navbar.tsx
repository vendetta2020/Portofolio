import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bp-base)]/85 backdrop-blur-md border-b border-[var(--bp-line)]/15">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Left: Portofolio label */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-[var(--bp-line)] hover:text-white transition-colors"
        >
          PORTOFOLIO
        </Link>

        {/* Right: Karya & Kontak */}
        <nav className="flex items-center gap-7">
          <Link
            href="/#karya"
            className="font-mono text-xs uppercase tracking-wider text-[var(--bp-line)] hover:text-[var(--accent)] transition-colors"
          >
            KARYA
          </Link>
          <Link
            href="/#kontak"
            className="font-mono text-xs uppercase tracking-wider text-[var(--bp-line)] hover:text-[var(--accent)] transition-colors"
          >
            KONTAK
          </Link>
        </nav>
      </div>
    </header>
  );
}
