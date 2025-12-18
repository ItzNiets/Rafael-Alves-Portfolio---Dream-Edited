/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon': '#8A2BE2',
        'void': '#050505',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
