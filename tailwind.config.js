/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'azul-principal': '#00B8DB',
      },
      fontFamily: {
        'sans': ['Lato', 'sans-serif'], //Por defecto Lato
        'pixel': ['Pixelify Sans', 'sans-serif'], //TastyFood
        'koulen': ['Koulen', 'sans-serif'] //Koulen para los titulos
      }
    },
  },
  plugins: [],
};
