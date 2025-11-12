/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#8CC7FF',
          DEFAULT: '#4B96E6',
          dark: '#1F6FD1',
        },
        secondary: {
          light: '#FFC8DD',
          DEFAULT: '#FF70A6',
          dark: '#E6397E',
        },
        accent: '#A2D2FF',
        surface: {
          light: '#F5F7FB',
          dark: '#10131A',
        },
        glass: 'rgba(255, 255, 255, 0.7)',
        glassDark: 'rgba(16, 19, 26, 0.65)',
      },
      boxShadow: {
        glass: '0 20px 45px -20px rgba(36, 60, 90, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
