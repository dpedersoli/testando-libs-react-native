const ColorHue = require('./styles/color-hue.js')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: ColorHue.primary,
        secondary: ColorHue.secondary,
        tertiary: ColorHue.tertiary,
        surface: ColorHue.surface,
        background: ColorHue.background,
        error: ColorHue.error,
        outline: ColorHue.outline,
        opaque: ColorHue.opaque
      }
    }
  },
  plugins: []
}
