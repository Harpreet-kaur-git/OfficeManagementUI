/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 20px 80px rgba(15, 23, 42, 0.18)',
      },
      colors: {
        surface: '#0f172a',
      },
    },
  },
  plugins: [],
};
