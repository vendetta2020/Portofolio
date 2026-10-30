export function HeroDiagram() {
  return (
    <div className="w-full my-6 sm:my-8 overflow-hidden">
      <svg
        viewBox="0 0 960 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-5xl mx-auto block"
        aria-label="Diagram Arsitektur Integrasi BrewPOS dan Payment Gateway"
        role="img"
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="bp-arrow-right"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 Z" fill="#e9ecf3" />
          </marker>
          <marker
            id="bp-arrow-left"
            viewBox="0 0 10 10"
            refX="2"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 8 1.5 L 0 5 L 8 8.5 Z" fill="#e9ecf3" />
          </marker>

          {/* Blueprint hatch pattern for inside nodes */}
          <pattern
            id="bp-hatch"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#e9ecf3"
              strokeWidth="0.75"
              strokeOpacity="0.08"
            />
          </pattern>
        </defs>

        {/* ================================================= */}
        {/* LEFT NODE: BrewPOS                                */}
        {/* ================================================= */}
        <g id="node-brewpos">
          {/* Box outline */}
          <rect
            x="30"
            y="30"
            width="230"
            height="300"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            fill="url(#bp-hatch)"
          />
          {/* Corner tick marks */}
          <path
            d="M 24 30 L 36 30 M 30 24 L 30 36 M 254 30 L 266 30 M 260 24 L 260 36 M 24 330 L 36 330 M 30 324 L 30 336 M 254 330 L 266 330 M 260 324 L 260 336"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Node Title */}
          <text
            x="50"
            y="70"
            fill="#e9ecf3"
            className="font-serif text-2xl font-normal tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            BrewPOS
          </text>
          <text
            x="50"
            y="92"
            fill="rgba(233,236,243,0.65)"
            className="font-mono text-[13px] tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NODE_01
          </text>

          {/* Internal Specs/Lines */}
          <line
            x1="50"
            y1="110"
            x2="240"
            y2="110"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          
          <text
            x="50"
            y="145"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            KATALOG / KASIR SCANNER
          </text>
          <text
            x="50"
            y="175"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            BILL OF MATERIALS (BOM)
          </text>
          <text
            x="50"
            y="205"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            KITCHEN DISPLAY (KDS)
          </text>
          <text
            x="50"
            y="235"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PESSIMISTIC DB LOCK
          </text>

          <line
            x1="50"
            y1="255"
            x2="240"
            y2="255"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          <text
            x="50"
            y="285"
            fill="rgba(233,236,243,0.9)"
            className="font-mono text-xs font-semibold tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            STATE: CONNECTED
          </text>
        </g>

        {/* ================================================= */}
        {/* RIGHT NODE: Payment Gateway                       */}
        {/* ================================================= */}
        <g id="node-gateway">
          {/* Box outline */}
          <rect
            x="700"
            y="30"
            width="230"
            height="300"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            fill="url(#bp-hatch)"
          />
          {/* Corner tick marks */}
          <path
            d="M 694 30 L 706 30 M 700 24 L 700 36 M 924 30 L 936 30 M 930 24 L 930 36 M 694 330 L 706 330 M 700 324 L 700 336 M 924 330 L 936 330 M 930 324 L 930 336"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Node Title */}
          <text
            x="720"
            y="70"
            fill="#e9ecf3"
            className="font-serif text-2xl font-normal tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Payment Gateway
          </text>
          <text
            x="720"
            y="92"
            fill="rgba(233,236,243,0.65)"
            className="font-mono text-[13px] tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NODE_02
          </text>

          {/* Internal Specs/Lines */}
          <line
            x1="720"
            y1="110"
            x2="910"
            y2="110"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          <text
            x="720"
            y="145"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            IDEMPOTENCY ENGINE
          </text>
          <text
            x="720"
            y="175"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            EMVCO QRIS PAYLOAD
          </text>
          <text
            x="720"
            y="205"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            PAYMENT STATE MACHINE
          </text>
          <text
            x="720"
            y="235"
            fill="rgba(233,236,243,0.7)"
            className="font-mono text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ANTI-SSRF WEBHOOK DISPATCH
          </text>

          <line
            x1="720"
            y1="255"
            x2="910"
            y2="255"
            stroke="#e9ecf3"
            strokeWidth="1"
            strokeOpacity="0.25"
          />

          <text
            x="720"
            y="285"
            fill="rgba(233,236,243,0.9)"
            className="font-mono text-xs font-semibold tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            STATUS: ACTIVE
          </text>
        </g>

        {/* ================================================= */}
        {/* 5 SEQUENTIAL NUMBERED ARROWS                      */}
        {/* Staggered CSS line animations on load             */}
        {/* ================================================= */}

        {/* Arrow 1: L -> R (1 request + idempotency key) */}
        <g id="arrow-flow-1">
          <text
            x="480"
            y="64"
            textAnchor="middle"
            fill="#e9ecf3"
            className="font-mono text-[14px] tracking-wide animate-fade-label"
            style={{
              fontFamily: "var(--font-mono)",
              animationDelay: "0.2s",
            }}
          >
            1 request + idempotency key
          </text>
          <line
            x1="260"
            y1="75"
            x2="692"
            y2="75"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            markerEnd="url(#bp-arrow-right)"
            className="animate-draw-arrow"
            style={{ animationDelay: "0.1s" }}
          />
        </g>

        {/* Arrow 2: R -> L (2 QRIS) */}
        <g id="arrow-flow-2">
          <text
            x="480"
            y="119"
            textAnchor="middle"
            fill="#e9ecf3"
            className="font-mono text-[14px] tracking-wide animate-fade-label"
            style={{
              fontFamily: "var(--font-mono)",
              animationDelay: "0.6s",
            }}
          >
            2 QRIS
          </text>
          <line
            x1="700"
            y1="130"
            x2="268"
            y2="130"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            markerEnd="url(#bp-arrow-left)"
            className="animate-draw-arrow"
            style={{ animationDelay: "0.5s" }}
          />
        </g>

        {/* Arrow 3: L -> R (3 otorisasi) */}
        <g id="arrow-flow-3">
          <text
            x="480"
            y="174"
            textAnchor="middle"
            fill="#e9ecf3"
            className="font-mono text-[14px] tracking-wide animate-fade-label"
            style={{
              fontFamily: "var(--font-mono)",
              animationDelay: "1.0s",
            }}
          >
            3 otorisasi
          </text>
          <line
            x1="260"
            y1="185"
            x2="692"
            y2="185"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            markerEnd="url(#bp-arrow-right)"
            className="animate-draw-arrow"
            style={{ animationDelay: "0.9s" }}
          />
        </g>

        {/* Arrow 4: R -> L (4 webhook HMAC) */}
        <g id="arrow-flow-4">
          <text
            x="480"
            y="229"
            textAnchor="middle"
            fill="#e9ecf3"
            className="font-mono text-[14px] tracking-wide animate-fade-label"
            style={{
              fontFamily: "var(--font-mono)",
              animationDelay: "1.4s",
            }}
          >
            4 webhook HMAC
          </text>
          <line
            x1="700"
            y1="240"
            x2="268"
            y2="240"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            markerEnd="url(#bp-arrow-left)"
            className="animate-draw-arrow"
            style={{ animationDelay: "1.3s" }}
          />
        </g>

        {/* Arrow 5: R -> L (5 status Paid) */}
        <g id="arrow-flow-5">
          <text
            x="480"
            y="284"
            textAnchor="middle"
            fill="#e9ecf3"
            className="font-mono text-[14px] tracking-wide animate-fade-label"
            style={{
              fontFamily: "var(--font-mono)",
              animationDelay: "1.8s",
            }}
          >
            5 status Paid
          </text>
          <line
            x1="700"
            y1="295"
            x2="268"
            y2="295"
            stroke="#e9ecf3"
            strokeWidth="1.5"
            strokeOpacity="0.9"
            markerEnd="url(#bp-arrow-left)"
            className="animate-draw-arrow"
            style={{ animationDelay: "1.7s" }}
          />
        </g>
      </svg>
    </div>
  );
}
