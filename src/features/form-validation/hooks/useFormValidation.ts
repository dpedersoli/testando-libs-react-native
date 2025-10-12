/**
 * Generic form validation hook with Zod integration
 * @module form-validation/hooks/useFormValidation
 */

import { useForm, type Control, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

/**
 * Return type for useFormValidation hook
 */
export interface UseFormValidationReturn<T extends z.ZodObject<any>> {
  control: Control<z.infer<T>>;
  handleSubmit: (
    onValid: (data: z.infer<T>) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  formState: {
    errors: FieldErrors<z.infer<T>>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
  };
  reset: () => void;
  getFieldError: (fieldName: keyof z.infer<T>) => string | undefined;
}

/**
 * Generic form validation hook with Zod schema integration
 *
 * Wraps react-hook-form's useForm with zodResolver for schema-based validation.
 * Provides type-safe form state management with real-time validation.
 *
 * @template T - Zod schema type
 * @param {T} schema - Zod validation schema
 * @param {Object} [options] - Form options
 * @param {'onBlur'|'onChange'|'onSubmit'} [options.mode='onBlur'] - When to trigger first validation
 * @param {'onBlur'|'onChange'|'onSubmit'} [options.reValidateMode='onChange'] - When to re-validate after error
 * @param {Partial<z.infer<T>>} [options.defaultValues] - Default form values
 * @returns {UseFormValidationReturn<T>} Form validation state and methods
 *
 * @example
 * const loginSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(6),
 * });
 *
 * function LoginForm() {
 *   const { control, handleSubmit, formState, getFieldError } = useFormValidation(loginSchema, {
 *     mode: 'onBlur',
 *     reValidateMode: 'onChange',
 *   });
 *
 *   const onSubmit = (data) => {
 *     console.log('Valid data:', data);
 *   };
 *
 *   return (
 *     <View>
 *       <Controller name="email" control={control} render={({ field }) => <TextInput {...field} />} />
 *       <Text>{getFieldError('email')}</Text>
 *       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
 *     </View>
 *   );
 * }
 */
export function useFormValidation<T extends z.ZodObject<any>>(
  schema: T,
  options?: {
    mode?: 'onBlur' | 'onChange' | 'onSubmit';
    reValidateMode?: 'onBlur' | 'onChange' | 'onSubmit';
    defaultValues?: Partial<z.infer<T>>;
  }
): UseFormValidationReturn<T> {
  const { control, handleSubmit, formState, reset } = useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    mode: options?.mode || 'onBlur',
    reValidateMode: options?.reValidateMode || 'onChange',
    defaultValues: options?.defaultValues as any,
  });

  /**
   * Helper to get error message for a specific field
   */
  const getFieldError = (fieldName: keyof z.infer<T>): string | undefined => {
    const error = formState.errors[fieldName as string];
    if (!error) return undefined;
    return error.message as string;
  };

  return {
    control,
    handleSubmit,
    formState: {
      errors: formState.errors,
      isValid: formState.isValid,
      isSubmitting: formState.isSubmitting,
      isDirty: formState.isDirty,
    },
    reset,
    getFieldError,
  };
}
