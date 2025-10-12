/**
 * Email-specific validated input component
 * @module form-validation/components/ValidatedEmailInput
 */

import React from 'react';
import { ValidatedInput, type ValidatedInputProps } from './ValidatedInput';

/**
 * Props for ValidatedEmailInput component
 * Extends ValidatedInputProps but fixes keyboardType and autoCapitalize
 */
export type ValidatedEmailInputProps = Omit<ValidatedInputProps, 'keyboardType' | 'autoCapitalize'>;

/**
 * Email-specific validated input with pre-configured settings
 *
 * A wrapper around ValidatedInput with email-optimized defaults:
 * - keyboardType: "email-address" (shows @ and . on keyboard)
 * - autoCapitalize: "none" (prevents auto-capitalization)
 * - accessibilityHint: "Digite seu endereço de email"
 *
 * @param {ValidatedEmailInputProps} props - Component props
 * @returns {React.ReactElement} Email input component
 *
 * @example
 * const { control, formState: { errors } } = useForm({
 *   resolver: zodResolver(loginSchema),
 * });
 *
 * <ValidatedEmailInput
 *   name="email"
 *   label="Email"
 *   placeholder="seu@email.com"
 *   control={control}
 *   error={errors.email?.message}
 * />
 */
export function ValidatedEmailInput(props: ValidatedEmailInputProps): React.ReactElement {
  return (
    <ValidatedInput
      {...props}
      keyboardType="email-address"
      autoCapitalize="none"
      accessibilityHint={props.accessibilityHint || 'Digite seu endereço de email'}
    />
  );
}
