import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { Platform } from 'react-native';
import ColorHue from '../styles/color-hue';

export function shadow(elevation: number) {
  return (
    Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: elevation },
        shadowRadius: elevation,
      },
      android: { elevation },
    }) || {}
  );
}

export const lightSchema = {
  ...MD3LightTheme.colors,
  primary: ColorHue.primary[20],
  onPrimary: ColorHue.primary[10],
  primaryContainer: ColorHue.primary[30],
  onPrimaryContainer: ColorHue.primary[0],
  secondary: ColorHue.secondary[20],
  onSecondary: ColorHue.secondary[10],
  secondaryContainer: ColorHue.secondary[30],
  onSecondaryContainer: ColorHue.secondary[0],
  tertiary: ColorHue.tertiary[20],
  onTertiary: ColorHue.tertiary[10],
  tertiaryContainer: ColorHue.tertiary[30],
  onTertiaryContainer: ColorHue.tertiary[0],
  background: ColorHue.background[40],
  onBackground: ColorHue.background[10],
  surface: ColorHue.surface[40],
  onSurface: ColorHue.surface[10],
  surfaceVariant: ColorHue.surface[20],
  onSurfaceVariant: ColorHue.surface[30],
  outline: ColorHue.outline[20],
  error: ColorHue.error[20],
  onError: ColorHue.error[10],
  errorContainer: ColorHue.error[30],
  onErrorContainer: ColorHue.error[0],
  elevation: MD3LightTheme.colors.elevation,
  shadow: MD3LightTheme.colors.shadow,
  inversePrimary: ColorHue.primary[0],
  inverseSurface: ColorHue.surface[0],
  inverseOnSurface: ColorHue.surface[40],
  backdrop: ColorHue.opaque,
};

export const darkSchema = {
  ...MD3DarkTheme.colors,
  primary: ColorHue.primary[30],
  onPrimary: ColorHue.primary[0],
  primaryContainer: ColorHue.primary[20],
  onPrimaryContainer: ColorHue.primary[40],
  secondary: ColorHue.secondary[30],
  onSecondary: ColorHue.secondary[0],
  secondaryContainer: ColorHue.secondary[20],
  onSecondaryContainer: ColorHue.secondary[40],
  tertiary: ColorHue.tertiary[30],
  onTertiary: ColorHue.tertiary[10],
  tertiaryContainer: ColorHue.tertiary[20],
  onTertiaryContainer: ColorHue.tertiary[40],
  background: ColorHue.background[0],
  onBackground: ColorHue.background[40],
  surface: ColorHue.surface[0],
  onSurface: ColorHue.surface[40],
  surfaceVariant: ColorHue.surface[30],
  onSurfaceVariant: ColorHue.surface[20],
  outline: ColorHue.outline[30],
  error: ColorHue.error[30],
  onError: ColorHue.error[0],
  errorContainer: ColorHue.error[20],
  onErrorContainer: ColorHue.error[40],
  elevation: MD3DarkTheme.colors.elevation,
  shadow: MD3DarkTheme.colors.shadow,
  inversePrimary: ColorHue.primary[20],
  inverseSurface: ColorHue.surface[40],
  inverseOnSurface: ColorHue.surface[0],
  backdrop: ColorHue.opaque,
};

export type AppColors = typeof lightSchema;
