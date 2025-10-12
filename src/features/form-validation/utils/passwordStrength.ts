/**
 * Password strength calculation utility
 * @module form-validation/utils/passwordStrength
 */

import type { PasswordStrength } from '../types';
import { PASSWORD_STRENGTH_CONFIG } from '../constants/passwordStrength';
import { ERROR_MESSAGES } from '../constants/errorMessages';

/**
 * Calculates password strength and provides detailed feedback
 *
 * Evaluates password against 5 security requirements:
 * 1. Minimum length (6+ characters)
 * 2. Contains uppercase letter (A-Z)
 * 3. Contains lowercase letter (a-z)
 * 4. Contains numeric digit (0-9)
 * 5. Contains special symbol (!@#$%^&*, etc.)
 *
 * Score calculation:
 * - Score 0-5 based on number of requirements met
 * - Each met requirement adds 1 point
 * - Maximum score is 5
 *
 * @param {string} password - The password to analyze
 * @returns {PasswordStrength} Detailed strength analysis
 *
 * @example
 * const strength = calculatePasswordStrength('abc');
 * console.log(strength.score); // 1 (only lowercase)
 * console.log(strength.label); // "Fraca"
 * console.log(strength.missingRequirements); // Array of 4 unmet requirements
 *
 * @example
 * const strength = calculatePasswordStrength('Abc123!');
 * console.log(strength.score); // 5 (all requirements met)
 * console.log(strength.label); // "Excelente"
 * console.log(strength.isValid); // true
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  // Check each requirement
  const requirements = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  // Calculate score (0-5)
  let score = 0;
  if (requirements.minLength) score++;
  if (requirements.hasUppercase) score++;
  if (requirements.hasLowercase) score++;
  if (requirements.hasNumber) score++;
  if (requirements.hasSymbol) score++;

  // Ensure score is within 0-5 range
  const finalScore = Math.min(Math.max(score, 0), 5) as 0 | 1 | 2 | 3 | 4 | 5;

  // Get label from config
  const label = PASSWORD_STRENGTH_CONFIG[finalScore].label;

  // Build array of missing requirements
  const missingRequirements: string[] = [];
  if (!requirements.minLength) missingRequirements.push(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  if (!requirements.hasUppercase) missingRequirements.push(ERROR_MESSAGES.PASSWORD_NO_UPPERCASE);
  if (!requirements.hasLowercase) missingRequirements.push(ERROR_MESSAGES.PASSWORD_NO_LOWERCASE);
  if (!requirements.hasNumber) missingRequirements.push(ERROR_MESSAGES.PASSWORD_NO_NUMBER);
  if (!requirements.hasSymbol) missingRequirements.push(ERROR_MESSAGES.PASSWORD_NO_SYMBOL);

  // Generate suggestions based on missing requirements
  const suggestions: string[] = [];
  if (!requirements.minLength) suggestions.push('Adicione mais caracteres (mínimo 6)');
  if (!requirements.hasUppercase) suggestions.push('Adicione uma letra maiúscula');
  if (!requirements.hasLowercase) suggestions.push('Adicione uma letra minúscula');
  if (!requirements.hasNumber) suggestions.push('Adicione um número');
  if (!requirements.hasSymbol) suggestions.push('Adicione um símbolo como !@#$%^&*');

  return {
    score: finalScore,
    label,
    requirements,
    missingRequirements,
    suggestions,
  };
}
