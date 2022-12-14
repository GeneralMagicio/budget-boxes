/* eslint-disable */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '500px',
      md: '769px',
      lg: '1025px',
      xl: '1281px',
      '2xl': '1536px'
    },
    extend: {
      scale: {
        101: '1.01',
        102: '1.02'
      },
      colors: {
        black: {
          DEFAULT: '#051425',
          light: '#747373'
        },
        blue: {
          DEFAULT: '#1B66FF',
          light: '#03B3FF',
          dark: '#0B58AF',
          ocean: '#03B3FF',
          500: '#356BCF',
          50: '#EBF5FF'
        },
        cyan: {
          300: '#22B7A0',
          400: '#27A1AD',
          500: '#25ABA7',
          600: '#3080C2'
        },
        gray: {
          350: '#F9FAFB'
        },
        green: {
          50: '#F3FAF7',
          100: '#DEF7EC',
          800: '#03543F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
