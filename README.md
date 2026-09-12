Website portfolio pribadi bergaya profil LinkedIn, dibangun dengan Astro dalam mode SSR (Server-Side Rendering). Konten (identity, experience, projects, education) dikelola secara dinamis lewat CMS terpisah berbasis Go yang terhubung melalui REST API.

Live: https://syhrz.tail612d91.ts.net/

Tech Stack:<br>
Framework: Astro (mode SSR, adapter Node)<br>
Bahasa: TypeScript<br>
Styling: CSS Murni<br>
Data: CMS melalui REST API (Go)<br>
Deployment: Ubuntu home server, Nginx, systemd, Tailscale Funnel<br>

Prasyarat:<br>
- Node.js versi 22.12.0<br>
- CMS sudah berjalan dibelakang layar untuk sumber data<br>

Instalasi:<br>
git clone https://github.com/yazasyahreza/portofolio<br>
cd portofolio<br>
npm install<br>

Konfigurasi Environment:<br>
Buat file .env di root proyek<br>
isi dengan = CMS_API_URL=http://localhost:8080 # untuk menghubungkan rest api<br>

Build untuk produksi:<br>
npm run build<br>
Karena proyek ini menggunakan mode SSR, hasil build (dist/) perlu dijalankan dengan Node, bukan disajikan sebagai file statis:<br>
node ./dist/server/entry.mjs<br>

Deployment:<br>
Proyek ini di-deploy di home server pribadi (Ubuntu) dengan arsitektur berikut:<br>
- Astro (SSR) berjalan sebagai service systemd, listen di localhost:4321<br>
- Nginx sebagai reverse proxy publik di port 80, meneruskan ke Astro<br>
- Tailscale Funnel mengekspos port 80 ke internet tanpa memerlukan IP publik/port forwarding (server berada di belakang CGNAT)<br>
- CMS (Go) berjalan terpisah di localhost:8080, hanya dapat diakses lewat jaringan privat Tailscale — tidak terekspos ke publik
