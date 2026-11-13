import type { Metadata } from "next";
import { Pixelify_Sans, Press_Start_2P, Silkscreen, JetBrains_Mono } from "next/font/google";
import { CRTOverlay } from "@/components/crt-overlay";
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
  title: "Afif Fakhriyadh Asri — Backend & Fullstack Engineer",
  description: "Portofolio arsitektur backend, sistem kasir transaksi tinggi, dan modular payment gateway dengan tema 16-Bit Sunset Arcade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${pixelifySans.variable} ${pressStart2P.variable} ${silkscreen.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen text-[var(--pixel-ink)] font-mono selection:bg-[var(--accent-gold)] selection:text-[var(--pixel-ink)]">
        {/* Retro CRT Scanline Overlay */}
        <CRTOverlay />
        {children}
      </body>
    </html>
  );
}
