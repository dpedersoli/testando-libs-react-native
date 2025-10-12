/**
 * Hook for debounced validation
 * @module form-validation/hooks/useDebouncedValidation
 */

import { useState, useEffect, useRef } from 'react';
import type { ValidationResult } from '../types';

/**
 * Debounces validation to prevent excessive calls during rapid input
 *
 * Delays validation until the user stops typing for the specified duration.
 * Returns null during the debounce period, allowing UI to show loading state.
 *
 * @template T - The type of value being validated
 * @param {T} value - Current value to validate
 * @param {(value: T) => ValidationResult} validator - Validation function
 * @param {number} [delay=500] - Debounce delay in milliseconds
 * @returns {ValidationResult | null} Validation result or null if still debouncing
 *
 * @example
 * function DebouncedEmailField() {
 *   const [email, setEmail] = useState('');
 *
 *   const validateEmail = (value: string) => ({
 *     isValid: /\S+@\S+\.\S+/.test(value),
 *     errors: /\S+@\S+\.\S+/.test(value) ? [] : ['Email inválido'],
 *     ruleResults: {},
 *     validatedAt: Date.now(),
 *   });
 *
 *   const validationResult = useDebouncedValidation(email, validateEmail, 500);
 *
 *   return (
 *     <View>
 *       <TextInput value={email} onChangeText={setEmail} />
 *       {validationResult === null && <Text>Validando...</Text>}
 *       {validationResult && !validationResult.isValid && (
 *         <Text>{validationResult.errors[0]}</Text>
 *       )}
 *     </View>
 *   );
 * }
 */
export function useDebouncedValidation<T>(
  value: T,
  validator: (value: T) => ValidationResult,
  delay: number = 500
): ValidationResult | null {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Validate immediately if value is empty
    if (value === '' || value === null || value === undefined) {
      setValidationResult(null);
      return;
    }

    // Set validation to null (loading state)
    setValidationResult(null);

    // Debounce validation
    timeoutRef.current = setTimeout(() => {
      const result = validator(value);
      setValidationResult(result);
    }, delay);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, validator, delay]);

  return validationResult;
}
