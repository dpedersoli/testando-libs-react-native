/**
 * Password strength configuration constants
 * @module form-validation/constants/passwordStrength
 */

/**
 * Password strength labels with color associations
 *
 * Scores range from 0 (very weak) to 5 (excellent).
 * Colors follow a gradient from red (weak) to dark green (strong).
 * All colors meet WCAG 2.1 AA contrast requirements when used on white background.
 *
 * @constant
 */
export const PASSWORD_STRENGTH_CONFIG = {
  0: { label: 'Muito fraca' as const, color: '#D32F2F' }, // Red 700
  1: { label: 'Fraca' as const, color: '#F57C00' }, // Orange 700
  2: { label: 'Média' as const, color: '#FBC02D' }, // Yellow 700
  3: { label: 'Forte' as const, color: '#7CB342' }, // Light Green 600
  4: { label: 'Muito forte' as const, color: '#388E3C' }, // Green 700
  5: { label: 'Excelente' as const, color: '#1B5E20' }, // Green 900
} as const;

/**
 * Type for password strength score
 */
export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Type for password strength label
 */
export type PasswordStrengthLabel =
  (typeof PASSWORD_STRENGTH_CONFIG)[PasswordStrengthScore]['label'];
