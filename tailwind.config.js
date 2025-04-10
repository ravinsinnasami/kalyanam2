/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'script': ['Great Vibes', 'cursive'],
      },
      colors: {
        'gold': '#D4AF37',
        'cream': '#FFF8DC',
        darkgold: '#9a8458',   // Gold hover state
        ivory: '#f9f6f0',      // Background color
        beige: '#e8e2d8',       // Border color
      }
    },
  },
  plugins: [],
}