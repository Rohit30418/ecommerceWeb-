/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // 👈 enables manual dark mode toggle
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: '#F8FAFC',   // light background
        darkBg: '#121212',    // dark background
        lightText: '#1E293B', // light text
        darkText: '#F1F5F9',  // dark text
        brandOrange: '#1d242d',
      
      },
    },
  },
  plugins: [],
}
