/**
 * Password strength indicator component with visual feedback
 * @module form-validation/components/PasswordStrengthIndicator
 */

import React from 'react';
import { type ViewStyle } from 'react-native';
import styled from '@emotion/native';
import type { PasswordStrength } from '../types';
import { PASSWORD_STRENGTH_CONFIG } from '../constants/passwordStrength';

/**
 * Props for PasswordStrengthIndicator component
 */
export interface PasswordStrengthIndicatorProps {
  /** Password strength analysis */
  strength: PasswordStrength;
  /** Whether to show detailed requirements checklist (default: false) */
  showRequirements?: boolean;
  /** Whether to show improvement suggestions (default: false) */
  showSuggestions?: boolean;
  /** Custom colors for strength levels */
  colors?: {
    weak: string;
    medium: string;
    strong: string;
  };
  /** Custom styling */
  style?: ViewStyle;
}

/**
 * Styled container for the indicator
 */
const Container = styled.View`
  margin-top: 12px;
`;

/**
 * Styled strength bar background
 */
const StrengthBarBackground = styled.View`
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

/**
 * Styled strength bar fill with dynamic color
 */
const StrengthBarFill = styled.View<{ $width: number; $color: string }>`
  height: 100%;
  width: ${(props) => props.$width}%;
  background-color: ${(props) => props.$color};
  border-radius: 4px;
`;

/**
 * Styled label text
 */
const StrengthLabel = styled.Text<{ $color: string }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.$color};
  margin-top: 8px;
`;

/**
 * Styled requirements list
 */
const RequirementsList = styled.View`
  margin-top: 12px;
`;

/**
 * Styled requirement item
 */
const RequirementItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

/**
 * Styled requirement text
 */
const RequirementText = styled.Text<{ $met: boolean }>`
  font-size: 14px;
  color: ${(props) => (props.$met ? '#4caf50' : '#757575')};
  margin-left: 8px;
`;

/**
 * Styled icon text (checkmark or cross)
 */
const IconText = styled.Text`
  font-size: 16px;
`;

/**
 * Styled suggestions list
 */
const SuggestionsList = styled.View`
  margin-top: 12px;
`;

/**
 * Styled suggestion text
 */
const SuggestionText = styled.Text`
  font-size: 13px;
  color: #f57c00;
  margin-bottom: 4px;
`;

/**
 * Password strength indicator with visual feedback
 *
 * Displays password strength as a colored progress bar with label.
 * Optionally shows detailed requirements checklist and improvement suggestions.
 *
 * @param {PasswordStrengthIndicatorProps} props - Component props
 * @returns {React.ReactElement} Password strength indicator
 *
 * @example
 * const { strength } = usePasswordValidation();
 *
 * <PasswordStrengthIndicator
 *   strength={strength}
 *   showRequirements={true}
 *   showSuggestions={true}
 * />
 */
export function PasswordStrengthIndicator({
  strength,
  showRequirements = false,
  showSuggestions = false,
  colors,
  style,
}: PasswordStrengthIndicatorProps): React.ReactElement {
  // Calculate bar width (0-100%)
  const barWidth = (strength.score / 5) * 100;

  // Get color from config
  const barColor = PASSWORD_STRENGTH_CONFIG[strength.score].color;

  return (
    <Container style={style} accessibilityLabel={`Força da senha: ${strength.label}`}>
      {/* Strength Bar */}
      <StrengthBarBackground>
        <StrengthBarFill $width={barWidth} $color={barColor} />
      </StrengthBarBackground>

      {/* Strength Label */}
      <StrengthLabel $color={barColor}>Força: {strength.label}</StrengthLabel>

      {/* Requirements Checklist */}
      {showRequirements && (
        <RequirementsList>
          <RequirementItem>
            <IconText>{strength.requirements.minLength ? '✅' : '❌'}</IconText>
            <RequirementText
              $met={strength.requirements.minLength}
              accessibilityLabel={`Mínimo 6 caracteres: ${strength.requirements.minLength ? 'atendido' : 'não atendido'}`}>
              Mínimo 6 caracteres
            </RequirementText>
          </RequirementItem>

          <RequirementItem>
            <IconText>{strength.requirements.hasUppercase ? '✅' : '❌'}</IconText>
            <RequirementText
              $met={strength.requirements.hasUppercase}
              accessibilityLabel={`Letra maiúscula: ${strength.requirements.hasUppercase ? 'atendido' : 'não atendido'}`}>
              Letra maiúscula
            </RequirementText>
          </RequirementItem>

          <RequirementItem>
            <IconText>{strength.requirements.hasLowercase ? '✅' : '❌'}</IconText>
            <RequirementText
              $met={strength.requirements.hasLowercase}
              accessibilityLabel={`Letra minúscula: ${strength.requirements.hasLowercase ? 'atendido' : 'não atendido'}`}>
              Letra minúscula
            </RequirementText>
          </RequirementItem>

          <RequirementItem>
            <IconText>{strength.requirements.hasNumber ? '✅' : '❌'}</IconText>
            <RequirementText
              $met={strength.requirements.hasNumber}
              accessibilityLabel={`Número: ${strength.requirements.hasNumber ? 'atendido' : 'não atendido'}`}>
              Número
            </RequirementText>
          </RequirementItem>

          <RequirementItem>
            <IconText>{strength.requirements.hasSymbol ? '✅' : '❌'}</IconText>
            <RequirementText
              $met={strength.requirements.hasSymbol}
              accessibilityLabel={`Símbolo: ${strength.requirements.hasSymbol ? 'atendido' : 'não atendido'}`}>
              Símbolo
            </RequirementText>
          </RequirementItem>
        </RequirementsList>
      )}

      {/* Suggestions */}
      {showSuggestions && strength.suggestions.length > 0 && (
        <SuggestionsList>
          {strength.suggestions.map((suggestion, index) => (
            <SuggestionText key={index}>• {suggestion}</SuggestionText>
          ))}
        </SuggestionsList>
      )}
    </Container>
  );
}
