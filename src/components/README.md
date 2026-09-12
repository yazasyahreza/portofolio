# Struktur `src/components/`

Dokumen ini menjelaskan fungsi masing-masing komponen, serta relasinya satu sama lain.

## `Identity.astro`

Section pertama yang tampil di halaman utama. Menampilkan cover (lewat `Cover.astro`), foto profil (overlapping di atas cover), nama, title, lokasi, bio singkat, ringkasan "Who am I?", dan badge tech stack (ikon dari Simple Icons). Tidak memiliki item berulang, sehingga tidak dipecah menjadi komponen container/item.

## `Cover.astro`

Komponen kecil untuk gambar cover, dipakai di dua tempat: di dalam `Identity.astro` (dengan foto profil menimpanya) dan di halaman `/projects` (sebagai cover polos tanpa foto profil). Diekstrak terpisah karena dipakai lebih dari satu tempat.

## `Projects.astro`

Container untuk section Projects di halaman utama. Menyortir seluruh data project berdasarkan tanggal terbaru, lalu menampilkan **satu** project paling baru saja lewat `ProjectCard.astro`, disertai tautan "Tampilkan semua" menuju `/projects`.

## `ProjectCard.astro`

Item tunggal sebuah project: judul, tanggal, gambar full-width, deskripsi (lewat `ReadMore.astro`), badge tech stack, dan tautan GitHub. Dipakai baik di `Projects.astro` (preview satu item) maupun langsung di halaman `/projects` (menampilkan seluruh daftar).

## `Experience.astro`

Container untuk section Experience. Menerima array pengalaman kerja, merender satu `ExperienceItem.astro` untuk tiap entri.

## `ExperienceItem.astro`

Item tunggal satu pengalaman kerja: logo organisasi, posisi, tanggal (dengan penanganan status "masih berlangsung"), deskripsi (lewat `ReadMore.astro`), badge skill, dan galeri media (lewat `MediaGrid.astro`).

## `Education.astro`

Container untuk section Education. Strukturnya identik dengan `Experience.astro`, merender satu `EducationItem.astro` untuk tiap entri.

## `EducationItem.astro`

Item tunggal satu riwayat pendidikan: logo institusi, jurusan, rentang tahun, badge skill, dan galeri media (lewat `MediaGrid.astro`). Field media di sini bersifat campuran (bisa berisi foto kegiatan, sertifikat, maupun project) — tidak dipisah berdasarkan kategori.

## `MediaGrid.astro`

Komponen galeri gambar, dipakai bersama oleh `ExperienceItem.astro` dan `EducationItem.astro`. Menangani tiga hal:

- Tata letak berbeda tergantung jumlah media (satu media tampil dengan teks di sampingnya; lebih dari satu tampil sebagai grid gambar saja).
- Jumlah gambar yang ditampilkan sebelum dipotong dengan overlay `+N` berbeda antara mobile dan desktop.
- Menyiapkan data tiap grup media sebagai atribut `data-media-group`, dibaca oleh script lightbox global di `BaseLayout.astro` saat gambar diklik.

## `ReadMore.astro`

Komponen kecil untuk teks deskripsi panjang: memotong tampilan ke beberapa baris dan menampilkan tombol "... lainnya" untuk membuka teks penuh. Dipakai di `ProjectCard.astro` dan `ExperienceItem.astro`.

## `Footer.astro`

Section "Connect Me" di bagian paling bawah tiap halaman, berisi tautan sosial media. Berbeda dari komponen lain, file ini mengambil datanya sendiri langsung dari `data/store.ts`, karena sifatnya *single-instance* (selalu sama di semua halaman), bukan komponen reusable yang menerima data lewat props.

---

**Pola umum:** komponen "container" (`Projects`, `Experience`, `Education`) bertanggung jawab atas judul section dan perulangan data; komponen "item" (`ProjectCard`, `ExperienceItem`, `EducationItem`) bertanggung jawab atas tampilan satu entri. Komponen kecil (`Cover`, `MediaGrid`, `ReadMore`) diekstrak karena terbukti dipakai lebih dari satu tempat — bukan dipisah di awal tanpa alasan.
