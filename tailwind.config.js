const ColorHue = require('./styles/color-hue.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          light: ColorHue.primary[20],
          DEFAULT: ColorHue.primary[20],
          dark: ColorHue.primary[30],
        },
        onPrimary: {
          light: ColorHue.primary[10],
          DEFAULT: ColorHue.primary[10],
          dark: ColorHue.primary[0],
        },
        secondary: {
          light: ColorHue.secondary[20],
          DEFAULT: ColorHue.secondary[20],
          dark: ColorHue.secondary[30],
        },
        onSecondary: {
          light: ColorHue.secondary[10],
          DEFAULT: ColorHue.secondary[10],
          dark: ColorHue.secondary[0],
        },
        tertiary: {
          light: ColorHue.tertiary[20],
          DEFAULT: ColorHue.tertiary[20],
          dark: ColorHue.tertiary[30],
        },
        onTertiary: {
          light: ColorHue.tertiary[10],
          DEFAULT: ColorHue.tertiary[10],
          dark: ColorHue.tertiary[0],
        },
        background: {
          light: ColorHue.background[40],
          DEFAULT: ColorHue.background[40],
          dark: ColorHue.background[0],
        },
        onBackground: {
          light: ColorHue.background[10],
          DEFAULT: ColorHue.background[10],
          dark: ColorHue.background[40],
        },
        surface: {
          light: ColorHue.surface[40],
          DEFAULT: ColorHue.surface[40],
          dark: ColorHue.surface[0],
        },
        onSurface: {
          light: ColorHue.surface[10],
          DEFAULT: ColorHue.surface[10],
          dark: ColorHue.surface[40],
        },
        surfaceVariant: {
          light: ColorHue.surface[20],
          DEFAULT: ColorHue.surface[20],
          dark: ColorHue.surface[30],
        },
        onSurfaceVariant: {
          light: ColorHue.surface[30],
          DEFAULT: ColorHue.surface[30],
          dark: ColorHue.surface[20],
        },
        outline: {
          light: ColorHue.outline[20],
          DEFAULT: ColorHue.outline[20],
          dark: ColorHue.outline[30],
        },
        error: {
          light: ColorHue.error[20],
          DEFAULT: ColorHue.error[20],
          dark: ColorHue.error[30],
        },
        onError: {
          light: ColorHue.error[10],
          DEFAULT: ColorHue.error[10],
          dark: ColorHue.error[0],
        },
        errorContainer: {
          light: ColorHue.error[30],
          DEFAULT: ColorHue.error[30],
          dark: ColorHue.error[20],
        },
        onErrorContainer: {
          light: ColorHue.error[0],
          DEFAULT: ColorHue.error[0],
          dark: ColorHue.error[40],
        },
        opaque: ColorHue.opaque,
      },
    },
  },
  plugins: [],
};
