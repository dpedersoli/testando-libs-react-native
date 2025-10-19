import { configureFonts } from 'react-native-paper';

const baseFont = {
  fontFamily: 'Roboto-Regular',
};

const baseVariants = configureFonts({ config: baseFont });

const customVariants = {
  displayLarge: {
    ...baseVariants.displayLarge,
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: 0,
  },
  displayMedium: {
    ...baseVariants.displayMedium,
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    ...baseVariants.displaySmall,
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    ...baseVariants.headlineLarge,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    ...baseVariants.headlineMedium,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    ...baseVariants.headlineSmall,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    ...baseVariants.titleLarge,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    ...baseVariants.titleMedium,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    ...baseVariants.titleSmall,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    ...baseVariants.bodyLarge,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    ...baseVariants.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    ...baseVariants.bodySmall,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    ...baseVariants.labelLarge,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    ...baseVariants.labelMedium,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    ...baseVariants.labelSmall,
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
} as const;

export const customFonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});
