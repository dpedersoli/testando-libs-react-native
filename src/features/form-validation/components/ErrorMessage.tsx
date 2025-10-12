/**
 * Error message component with accessibility support
 * @module form-validation/components/ErrorMessage
 */

import React from 'react';
import { type ViewStyle } from 'react-native';
import styled from '@emotion/native';

/**
 * Props for ErrorMessage component
 */
export interface ErrorMessageProps {
  /** Error message text to display */
  message: string;
  /** Whether to show error icon (default: true) */
  showIcon?: boolean;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Custom styling */
  style?: ViewStyle;
  /** Accessibility label override (default: "Error: {message}") */
  accessibilityLabel?: string;
}

/**
 * Styled container for error message
 */
const ErrorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

/**
 * Styled error text with WCAG compliant color
 * Color #D32F2F has 4.5:1 contrast ratio against white background
 */
const ErrorText = styled.Text`
  color: #d32f2f;
  font-size: 14px;
  flex: 1;
`;

/**
 * Styled icon container
 */
const IconContainer = styled.View`
  margin-right: 6px;
`;

/**
 * Default error icon (warning symbol)
 */
const DefaultIcon = styled.Text`
  color: #d32f2f;
  font-size: 16px;
`;

/**
 * Error message component with icon and accessibility
 *
 * Displays validation error messages with proper accessibility attributes
 * for screen readers. Color meets WCAG 2.1 AA contrast requirements (4.5:1).
 *
 * @param {ErrorMessageProps} props - Component props
 * @returns {React.ReactElement} Error message component
 *
 * @example
 * <ErrorMessage message="Email é obrigatório" />
 *
 * @example
 * // Custom styling
 * <ErrorMessage
 *   message="Senha inválida"
 *   showIcon={false}
 *   style={{ marginTop: 12 }}
 * />
 */
export function ErrorMessage({
  message,
  showIcon = true,
  icon,
  style,
  accessibilityLabel,
}: ErrorMessageProps): React.ReactElement {
  return (
    <ErrorContainer
      style={style}
      accessibilityLabel={accessibilityLabel || `Erro: ${message}`}
      accessibilityLiveRegion="assertive"
      accessibilityRole="alert">
      {showIcon && <IconContainer>{icon || <DefaultIcon>⚠️</DefaultIcon>}</IconContainer>}
      <ErrorText>{message}</ErrorText>
    </ErrorContainer>
  );
}
