/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FBFDFE',
        'bg-2': '#F1F7F9',
        surface: '#FFFFFF',
        ink: '#102B33',
        'ink-dim': '#54696F',
        aqua: {
          DEFAULT: '#0E7C86',
          bright: '#14A0AC',
          dark: '#0A5B63',
          soft: 'rgba(14,124,134,0.16)',
          line: 'rgba(14,124,134,0.22)'
        },
        gold: {
          DEFAULT: '#C5A880',
          bright: '#DFBA73',
          dark: '#9E8259'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 60px -28px rgba(16,43,51,0.25)',
        glow: '0 0 25px rgba(14,124,134,0.3)',
        'glow-lg': '0 0 50px rgba(14,124,134,0.2)'
      }
    },
  },
  plugins: [],
}
