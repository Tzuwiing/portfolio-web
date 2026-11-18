/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04060a', // hitam dasar
        surface: { DEFAULT: '#0a0e14', raised: '#10151e' },
        accent: { DEFAULT: '#38bdf8', soft: '#7dd3fc', deep: '#2563eb' }, // biru aksen
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(56,189,248,0.7)',
        glow: '0 0 28px rgba(56,189,248,0.35)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(420%)' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '80%, 100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        scan: 'scan 7s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
