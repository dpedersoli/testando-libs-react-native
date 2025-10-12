/**
 * Password validation schema using Zod
 * @module form-validation/schemas/passwordSchema
 */

import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants/errorMessages';

/**
 * Zod schema for password validation with security requirements
 *
 * Validation rules:
 * - Required field
 * - Minimum 6 characters
 * - At least one uppercase letter (A-Z)
 * - At least one lowercase letter (a-z)
 * - At least one numeric digit (0-9)
 * - At least one special symbol (!@#$%^&*, etc.)
 *
 * @example
 * // Valid passwords
 * passwordSchema.parse('Abc123!'); // ✓
 * passwordSchema.parse('MyP@ssw0rd'); // ✓
 *
 * // Invalid passwords
 * passwordSchema.parse('abc'); // ✗ too short, no uppercase, no number, no symbol
 * passwordSchema.parse('Password'); // ✗ no number, no symbol
 * passwordSchema.parse('Pass1!'); // ✗ minimum 6 characters not met
 */
export const passwordSchema = z
  .string({ message: ERROR_MESSAGES.PASSWORD_REQUIRED })
  .min(6, { message: ERROR_MESSAGES.PASSWORD_TOO_SHORT })
  .refine((pwd) => /[A-Z]/.test(pwd), { message: ERROR_MESSAGES.PASSWORD_NO_UPPERCASE })
  .refine((pwd) => /[a-z]/.test(pwd), { message: ERROR_MESSAGES.PASSWORD_NO_LOWERCASE })
  .refine((pwd) => /[0-9]/.test(pwd), { message: ERROR_MESSAGES.PASSWORD_NO_NUMBER })
  .refine((pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), {
    message: ERROR_MESSAGES.PASSWORD_NO_SYMBOL,
  });

/**
 * TypeScript type inferred from password schema
 */
export type Password = z.infer<typeof passwordSchema>;
