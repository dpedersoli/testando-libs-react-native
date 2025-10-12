/**
 * Standard error messages in Portuguese for form validation
 * @module form-validation/constants/errorMessages
 */

/**
 * Standard error messages in Portuguese
 *
 * All messages are designed to be clear, actionable, and user-friendly.
 * These can be overridden via the `errorMessages` prop in FieldConfig.
 *
 * @constant
 */
export const ERROR_MESSAGES = {
  // Email validation messages
  EMAIL_REQUIRED: 'Email é obrigatório',
  EMAIL_INVALID: 'Por favor, insira um email válido',
  EMAIL_TOO_LONG: 'Email muito longo (máximo 254 caracteres)',

  // Password validation messages
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  PASSWORD_TOO_SHORT: 'Mínimo 6 caracteres obrigatório',
  PASSWORD_NO_UPPERCASE: 'Deve incluir letra maiúscula',
  PASSWORD_NO_LOWERCASE: 'Deve incluir letra minúscula',
  PASSWORD_NO_NUMBER: 'Deve incluir número',
  PASSWORD_NO_SYMBOL: 'Deve incluir símbolo (!@#$%^&* etc)',

  // Generic validation messages
  FIELD_REQUIRED: 'Campo obrigatório',
} as const;

/**
 * Type for error message keys
 * Ensures type safety when referencing error messages
 */
export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
