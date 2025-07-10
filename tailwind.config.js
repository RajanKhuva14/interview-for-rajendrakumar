/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['"Helvetica Neue"', 'Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}