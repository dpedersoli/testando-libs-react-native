/**
 * Email validation schema using Zod
 * @module form-validation/schemas/emailSchema
 */

import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants/errorMessages';

/**
 * Zod schema for email validation
 *
 * Validation rules:
 * - Required (minimum 1 character)
 * - Maximum 254 characters (RFC 5321 limit)
 * - Valid email format (RFC 5322 simplified)
 * - Automatically trims whitespace
 * - Converts to lowercase
 * - Verifies domain has at least one dot
 *
 * @example
 * // Valid emails
 * emailSchema.parse('user@example.com'); // ✓
 * emailSchema.parse('user+tag@domain.co.uk'); // ✓
 * emailSchema.parse('  test@example.com  '); // ✓ (trimmed)
 *
 * // Invalid emails
 * emailSchema.parse('invalid-email'); // ✗ throws ZodError
 * emailSchema.parse('test@domain'); // ✗ no dot in domain
 * emailSchema.parse(''); // ✗ required
 */
export const emailSchema = z
  .string({ message: ERROR_MESSAGES.EMAIL_REQUIRED })
  .min(1, { message: ERROR_MESSAGES.EMAIL_REQUIRED })
  .max(254, { message: ERROR_MESSAGES.EMAIL_TOO_LONG })
  .email({ message: ERROR_MESSAGES.EMAIL_INVALID })
  .trim()
  .toLowerCase()
  .refine(
    (email) => {
      // Additional validation: ensure @ exists and domain has a dot
      const parts = email.split('@');
      return parts.length === 2 && parts[1].includes('.');
    },
    { message: ERROR_MESSAGES.EMAIL_INVALID }
  );

/**
 * TypeScript type inferred from email schema
 */
export type Email = z.infer<typeof emailSchema>;
