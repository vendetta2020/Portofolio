import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P, Silkscreen, JetBrains_Mono } from "next/font/google";
import { CRTOverlay } from "@/components/crt-overlay";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel-heading",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-arcade",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-body",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: "Portofolio arsitektur backend, sistem kasir transaksi tinggi, dan modular payment gateway dengan tema 16-Bit Sunset Arcade.",
  openGraph: {
    title: siteConfig.title,
    description: "Portofolio arsitektur backend, sistem kasir transaksi tinggi, dan modular payment gateway dengan tema 16-Bit Sunset Arcade.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: "Portofolio arsitektur backend, sistem kasir transaksi tinggi, dan modular payment gateway dengan tema 16-Bit Sunset Arcade.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${pixelifySans.variable} ${pressStart2P.variable} ${silkscreen.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isDev = ${isDev ? "true" : "false"};
                  var forceReplay = window.location.search.indexOf("boot=1") !== -1;
                  var forceSkip = window.location.search.indexOf("noboot=1") !== -1;
                  var hasBooted = sessionStorage.getItem("afif_dither_booted") || sessionStorage.getItem("afif_bios_booted");
                  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  
                  if (forceSkip || prefersReducedMotion || (!isDev && hasBooted && !forceReplay)) {
                    document.documentElement.classList.add("dither-skip");
                    document.documentElement.classList.add("bios-skip");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen text-[var(--pixel-ink)] font-mono selection:bg-[var(--accent-gold)] selection:text-[var(--pixel-ink)]">
        {/* Retro CRT Scanline Overlay */}
        <CRTOverlay />
        {children}
      </body>
    </html>
  );
}
