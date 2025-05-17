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
      },
      boxShadow: {
        'top': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
