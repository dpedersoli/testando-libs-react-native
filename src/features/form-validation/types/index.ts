/**
 * Type definitions for form validation system
 * @module form-validation/types
 */

import type { z } from 'zod';
import type { ViewStyle } from 'react-native';

/**
 * Validation state for a form field
 *
 * @typedef {('idle'|'validating'|'valid'|'invalid')} ValidationState
 *
 * - `idle`: Field has not been interacted with yet
 * - `validating`: Validation is in progress (debounced)
 * - `valid`: Field passed all validation rules
 * - `invalid`: Field failed one or more validation rules
 */
export type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid';

/**
 * A single validation rule with error message
 *
 * @interface ValidationRule
 * @property {string} id - Unique identifier for this rule (e.g., 'minLength', 'hasUppercase')
 * @property {string} message - Human-readable error message in Portuguese
 * @property {Function} validate - Validation function that returns true if valid
 * @property {number} [priority] - Optional order for displaying multiple errors
 *
 * @example
 * const minLengthRule: ValidationRule = {
 *   id: 'minLength',
 *   message: 'Mínimo 6 caracteres obrigatório',
 *   validate: (value) => value.length >= 6,
 *   priority: 1,
 * };
 */
export interface ValidationRule {
  id: string;
  message: string;
  validate: (value: string) => boolean;
  priority?: number;
}

/**
 * Result of validation check
 *
 * @interface ValidationResult
 * @property {boolean} isValid - Whether all validation rules passed
 * @property {string[]} errors - Array of error messages for failed rules
 * @property {Record<string, boolean>} ruleResults - Map of rule ID to pass/fail status
 * @property {number} validatedAt - Timestamp of validation (for debouncing)
 *
 * @example
 * const result: ValidationResult = {
 *   isValid: false,
 *   errors: ['Deve incluir letra maiúscula', 'Deve incluir número'],
 *   ruleResults: {
 *     minLength: true,
 *     hasUppercase: false,
 *     hasLowercase: true,
 *     hasNumber: false,
 *     hasSymbol: true,
 *   },
 *   validatedAt: Date.now(),
 * };
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  ruleResults: Record<string, boolean>;
  validatedAt: number;
}

/**
 * Configuration for a validated form field
 *
 * @interface FieldConfig
 * @property {string} name - Field name (must match form schema key)
 * @property {string} label - Label text for the field
 * @property {string} [placeholder] - Placeholder text
 * @property {z.ZodType} schema - Zod schema for this field
 * @property {('onBlur'|'onChange'|'onSubmit')} [mode] - Validation mode
 * @property {number} [debounceMs] - Debounce delay in ms for onChange validation
 * @property {string} [accessibilityHint] - Accessibility hint describing validation requirements
 * @property {boolean} [required] - Whether field is required
 * @property {Partial<Record<string, string>>} [errorMessages] - Custom error messages override
 *
 * @example
 * const emailFieldConfig: FieldConfig = {
 *   name: 'email',
 *   label: 'Email',
 *   placeholder: 'seu@email.com',
 *   schema: emailSchema,
 *   mode: 'onBlur',
 *   debounceMs: 500,
 *   accessibilityHint: 'Digite seu endereço de email',
 *   required: true,
 * };
 */
export interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  schema: z.ZodType<any>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  debounceMs?: number;
  accessibilityHint?: string;
  required?: boolean;
  errorMessages?: Partial<Record<string, string>>;
}

/**
 * Password strength analysis result
 *
 * @interface PasswordStrength
 * @property {(0|1|2|3|4|5)} score - Overall strength score: 0 (weak) to 5 (strong)
 * @property {('Muito fraca'|'Fraca'|'Média'|'Forte'|'Muito forte')} label - Strength label for display
 * @property {Object} requirements - Individual requirement checks
 * @property {boolean} requirements.minLength - Minimum length requirement met
 * @property {boolean} requirements.hasUppercase - Uppercase letter requirement met
 * @property {boolean} requirements.hasLowercase - Lowercase letter requirement met
 * @property {boolean} requirements.hasNumber - Number requirement met
 * @property {boolean} requirements.hasSymbol - Symbol requirement met
 * @property {string[]} missingRequirements - Array of unmet requirements with messages
 * @property {string[]} suggestions - Suggested improvements
 *
 * @example
 * const strength: PasswordStrength = {
 *   score: 3,
 *   label: 'Média',
 *   requirements: {
 *     minLength: true,
 *     hasUppercase: true,
 *     hasLowercase: true,
 *     hasNumber: false,
 *     hasSymbol: false,
 *   },
 *   missingRequirements: ['Deve incluir número', 'Deve incluir símbolo'],
 *   suggestions: ['Adicione um número', 'Adicione um símbolo como !@#$'],
 * };
 */
export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4 | 5;
  label: 'Muito fraca' | 'Fraca' | 'Média' | 'Forte' | 'Muito forte' | 'Excelente';
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
  missingRequirements: string[];
  suggestions: string[];
}

/**
 * Styling configuration for validation states
 *
 * @interface StyleConfig
 * @property {Object} [colors] - Colors for different validation states
 * @property {Object} [border] - Border styles
 * @property {Object} [typography] - Typography settings
 * @property {Object} [spacing] - Spacing settings
 * @property {Object} [errorStyle] - Error message styling
 *
 * @example
 * const customStyle: StyleConfig = {
 *   colors: {
 *     valid: '#00C853',
 *     invalid: '#FF1744',
 *   },
 *   border: {
 *     width: 3,
 *     radius: 12,
 *   },
 * };
 */
export interface StyleConfig {
  colors?: {
    idle?: string;
    valid?: string;
    invalid?: string;
    focus?: string;
  };
  border?: {
    width?: number;
    radius?: number;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  typography?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
  };
  spacing?: {
    padding?: number;
    marginBottom?: number;
    errorGap?: number;
  };
  errorStyle?: ViewStyle;
}
