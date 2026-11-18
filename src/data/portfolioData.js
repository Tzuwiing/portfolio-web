export const PROJECTS = [
  {
    title: 'Islamic Mobile App',
    sub: 'Jadwal Shalat & Doa',
    platform: 'Mobile',
    id: 'Jadwal shalat, kumpulan doa harian, dan data offline-first dalam tampilan mobile yang bersih dan menenangkan.',
    en: 'Prayer times, a daily doa collection and offline-first data, wrapped in a clean, calming mobile UI.',
    tech: ['Flutter', 'REST API', 'Local DB'],
    demo: null,
    repo: 'https://github.com/Tzuwiing/AmalinApp',
    kind: 'prayer',
    color: 0x34d399,
  },
  {
    title: 'Task Management Web',
    sub: 'Quest Log Tracker',
    platform: 'Web',
    id: 'Buat, atur prioritas, dan selesaikan tugas dengan animasi halus dan penyimpanan yang bertahan.',
    en: 'Create, prioritize and complete tasks with smooth animations and persistent storage.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://todobyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Todoapp',
    kind: 'tasks',
    color: 0x38bdf8,
  },
  {
    title: 'BMI Calculator Web',
    sub: 'Health Stat Checker',
    platform: 'Web',
    id: 'Masukkan tinggi dan berat badan untuk mendapat Body Mass Index seketika, lengkap dengan kategori kesehatan dan tampilan responsif.',
    en: 'Enter height and weight to get your Body Mass Index instantly, with a clear health category and a responsive layout.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://bmicalcbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/BMI-Calc',
    kind: 'bmi',
    color: 0xf472b6,
  },
  {
    title: 'Finance Tracker Web',
    sub: 'Income & Expense Ledger',
    platform: 'Web',
    id: 'Catat pemasukan dan pengeluaran, lihat saldo diperbarui langsung, dan simpan setiap transaksi secara lokal.',
    en: 'Record income and expenses, watch your balance update in real time and keep every transaction saved locally.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://financetrackerbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Finance-Tracker',
    kind: 'finance',
    color: 0xfbbf24,
  },
  {
    title: 'Bookshelf Web',
    sub: 'Personal Library Shelf',
    platform: 'Web',
    id: 'Tambah buku, tandai sudah dibaca atau sedang dibaca, cari koleksimu, dan simpan rak bukumu antar kunjungan.',
    en: 'Add books, mark them as read or still reading, search your collection and keep the shelf saved between visits.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://bookshelfbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Bookshelf',
    kind: 'books',
    color: 0xa78bfa,
  },
  {
    title: 'MySiswa Student App',
    sub: 'Student Portal Remake (Mockup)',
    platform: 'Mobile',
    id: 'Remake Flutter dari mockup portal siswa: onboarding, dashboard, profil, dan jadwal.',
    en: 'A Flutter remake of a student portal mockup: onboarding, dashboard, profile and schedule screens.',
    tech: ['Flutter', 'Figma', 'UI/UX'],
    demo: '',
    repo: 'https://github.com/Tzuwiing/MySiswaFlutter-remake',
    kind: 'mobile',
    color: 0x22d3ee,
  },
  {
    title: 'Flutter Slicing Vault',
    sub: 'Mobile UI Collection',
    platform: 'Mobile',
    id: 'Layar Figma-ke-Flutter yang presisi: onboarding, dashboard, profil, dan lainnya.',
    en: 'Pixel-perfect Figma-to-Flutter screens: onboarding, dashboards, profiles and more.',
    tech: ['Flutter', 'Figma', 'UI/UX'],
    demo: '',
    repo: 'https://github.com/Tzuwiing',
    kind: 'slicing',
    color: 0xfb7185,
  },
];

export const EXTRAS = ['Vite', 'REST API', 'UI/UX', 'Local DB', 'Responsive', 'Clean code'];

export const SKILLS = [
  ['React JS', 85],
  ['Tailwind CSS', 90],
  ['Flutter', 75],
  ['JavaScript', 80],
  ['HTML / CSS', 92],
  ['Figma', 78],
  ['GitHub', 82],
];

export const THEMES = [
  ['Sky', 0x38bdf8],
  ['Emerald', 0x34d399],
  ['Violet', 0xa78bfa],
  ['Amber', 0xfbbf24],
  ['Rose', 0xfb7185],
];

export const PROCESS_STEPS = [
  {
    num: 1,
    titleId: 'UI/UX Slicing',
    titleEn: 'UI/UX Slicing',
    subId: 'Konversi Figma yang presisi',
    subEn: 'Pixel-perfect Figma conversion',
    descId: 'Saya pelajari setiap frame di Figma dan membangunnya ulang dengan tepat: jarak, skala huruf, warna, dan aset.',
    descEn: 'I study every frame in Figma and rebuild it precisely: spacing, type scale, colors and assets.',
  },
  {
    num: 2,
    titleId: 'Arsitektur',
    titleEn: 'Architecture',
    subId: 'Kode React & Flutter yang modular',
    subEn: 'Modular React & Flutter code',
    descId: 'Komponen yang bisa dipakai ulang, struktur folder yang rapi, dan state yang siap tumbuh, sehingga fitur baru mudah dipasang.',
    descEn: 'Reusable components, a clean folder structure and state that scales, so features snap together.',
  },
  {
    num: 3,
    titleId: 'Integrasi API',
    titleEn: 'API Integration',
    subId: 'REST API & database lokal',
    subEn: 'REST API & local database',
    descId: 'Mengambil, menyimpan, dan menyimpan ulang data, lengkap dengan status loading, penanganan error, dan penyimpanan offline.',
    descEn: 'Fetching, caching and persisting data, with proper loading states, error handling and offline storage.',
  },
  {
    num: 4,
    titleId: 'Poles & Rilis',
    titleEn: 'Polish & Ship',
    subId: 'Responsif & teroptimasi',
    subEn: 'Responsive & optimized',
    descId: 'Setiap ukuran layar diuji, performa disetel, dan kasus tepi ditangani sebelum rilis.',
    descEn: 'Every breakpoint tested, performance tuned and edge cases handled before launch.',
  },
];

export const NAV_ITEMS = [
  { id: 'home', labelId: 'Beranda', labelEn: 'Home' },
  { id: 'about', labelId: 'Tentang', labelEn: 'About' },
  { id: 'process', labelId: 'Proses', labelEn: 'Process' },
  { id: 'projects', labelId: 'Proyek', labelEn: 'Work' },
  { id: 'contact', labelId: 'Kontak', labelEn: 'Contact' },
];

export const EMAIL = 'jusuffathan1909@gmail.com';

export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const hex = (n) => '#' + ('000000' + n.toString(16)).slice(-6);
export const hasLink = (u) => typeof u === 'string' && u.trim() !== '' && u.trim() !== '#';
