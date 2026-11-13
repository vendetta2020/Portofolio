export interface SectionBreakdown {
  title: string;
  content: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  fullTags: string[];
  image: string;
  githubUrl: string;
  sections: SectionBreakdown[];
}

export const projects: Project[] = [
  {
    slug: "brewpos",
    number: "01",
    title: "BrewPOS",
    subtitle: "Real-time kitchen order feed, automated recipe deduction, and zero-deficit stock control.",
    description: "All-in-one POS, kitchen ticketing, and real-time inventory management engineered for high-volume coffee shops.",
    tags: ["Laravel", "Livewire 3", "Alpine.js", "MySQL 8"],
    fullTags: ["Laravel", "Livewire 3", "Alpine.js", "MySQL 8", "Production 2024"],
    image: "/screens/brewpos.png",
    githubUrl: "https://github.com/vendetta2020/BrewPOS",
    sections: [
      {
        title: "Recipe-Level Automated Deduction",
        content:
          "Ordering one Caramel Latte atomically deducts 18g espresso, 200ml milk, and 20ml syrup. Business owners monitor real-time gross margins per SKU rather than approximations.",
      },
      {
        title: "Guaranteed Zero Negative Stock",
        content:
          "Two cashiers checkout the last remaining inventory item at the exact same millisecond? Only one succeeds. Handled via pessimistic row locking (SELECT ... FOR UPDATE) and MySQL 8 strict check constraints.",
      },
      {
        title: "Real-Time Kitchen Display Feed",
        content:
          "Settled orders instantly appear on the barista kitchen display via Livewire 3 & Alpine.js with zero full-page reloads. Preparation time and latency are tracked end-to-end.",
      },
      {
        title: "Tamper-Proof Shift Reconciliation",
        content:
          "Physical drawer cash reconciles against digital audit ledgers; discrepancy logs are locked and cryptographically timestamped.",
      },
    ],
  },
  {
    slug: "payment-gateway",
    number: "02",
    title: "Payment Gateway",
    subtitle: "Multi-tenant payment orchestration engine engineered to stay consistent under network faults.",
    description: "High-throughput payment gateway with guaranteed idempotency, strict ACID state machines, and anti-SSRF webhook dispatchers.",
    tags: ["PostgreSQL", "NestJS", "Next.js"],
    fullTags: ["PostgreSQL", "NestJS", "Next.js", "TypeScript", "Production 2024"],
    image: "/screens/gateway.png",
    githubUrl: "https://github.com/vendetta2020/PaymentGateway_Sandbox",
    sections: [
      {
        title: "Mathematical Idempotency Guarantee",
        content:
          "Every payment mutation requires a unique Idempotency-Key. If network timeouts cause cashiers to press 'Pay' repeatedly, the engine guarantees zero duplicate charges or orphaned ledger entries.",
      },
      {
        title: "ACID Transaction State Machine",
        content:
          "Payment lifecycle transitions (Pending, Paid, Expired, Failed) are locked with strict ACID transactions in PostgreSQL. Illegal or out-of-order state jumps are impossible.",
      },
      {
        title: "Anti-SSRF Webhook Dispatcher",
        content:
          "Outbound webhook dispatcher validates DNS resolution and blocks private IP subnets before payload dispatch. Notifications are cryptographically signed with HMAC-SHA256 and retried via exponential backoff.",
      },
      {
        title: "Isolated Multi-Tenant Security",
        content:
          "Merchant accounts feature isolated sandbox and production API keys. Transaction logs, audit trails, and customer credentials are fully segregated across enterprise tenants.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
