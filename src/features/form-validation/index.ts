/**
 * Form Validation System
 *
 * Reusable form validation components and hooks for React Native with Zod and react-hook-form.
 * Provides real-time validation feedback with full WCAG 2.1 Level AA accessibility compliance.
 *
 * @module form-validation
 * @version 1.0.0
 */

// ===== Types =====
export type {
  ValidationState,
  ValidationRule,
  ValidationResult,
  FieldConfig,
  PasswordStrength,
} from './types';

// ===== Components =====
export { ErrorMessage } from './components/ErrorMessage';
export type { ErrorMessageProps } from './components/ErrorMessage';

export { ValidatedInput } from './components/ValidatedInput';
export type { ValidatedInputProps } from './components/ValidatedInput';

export { ValidatedEmailInput } from './components/ValidatedEmailInput';
export type { ValidatedEmailInputProps } from './components/ValidatedEmailInput';

export { ValidatedPasswordInput } from './components/ValidatedPasswordInput';
export type { ValidatedPasswordInputProps } from './components/ValidatedPasswordInput';

export { PasswordStrengthIndicator } from './components/PasswordStrengthIndicator';
export type { PasswordStrengthIndicatorProps } from './components/PasswordStrengthIndicator';

// ===== Hooks =====
export { useFormValidation } from './hooks/useFormValidation';
export type { UseFormValidationReturn } from './hooks/useFormValidation';

export { useEmailValidation } from './hooks/useEmailValidation';
export type { UseEmailValidationReturn } from './hooks/useEmailValidation';

export { usePasswordValidation } from './hooks/usePasswordValidation';
export type { UsePasswordValidationReturn } from './hooks/usePasswordValidation';

export { useFieldError } from './hooks/useFieldError';

export { useDebouncedValidation } from './hooks/useDebouncedValidation';

// ===== Schemas =====
export { emailSchema } from './schemas/emailSchema';
export type { Email } from './schemas/emailSchema';

export { passwordSchema } from './schemas/passwordSchema';
export type { Password } from './schemas/passwordSchema';

// ===== Constants =====
export { ERROR_MESSAGES } from './constants/errorMessages';
export type { ErrorMessageKey } from './constants/errorMessages';

export { PASSWORD_STRENGTH_CONFIG } from './constants/passwordStrength';

export { defaultStyleConfig } from './constants/defaultStyles';

// ===== Utilities =====
export { debounce } from './utils/debounce';
export { formatErrorMessage, checkPasswordStrength } from './utils/validationHelpers';
export { calculatePasswordStrength } from './utils/passwordStrength';
export { mergeStyleConfig } from './utils/styleHelpers';
