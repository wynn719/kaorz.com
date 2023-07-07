/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: '#63a67f'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

