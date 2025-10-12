/**
 * Helper hook for extracting field error messages
 * @module form-validation/hooks/useFieldError
 */

import type { FieldErrors } from 'react-hook-form';

/**
 * Extracts error message from react-hook-form errors object
 *
 * Simplifies error message extraction by handling nested paths and
 * providing a clean API for accessing validation errors.
 *
 * @param {string} fieldName - The name of the field to get error for
 * @param {FieldErrors<any>} errors - The errors object from formState
 * @returns {string | undefined} The error message, or undefined if no error
 *
 * @example
 * function MyForm() {
 *   const { formState: { errors } } = useForm();
 *   const emailError = useFieldError('email', errors);
 *   const passwordError = useFieldError('password', errors);
 *
 *   return (
 *     <View>
 *       <TextInput />
 *       {emailError && <Text>{emailError}</Text>}
 *     </View>
 *   );
 * }
 */
export function useFieldError(fieldName: string, errors: FieldErrors<any>): string | undefined {
  // Handle nested field paths (e.g., 'user.email')
  const fieldPath = fieldName.split('.');
  let currentError: any = errors;

  for (const path of fieldPath) {
    if (!currentError || !currentError[path]) {
      return undefined;
    }
    currentError = currentError[path];
  }

  // Return the message if it exists
  if (currentError && typeof currentError.message === 'string') {
    return currentError.message;
  }

  // Handle array errors (return first error message)
  if (Array.isArray(currentError)) {
    const firstError = currentError.find((err) => err?.message);
    return firstError?.message;
  }

  return undefined;
}
