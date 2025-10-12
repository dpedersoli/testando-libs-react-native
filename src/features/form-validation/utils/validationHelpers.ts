/**
 * Validation helper utilities
 * @module form-validation/utils/validationHelpers
 */

import { ERROR_MESSAGES, type ErrorMessageKey } from '../constants/errorMessages';

/**
 * Gets an error message by its key
 *
 * @param {ErrorMessageKey} key - The error message key
 * @returns {string} The error message text
 *
 * @example
 * const message = formatErrorMessage('EMAIL_REQUIRED');
 * console.log(message); // "Email é obrigatório"
 */
export function formatErrorMessage(key: ErrorMessageKey): string {
  return ERROR_MESSAGES[key];
}

/**
 * Checks password strength and returns a score from 0 to 5
 *
 * Score calculation:
 * - 0 points: No requirements met
 * - 1 point: Minimum length (6+ chars)
 * - 1 point: Has uppercase letter
 * - 1 point: Has lowercase letter
 * - 1 point: Has number
 * - 1 point: Has symbol
 * - Bonus +1: Length >= 12 characters
 *
 * @param {string} password - The password to check
 * @returns {number} Score from 0 (very weak) to 5 (excellent)
 *
 * @example
 * checkPasswordStrength('abc');      // Returns 1 (only lowercase)
 * checkPasswordStrength('Abc123!');  // Returns 5 (all requirements met)
 */
export function checkPasswordStrength(password: string): number {
  let score = 0;

  // Check minimum length (6+ chars)
  if (password.length >= 6) score++;

  // Check for uppercase letter
  if (/[A-Z]/.test(password)) score++;

  // Check for lowercase letter
  if (/[a-z]/.test(password)) score++;

  // Check for number
  if (/[0-9]/.test(password)) score++;

  // Check for symbol
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  // Bonus point for length >= 12
  if (password.length >= 12 && score === 5) {
    // Cap at 5 since PasswordStrength.score type is 0-5
    return 5;
  }

  return Math.min(score, 5) as 0 | 1 | 2 | 3 | 4 | 5;
}
