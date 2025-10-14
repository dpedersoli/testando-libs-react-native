import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { darkSchema, lightSchema } from './colors';
import { customFonts } from './typography';
import { ColorHue } from './color-hue';

const theme = {};

export const LightTheme = {
  ...MD3LightTheme,
  colors: lightSchema,
  customFonts,
  roundness: 4,
  customColors: ColorHue,
};

export const DarkTheme = {
  ...MD3DarkTheme,
  colors: darkSchema,
  customFonts,
  roundness: 4,
  customColors: ColorHue,
};

export type AppTheme = typeof LightTheme;

export default theme;
