/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  screens: {
    md: '1000px'
  },
  theme: {
    extend: {
      colors: {
        primary: 'hsl(359, 92%, 42%)',
        secondary: 'hsl(359, 91%, 29%)',
        menuColor: '	hsl(359, 66%, 60%)'
      },
      fontFamily: {
        sans: ['Josefin Sans','sans-serif']
      }
    },
  },
  plugins: [],
}

