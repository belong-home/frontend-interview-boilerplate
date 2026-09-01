const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#325e77',
        green: '#3ee4a9',
        gray: '#d6e1e4',
        'dark-gray': '#8ea0a4',
        red: '#ff5661',
        white: '#ffffff',
        black: '#171717',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
