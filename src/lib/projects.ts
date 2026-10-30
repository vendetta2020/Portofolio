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
    subtitle: "POS, dapur, dan stok kedai kopi dalam satu sistem.",
    description: "POS, dapur, dan stok kedai kopi dalam satu sistem.",
    tags: ["Laravel", "Livewire 3", "Alpine.js", "MySQL 8"],
    fullTags: ["Laravel", "Livewire 3", "Alpine.js", "MySQL 8", "Tahun 2024"],
    image: "/screens/brewpos.png",
    githubUrl: "https://github.com/Afiffakhriyadh/BrewPOS",
    sections: [
      {
        title: "Stok per resep",
        content:
          "Satu Caramel Latte otomatis memotong 18 g espresso, 200 ml susu, dan 20 ml sirup. Pemilik mendapat margin kotor per item, bukan perkiraan.",
      },
      {
        title: "Stok tidak bisa minus",
        content:
          "Dua kasir menjual bahan terakhir di detik yang sama? Hanya satu yang berhasil. Pemotongan stok memakai SELECT ... FOR UPDATE dan check constraint di MySQL 8.",
      },
      {
        title: "Layar dapur real-time",
        content:
          "Pesanan lunas langsung muncul di layar barista lewat Livewire 3 dan Alpine.js, tanpa reload. Durasi persiapan terlacak.",
      },
      {
        title: "Tutup shift",
        content:
          "Kas laci dicocokkan dengan rekap digital, selisih dicatat, dan log dikunci.",
      },
    ],
  },
  {
    slug: "payment-gateway",
    number: "02",
    title: "Payment Gateway",
    subtitle: "Gateway multi-tenant yang tetap benar saat jaringan bermasalah.",
    description: "Gateway multi-tenant yang tetap benar saat jaringan bermasalah.",
    tags: ["PostgreSQL", "NestJS", "Next.js"],
    fullTags: ["PostgreSQL", "NestJS", "Next.js", "TypeScript", "Tahun 2024"],
    image: "/screens/gateway.png",
    githubUrl: "https://github.com/Afiffakhriyadh/PaymentGateway",
    sections: [
      {
        title: "Jaminan idempotensi",
        content:
          "Setiap request pembayaran wajib menyertakan Idempotency-Key unik. Jika kasir menekan tombol bayar berulang kali saat koneksi terputus, sistem menjamin tidak terjadi penduplikasian tagihan.",
      },
      {
        title: "State machine transaksi",
        content:
          "Transisi status pembayaran (Pending, Paid, Expired, Failed) dikunci ketat dengan transaksi ACID di PostgreSQL. Status tidak dapat dimanipulasi atau melompat secara ilegal.",
      },
      {
        title: "Webhook anti-SSRF",
        content:
          "Dispatcher webhook memvalidasi DNS dan memblokir IP privat sebelum menembakkan payload. Notifikasi dikirimkan dengan signature HMAC-SHA256 dan retry eksponensial.",
      },
      {
        title: "Isolasi multi-tenant",
        content:
          "Setiap merchant memiliki API Key terpisah untuk mode uji coba dan produksi. Data transaksi, log audit, dan kredensial terisolasi penuh antar akun bisnis.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
