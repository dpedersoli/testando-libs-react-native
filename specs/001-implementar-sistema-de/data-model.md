# Data Model: Form Validation System

**Feature**: Form Validation System  
**Phase**: Phase 1 - Data & Type Definitions  
**Date**: 2025-10-12

## Overview

This document defines the TypeScript types, interfaces, and data structures for the form validation system. All types follow strict TypeScript conventions and support full type inference.

---

## Core Type Definitions

### ValidationState

Represents the current validation state of a form field.

```typescript
/**
 * Validation state for a form field
 */
export type ValidationState = 'idle' | 'validating' | 'valid' | 'invalid';
```

**States**:
- `idle`: Field has not been interacted with yet
- `validating`: Validation is in progress (debounced)
- `valid`: Field passed all validation rules
- `invalid`: Field failed one or more validation rules

---

### ValidationRule

Defines a single validation constraint for a field.

```typescript
/**
 * A single validation rule with error message
 */
export interface ValidationRule {
  /** Unique identifier for this rule (e.g., 'minLength', 'hasUppercase') */
  id: string;
  
  /** Human-readable error message in Portuguese */
  message: string;
  
  /** Validation function that returns true if valid */
  validate: (value: string) => boolean;
  
  /** Optional: Order for displaying multiple errors */
  priority?: number;
}
```

**Example**:
```typescript
const minLengthRule: ValidationRule = {
  id: 'minLength',
  message: 'Mínimo 6 caracteres obrigatório',
  validate: (value) => value.length >= 6,
  priority: 1,
};
```

---

### ValidationResult

Outcome of validating a field against all rules.

```typescript
/**
 * Result of validation check
 */
export interface ValidationResult {
  /** Whether all validation rules passed */
  isValid: boolean;
  
  /** Array of error messages for failed rules */
  errors: string[];
  
  /** Map of rule ID to pass/fail status */
  ruleResults: Record<string, boolean>;
  
  /** Timestamp of validation (for debouncing) */
  validatedAt: number;
}
```

**Example**:
```typescript
const result: ValidationResult = {
  isValid: false,
  errors: ['Deve incluir letra maiúscula', 'Deve incluir número'],
  ruleResults: {
    minLength: true,
    hasUppercase: false,
    hasLowercase: true,
    hasNumber: false,
    hasSymbol: true,
  },
  validatedAt: Date.now(),
};
```

---

### FieldConfig

Configuration for a validated form field.

```typescript
/**
 * Configuration for a validated form field
 */
export interface FieldConfig {
  /** Field name (must match form schema key) */
  name: string;
  
  /** Label text for the field */
  label: string;
  
  /** Placeholder text */
  placeholder?: string;
  
  /** Zod schema for this field */
  schema: z.ZodType<any>;
  
  /** Validation mode: 'onBlur' | 'onChange' | 'onSubmit' */
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  
  /** Debounce delay in ms for onChange validation */
  debounceMs?: number;
  
  /** Accessibility hint describing validation requirements */
  accessibilityHint?: string;
  
  /** Whether field is required */
  required?: boolean;
  
  /** Custom error messages override */
  errorMessages?: Partial<Record<string, string>>;
}
```

**Example**:
```typescript
const emailFieldConfig: FieldConfig = {
  name: 'email',
  label: 'Email',
  placeholder: 'seu@email.com',
  schema: emailSchema,
  mode: 'onBlur',
  debounceMs: 500,
  accessibilityHint: 'Digite seu endereço de email',
  required: true,
};
```

---

### PasswordStrength

Represents password strength with detailed feedback.

```typescript
/**
 * Password strength analysis result
 */
export interface PasswordStrength {
  /** Overall strength score: 0 (weak) to 5 (strong) */
  score: 0 | 1 | 2 | 3 | 4 | 5;
  
  /** Strength label for display */
  label: 'Muito fraca' | 'Fraca' | 'Média' | 'Forte' | 'Muito forte';
  
  /** Individual requirement checks */
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
  
  /** Array of unmet requirements with messages */
  missingRequirements: string[];
  
  /** Suggested improvements */
  suggestions: string[];
}
```

**Example**:
```typescript
const strength: PasswordStrength = {
  score: 3,
  label: 'Média',
  requirements: {
    minLength: true,
    hasUppercase: true,
    hasLowercase: true,
    hasNumber: false,
    hasSymbol: false,
  },
  missingRequirements: ['Deve incluir número', 'Deve incluir símbolo'],
  suggestions: ['Adicione um número', 'Adicione um símbolo como !@#$'],
};
```

---

### StyleConfig

Configuration for customizable validation styling.

```typescript
/**
 * Styling configuration for validation states
 */
export interface StyleConfig {
  /** Colors for different validation states */
  colors?: {
    idle?: string;
    valid?: string;
    invalid?: string;
    focus?: string;
  };
  
  /** Border styles */
  border?: {
    width?: number;
    radius?: number;
    style?: 'solid' | 'dashed' | 'dotted';
  };
  
  /** Typography */
  typography?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  };
  
  /** Spacing */
  spacing?: {
    padding?: number;
    marginBottom?: number;
    errorGap?: number;
  };
  
  /** Error message styling */
  errorStyle?: {
    fontSize?: number;
    color?: string;
    iconSize?: number;
  };
}
```

**Default Values**:
```typescript
const defaultStyleConfig: StyleConfig = {
  colors: {
    idle: '#757575',
    valid: '#4CAF50',
    invalid: '#D32F2F',
    focus: '#2196F3',
  },
  border: {
    width: 2,
    radius: 8,
    style: 'solid',
  },
  typography: {
    fontSize: 16,
    fontWeight: '400',
  },
  spacing: {
    padding: 12,
    marginBottom: 16,
    errorGap: 8,
  },
  errorStyle: {
    fontSize: 14,
    color: '#D32F2F',
    iconSize: 16,
  },
};
```

---

## Zod Schema Definitions

### Email Schema

```typescript
import { z } from 'zod';

export const emailSchema = z
  .string({
    required_error: 'Email é obrigatório',
    invalid_type_error: 'Email deve ser texto',
  })
  .min(1, { message: 'Email é obrigatório' })
  .max(254, { message: 'Email muito longo (máximo 254 caracteres)' })
  .email({ message: 'Por favor, insira um email válido' })
  .trim()
  .toLowerCase()
  .refine(
    (email) => {
      const parts = email.split('@');
      return parts.length === 2 && parts[1].includes('.');
    },
    { message: 'Por favor, insira um email válido' }
  );

export type Email = z.infer<typeof emailSchema>;
```

---

### Password Schema

```typescript
import { z } from 'zod';

export const passwordSchema = z
  .string({
    required_error: 'Senha é obrigatória',
    invalid_type_error: 'Senha deve ser texto',
  })
  .min(6, { message: 'Mínimo 6 caracteres obrigatório' })
  .refine(
    (pwd) => /[A-Z]/.test(pwd),
    { message: 'Deve incluir letra maiúscula' }
  )
  .refine(
    (pwd) => /[a-z]/.test(pwd),
    { message: 'Deve incluir letra minúscula' }
  )
  .refine(
    (pwd) => /[0-9]/.test(pwd),
    { message: 'Deve incluir número' }
  )
  .refine(
    (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    { message: 'Deve incluir símbolo (!@#$%^&* etc)' }
  );

export type Password = z.infer<typeof passwordSchema>;
```

---

### Combined Form Schema Example

```typescript
import { z } from 'zod';

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

// Usage with react-hook-form
const { control, handleSubmit } = useForm<LoginFormData>({
  resolver: zodResolver(loginFormSchema),
});
```

---

## Hook Return Types

### useFormValidation Return Type

```typescript
/**
 * Return type for useFormValidation hook
 */
export interface UseFormValidationReturn<T extends z.ZodType> {
  /** React Hook Form control object */
  control: Control<z.infer<T>>;
  
  /** Form submission handler */
  handleSubmit: (onValid: (data: z.infer<T>) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  
  /** Form state and errors */
  formState: {
    errors: FieldErrors<z.infer<T>>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
  };
  
  /** Reset form to initial state */
  reset: () => void;
  
  /** Get field error message */
  getFieldError: (fieldName: keyof z.infer<T>) => string | undefined;
}
```

---

### usePasswordValidation Return Type

```typescript
/**
 * Return type for usePasswordValidation hook
 */
export interface UsePasswordValidationReturn {
  /** Current password strength analysis */
  strength: PasswordStrength;
  
  /** Individual requirement statuses */
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
  
  /** Whether password meets all requirements */
  isValid: boolean;
  
  /** Validation function */
  validate: (password: string) => void;
}
```

---

## Component Props Types

### ValidatedInput Props

```typescript
/**
 * Props for ValidatedInput component
 */
export interface ValidatedInputProps {
  /** Field name (must match schema) */
  name: string;
  
  /** Input label */
  label: string;
  
  /** Input placeholder */
  placeholder?: string;
  
  /** React Hook Form control */
  control: Control<any>;
  
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
```

---

### ErrorMessage Props

```typescript
/**
 * Props for ErrorMessage component
 */
export interface ErrorMessageProps {
  /** Error message text */
  message: string;
  
  /** Whether to show error icon */
  showIcon?: boolean;
  
  /** Custom icon component */
  icon?: React.ReactNode;
  
  /** Custom styling */
  style?: ViewStyle | TextStyle;
  
  /** Accessibility label override */
  accessibilityLabel?: string;
}
```

---

### PasswordStrengthIndicator Props

```typescript
/**
 * Props for PasswordStrengthIndicator component
 */
export interface PasswordStrengthIndicatorProps {
  /** Password strength analysis */
  strength: PasswordStrength;
  
  /** Whether to show detailed requirements */
  showRequirements?: boolean;
  
  /** Whether to show suggestions */
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
```

---

## Constants & Enums

### Validation Error Messages

```typescript
/**
 * Standard error messages in Portuguese
 */
export const ERROR_MESSAGES = {
  // Email
  EMAIL_REQUIRED: 'Email é obrigatório',
  EMAIL_INVALID: 'Por favor, insira um email válido',
  EMAIL_TOO_LONG: 'Email muito longo (máximo 254 caracteres)',
  
  // Password
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  PASSWORD_TOO_SHORT: 'Mínimo 6 caracteres obrigatório',
  PASSWORD_NO_UPPERCASE: 'Deve incluir letra maiúscula',
  PASSWORD_NO_LOWERCASE: 'Deve incluir letra minúscula',
  PASSWORD_NO_NUMBER: 'Deve incluir número',
  PASSWORD_NO_SYMBOL: 'Deve incluir símbolo (!@#$%^&* etc)',
  
  // Generic
  FIELD_REQUIRED: 'Campo obrigatório',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
```

---

### Password Strength Labels

```typescript
/**
 * Password strength labels with color associations
 */
export const PASSWORD_STRENGTH_CONFIG = {
  0: { label: 'Muito fraca', color: '#D32F2F' },
  1: { label: 'Fraca', color: '#F57C00' },
  2: { label: 'Média', color: '#FBC02D' },
  3: { label: 'Forte', color: '#7CB342' },
  4: { label: 'Muito forte', color: '#388E3C' },
  5: { label: 'Excelente', color: '#1B5E20' },
} as const;
```

---

## State Transitions

### Field Validation State Machine

```
                   ┌──────────────┐
                   │     idle     │  (Initial state)
                   └──────┬───────┘
                          │ onBlur / onChange
                          ▼
                   ┌──────────────┐
                   │  validating  │  (Debouncing / checking)
                   └──────┬───────┘
                          │ validation complete
                    ┌─────┴──────┐
                    │            │
                    ▼            ▼
            ┌──────────┐    ┌─────────┐
            │  valid   │    │ invalid │
            └────┬─────┘    └────┬────┘
                 │               │
                 └───────┬───────┘
                         │ user types again
                         ▼
                  ┌──────────────┐
                  │  validating  │  (Re-validation)
                  └──────────────┘
```

**Transitions**:
1. `idle` → `validating`: User interacts with field (blur or types)
2. `validating` → `valid`: All validation rules pass
3. `validating` → `invalid`: One or more validation rules fail
4. `valid` → `validating`: User modifies valid field
5. `invalid` → `validating`: User corrects invalid field

---

## Type Exports

All types are exported from a central `types/index.ts` file for easy imports:

```typescript
export type {
  ValidationState,
  ValidationRule,
  ValidationResult,
  FieldConfig,
  PasswordStrength,
  StyleConfig,
  UseFormValidationReturn,
  UsePasswordValidationReturn,
  ValidatedInputProps,
  ErrorMessageProps,
  PasswordStrengthIndicatorProps,
  ErrorMessageKey,
  Email,
  Password,
  LoginFormData,
};

export {
  emailSchema,
  passwordSchema,
  loginFormSchema,
  ERROR_MESSAGES,
  PASSWORD_STRENGTH_CONFIG,
};
```

---

## Summary

- **9 TypeScript interfaces** defined for type safety
- **3 Zod schemas** for email, password, and combined forms
- **2 hook return types** for custom validation hooks
- **3 component props types** for reusable components
- **2 constant dictionaries** for error messages and strength labels
- **1 state machine** documenting validation state transitions

All types support full TypeScript inference and strict mode compliance. Ready for implementation in Phase 2.
