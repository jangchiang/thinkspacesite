// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00A651',
          50: '#E6F7EF',
          100: '#B3E6D1',
          200: '#80D6B3',
          300: '#4DC695',
          400: '#1AB677',
          500: '#00A651',
          600: '#009649',
          700: '#008641',
          800: '#007639',
          900: '#006631',
        },
      },
    },
  },
  plugins: [],
}