# Struktur `src/`

Dokumen ini menjelaskan tanggung jawab masing-masing folder di dalam `src/`, sebagai panduan cepat ke mana kode baru seharusnya ditambahkan.

## `assets/`

Berisi aset statis bawaan scaffold Astro (misalnya ikon default). Folder ini **bukan** tempat gambar konten portofolio (foto profil, cover, logo, media proyek) — semua itu berasal dari CMS dan diakses lewat proxy (lihat `pages/api/image/`), bukan disimpan di sini.

## `components/`

Seluruh komponen tampilan (`.astro`), murni bertugas menerima data lewat `Astro.props` dan merender markup + style-nya sendiri. Komponen di sini tidak pernah mengambil data secara langsung (kecuali `Footer.astro`, yang sengaja mengambil data sendiri karena sifatnya *single-instance*, bukan reusable).

Komponen inti saat ini: `Identity.astro`, `Projects.astro` (pembungkus daftar proyek di halaman utama), `ProjectCard.astro` (item proyek, dipakai di halaman utama maupun sebagai dasar halaman detail), `Cover.astro`, dan `Footer.astro`.

> **Perlu diperiksa:** `MediaGrid.astro` berpotensi jadi kode mati sejak `Experience`/`Education` dan komponen item-nya dihapus (folder ini dulu satu-satunya pemakainya). Belum dipastikan apakah file ini sudah dihapus atau masih tertinggal — kalau masih ada dan tidak dipakai di manapun (termasuk halaman detail proyek), aman dihapus, tapi cek dulu apakah `BaseLayout.astro` masih punya markup/script lightbox yang bergantung padanya sebelum menghapus.

## `data/`

- `types.ts` — definisi seluruh bentuk data (`IdentityData`, `ProjectItem`, `MediaItem`, dst). Ini "kamus" tunggal yang menjadi rujukan bentuk data di seluruh project. `ProjectItem` sekarang juga mencakup `duration` dan `story` (cerita lengkap pengerjaan, ditampilkan di halaman detail).
- `store.ts` — satu-satunya titik yang mengambil data dari Portfolio CMS (lewat `fetch` ke `CMS_API_URL`). Semua halaman dan komponen yang butuh data memanggil `getContent()` dari file ini — tidak ada `fetch` ke CMS yang ditulis langsung di komponen manapun.

## `layouts/`

- `BaseLayout.astro` — pembungkus tiap halaman: `<head>`, font, `tokens.css`/`global.css`, background halaman, lightbox global, dan script navigasi (View Transitions). Semua halaman di `pages/` wajib dibungkus layout ini.

## `lib/`

Fungsi bantu (*helper*) murni yang dipakai berulang lintas komponen, di luar kategori data atau tampilan.

- `media.ts` — `resolveImageUrl()`, menerjemahkan URL gambar mentah dari CMS (`/uploads/...`) menjadi URL proxy Astro (`/api/image/...`) agar bisa diakses browser publik tanpa mengekspos CMS secara langsung.

## `pages/`

Routing berbasis file bawaan Astro — tiap file di sini otomatis menjadi URL.

- `index.astro` — halaman utama, merangkai section Identity dan Projects (seluruh proyek ditampilkan langsung di sini, tanpa halaman daftar terpisah lagi).
- `projects/[slug].astro` — halaman detail satu proyek, diakses lewat slug yang di-generate otomatis dari judul (`/projects/nama-proyek`). Menampilkan cerita lengkap (`story`), durasi pengerjaan, tech stack, dan tautan GitHub.
- `api/image/[...path].ts` — API route yang berfungsi sebagai *proxy* gambar dari Portfolio CMS ke browser publik.

## `styles/`

- `tokens.css` — seluruh design token (skala tipografi, skala spacing, warna, font) sebagai CSS custom properties di `:root`. Sumber kebenaran tunggal untuk nilai visual di seluruh situs; komponen tidak pernah menulis angka mentah, selalu memanggil `var(--*)` dari sini.
- `global.css` — reset dasar dan style elemen HTML native (`body`, heading, dst) yang berlaku global, bukan style spesifik satu komponen.

---

**Prinsip umum:** setiap file/folder baru sebaiknya ditempatkan sesuai tanggung jawab tunggalnya — komponen tampilan ke `components/`, bentuk/pengambilan data ke `data/`, fungsi bantu generik ke `lib/`. Hindari menempatkan logic pengambilan data atau fetch CMS langsung di dalam komponen `.astro`.