# Jusuf Fathan Nuradly — React JS & Three.js Portfolio

Personal portfolio dibangun menggunakan **React 18**, **Vite**, **Three.js**, dan **CSS modular** dengan dukungan dwibahasa (**ID / EN**), tema warna aksen dinamis, bola konstelasi 3D interaktif, serta preview 3D pada setiap kartu proyek.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # hasil build produksi di folder /dist
```

## Deploy ke GitHub & Vercel

Jika mengganti repositori lama (yang sebelumnya memakai Tailwind/PostCSS), pastikan file lama seperti `postcss.config.js`, `tailwind.config.js`, dan folder komponen lama sudah dihapus sebelum `git push`.

## Struktur Folder

```text
personal-branding/
├── index.html                  # Entry HTML & Google Fonts
├── package.json                # React 18, React DOM, Three.js & Vite
├── vite.config.js              # Konfigurasi Vite + React plugin
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── profile.jpg
└── src/
    ├── main.jsx                # Root render React
    ├── App.jsx                 # State global (bahasa, tema, navigasi aktif, progress bar)
    ├── data/
    │   └── portfolioData.js    # Data proyek, skill, tema warna, proses & helper
    ├── hooks/
    │   ├── useInView.js        # IntersectionObserver hook untuk animasi reveal & counter
    │   └── useTilt.js          # Hook efek 3D tilt & spotlight hover
    ├── components/
    │   ├── BackgroundCanvas.jsx # Latar langit berbintang 3D & percikan klik
    │   ├── Navbar.jsx          # Floating pill navbar & pengalih bahasa ID/EN
    │   ├── Hero.jsx            # Hero section, rotating tech text, stats & pemilih tema
    │   ├── TechGlobe.jsx       # Bola 3D interaktif konstelasi keahlian
    │   ├── About.jsx           # Bento grid: Profil, Angka, Tech Stack & Fokus
    │   ├── Process.jsx         # Timeline 4 langkah cara kerja
    │   ├── Projects.jsx        # Filter kategori & grid kartu proyek
    │   ├── ProjectCard.jsx     # Kartu proyek dengan bentuk 3D interaktif
    │   ├── Contact.jsx         # Kotak salin email, sosial media & generator draf mailto
    │   └── Footer.jsx          # Footer navigasi cepat
    ├── three/
    │   ├── threeHelpers.js     # Tekstur glow & geometri 3D tiap jenis proyek
    │   └── projectRenderer.js  # Shared WebGLRenderer untuk preview 3D kartu proyek
    └── styles/
        ├── base.css            # Design tokens, glassmorphism, tombol & chip
        ├── sections.css        # Navbar, hero, 3D globe, about bento & process
        └── cards-contact.css   # Grid proyek, form kontak, footer & responsif
```
