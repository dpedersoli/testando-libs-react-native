/**
 * Custom hook for password validation with strength analysis
 * @module form-validation/hooks/usePasswordValidation
 */

import { useState, useCallback, useEffect } from 'react';
import { passwordSchema } from '../schemas/passwordSchema';
import { calculatePasswordStrength } from '../utils/passwordStrength';
import type { PasswordStrength } from '../types';

/**
 * Return type for usePasswordValidation hook
 */
export interface UsePasswordValidationReturn {
  value: string;
  setValue: (password: string) => void;
  strength: PasswordStrength;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
  isValid: boolean;
  errors: string[];
  validate: (password: string) => void;
  reset: () => void;
}

/**
 * Custom hook for password validation with strength analysis
 *
 * Provides password validation with real-time strength calculation,
 * requirement tracking, and error messages. Validates against all
 * security requirements (length, uppercase, lowercase, number, symbol).
 *
 * @param {string} [initialValue=''] - Initial password value
 * @returns {UsePasswordValidationReturn} Password validation state and methods
 *
 * @example
 * function PasswordField() {
 *   const {
 *     value,
 *     setValue,
 *     strength,
 *     requirements,
 *     isValid,
 *     errors
 *   } = usePasswordValidation();
 *
 *   return (
 *     <View>
 *       <TextInput
 *         value={value}
 *         onChangeText={setValue}
 *         secureTextEntry
 *       />
 *       <Text>Força: {strength.label}</Text>
 *       {errors.map(error => <Text key={error}>{error}</Text>)}
 *     </View>
 *   );
 * }
 */
export function usePasswordValidation(initialValue: string = ''): UsePasswordValidationReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [strength, setStrength] = useState<PasswordStrength>(() =>
    calculatePasswordStrength(initialValue)
  );
  const [errors, setErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  /**
   * Validates password and updates state
   */
  const validate = useCallback((password: string): void => {
    const result = passwordSchema.safeParse(password);
    const strengthResult = calculatePasswordStrength(password);

    setStrength(strengthResult);

    if (result.success) {
      setErrors([]);
      setIsValid(true);
    } else {
      const errorMessages = result.error.issues.map((err) => err.message);
      setErrors(errorMessages);
      setIsValid(false);
    }
  }, []);

  /**
   * Resets validation state to initial values
   */
  const reset = useCallback(() => {
    setValue(initialValue);
    setStrength(calculatePasswordStrength(initialValue));
    setErrors([]);
    setIsValid(false);
  }, [initialValue]);

  /**
   * Effect: Validate password whenever value changes
   */
  useEffect(() => {
    if (value.length === 0) {
      setStrength(calculatePasswordStrength(''));
      setErrors([]);
      setIsValid(false);
      return;
    }

    validate(value);
  }, [value, validate]);

  return {
    value,
    setValue,
    strength,
    requirements: strength.requirements,
    isValid,
    errors,
    validate,
    reset,
  };
}
