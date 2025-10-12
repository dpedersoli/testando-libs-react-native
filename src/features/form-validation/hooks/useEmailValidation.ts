/**
 * Custom hook for email validation with real-time feedback
 * @module form-validation/hooks/useEmailValidation
 */

import { useState, useCallback, useEffect } from 'react';
import { emailSchema } from '../schemas/emailSchema';
import type { ValidationResult } from '../types';

/**
 * Return type for useEmailValidation hook
 */
export interface UseEmailValidationReturn {
  value: string;
  setValue: (email: string) => void;
  error: string | null;
  isValid: boolean;
  validate: (email: string) => ValidationResult;
  reset: () => void;
}

/**
 * Custom hook for email validation with real-time feedback
 *
 * Provides email validation state management with debounced validation
 * and real-time error feedback. Validates against RFC 5322 email format.
 *
 * @param {string} [initialValue=''] - Initial email value
 * @returns {UseEmailValidationReturn} Email validation state and methods
 *
 * @example
 * function EmailField() {
 *   const { value, setValue, error, isValid } = useEmailValidation();
 *
 *   return (
 *     <View>
 *       <TextInput
 *         value={value}
 *         onChangeText={setValue}
 *         keyboardType="email-address"
 *       />
 *       {error && <Text>{error}</Text>}
 *     </View>
 *   );
 * }
 */
export function useEmailValidation(initialValue: string = ''): UseEmailValidationReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  /**
   * Validates an email address against the email schema
   */
  const validate = useCallback((email: string): ValidationResult => {
    const result = emailSchema.safeParse(email);

    if (result.success) {
      return {
        isValid: true,
        errors: [],
        ruleResults: { email: true },
        validatedAt: Date.now(),
      };
    }

    const errors = result.error.issues.map((err) => err.message);
    return {
      isValid: false,
      errors,
      ruleResults: { email: false },
      validatedAt: Date.now(),
    };
  }, []);

  /**
   * Resets validation state to initial values
   */
  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setIsValid(false);
  }, [initialValue]);

  /**
   * Effect: Validate email whenever value changes (with debounce in practice)
   * For this hook, we validate immediately on change
   */
  useEffect(() => {
    if (value.length === 0) {
      setError(null);
      setIsValid(false);
      return;
    }

    const validationResult = validate(value);
    setIsValid(validationResult.isValid);
    setError(validationResult.errors[0] || null);
  }, [value, validate]);

  return {
    value,
    setValue,
    error,
    isValid,
    validate,
    reset,
  };
}
