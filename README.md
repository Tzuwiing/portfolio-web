# Jusuf Fathan Nuradly — Personal Portfolio

Website portofolio interaktif yang dibangun menggunakan **React JS**, **Vite**, dan **Three.js**. Dirancang dengan pendekatan antarmuka yang bersih (*glassmorphism*), responsif di berbagai ukuran layar, serta dilengkapi elemen grafis 3D berbasis WebGL yang ringan.

---

## ✨ Fitur Utama

- **🌐 Tech Universe 3D Interaktif (`TechGlobe`)**
  Bola konstelasi 3D berisi daftar keahlian dan *tools* yang dapat diputar dengan kursor atau sentuhan (*drag to spin*), lengkap dengan indikator tingkat penguasaan.
- **🧊 Pratinjau Proyek 3D (`ProjectCard` & `projectRenderer`)**
  Setiap kartu proyek menampilkan objek geometri 3D unik yang merespons gerakan kursor dan dilengkapi filter kategori (**Semua**, **Web**, **Mobile**). Menggunakan satu *shared* `WebGLRenderer` agar performa tetap ringan dan hemat memori.
- **🌌 Latar Belakang Langit Berbintang 3D (`BackgroundCanvas`)**
  Efek paralaks bintang 3D yang bereaksi terhadap *scroll* halaman serta efek percikan partikel (*sparks*) saat area kosong pada *hero section* diklik.
- **🇮🇩 / 🇬🇧 Dukungan Dwibahasa (ID & EN)**
  Pengalih bahasa instan antara Bahasa Indonesia dan Bahasa Inggris yang tersimpan otomatis di `localStorage`.
- **🎨 Tema Warna Aksen Dinamis**
  5 pilihan warna tema (**Sky**, **Emerald**, **Violet**, **Amber**, **Rose**) yang langsung memperbarui variabel CSS sekaligus material pencahayaan objek 3D Three.js secara *real-time*.
- **⚡ Animasi Halus & Aksesibilitas**
  Dilengkapi *scroll progress bar*, animasi angka statistik, *timeline* proses kerja interaktif, efek *3D tilt* pada kartu, serta dukungan `prefers-reduced-motion`.
- **✉️ Kontak & Generator Draf Email**
  Fitur salin alamat email sekali klik dan formulir yang otomatis menyiapkan draf pesan `mailto:` siap kirim.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **3D & WebGL Graphics:** Three.js (`r128`)
- **Styling:** Vanilla CSS Modular (CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism)
- **Tipografi:** Space Grotesk, Inter, dan JetBrains Mono (Google Fonts)

---

## 📁 Struktur Proyek

```text
personal-branding/
├── index.html                   # Entry HTML & konfigurasi Google Fonts
├── package.json                 # Daftar dependensi & skrip npm
├── vite.config.js               # Konfigurasi Vite + React plugin
├── public/                      # Aset statis (favicon.svg, icons.svg, profile.jpg)
└── src/
    ├── main.jsx                 # Entry point ReactDOM
    ├── App.jsx                  # State global (bahasa, tema aksen, scroll, navigasi)
    ├── data/
    │   └── portfolioData.js     # Data proyek, skill, tema warna & konfigurasi
    ├── hooks/
    │   ├── useInView.js         # Custom hook IntersectionObserver (animasi reveal)
    │   └── useTilt.js           # Custom hook efek 3D tilt & spotlight hover
    ├── components/
    │   ├── About.jsx            # Bento grid: Profil, Statistik, Tech Stack & Fokus
    │   ├── BackgroundCanvas.jsx # Kanvas 3D latar belakang & efek percikan klik
    │   ├── Contact.jsx          # Informasi kontak, salin email & generator draf mailto
    │   ├── Footer.jsx           # Navigasi footer
    │   ├── Hero.jsx             # Hero section, teks rotasi, statistik & pemilih tema
    │   ├── Navbar.jsx           # Navigasi melayang & tombol ganti bahasa
    │   ├── Process.jsx          # 4 tahap alur kerja dengan garis progres scroll
    │   ├── ProjectCard.jsx      # Kartu proyek individu dengan kanvas 3D
    │   ├── Projects.jsx         # Filter kategori & grid daftar proyek
    │   └── TechGlobe.jsx        # Bola 3D interaktif konstelasi keahlian
    ├── three/
    │   ├── projectRenderer.js   # Shared WebGLRenderer untuk kartu proyek
    │   └── threeHelpers.js      # Pembangun tekstur glow & geometri 3D proyek
    └── styles/
        ├── base.css             # Variabel warna, reset, glassmorphism & tombol
        ├── sections.css         # Styling navbar, hero, globe 3D, about & process
        └── cards-contact.css    # Styling grid proyek, form kontak, footer & responsif
```

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/Tzuwiing/portfolio-web.git
   cd portfolio-web
   ```

2. **Install seluruh dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (*development*):**
   ```bash
   npm run dev
   ```
   Buka alamat lokal yang muncul di terminal (biasanya `http://localhost:5173`).

4. **Build untuk produksi (*production*):**
   ```bash
   npm run build
   ```
   Hasil kompilasi siap *deploy* akan tersimpan di dalam folder `dist/`.

---

## ⚙️ Kustomisasi Konten

Seluruh data utama portofolio terpusat di dalam file **`src/data/portfolioData.js`**, sehingga Anda dapat dengan mudah memperbarui:
- **`PROJECTS`**: Menambah atau mengubah daftar proyek, tautan *Live Demo*, repositori GitHub, teknologi, serta bentuk & warna objek 3D.
- **`SKILLS` & `EXTRAS`**: Mengatur daftar keahlian, persentase, serta node teks pada bola 3D.
- **`THEMES`**: Menambahkan atau mengubah pilihan palet warna aksen.
- **`EMAIL`**: Mengganti alamat email tujuan pada bagian kontak.

---

## ☁️ Deployment (Vercel)

Proyek ini siap langsung di-*deploy* ke **Vercel**:
1. Hubungkan repositori GitHub ke dasbor Vercel.
2. Pastikan pengaturan *build* menggunakan konfigurasi bawaan Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Klik **Deploy**.

---

## 📬 Kontak

- **Nama:** Jusuf Fathan Nuradly
- **Email:** [jusuffathan1909@gmail.com](mailto:jusuffathan1909@gmail.com)
- **GitHub:** [@Tzuwiing](https://github.com/Tzuwiing)
- **Instagram:** [@nuradlyy](https://www.instagram.com/nuradlyy/)
