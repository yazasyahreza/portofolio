# Struktur `src/`

Dokumen ini menjelaskan tanggung jawab masing-masing folder di dalam `src/`, sebagai panduan cepat ke mana kode baru seharusnya ditambahkan.

## `assets/`

Berisi aset statis bawaan scaffold Astro (misalnya ikon default). Folder ini **bukan** tempat gambar konten portofolio (foto profil, cover, logo, media proyek) — semua itu berasal dari CMS dan diakses lewat proxy (lihat `pages/api/image/`), bukan disimpan di sini.

## `components/`

Seluruh komponen tampilan (`.astro`), murni bertugas menerima data lewat `Astro.props` dan merender markup + style-nya sendiri. Komponen di sini tidak pernah mengambil data secara langsung (kecuali `Footer.astro`, yang sengaja mengambil data sendiri karena sifatnya *single-instance*, bukan reusable).

Beberapa komponen mengikuti pola *container/item* — satu komponen bertugas sebagai pembungkus section (`Experience.astro`, `Education.astro`), satu lagi untuk item yang berulang di dalamnya (`ExperienceItem.astro`, `EducationItem.astro`).

Komponen kecil yang dipakai lintas section (`MediaGrid.astro`, `ReadMore.astro`, `Cover.astro`) sengaja tidak dikelompokkan dalam subfolder, karena jumlahnya masih proporsional untuk struktur flat.

## `data/`

- `types.ts` — definisi seluruh bentuk data (`IdentityData`, `ExperienceItem`, `ProjectItem`, `EducationItem`, `MediaItem`, dst). Ini "kamus" tunggal yang menjadi rujukan bentuk data di seluruh project.
- `store.ts` — satu-satunya titik yang mengambil data dari Portfolio CMS (lewat `fetch` ke `CMS_API_URL`). Semua halaman dan komponen yang butuh data memanggil `getContent()` dari file ini — tidak ada `fetch` ke CMS yang ditulis langsung di komponen manapun.

## `layouts/`

- `BaseLayout.astro` — pembungkus tiap halaman: `<head>`, font, `tokens.css`/`global.css`, background halaman, lightbox global, dan script navigasi (View Transitions). Semua halaman di `pages/` wajib dibungkus layout ini.

## `lib/`

Fungsi bantu (*helper*) murni yang dipakai berulang lintas komponen, di luar kategori data atau tampilan.

- `media.ts` — `resolveImageUrl()`, menerjemahkan URL gambar mentah dari CMS (`/uploads/...`) menjadi URL proxy Astro (`/api/image/...`) agar bisa diakses browser publik tanpa mengekspos CMS secara langsung.

## `pages/`

Routing berbasis file bawaan Astro — tiap file di sini otomatis menjadi URL.

- `index.astro` — halaman utama, merangkai seluruh section (Identity, Projects, Experience, Education).
- `projects.astro` — halaman `/projects`, menampilkan seluruh daftar proyek.
- `api/image/[...path].ts` — API route yang berfungsi sebagai *proxy* gambar dari Portfolio CMS ke browser publik.

## `styles/`

- `tokens.css` — seluruh design token (skala tipografi, skala spacing, warna, font) sebagai CSS custom properties di `:root`. Sumber kebenaran tunggal untuk nilai visual di seluruh situs; komponen tidak pernah menulis angka mentah, selalu memanggil `var(--*)` dari sini.
- `global.css` — reset dasar dan style elemen HTML native (`body`, heading, dst) yang berlaku global, bukan style spesifik satu komponen.

---

**Prinsip umum:** setiap file/folder baru sebaiknya ditempatkan sesuai tanggung jawab tunggalnya — komponen tampilan ke `components/`, bentuk/pengambilan data ke `data/`, fungsi bantu generik ke `lib/`. Hindari menempatkan logic pengambilan data atau fetch CMS langsung di dalam komponen `.astro`.
