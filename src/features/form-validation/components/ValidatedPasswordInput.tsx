/**
 * Password-specific validated input with strength indicator
 * @module form-validation/components/ValidatedPasswordInput
 */

import React from 'react';
import { View } from 'react-native';
import { useWatch } from 'react-hook-form';
import { ValidatedInput, type ValidatedInputProps } from './ValidatedInput';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

/**
 * Props for ValidatedPasswordInput component
 */
export interface ValidatedPasswordInputProps extends Omit<ValidatedInputProps, 'secureTextEntry'> {
  /** Whether to show password strength indicator (default: true) */
  showStrengthIndicator?: boolean;
  /** Whether to show requirements checklist (default: true) */
  showRequirements?: boolean;
  /** Whether to show toggle visibility button (default: false, out of scope for v1) */
  showToggleVisibility?: boolean;
}

/**
 * Password-specific validated input with strength indicator
 *
 * Wraps ValidatedInput with password-specific features:
 * - Always uses secureTextEntry (masked input)
 * - Displays password strength indicator with real-time feedback
 * - Shows requirements checklist
 * - Provides detailed accessibility hints
 *
 * @param {ValidatedPasswordInputProps} props - Component props
 * @returns {React.ReactElement} Password input component
 *
 * @example
 * const { control, formState: { errors } } = useForm({
 *   resolver: zodResolver(registrationSchema),
 * });
 *
 * <ValidatedPasswordInput
 *   name="password"
 *   label="Senha"
 *   placeholder="Digite sua senha"
 *   control={control}
 *   error={errors.password?.message}
 *   showStrengthIndicator={true}
 *   showRequirements={true}
 * />
 */
export function ValidatedPasswordInput({
  showStrengthIndicator = true,
  showRequirements = true,
  showToggleVisibility = false,
  accessibilityHint,
  ...props
}: ValidatedPasswordInputProps): React.ReactElement {
  // Watch password value from react-hook-form
  const passwordValue = useWatch({
    control: props.control,
    name: props.name,
    defaultValue: '',
  });

  // Calculate password strength
  const { strength } = usePasswordValidation(passwordValue || '');

  return (
    <View>
      <ValidatedInput
        {...props}
        secureTextEntry={true}
        accessibilityHint={
          accessibilityHint ||
          'Senha deve ter pelo menos 6 caracteres com maiúscula, minúscula, número e símbolo'
        }
      />

      {/* Show strength indicator if password has value */}
      {showStrengthIndicator && passwordValue && passwordValue.length > 0 && (
        <PasswordStrengthIndicator
          strength={strength}
          showRequirements={showRequirements}
          showSuggestions={strength.score < 5}
        />
      )}
    </View>
  );
}
