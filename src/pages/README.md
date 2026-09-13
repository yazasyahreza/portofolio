# Struktur `src/pages/`

Folder ini memakai *file-based routing* bawaan Astro — setiap file di sini otomatis menjadi sebuah URL, tanpa konfigurasi routing manual.

## `index.astro`

Halaman utama (`/`). Mengambil seluruh data lewat `getContent()` dari `data/store.ts`, lalu merangkai section-section portofolio secara berurutan di dalam `BaseLayout`: `Identity`, `Projects` (preview satu project terbaru), `Experience`, dan `Education`.

## `projects.astro`

Halaman `/projects`. Menampilkan cover (lewat `Cover.astro`) dan seluruh daftar project (diurutkan dari yang terbaru) memakai `ProjectCard.astro` — berbeda dari `index.astro` yang hanya menampilkan satu project sebagai preview.

## `api/image/[...path].ts`

Bukan halaman, melainkan *API route* — ditandai ekstensi `.ts`, bukan `.astro`. Berfungsi sebagai proxy gambar: menerima permintaan gambar dari browser pengunjung (`/api/image/nama-file.jpg`), meneruskannya ke Portfolio CMS (`${CMS_API_URL}/uploads/nama-file.jpg`), lalu mengalirkan kembali hasilnya ke browser.

Notasi `[...path]` (dengan tiga titik) adalah *rest parameter* — menangkap seluruh sisa path setelah `/api/image/`, termasuk jika suatu saat ada struktur folder bertingkat di dalam `uploads/`. Endpoint ini yang membuat gambar dari CMS bisa ditampilkan ke publik tanpa mengekspos server CMS secara langsung ke internet.

---

**Konvensi:** halaman (`.astro`) untuk tampilan, API route (`.ts`) untuk logic server yang tidak menghasilkan HTML. Keduanya boleh hidup berdampingan dalam struktur folder yang sama karena Astro membedakannya lewat ekstensi file, bukan lokasi folder.
