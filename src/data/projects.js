// Data proyek. Setiap objek = satu proyek; judul & deskripsi ada di objek yang SAMA,
// jadi tidak mungkin tertukar. Cukup tambah objek baru di akhir untuk proyek baru.
//
// Field:
//   demo  -> URL live preview. Kosongkan / null / hapus => tombol Demo otomatis hilang.
//   repo  -> URL GitHub.     Kosongkan / null / hapus => tombol GitHub otomatis hilang.
//   kind  -> ilustrasi di preview: prayer | tasks | bmi | finance | books | mobile | slicing

export const PROJECTS = [
  {
    id: 'amalin',
    title: 'Islamic Mobile App',
    sub: 'Jadwal Shalat & Doa',
    platform: 'Mobile',
    desc: 'Prayer times, a daily doa collection and offline-first data, wrapped in a clean, calming mobile UI.',
    tech: ['Flutter', 'REST API', 'Local DB'],
    demo: null,
    repo: 'https://github.com/Tzuwiing/AmalinApp',
    kind: 'prayer',
  },
  {
    id: 'todo',
    title: 'Task Management Web',
    sub: 'Quest Log Tracker',
    platform: 'Web',
    desc: 'Create, prioritize and complete tasks with smooth animations and persistent storage.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://todobyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Todoapp',
    kind: 'tasks',
  },
  {
    id: 'bmi',
    title: 'BMI Calculator Web',
    sub: 'Health Stat Checker',
    platform: 'Web',
    desc: 'Enter height and weight to get your Body Mass Index instantly, with a clear health category and a responsive layout.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://bmicalcbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/BMI-Calc',
    kind: 'bmi',
  },
  {
    id: 'finance',
    title: 'Finance Tracker Web',
    sub: 'Income & Expense Ledger',
    platform: 'Web',
    desc: 'Record income and expenses, watch your balance update in real time and keep every transaction saved locally.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://financetrackerbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Finance-Tracker',
    kind: 'finance',
  },
  {
    id: 'bookshelf',
    title: 'Bookshelf Web',
    sub: 'Personal Library Shelf',
    platform: 'Web',
    desc: 'Add books, mark them as read or still reading, search your collection and keep the shelf saved between visits.',
    tech: ['React JS', 'Tailwind', 'Vite'],
    demo: 'https://bookshelfbyjusuf.vercel.app/',
    repo: 'https://github.com/Tzuwiing/Bookshelf',
    kind: 'books',
  },
  {
    id: 'mysiswa',
    title: 'MySiswa Student App',
    sub: 'Student Portal Remake (Mockup)',
    platform: 'Mobile',
    desc: 'A Flutter remake of a student portal mockup: onboarding, dashboard, profile and schedule screens.',
    tech: ['Flutter', 'Figma', 'UI/UX'],
    demo: '',
    repo: 'https://github.com/Tzuwiing/MySiswaFlutter-remake',
    kind: 'mobile',
  },
  {
    id: 'slicing',
    title: 'Flutter Slicing Vault',
    sub: 'Mobile UI Collection',
    platform: 'Mobile',
    desc: 'Pixel-perfect Figma-to-Flutter screens: onboarding, dashboards, profiles and more.',
    tech: ['Flutter', 'Figma', 'UI/UX'],
    // demo: tidak ada -> tombol Demo tidak ditampilkan
    // TODO: ganti repo di bawah dengan link repo asli (atau hapus barisnya).
    repo: 'https://github.com/Tzuwiing',
    kind: 'slicing',
  },
]

/** true hanya jika `url` string non-kosong (bukan null / undefined / "#") */
export const hasLink = (url) =>
  typeof url === 'string' && url.trim() !== '' && url.trim() !== '#'

/** teks kecil di address-bar preview: host demo, atau path repo bila belum ada demo */
export const displayHost = (p) => {
  try {
    if (hasLink(p.demo)) return new URL(p.demo).host
    if (hasLink(p.repo)) return 'github.com' + new URL(p.repo).pathname.replace(/\/$/, '')
  } catch {
    /* abaikan URL tak valid */
  }
  return 'no live demo yet'
}
