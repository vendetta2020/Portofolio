"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { pixelAudio } from "@/lib/pixel-audio";

interface BusStep {
  id: number;
  label: string;
  shortLabel: string;
  sourceName: string;
  targetName: string;
  direction: "ltr" | "rtl";
  y: number;
  badgeY: number;
  color: string;
  activeBg: string;
  textColor: string;
  description: string;
  activeBrewposModule: number;
  activeGatewayModule: number;
}

const STEPS: BusStep[] = [
  {
    id: 1,
    label: "1: CREATE_ORDER + IDEMPOTENCY-KEY →",
    shortLabel: "01: ORDER",
    sourceName: "BREWPOS",
    targetName: "GATEWAY",
    direction: "ltr",
    y: 70,
    badgeY: 55,
    color: "#FACC15",
    activeBg: "#1E1B4B",
    textColor: "#FEF08A",
    description: "Client dispatches checkout intent with Idempotency-Key header",
    activeBrewposModule: 1,
    activeGatewayModule: 1,
  },
  {
    id: 2,
    label: "← 2: EMVCO QRIS PAYLOAD + TTL",
    shortLabel: "02: QRIS",
    sourceName: "GATEWAY",
    targetName: "BREWPOS",
    direction: "rtl",
    y: 125,
    badgeY: 110,
    color: "#38BDF8",
    activeBg: "#075985",
    textColor: "#BAE6FD",
    description: "Gateway validates idempotency cache & returns dynamic QRIS payload",
    activeBrewposModule: 2,
    activeGatewayModule: 2,
  },
  {
    id: 3,
    label: "3: PESSIMISTIC LOCK GRANTED →",
    shortLabel: "03: LOCK",
    sourceName: "BREWPOS",
    targetName: "GATEWAY",
    direction: "ltr",
    y: 180,
    badgeY: 165,
    color: "#10B981",
    activeBg: "#042F2E",
    textColor: "#6EE7B7",
    description: "MySQL acquires row lock (SELECT ... FOR UPDATE) on SKU inventory",
    activeBrewposModule: 4,
    activeGatewayModule: 3,
  },
  {
    id: 4,
    label: "← 4: HMAC-SHA256 WEBHOOK (PAID)",
    shortLabel: "04: WEBHOOK",
    sourceName: "GATEWAY",
    targetName: "BREWPOS",
    direction: "rtl",
    y: 235,
    badgeY: 220,
    color: "#EC4899",
    activeBg: "#500724",
    textColor: "#F472B6",
    description: "Anti-SSRF dispatcher delivers cryptographically signed webhook",
    activeBrewposModule: 3,
    activeGatewayModule: 4,
  },
  {
    id: 5,
    label: "5: ATOMIC COMMIT • 0 RACE CONDITIONS →",
    shortLabel: "05: COMMIT",
    sourceName: "BREWPOS",
    targetName: "GATEWAY",
    direction: "ltr",
    y: 290,
    badgeY: 275,
    color: "#22C55E",
    activeBg: "#052E16",
    textColor: "#86EFAC",
    description: "Two-phase atomic ledger commit finishes: 0 race conditions verified",
    activeBrewposModule: 4,
    activeGatewayModule: 3,
  },
];

export function HeroDiagram() {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStep = STEPS.find((s) => s.id === activeStepId) || STEPS[0];

  // Automatic Step-by-Step advancement
  const nextStep = useCallback(() => {
    setActiveStepId((prev) => (prev % STEPS.length) + 1);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextStep();
    }, 2400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextStep]);

  const handleStepClick = (stepId: number) => {
    pixelAudio.playClick();
    setActiveStepId(stepId);
  };

  const togglePlay = () => {
    pixelAudio.playClick();
    setIsPlaying((prev) => !prev);
  };

  return (
    <div id="arsitektur" className="w-full my-8 sm:my-10 select-none">
      {/* Scoped CSS Keyframe Animations for 16-Bit Motherboard Data Flow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bus-packet-ltr {
          0% {
            transform: translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(376px);
            opacity: 0;
          }
        }

        @keyframes bus-packet-rtl {
          0% {
            transform: translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(-376px);
            opacity: 0;
          }
        }

        @keyframes circuit-flow-ltr {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -24;
          }
        }

        @keyframes circuit-flow-rtl {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 24;
          }
        }

        @keyframes pixel-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 1px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 6px currentColor);
          }
        }

        .anim-packet-ltr {
          animation: bus-packet-ltr 2.2s cubic-bezier(0.2, 0, 0.4, 1) infinite;
        }

        .anim-packet-rtl {
          animation: bus-packet-rtl 2.2s cubic-bezier(0.2, 0, 0.4, 1) infinite;
        }

        .anim-flow-ltr {
          animation: circuit-flow-ltr 0.8s linear infinite;
        }

        .anim-flow-rtl {
          animation: circuit-flow-rtl 0.8s linear infinite;
        }

        .anim-glow {
          animation: pixel-glow-pulse 1.2s steps(4) infinite;
        }
      `}} />

      {/* 
        16-Bit Motherboard / Circuit Bus Architecture Visualizer
        Authentic retro hardware enclosure with stepped pixel borders and glowing bus traces
      */}
      <div className="relative w-full bg-[#ECE9D8] text-[#0A0A0F] border-[3px] border-[#0A0A0F] shadow-[8px_8px_0px_#0A0A0F] overflow-hidden">
        {/* Title Bar (Strict 1-Line Layout: Zero Wrapping, Crisp Pixel Icons) */}
        <div className="bg-[#0A246A] text-white px-3 sm:px-4 py-2 flex items-center justify-between gap-2 border-b-2 border-[#0A0A0F]">
          {/* Left Title */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <span className="w-3 h-3 bg-[#22C55E] border border-black shrink-0 inline-block animate-pulse" />
            <span
              className="text-[10.5px] sm:text-[11.5px] font-bold tracking-wider uppercase text-white drop-shadow-[1px_1px_0px_#000] truncate"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              [01] TRANSACTION BUS
              <span className="hidden lg:inline text-[#93C5FD]"> // CONCURRENCY PIPELINE</span>
            </span>
          </div>

          {/* Stepper Controls & Play/Pause - Strictly Locked on Single Line */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Step buttons 01 to 05 */}
            <div className="hidden sm:flex items-center gap-0.5 bg-[#0A0A0F] p-0.5 border border-[#38BDF8]">
              {STEPS.map((s) => {
                const isActive = s.id === activeStepId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStepClick(s.id)}
                    className={`px-1.5 py-0.5 text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#FEF08A] text-[#0A0A0F] shadow-[1px_1px_0_#000]"
                        : "bg-[#1E293B] text-[#94A3B8] hover:text-white hover:bg-[#334155]"
                    }`}
                    style={{ fontFamily: "var(--font-pixel-arcade)" }}
                    title={`Step ${s.id}: ${s.description}`}
                  >
                    0{s.id}
                  </button>
                );
              })}
            </div>

            {/* Play/Pause Button with Authentic Pixel Art SVG Icons */}
            <button
              type="button"
              onClick={togglePlay}
              className={`pixel-btn px-2 sm:px-2.5 py-1 text-[9px] sm:text-[9.5px] font-bold uppercase inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                isPlaying
                  ? "bg-[#22C55E] text-[#0A0A0F] hover:bg-[#4ADE80]"
                  : "bg-[#FACC15] text-[#0A0A0F] hover:bg-[#FEF08A]"
              }`}
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
              title={isPlaying ? "Click to Pause Animation" : "Click to Resume Animation"}
            >
              {isPlaying ? (
                /* Pixel Pause Bars */
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ shapeRendering: "crispEdges" }}
                  className="shrink-0 -translate-y-[0.5px]"
                  aria-hidden="true"
                >
                  <rect x="1" y="0" width="2" height="8" fill="#0A0A0F" />
                  <rect x="5" y="0" width="2" height="8" fill="#0A0A0F" />
                </svg>
              ) : (
                /* Pixel Play Triangle */
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ shapeRendering: "crispEdges" }}
                  className="shrink-0 -translate-y-[0.5px]"
                  aria-hidden="true"
                >
                  <rect x="1" y="0" width="1" height="8" fill="#0A0A0F" />
                  <rect x="2" y="1" width="1" height="6" fill="#0A0A0F" />
                  <rect x="3" y="2" width="1" height="4" fill="#0A0A0F" />
                  <rect x="4" y="3" width="1" height="2" fill="#0A0A0F" />
                </svg>
              )}
              <span className="leading-none">{isPlaying ? "RUNNING" : "PAUSED"}</span>
            </button>
          </div>
        </div>

        {/* Live Narrative Status Ticker Strip */}
        <div className="bg-[#1E1B4B] text-[#FEF08A] px-3 sm:px-4 py-1.5 sm:py-2 border-b-2 border-[#0A0A0F] flex items-center justify-between gap-3 font-mono text-[11px] overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 bg-[#FEF08A] text-[#0A0A0F] border border-[#0A0A0F] uppercase"
              style={{ fontFamily: "var(--font-pixel-arcade)" }}
            >
              STEP {activeStep.id}/5
            </span>
            <span className="text-[#E2E8F0] font-semibold truncate">
              <strong style={{ color: activeStep.color }}>
                [{activeStep.sourceName} &rarr; {activeStep.targetName}]
              </strong>{" "}
              {activeStep.description}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[#93C5FD] text-[10px] shrink-0 font-bold">
            <span>LATENCY: &lt; 14ms</span>
            <span>&bull;</span>
            <span className="text-[#4ADE80]">100% RECONCILED</span>
          </div>
        </div>

        {/* Circuit Diagram Canvas */}
        <div className="p-3 sm:p-5 md:p-6 bg-[#0B0F19] overflow-x-auto">
          <svg
            viewBox="0 0 960 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full min-w-[720px] h-auto max-w-5xl mx-auto block"
            aria-label="High-concurrency BrewPOS and Payment Gateway Architecture Diagram"
            role="img"
            style={{ shapeRendering: "crispEdges" }}
          >
            {/* Grid Pattern in Background */}
            <defs>
              <pattern
                id="pixel-circuit-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#1E293B"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="960" height="380" fill="#0B0F19" />
            <rect width="960" height="380" fill="url(#pixel-circuit-grid)" opacity="0.6" />

            {/* ================================================= */}
            {/* LEFT CHIP: BrewPOS NODE 01                        */}
            {/* Box: x=30 to x=280 (width=250)                    */}
            {/* ================================================= */}
            <g id="node-brewpos">
              {/* Outer Microchip Base */}
              <rect
                x="30"
                y="30"
                width="250"
                height="320"
                fill="#1E1B4B"
                stroke={activeStep.sourceName === "BREWPOS" ? "#FEF08A" : "#FACC15"}
                strokeWidth={activeStep.sourceName === "BREWPOS" ? 3 : 2}
                className={activeStep.sourceName === "BREWPOS" ? "anim-glow" : ""}
                style={{ color: "#FACC15" }}
              />
              {/* Chip Pins on Right */}
              {[70, 125, 180, 235, 290].map((y, idx) => {
                const isPinActive = activeStep.id === idx + 1;
                return (
                  <rect
                    key={`pin-l-${idx}`}
                    x="280"
                    y={y - 4}
                    width="12"
                    height="8"
                    fill={isPinActive ? activeStep.color : "#FACC15"}
                    stroke="#0A0A0F"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Chip Header Strip */}
              <rect x="32" y="32" width="246" height="42" fill="#312E81" />
              <text
                x="155"
                y="58"
                textAnchor="middle"
                fill="#FEF08A"
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                BREWPOS // NODE 01
              </text>
              <text
                x="155"
                y="88"
                textAnchor="middle"
                fill="#A5B4FC"
                className="font-mono text-[10px] font-bold uppercase"
              >
                Laravel 11 &bull; Livewire 3 &bull; MySQL 8
              </text>

              {/* Chip Internal Register Units */}
              {/* Register 1: Catalog */}
              <g transform="translate(48, 105)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeBrewposModule === 1 ? "#1E1B4B" : "#0F172A"}
                  stroke={activeStep.activeBrewposModule === 1 ? "#FACC15" : "#475569"}
                  strokeWidth={activeStep.activeBrewposModule === 1 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeBrewposModule === 1 ? "#FEF08A" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [1] CATALOG / SCANNER
                </text>
              </g>

              {/* Register 2: BOM Recipe */}
              <g transform="translate(48, 145)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeBrewposModule === 2 ? "#075985" : "#0F172A"}
                  stroke={activeStep.activeBrewposModule === 2 ? "#38BDF8" : "#475569"}
                  strokeWidth={activeStep.activeBrewposModule === 2 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeBrewposModule === 2 ? "#BAE6FD" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [2] BOM RECIPE DEDUCTION
                </text>
              </g>

              {/* Register 3: Real-Time KDS */}
              <g transform="translate(48, 185)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeBrewposModule === 3 ? "#500724" : "#0F172A"}
                  stroke={activeStep.activeBrewposModule === 3 ? "#EC4899" : "#475569"}
                  strokeWidth={activeStep.activeBrewposModule === 3 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeBrewposModule === 3 ? "#F472B6" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [3] REAL-TIME KDS FEED
                </text>
              </g>

              {/* Register 4: SELECT ... FOR UPDATE */}
              <g transform="translate(48, 225)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeBrewposModule === 4 ? "#052E16" : "#042F2E"}
                  stroke={activeStep.activeBrewposModule === 4 ? "#22C55E" : "#10B981"}
                  strokeWidth={activeStep.activeBrewposModule === 4 ? 2.5 : 1.5}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeBrewposModule === 4 ? "#86EFAC" : "#34D399"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [4] SELECT ... FOR UPDATE
                </text>
              </g>

              {/* Status footer inside chip */}
              <rect x="48" y="278" width="214" height="24" fill="#1E293B" />
              <circle
                cx="62"
                cy="290"
                r="4"
                fill={activeStepId === 3 || activeStepId === 5 ? "#4ADE80" : "#22C55E"}
                className={activeStepId === 3 || activeStepId === 5 ? "animate-ping" : ""}
              />
              <circle cx="62" cy="290" r="4" fill="#22C55E" />
              <text x="74" y="294" fill="#94A3B8" className="font-mono text-[10px] font-bold uppercase">
                STATUS: {activeStepId === 3 || activeStepId === 5 ? "ACID LOCKED (LIVE)" : "ACID LOCKED"}
              </text>
            </g>

            {/* ================================================= */}
            {/* RIGHT CHIP: Payment Gateway NODE 02               */}
            {/* Box: x=680 to x=930 (width=250)                   */}
            {/* ================================================= */}
            <g id="node-gateway">
              {/* Outer Microchip Base */}
              <rect
                x="680"
                y="30"
                width="250"
                height="320"
                fill="#1E1B4B"
                stroke={activeStep.sourceName === "GATEWAY" ? "#38BDF8" : "#0284C7"}
                strokeWidth={activeStep.sourceName === "GATEWAY" ? 3 : 2}
                className={activeStep.sourceName === "GATEWAY" ? "anim-glow" : ""}
                style={{ color: "#38BDF8" }}
              />
              {/* Chip Pins on Left */}
              {[70, 125, 180, 235, 290].map((y, idx) => {
                const isPinActive = activeStep.id === idx + 1;
                return (
                  <rect
                    key={`pin-r-${idx}`}
                    x="668"
                    y={y - 4}
                    width="12"
                    height="8"
                    fill={isPinActive ? activeStep.color : "#38BDF8"}
                    stroke="#0A0A0F"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Chip Header Strip */}
              <rect x="682" y="32" width="246" height="42" fill="#075985" />
              <text
                x="805"
                y="58"
                textAnchor="middle"
                fill="#BAE6FD"
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-pixel-arcade)" }}
              >
                GATEWAY // NODE 02
              </text>
              <text
                x="805"
                y="88"
                textAnchor="middle"
                fill="#7DD3FC"
                className="font-mono text-[10px] font-bold uppercase"
              >
                NestJS &bull; PostgreSQL &bull; Redis &bull; TS
              </text>

              {/* Chip Internal Register Units */}
              {/* Register 1: Idempotency Engine */}
              <g transform="translate(698, 105)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeGatewayModule === 1 ? "#1E1B4B" : "#042F2E"}
                  stroke={activeStep.activeGatewayModule === 1 ? "#FACC15" : "#10B981"}
                  strokeWidth={activeStep.activeGatewayModule === 1 ? 2.5 : 1.5}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeGatewayModule === 1 ? "#FEF08A" : "#34D399"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [1] IDEMPOTENCY ENGINE
                </text>
              </g>

              {/* Register 2: EMVCo QRIS Payload */}
              <g transform="translate(698, 145)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeGatewayModule === 2 ? "#075985" : "#0F172A"}
                  stroke={activeStep.activeGatewayModule === 2 ? "#38BDF8" : "#475569"}
                  strokeWidth={activeStep.activeGatewayModule === 2 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeGatewayModule === 2 ? "#BAE6FD" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [2] EMVCO QRIS PAYLOAD
                </text>
              </g>

              {/* Register 3: ACID State Machine */}
              <g transform="translate(698, 185)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeGatewayModule === 3 ? "#052E16" : "#0F172A"}
                  stroke={activeStep.activeGatewayModule === 3 ? "#22C55E" : "#475569"}
                  strokeWidth={activeStep.activeGatewayModule === 3 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeGatewayModule === 3 ? "#86EFAC" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [3] ACID STATE MACHINE
                </text>
              </g>

              {/* Register 4: Anti-SSRF Webhook */}
              <g transform="translate(698, 225)">
                <rect
                  x="0"
                  y="0"
                  width="214"
                  height="30"
                  fill={activeStep.activeGatewayModule === 4 ? "#500724" : "#0F172A"}
                  stroke={activeStep.activeGatewayModule === 4 ? "#EC4899" : "#475569"}
                  strokeWidth={activeStep.activeGatewayModule === 4 ? 2 : 1}
                />
                <text
                  x="12"
                  y="19"
                  fill={activeStep.activeGatewayModule === 4 ? "#F472B6" : "#E2E8F0"}
                  className="font-mono text-[10.5px] font-bold"
                >
                  [4] ANTI-SSRF WEBHOOK
                </text>
              </g>

              {/* Status footer inside chip */}
              <rect x="698" y="278" width="214" height="24" fill="#1E293B" />
              <circle
                cx="712"
                cy="290"
                r="4"
                fill={activeStepId === 1 || activeStepId === 5 ? "#38BDF8" : "#0284C7"}
                className={activeStepId === 1 || activeStepId === 5 ? "animate-ping" : ""}
              />
              <circle cx="712" cy="290" r="4" fill="#38BDF8" />
              <text x="724" y="294" fill="#94A3B8" className="font-mono text-[10px] font-bold uppercase">
                STATUS: {activeStepId === 5 ? "IDEMPOTENT OK (COMMITTED)" : "IDEMPOTENT OK"}
              </text>
            </g>

            {/* ================================================= */}
            {/* 5 PARALLEL PIXEL DATA BUS CHANNELS                */}
            {/* Bus wires run between x=292 and x=668 (gap: 376px)*/}
            {/* Badges centered at x=480, width=310 (x=325..635)  */}
            {/* ================================================= */}

            {/* BUS 1: L -> R (Request with Idempotency Key) */}
            <g
              id="bus-channel-1"
              onClick={() => handleStepClick(1)}
              className="cursor-pointer"
              opacity={activeStepId === 1 ? 1 : 0.65}
            >
              <line
                x1="292"
                y1="70"
                x2="668"
                y2="70"
                stroke="#FACC15"
                strokeWidth={activeStepId === 1 ? 3 : 2}
                strokeDasharray="8 4"
                className={activeStepId === 1 && isPlaying ? "anim-flow-ltr" : ""}
              />
              <polygon points="668,70 658,64 658,76" fill="#FACC15" />
              <rect
                x="325"
                y="55"
                width="310"
                height="22"
                fill={activeStepId === 1 ? "#1E1B4B" : "#0F172A"}
                stroke="#FACC15"
                strokeWidth={activeStepId === 1 ? 2.5 : 1}
                className={activeStepId === 1 ? "anim-glow" : ""}
                style={{ color: "#FACC15" }}
              />
              <text
                x="480"
                y="70"
                textAnchor="middle"
                fill="#FEF08A"
                className="font-mono text-[9.5px] font-bold tracking-normal"
              >
                1: CREATE_ORDER + IDEMPOTENCY-KEY &rarr;
              </text>

              {/* Data Packet Runner */}
              {activeStepId === 1 && isPlaying && (
                <g className="anim-packet-ltr">
                  <rect x="292" y="66" width="14" height="8" fill="#FEF08A" stroke="#000" strokeWidth="1" />
                  <rect x="295" y="68" width="8" height="4" fill="#FACC15" />
                </g>
              )}
            </g>

            {/* BUS 2: R -> L (EMVCo QRIS Payload) */}
            <g
              id="bus-channel-2"
              onClick={() => handleStepClick(2)}
              className="cursor-pointer"
              opacity={activeStepId === 2 ? 1 : 0.65}
            >
              <line
                x1="668"
                y1="125"
                x2="292"
                y2="125"
                stroke="#38BDF8"
                strokeWidth={activeStepId === 2 ? 3 : 2}
                strokeDasharray="8 4"
                className={activeStepId === 2 && isPlaying ? "anim-flow-rtl" : ""}
              />
              <polygon points="292,125 302,119 302,131" fill="#38BDF8" />
              <rect
                x="325"
                y="110"
                width="310"
                height="22"
                fill={activeStepId === 2 ? "#075985" : "#0F172A"}
                stroke="#38BDF8"
                strokeWidth={activeStepId === 2 ? 2.5 : 1}
                className={activeStepId === 2 ? "anim-glow" : ""}
                style={{ color: "#38BDF8" }}
              />
              <text
                x="480"
                y="125"
                textAnchor="middle"
                fill="#BAE6FD"
                className="font-mono text-[9.5px] font-bold tracking-normal"
              >
                &larr; 2: EMVCO QRIS PAYLOAD + TTL
              </text>

              {/* Data Packet Runner */}
              {activeStepId === 2 && isPlaying && (
                <g className="anim-packet-rtl">
                  <rect x="654" y="121" width="14" height="8" fill="#BAE6FD" stroke="#000" strokeWidth="1" />
                  <rect x="657" y="123" width="8" height="4" fill="#38BDF8" />
                </g>
              )}
            </g>

            {/* BUS 3: L -> R (Row Lock Settled) */}
            <g
              id="bus-channel-3"
              onClick={() => handleStepClick(3)}
              className="cursor-pointer"
              opacity={activeStepId === 3 ? 1 : 0.65}
            >
              <line
                x1="292"
                y1="180"
                x2="668"
                y2="180"
                stroke="#10B981"
                strokeWidth={activeStepId === 3 ? 3 : 2}
                strokeDasharray="8 4"
                className={activeStepId === 3 && isPlaying ? "anim-flow-ltr" : ""}
              />
              <polygon points="668,180 658,174 658,186" fill="#10B981" />
              <rect
                x="325"
                y="165"
                width="310"
                height="22"
                fill={activeStepId === 3 ? "#042F2E" : "#042F2E"}
                stroke="#10B981"
                strokeWidth={activeStepId === 3 ? 2.5 : 1}
                className={activeStepId === 3 ? "anim-glow" : ""}
                style={{ color: "#10B981" }}
              />
              <text
                x="480"
                y="180"
                textAnchor="middle"
                fill="#6EE7B7"
                className="font-mono text-[9.5px] font-bold tracking-normal"
              >
                3: PESSIMISTIC LOCK GRANTED &rarr;
              </text>

              {/* Data Packet Runner */}
              {activeStepId === 3 && isPlaying && (
                <g className="anim-packet-ltr">
                  <rect x="292" y="176" width="14" height="8" fill="#6EE7B7" stroke="#000" strokeWidth="1" />
                  <rect x="295" y="178" width="8" height="4" fill="#10B981" />
                </g>
              )}
            </g>

            {/* BUS 4: R -> L (HMAC-SHA256 Webhook Dispatch) */}
            <g
              id="bus-channel-4"
              onClick={() => handleStepClick(4)}
              className="cursor-pointer"
              opacity={activeStepId === 4 ? 1 : 0.65}
            >
              <line
                x1="668"
                y1="235"
                x2="292"
                y2="235"
                stroke="#EC4899"
                strokeWidth={activeStepId === 4 ? 3 : 2}
                strokeDasharray="8 4"
                className={activeStepId === 4 && isPlaying ? "anim-flow-rtl" : ""}
              />
              <polygon points="292,235 302,229 302,241" fill="#EC4899" />
              <rect
                x="325"
                y="220"
                width="310"
                height="22"
                fill={activeStepId === 4 ? "#500724" : "#0F172A"}
                stroke="#EC4899"
                strokeWidth={activeStepId === 4 ? 2.5 : 1}
                className={activeStepId === 4 ? "anim-glow" : ""}
                style={{ color: "#EC4899" }}
              />
              <text
                x="480"
                y="235"
                textAnchor="middle"
                fill="#F472B6"
                className="font-mono text-[9.5px] font-bold tracking-normal"
              >
                &larr; 4: HMAC-SHA256 WEBHOOK (PAID)
              </text>

              {/* Data Packet Runner */}
              {activeStepId === 4 && isPlaying && (
                <g className="anim-packet-rtl">
                  <rect x="654" y="231" width="14" height="8" fill="#F472B6" stroke="#000" strokeWidth="1" />
                  <rect x="657" y="233" width="8" height="4" fill="#EC4899" />
                </g>
              )}
            </g>

            {/* BUS 5: L -> R (Two-Phase Commit Completed) */}
            <g
              id="bus-channel-5"
              onClick={() => handleStepClick(5)}
              className="cursor-pointer"
              opacity={activeStepId === 5 ? 1 : 0.65}
            >
              <line
                x1="292"
                y1="290"
                x2="668"
                y2="290"
                stroke="#22C55E"
                strokeWidth={activeStepId === 5 ? 3 : 2}
                strokeDasharray="8 4"
                className={activeStepId === 5 && isPlaying ? "anim-flow-ltr" : ""}
              />
              <polygon points="668,290 658,284 658,296" fill="#22C55E" />
              <rect
                x="325"
                y="275"
                width="310"
                height="22"
                fill={activeStepId === 5 ? "#052E16" : "#042F2E"}
                stroke="#22C55E"
                strokeWidth={activeStepId === 5 ? 2.5 : 1}
                className={activeStepId === 5 ? "anim-glow" : ""}
                style={{ color: "#22C55E" }}
              />
              <text
                x="480"
                y="290"
                textAnchor="middle"
                fill="#86EFAC"
                className="font-mono text-[9.5px] font-bold tracking-normal"
              >
                5: ATOMIC COMMIT &bull; 0 RACE CONDITIONS &rarr;
              </text>

              {/* Data Packet Runner */}
              {activeStepId === 5 && isPlaying && (
                <g className="anim-packet-ltr">
                  <rect x="292" y="286" width="14" height="8" fill="#86EFAC" stroke="#000" strokeWidth="1" />
                  <rect x="295" y="288" width="8" height="4" fill="#22C55E" />
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Mobile Swipe Affordance Bar */}
        <div className="sm:hidden bg-[#111827] border-t-2 border-[#0A0A0F] px-3 py-1.5 flex items-center justify-between font-mono text-[9.5px] text-[#93C5FD]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FACC15] inline-block animate-ping" />
            <span>&larr;&rarr; SWIPE TO VIEW NODE 02</span>
          </span>
          <span className="text-[#FDE047] font-bold">BREWPOS &rarr; GATEWAY</span>
        </div>

        {/* Footer Hardware Metric Bar */}
        <div className="bg-[#ECE9D8] px-4 py-2.5 border-t-2 border-[#0A0A0F] flex flex-wrap items-center justify-between font-mono text-[11px] text-[#334155]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22C55E] inline-block" />
            <span>ACID Row Locking + Mathematical Idempotency verified in automated test suite</span>
          </div>
          <div className="flex items-center gap-4 text-[#0A0A0F] font-bold">
            <span>60 POS TESTS PASS</span>
            <span>&bull;</span>
            <span>222 GATEWAY TESTS PASS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
