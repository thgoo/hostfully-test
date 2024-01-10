/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // colors generated from https://uicolors.app/create
        'governor-bay': {
          50: '#eff3fe',
          100: '#e1eafe',
          200: '#c9d7fc',
          300: '#a8bcf9',
          400: '#8597f4',
          500: '#6874ec',
          600: '#4b4ce0',
          700: '#3e3dc5',
          800: '#3738a9',
          900: '#31337e',
          950: '#1d1e49',
        },
        shamrock: {
          50: '#effaf4',
          100: '#d8f3e4',
          200: '#b4e6cd',
          300: '#66c99d',
          400: '#4eb98d',
          500: '#2c9d73',
          600: '#1d7e5b',
          700: '#17654b',
          800: '#15503d',
          900: '#124233',
          950: '#09251d',
        },
      },
    },
  },
  plugins: [],
};
