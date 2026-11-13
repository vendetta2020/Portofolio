# Afif Fakhriyadh Asri — 16-Bit Retro Arcade Portfolio & Mission-Critical Backend Engineering

<p align="center">
  <img src="public/images/afif-avatar.png" width="200" alt="Afif Pixel Avatar" />
</p>

<p align="center">
  <a href="https://afif-dev.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-afif--dev.vercel.app-10B981?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.2.3-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" /></a>
</p>

Platform portofolio web interaktif full-stack yang mengombinasikan estetika visual **16-Bit Sunset Retro Arcade** dengan presentasi arsitektur rekayasa backend *mission-critical*, khususnya sistem kontrol konkurensi pesimistik (*pessimistic row locking*), rel transaksi finansial idempoten, dan simulasi infrastruktur enterprise tingkat industri (**BrewPOS** & **Modular Payment Gateway**).

Dirancang dengan pendekatan performa tinggi tanpa kompromi (*zero-jank 60 FPS*), aplikasi ini dilengkapi dengan bootloader **1-Bit Ordered Bayer Pixel Dither** interaktif (terinspirasi dari konsep visual Hulusi Tunç), sintesis audio prosedural tanpa aset file via **Web Audio API 8-Bit Chiptune**, simulasi raster monitor tabung kaca **Stepped CRT Scanlines**, serta dossier arsitektur mendalam dengan diagram interaktif dan metrik benchmark nyata.

**Portfolio Engineering Showcase — 16-Bit Retro Arcade UI & Mission-Critical Backend Systems Architecture**

---

## 🌐 Arsitektur Sistem & Interaktivitas (Interactive Architecture Ecosystem)

Portofolio ini dirancang bukan sekadar sebagai etalase visual statis, melainkan sebagai sebuah ekosistem interaktif yang menyatukan visual retro arcade dengan eksplorasi teknis mendalam terhadap sistem perangkat lunak skala enterprise:

```
+-----------------------------------------------------------------------------------------------------+
|                           PORTFOLIO ARCHITECTURE & CONCURRENCY SHOWCASE                             |
+-----------------------------------------------------------------------------------------------------+
|                                                                                                     |
|   [ 16-BIT RETRO PRESENTATION LAYER ]                    [ ENTERPRISE BACKEND SHOWCASE LAYER ]      |
|   +---------------------------------------+              +-------------------------------------+    |
|   |        Interactive Client Engine      |              |     Mission-Critical Systems Core   |    |
|   |---------------------------------------|              |-------------------------------------|    |
|   | • 1-Bit Bayer Pixel Dither Canvas     |              | • BrewPOS (Point of Sale & KDS)     |    |
|   | • 72x82 Matrix & Supernova Scatter    |  Inspects    |   - SELECT ... FOR UPDATE Locking   |    |
|   | • Web Audio API 8-Bit Sound Engine    | -----------> |   - Atomic Recipe BOM Deduction     |    |
|   | • Stepped CRT Scanline Shaders        |   Dossier    |   - In-flight Duplicate Prevention  |    |
|   | • Windows XP System Properties Dialog |              | • Modular Payment Gateway           |    |
|   | • Next.js 16 App Router & Turbopack   |              |   - Idempotency-Key Rails           |    |
|   | • Responsive Tailwind CSS v4 Canvas   |              |   - Anti-SSRF HMAC-SHA256 Engine    |    |
|   +---------------------------------------+              |   - O(N+M) Financial Reconciliation |    |
|                                                          +-------------------------------------+    |
|                                                                                                     |
+-----------------------------------------------------------------------------------------------------+
```

### Alur Interaksi & Siklus Hidup Aplikasi:
1. **Inisialisasi Bootloader 1-Bit Pixel Dither**: Saat pertama kali aplikasi dimuat, canvas 1-bit ordered Bayer dithering mengekstrak matriks titik resolusi 72×82 (2.084 titik koordinat) dari avatar pixel. Titik-titik ini dirakit secara dinamis mengikuti fungsi *Hermite cubic easing* ($3t^2 - 2t^3$) selama 3,2 detik, diiringi synthesizer chiptune Web Audio API, sebelum meledak secara radial (*supernova scatter explosion*) ke seluruh layar.
2. **Sintesis Audio Prosedural (Web Audio API)**: Efek suara interaktif (klik tombol, feedback toggle, status boot, alarm) disintesis secara real-time langsung melalui kode JavaScript menggunakan oscillator native (`square` dan `triangle`) tanpa latensi unduhan aset eksternal (`.mp3`/`.wav`).
3. **Simulasi Layar Kaca Tabung (Stepped CRT)**: Layer overlay shader CSS menyimulasikan raster monitor tabung klasik dengan efek scanlines 2px stepped, mikrokromatografi, dan vignette melengkung yang dioptimalkan dengan properti `pointer-events-none` untuk menjaga performa rendering tetap 60 FPS.
4. **Dossier Arsitektur & Rekayasa Transaksi**: Pengunjung dapat meninjau implementasi kode, skema locking database, diagram arsitektur interaktif, serta hasil uji otomatis dari dua sistem backend utama:
   - **BrewPOS**: Point of Sale dengan *pessimistic row locking* dan pengurangan resep Bill of Materials (BOM) otomatis (60 skenario pengujian / 380 assertions).
   - **Modular Payment Gateway**: Platform pembayaran terdistribusi dengan jaminan matematis idempoten, *state machine* berbasis ACID, mitigasi SSRF/DNS Rebinding, dan rekonsiliasi $O(N+M)$ (222 automated tests).

---

## Konfigurasi Aplikasi

### Persyaratan Sistem
| Komponen | Versi | Keterangan |
|----------|-------|------------|
| Node.js | 20+ / 22+ / 24+ | Runtime JavaScript / TypeScript berkinerja tinggi |
| npm | 10+ | Node Package Manager |
| Next.js | 16.1.6 | React Framework dengan Turbopack Bundler & Server Components |
| React | 19.2.3 | Modern React dengan Concurrent Rendering |
| Tailwind CSS | 4.0+ | CSS-first Utility Engine dengan styling zero-runtime overhead |
| Docker | 24+ | Opsional untuk containerized standalone deployment |

### Variabel & Pengaturan Environment

Konfigurasi aplikasi dikelola secara terpusat pada file konfigurasi [`src/lib/site.ts`](src/lib/site.ts):

```typescript
export const siteConfig = {
  name: "Afif Fakhriyadh Asri",
  title: "Afif Fakhriyadh Asri — Backend & Fullstack Engineer",
  url: "https://afif-dev.vercel.app",
  role: "Backend & Fullstack Engineer",
  email: "afiffakhriyadh2012@gmail.com",
  github: "https://github.com/vendetta2020",
  linkedin: "https://www.linkedin.com/in/afif-fakhriyadh-asri",
  instagram: "https://instagram.com/nocentdumpp",
  location: "Bandung, ID",
  revision: "REV 02",
};
```

---

## Menjalankan Aplikasi

### 1. Opsi Manual / Bare-Metal (Direkomendasikan untuk Development)
```bash
# 1. Clone repositori
git clone https://github.com/vendetta2020/Portofolio.git
cd Portofolio

# 2. Install dependencies
npm install

# 3. Jalankan development server dengan Turbopack
npm run dev
```

Buka peramban di `http://localhost:3000`.

### 2. Opsi Build Produksi
```bash
# Build aplikasi untuk deployment produksi
npm run build

# Menjalankan server produksi
npm run start
```

### 3. Opsi Docker Container
Aplikasi dilengkapi dengan skrip multi-stage [`Dockerfile`](Dockerfile):
```bash
docker build -t afif-portfolio .
docker run -p 3000:3000 afif-portfolio
```

---

## Navigasi & URL Akses

| Lingkungan | Alamat URL / Akses | Keterangan |
|------------|---------------------|------------|
| **Live Production** | [afif-dev.vercel.app](https://afif-dev.vercel.app) | Deployment live global di infrastruktur Vercel Edge Network |
| **Local Development** | `http://localhost:3000` | Server lokal interaktif dengan hot reload Turbopack |
| **Replay Bootloader** | `http://localhost:3000?boot=1` | Memaksa pemutaran ulang animasi 1-bit dither loading |
| **Bypass Bootloader** | `http://localhost:3000?noboot=1` | Melompati animasi loading langsung menuju halaman utama |

---

## Fitur Utama & Modul

| Modul | File / Komponen | Deskripsi Teknis |
|-------|-----------------|------------------|
| **1-Bit Pixel Dither Loader** | [`src/components/pixel-dither-loader.tsx`](src/components/pixel-dither-loader.tsx) | Canvas 1-bit ordered dithering beresolusi 72×82 matriks titik (2.084 partikel) dengan kurva Hermite kubik $3t^2 - 2t^3$, scatter kinetik radial 360°, sinkronisasi audio, dan anti-flicker SSR guard |
| **Web Audio Chiptune Engine** | [`src/lib/pixel-audio.ts`](src/lib/pixel-audio.ts) | Sintesis audio chiptune 8-bit tanpa dependensi aset audio eksternal; menghasilkan klik UI, chime keberhasilan bootloader, nada peringatan, dan manajemen audio context |
| **Stepped CRT Monitor Overlay** | [`src/components/crt-overlay.tsx`](src/components/crt-overlay.tsx) | Simulasi garis raster kaca CRT stepped, mikro-vignette pada sudut layar, dan scanlines interaktif dengan zero layout shift |
| **Sunset Twilight Canvas** | [`src/components/pixel-sky-canvas.tsx`](src/components/pixel-sky-canvas.tsx) | Kanvas procedural dithered sunset gradient (`#0B031A` deep indigo ke `#FACC15` golden amber) dengan bintang berkedip dan awan pixel mengambang |
| **Windows XP System Properties** | [`src/components/pixel-dialog-box.tsx`](src/components/pixel-dialog-box.tsx) | Dialog modal retro ala Windows XP ("System Properties - Afif OS") dengan tab interaktif General, Hardware, Experience, dan Architecture |
| **BrewPOS Deep Dive Dossier** | [`src/components/project-card.tsx`](src/components/project-card.tsx) | Presentasi arsitektur point-of-sale kopi: *pessimistic row locking*, pemotongan resep BOM atomik, *in-flight duplicate prevention*, dan real-time KDS |
| **Payment Gateway Deep Dive** | [`src/components/project-card.tsx`](src/components/project-card.tsx) | Presentasi infrastruktur pembayaran modular: garansi matematis *Idempotency-Key*, *ACID state machine*, mesin webhook anti-SSRF, dan rekonsiliasi $O(N+M)$ |
| **Responsive Arcade HUD** | [`src/components/pixel-hero.tsx`](src/components/pixel-hero.tsx) | Header arcade interaktif lengkap dengan tipografi 3D extruded pixel, jam digital real-time, toggle suara chiptune, dan status koneksi live |

---

## 🛠️ Sorotan Teknis & Rekayasa Arsitektur

### 1. Algoritma 1-Bit Bayer Pixel Dithering & Dynamic Scatter Physics
Animasi loading screen menggunakan komputasi canvas HTML5 murni tanpa library animasi eksternal untuk menjamin kinerja 60 FPS:
- **Matriks Avatar**: Koordinat titik diekstraksi menjadi format JSON terindeks (`x: 0..71`, `y: 0..81`, $N = 2.084$).
- **Fase Perakitan (Assembly Phase)**: Menggunakan fungsi easing *Smoothstep/Hermite Cubic*:
  $$\text{Progress}(t) = 3t^2 - 2t^3$$
- **Fase Ledakan Partikel (Supernova Radial Scatter)**: Setelah mencapai 100% dan penahanan sesaat (*hold phase*), setiap partikel diberikan vektor kecepatan acak $(\theta \in [0, 2\pi], v \in [180, 520]\text{ px/s})$ dengan koefisien gesekan udara aerodinamis $(\gamma = 0.985)$:
  $$\vec{x}(t) = \vec{x}_0 + \vec{v}_0 \cdot \gamma^t \cdot t$$
- **Kanvas Tanpa Batas (*Unbounded Viewport*)**: Kanvas scatter diposisikan pada layer absolut (`inset-0 w-full h-full`) dengan penskalaan `window.devicePixelRatio` untuk mencegah efek pemotongan partikel pada batas kotak kontainer.

### 2. Sintesis Prosedural Web Audio API (Zero-Asset Chiptune)
Seluruh efek suara dihasilkan secara sintetik melalui kode:
- Menggunakan `AudioContext` native peramban dengan node oscillator bertipe `square` dan `triangle`.
- **Envelope Generator (ADSR)**: Menggunakan kurva gain eksponensial (`exponentialRampToValueAtTime`) untuk menghasilkan *decay* tajam khas instrumen chiptune era 8-bit/16-bit.
- **Audio Consent Management**: Mendukung kebijakan *autoplay policy* peramban modern dengan auto-resume saat ada interaksi pengguna pertama kali (*gesture unlock*).

### 3. Kontrol Konkurensi Pesimistik & Rel Finansial Idempoten
Sebagai bagian dari fokus rekayasa perangkat lunak backend, portofolio ini mendokumentasikan pemecahan masalah *race condition* pada proyek terkait:
- **Pessimistic Row Locking (`SELECT ... FOR UPDATE`)**: Menghindari anomali *double-spending* dan *phantom inventory deduction* pada BrewPOS dengan mengurutkan ID material secara menaik (`ORDER BY id ASC`) untuk membatalkan kemungkinan *circular wait deadlocks*.
- **Mathematical Idempotency Rails**: Pada Payment Gateway, setiap request transaksi dilindungi oleh kunci idempoten berbatas waktu (Redis & PostgreSQL UNIQUE constraint), menjamin bahwa request yang terulang akibat kegagalan jaringan tidak akan pernah memproses pendebetan ganda.
- **Mitigasi SSRF & DNS Rebinding**: Webhook engine memverifikasi setiap alamat IP tujuan pengiriman terhadap blok CIDR privat (RFC 1918) sebelum membuka socket TCP.

---

## 📁 Struktur Direktori Proyek

```
Portofolio/
├── public/
│   ├── cv.pdf                          # Curriculum Vitae resmi
│   ├── images/
│   │   └── afif-avatar.png             # Pixel art avatar resolusi asli
│   └── screens/
│       ├── brewpos.png                 # Tangkapan layar sistem BrewPOS
│       └── gateway.png                 # Tangkapan layar Modular Payment Gateway
├── src/
│   ├── app/
│   │   ├── karya/
│   │   │   └── [slug]/page.tsx         # Rute showcase karya dinamis
│   │   ├── globals.css                 # Konfigurasi Tailwind CSS v4 & custom variables
│   │   ├── layout.tsx                  # Root layout, metadata SEO & CRT scanline injection
│   │   └── page.tsx                    # Halaman utama portofolio
│   ├── components/
│   │   ├── crt-overlay.tsx             # Shader overlay scanlines monitor CRT
│   │   ├── footer.tsx                  # Terminal footer & interaksi kontak cepat
│   │   ├── navbar.tsx                  # Header navigasi arcade retro
│   │   ├── pixel-dialog-box.tsx        # Modal Windows XP System Properties
│   │   ├── pixel-dither-loader.tsx     # Bootloader 1-bit Bayer pixel dithering
│   │   ├── pixel-hero.tsx              # Arcade hero banner & tipografi 3D
│   │   ├── pixel-sky-canvas.tsx        # Kanvas langit twilight dithered prosedural
│   │   └── project-card.tsx            # Komponen kartu proyek & dossier teknis
│   └── lib/
│       ├── avatar-dither-points.json   # 2.084 titik koordinat matriks dither
│       ├── pixel-audio.ts              # Web Audio API 8-bit procedural synthesizer
│       ├── projects.ts                 # Data arsitektur dan metrik proyek
│       └── site.ts                     # Konfigurasi profil, URL & metadata
├── Dockerfile                          # Kontainerisasi produksi multi-stage
├── package.json                        # Definisi package & dependensi Next.js 16
├── tsconfig.json                       # Konfigurasi kompilasi TypeScript ketat
└── README.md                           # Dokumentasi komprehensif proyek
```

---

## 🧪 Kualitas & Pengujian Sistem

Proyek ini mempertahankan standar kode yang ketat untuk menjamin ketiadaan regresi visual maupun performa:
- **TypeScript Static Verification**: Dijalankan dengan pengecekan tipe statis ketat tanpa `any` berbahaya.
- **Production Optimization**: Dibangun menggunakan Next.js Turbopack compiler dengan eliminasi kode mati (*tree shaking*) dan optimasi aset otomatis.
- **Anti-Flicker SSR Script**: Skrip inline pada `<head>` mendeteksi flag `sessionStorage` dan preferensi gerak berkurang (*reduced-motion*) sebelum fase hidrasi DOM untuk mengeliminasi flash putih/content jump.

---

## 👨‍💻 Profil & Kontak Penulis

**Afif Fakhriyadh Asri**  
*Backend & Fullstack Engineer*  
Program Studi S1 Informatika — **Telkom University**, Bandung, Indonesia.

- **Live Portfolio**: [afif-dev.vercel.app](https://afif-dev.vercel.app)
- **GitHub**: [github.com/vendetta2020](https://github.com/vendetta2020)
- **LinkedIn**: [linkedin.com/in/afif-fakhriyadh-asri](https://www.linkedin.com/in/afif-fakhriyadh-asri)
- **Email**: [afiffakhriyadh2012@gmail.com](mailto:afiffakhriyadh2012@gmail.com)
