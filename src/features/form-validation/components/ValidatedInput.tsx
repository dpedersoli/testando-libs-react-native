/**
 * Base validated input component with react-hook-form integration
 * @module form-validation/components/ValidatedInput
 */

import React, { useMemo } from 'react';
import { type TextInputProps } from 'react-native';
import { Controller, type Control } from 'react-hook-form';
import styled from '@emotion/native';
import { ErrorMessage } from './ErrorMessage';
import type { StyleConfig } from '../types';
import { mergeStyleConfig } from '../utils/styleHelpers';

/**
 * Props for ValidatedInput component
 */
export interface ValidatedInputProps {
  /** Field name (must match schema) */
  name: string;
  /** Input label */
  label: string;
  /** React Hook Form control */
  control: Control<any>;
  /** Input placeholder */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  /** Secure text entry (password) */
  secureTextEntry?: boolean;
  /** Auto-capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Custom style configuration */
  styleConfig?: StyleConfig;
  /** Additional TextInput props */
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'>;
}

/**
 * Styled label text
 */
const Label = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

/**
 * Styled text input with dynamic border color based on validation state
 */
const StyledTextInput = styled.TextInput<{ $error?: boolean; $valid?: boolean }>`
  border-width: 2px;
  border-color: ${(props) => (props.$error ? '#D32F2F' : props.$valid ? '#4CAF50' : '#757575')};
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  min-height: 48px;
  background-color: #fff;
`;

/**
 * Container for the input field
 */
const InputContainer = styled.View`
  margin-bottom: 16px;
`;

/**
 * Base validated input component with react-hook-form integration
 *
 * Wraps TextInput with react-hook-form Controller for validation and state management.
 * Provides visual feedback for validation states (idle, valid, invalid) with
 * WCAG 2.1 AA compliant colors and accessibility attributes.
 *
 * @param {ValidatedInputProps} props - Component props
 * @returns {React.ReactElement} Validated input component
 *
 * @example
 * const { control, formState: { errors } } = useForm({
 *   resolver: zodResolver(schema),
 * });
 *
 * <ValidatedInput
 *   name="email"
 *   label="Email"
 *   control={control}
 *   error={errors.email?.message}
 *   keyboardType="email-address"
 * />
 */
export function ValidatedInput({
  name,
  label,
  control,
  placeholder,
  error,
  accessibilityHint,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  styleConfig,
  textInputProps,
}: ValidatedInputProps): React.ReactElement {
  const styles = useMemo(() => mergeStyleConfig(styleConfig), [styleConfig]);

  return (
    <InputContainer>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextInput
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            $error={!!error}
            $valid={!error && value?.length > 0}
            accessibilityLabel={`${label} input`}
            accessibilityHint={accessibilityHint || `Digite ${label.toLowerCase()}`}
            accessibilityState={{ disabled: false }}
            {...textInputProps}
          />
        )}
      />
      {error && <ErrorMessage message={error} style={styles.errorStyle} />}
    </InputContainer>
  );
}
