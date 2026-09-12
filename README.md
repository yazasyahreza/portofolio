Website portfolio pribadi bergaya profil LinkedIn, dibangun dengan Astro dalam mode SSR (Server-Side Rendering). Konten (identity, experience, projects, education) dikelola secara dinamis lewat CMS terpisah berbasis Go yang terhubung melalui REST API.

Live: https://syhrz.tail612d91.ts.net/

Tech Stack:

Framework: Astro (mode SSR, adapter Node)
Bahasa: TypeScript
Styling: CSS Murni
Data: CMS melalui REST API (Go)
Deployment: Ubuntu home server, Nginx, systemd, Tailscale Funnel

Prasyarat:
- Node.js versi 22.12.0
- CMS sudah berjalan dibelakang layar untuk sumber data

Instalasi:
git clone https://github.com/yazasyahreza/portofolio
cd portofolio
npm install

Konfigurasi Environment:
Buat file .env di root proyek
isi dengan = CMS_API_URL=http://localhost:8080 # untuk menghubungkan rest api

Build untuk produksi:
npm run build
Karena proyek ini menggunakan mode SSR, hasil build (dist/) perlu dijalankan dengan Node, bukan disajikan sebagai file statis:
node ./dist/server/entry.mjs

Deployment:
Proyek ini di-deploy di home server pribadi (Ubuntu) dengan arsitektur berikut:
- Astro (SSR) berjalan sebagai service systemd, listen di localhost:4321
- Nginx sebagai reverse proxy publik di port 80, meneruskan ke Astro
- Tailscale Funnel mengekspos port 80 ke internet tanpa memerlukan IP publik/port forwarding (server berada di belakang CGNAT)
- CMS (Go) berjalan terpisah di localhost:8080, hanya dapat diakses lewat jaringan privat Tailscale — tidak terekspos ke publik
