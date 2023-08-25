/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'min-m': '0px'
      },
      colors:{
        'black-gray': 'rgba(0,0,0,.8)'
      }
    },
  },
  plugins: [],
}