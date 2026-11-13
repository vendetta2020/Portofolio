"use client";

import React, { useEffect, useState } from "react";

export function CRTOverlay() {
  const [crtEnabled, setCrtEnabled] = useState(false);

  useEffect(() => {
    // Listen to custom event for CRT toggle
    const handleCrtToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setCrtEnabled(customEvent.detail.enabled);
    };

    window.addEventListener("toggle-crt", handleCrtToggle);
    return () => window.removeEventListener("toggle-crt", handleCrtToggle);
  }, []);

  if (!crtEnabled) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none pixel-scanlines opacity-75 mix-blend-overlay"
      aria-hidden="true"
    />
  );
}
