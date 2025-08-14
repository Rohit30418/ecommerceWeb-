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
        darkBg: '#0B0F19',    // dark background
        lightText: '#1E293B', // light text
        darkText: '#F1F5F9',  // dark text
        brandOrange: '#f7411b',
      
      },
    },
  },
  plugins: [],
}
