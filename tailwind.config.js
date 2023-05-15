/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
  });
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ["'Nunito', sans-serif", ...fontFamily.sans],
        secondary: ["'Glacial Indifference', sans-serif", ...fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        'moonbeam-blue': 'var(--color-moonbeam-blue)',
        'moonbeam-blue-dark': 'rgb(var(--color-moonbeam-blue-dark) / <alpha-value>)',
        'moonbeam-accent': 'rgb(var(--color-moonbeam-accent) / <alpha-value>)',
        'moonriver-accent': 'rgb(var(--color-moonriver-accent) / <alpha-value>)',
        'moonbase-alpha-accent': 'rgb(var(--color-moonbase-alpha-accent) / <alpha-value>)',
        'moonbeam-cyan': 'rgb(var(--color-moonbeam-cyan) / <alpha-value>)',
        'moonbeam-pink': 'var(--color-moonbeam-pink)',
        'moonbeam-purple-light': 'var(--color-moonbeam-purple-light)',
        'moonbeam-purple-dark': 'var(--color-moonbeam-purple-dark)',
        'moonbeam-grey-dark': 'var(--color-moonbeam-grey-dark)',
        'moonbeam-grey': 'var(--color-moonbeam-grey)',
        'moonbeam-grey-light': 'var(--color-moonbeam-grey-light)',
        orange: 'rgb(var(--color-orange) / <alpha-value>)',
        dark: '#0e0f22',
      },
      transitionProperty: {
        width: 'width',
      },
      rotate: {
        270: '270deg',
      },
      dropShadow: {
        '3xl': '0 25px 25px rgb(0 0 0)',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin'), backfaceVisibility],
  safelist: [
    {
      pattern: /bg-(moonbase-alpha-accent|moonbeam-accent|moonriver-accent)/,
      variants: ['hover'],
    },
    {
      pattern: /text-(moonbase-alpha-accent|moonbeam-accent|moonriver-accent)/,
      variants: ['hover'],
    },
    {
      pattern: /border-(moonbase-alpha-accent|moonbeam-accent|moonriver-accent)/,
      variants: ['hover'],
    },
  ],
};
