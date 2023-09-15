// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))
const object0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))

const fallbackSansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica',
  'Segoe UI',
  'Arial',
  'sans-serif'
]

const typography = {
  '.text-medium-30': {
    fontSize: '30px',
    lineHeight: '42px',
    fontWeight: 500
  },
  '.text-medium-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-medium-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-medium-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 500
  },
  '.text-medium-16': {
    fontSize: '16px',
    lineHeight: '21px',
    fontWeight: 500
  },
  '.text-medium-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500
  },
  '.text-medium-14': {
    fontSize: '14px',
    lineHeight: '19px',
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
  '.text-regular-24': {
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 400
  },
  '.text-regular-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-regular-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-regular-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 400
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
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(typography)
    })
  ],

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],

  corePlugins: {
    container: false
  },

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
      black: '#202022',
      'button-black': {
        DEFAULT: '#000000',
        hover: '#333333',
        active: '#5C5C5C',
        disabled: '#CCCCCC'
      },
      white: '#FFFFFF',

      transparent: 'transparent',
      current: 'currentColor',
      gray: '#E8E8E9',

      tapestry: '#DDADB5',
    },

    spacing: object0to100px,

    fontFamily: {
      sans: ['Montserrat', ...fallbackSansSerifFonts],
      hnd: ['"Helvetica Now Display"', ...fallbackSansSerifFonts]
    },

    keyframes: {
      'posing-levitation': {
        '0%, 100%': { transform: 'translate(0, 0)' },
        '50%': { transform: 'translate(-50px, -10px) scale(1.1, 1.25)' }
      },
      spin: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    },

    animation: {
      'logo-levitation': 'posing-levitation 20s linear infinite',
      spin: 'spin 1s linear infinite' 
    }
  }
}
