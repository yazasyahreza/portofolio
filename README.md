# Portfolio

Website portofolio pribadi dengan tampilan minimalis hitam-putih, terinspirasi dari susunan halaman profil ala LinkedIn — identitas, pengalaman, proyek, dan pendidikan ditampilkan langsung tanpa hero section atau elemen landing page pada umumnya.

Dibangun dengan [Astro](https://astro.build), dan dirancang sebagai bagian **read-only** dari sistem dua-layanan: seluruh data (identitas, pengalaman, proyek, pendidikan) dikelola lewat [Portfolio CMS](#) yang terpisah, dan situs ini menampilkannya secara *server-rendered*.

## Fitur

- **Identity** — profil ringkas: foto, cover, bio, ringkasan "Who am I?", dan badge tech stack.
- **Projects** — daftar proyek dengan pratinjau proyek terbaru di halaman utama, dan halaman `/projects` untuk melihat semua.
- **Experience** — riwayat pekerjaan dengan deskripsi yang bisa di-*expand* (read more) dan galeri media pendukung.
- **Education** — riwayat pendidikan dengan pola tampilan yang konsisten dengan Experience.
- **Media Gallery & Lightbox** — galeri gambar responsif (grid berbeda untuk mobile/desktop) dengan pratinjau layar penuh, navigasi antar-media, dan tautan GitHub otomatis untuk media bertipe proyek.
- **Footer "Connect Me"** — tautan sosial media, dirender terpisah dari Identity untuk menjaga privasi tautan personal.
- **Desain responsif mobile-first** — seluruh komponen dibangun dari breakpoint mobile terlebih dahulu, baru diperluas ke desktop.
- **Dark theme berbasis design token** — seluruh warna, jarak, dan skala tipografi dikendalikan lewat CSS custom properties terpusat.
- **Transisi halaman halus** — navigasi antar halaman menggunakan Astro View Transitions dengan indikator loading kustom.

## Cara Kerja

Situs ini berjalan dalam mode **SSR (Server-Side Rendering)**. Setiap kali ada permintaan halaman, Astro memanggil API milik [Portfolio CMS](#) (layanan backend terpisah berbasis Go) untuk mengambil data terbaru, lalu me-render HTML dari data tersebut — sehingga perubahan yang dilakukan lewat CMS langsung terlihat di publik tanpa proses build ulang.

Gambar yang diunggah melalui CMS disalurkan (proxy) lewat Astro API route, sehingga backend CMS tidak perlu diekspos langsung ke publik.

## Tech Stack

- [Astro](https://astro.build) (mode `server`, adapter [`@astrojs/node`](https://docs.astro.build/en/guides/integrations-guide/node/))
- HTML, CSS murni (tanpa framework UI), dengan sistem design token berbasis CSS custom properties
- Vanilla JavaScript untuk interaktivitas (lightbox, read more, transisi halaman)
- TypeScript untuk pendefinisian tipe data

## Prasyarat

- Node.js versi 22 ke atas
- [Portfolio CMS](#) sudah berjalan dan dapat diakses (lokal maupun jaringan)

## Memulai

1. Clone repository ini dan install dependency:

   ```bash
   git clone <url-repo-ini>
   cd portfolio
   npm install
   ```

2. Salin `.env.example` menjadi `.env`, lalu sesuaikan alamat API CMS:

   ```
   CMS_API_URL=http://localhost:8080
   ```

3. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

   Situs dapat diakses di `http://localhost:4321`.

## Script yang Tersedia

| Perintah | Keterangan |
|---|---|
| `npm run dev` | Menjalankan server pengembangan dengan hot-reload |
| `npm run build` | Meng-compile situs untuk production ke folder `dist/` |
| `npm run preview` | Menjalankan hasil build secara lokal untuk pengecekan |

## Environment Variables

| Variabel | Keterangan |
|---|---|
| `CMS_API_URL` | Base URL API Portfolio CMS yang menyediakan data (identity, projects, experience, education) |

## Deployment

Karena berjalan dalam mode SSR, situs ini membutuhkan runtime Node.js yang aktif secara terus-menerus di server (bukan hosting statis). Alur deploy secara umum:

```bash
npm install
npm run build
```

Hasil build dijalankan lewat:

```bash
node dist/server/entry.mjs
```

Di lingkungan production, proses ini dikelola sebagai service (misalnya melalui `systemd`) agar tetap berjalan setelah reboot atau crash, dan diletakkan di belakang reverse proxy (misalnya Nginx) sebagai satu-satunya pintu akses publik.

## Prinsip Desain

- **Minimalis dan bermakna** — tanpa hero section, tanpa elemen dekoratif yang tidak fungsional.
- **Hierarki tanpa warna** — seluruh struktur visual dibangun dari tipografi (ukuran, weight, spacing) dan grayscale, bukan warna.
- **Mobile-first** — setiap komponen dirancang dari tampilan mobile terlebih dahulu, baru diperluas ke layar yang lebih besar.
- **Data-driven** — seluruh komponen bersifat *props-driven*; tidak ada konten yang di-hardcode di dalam markup.

## Proyek Terkait

- [Portfolio CMS](#) — layanan backend (Go) yang mengelola seluruh data portofolio ini.
