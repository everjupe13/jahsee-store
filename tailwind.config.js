// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))
const object0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))


const typography = {
  '.text-medium-30': {
    fontSize: '30px',
    lineHeight: '42px',
    fontWeight: 500
  },
  '.text-regular-28': {
    fontSize: '28px',
    lineHeight: '34px',
    fontWeight: 400
  },
  '.text-regular-26': {
    fontSize: '26px',
    lineHeight: '36px',
    fontWeight: 400
  },
  '.text-medium-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-regular-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-medium-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-regular-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-medium-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 500
  },
  '.text-regular-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 400
  },
  '.text-medium-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500
  },
  '.text-regular-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 400
  },
  '.text-regular-13': {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 400
  }
}

module.exports = {
  plugins: [],

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  prefix: 'tw-',

  theme: {
    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    colors: {
      black: '#0B2630',
      white: '#FFFFFF',
      green: {
        DEFAULT: '#35977D',
        'button-hover': '#336363'
      },
      transparent: 'transparent',
      current: 'currentColor',
      zinc: '#E5E5E5',
      gray: '#F8F8F8',
      tapestry: '#DDADB5',
      pink: {
        DEFAULT: '#FFBEC9',
        hover: '#FFCBD4'
      },
      danger: '#DA1C1C',
      red: '#FF3B30'
    },

    spacing: object0to100px,
  }
}
