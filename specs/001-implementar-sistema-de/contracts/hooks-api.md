# Hooks API Contracts

**Feature**: Form Validation System  
**Type**: Public Hook APIs  
**Version**: 1.0.0  
**Date**: 2025-10-12

## Overview

This document defines the public API contracts for all exported custom hooks in the form validation feature. These hooks encapsulate validation logic and can be used independently or with the provided components.

---

## useFormValidation Hook

**Purpose**: Generic form validation setup with Zod schema integration

**Import Path**: `@/features/form-validation/hooks/useFormValidation`

### Signature

```typescript
function useFormValidation<T extends z.ZodType>(
  schema: T,
  options?: {
    mode?: 'onBlur' | 'onChange' | 'onSubmit';
    reValidateMode?: 'onBlur' | 'onChange' | 'onSubmit';
    defaultValues?: Partial<z.infer<T>>;
  }
): UseFormValidationReturn<T>
```

### Parameters

- **schema** (required): Zod schema defining validation rules
- **options** (optional):
  - `mode`: When to trigger first validation (default: `'onBlur'`)
  - `reValidateMode`: When to re-validate after first error (default: `'onChange'`)
  - `defaultValues`: Initial form values

### Return Type

```typescript
interface UseFormValidationReturn<T extends z.ZodType> {
  control: Control<z.infer<T>>;
  handleSubmit: (onValid: (data: z.infer<T>) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  formState: {
    errors: FieldErrors<z.infer<T>>;
    isValid: boolean;
    isSubmitting: boolean;
    isDirty: boolean;
  };
  reset: () => void;
  getFieldError: (fieldName: keyof z.infer<T>) => string | undefined;
}
```

### Usage Example

```typescript
import { useFormValidation } from '@/features/form-validation/hooks/useFormValidation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

function LoginForm() {
  const { control, handleSubmit, formState, getFieldError } = useFormValidation(loginSchema, {
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log('Valid data:', data);
    // API call
  };

  return (
    <View>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput {...field} />
        )}
      />
      <Text>{getFieldError('email')}</Text>
      
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

### Behavior

- Wraps react-hook-form's `useForm` with Zod resolver
- Validates on specified events (blur, change, submit)
- Provides helper method `getFieldError` for accessing error messages
- Returns debounced validation results (500ms for onChange mode)

---

## useEmailValidation Hook

**Purpose**: Email-specific validation with real-time feedback

**Import Path**: `@/features/form-validation/hooks/useEmailValidation`

### Signature

```typescript
function useEmailValidation(
  initialValue?: string
): UseEmailValidationReturn
```

### Parameters

- **initialValue** (optional): Initial email value for validation

### Return Type

```typescript
interface UseEmailValidationReturn {
  value: string;
  setValue: (email: string) => void;
  error: string | null;
  isValid: boolean;
  validate: (email: string) => ValidationResult;
  reset: () => void;
}
```

### Usage Example

```typescript
import { useEmailValidation } from '@/features/form-validation/hooks/useEmailValidation';

function EmailField() {
  const { value, setValue, error, isValid } = useEmailValidation();

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {isValid && <Text style={{ color: 'green' }}>✓ Email válido</Text>}
    </View>
  );
}
```

### Validation Rules

- **Required**: Email cannot be empty
- **Format**: Must match standard email pattern (name@domain.ext)
- **Max Length**: 254 characters (RFC 5321)
- **Normalization**: Automatically trims whitespace and converts to lowercase

### Behavior

- Validates in real-time as user types (debounced 500ms)
- Updates error state immediately when validation fails
- Clears error when user corrects the input

---

## usePasswordValidation Hook

**Purpose**: Password strength validation with detailed requirement tracking

**Import Path**: `@/features/form-validation/hooks/usePasswordValidation`

### Signature

```typescript
function usePasswordValidation(
  initialValue?: string
): UsePasswordValidationReturn
```

### Parameters

- **initialValue** (optional): Initial password value for validation

### Return Type

```typescript
interface UsePasswordValidationReturn {
  value: string;
  setValue: (password: string) => void;
  strength: PasswordStrength;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
  isValid: boolean;
  errors: string[];
  validate: (password: string) => void;
  reset: () => void;
}
```

### Usage Example

```typescript
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';

function PasswordField() {
  const { 
    value, 
    setValue, 
    strength, 
    requirements, 
    isValid,
    errors 
  } = usePasswordValidation();

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry
      />
      
      {/* Strength Indicator */}
      <View>
        <Text>Força: {strength.label}</Text>
        <View style={{ 
          width: `${strength.score * 20}%`, 
          backgroundColor: strength.score > 2 ? 'green' : 'red' 
        }} />
      </View>
      
      {/* Requirements Checklist */}
      <View>
        <Text>{requirements.minLength ? '✅' : '❌'} Mínimo 6 caracteres</Text>
        <Text>{requirements.hasUppercase ? '✅' : '❌'} Letra maiúscula</Text>
        <Text>{requirements.hasLowercase ? '✅' : '❌'} Letra minúscula</Text>
        <Text>{requirements.hasNumber ? '✅' : '❌'} Número</Text>
        <Text>{requirements.hasSymbol ? '✅' : '❌'} Símbolo</Text>
      </View>
      
      {/* Errors */}
      {errors.map(error => (
        <Text key={error} style={{ color: 'red' }}>{error}</Text>
      ))}
    </View>
  );
}
```

### Validation Rules

1. **Minimum Length**: At least 6 characters
2. **Uppercase**: At least one uppercase letter (A-Z)
3. **Lowercase**: At least one lowercase letter (a-z)
4. **Number**: At least one digit (0-9)
5. **Symbol**: At least one special character (!@#$%^&*(),.?":{}|<>)

### Strength Calculation

Password strength score (0-5) based on requirements met:

- **0 (Muito fraca)**: No requirements met
- **1 (Fraca)**: 1 requirement met
- **2 (Média)**: 2-3 requirements met
- **3 (Forte)**: 4 requirements met
- **4 (Muito forte)**: All 5 requirements met
- **5 (Excelente)**: All requirements + length ≥ 12 characters

### Behavior

- Validates in real-time as user types (debounced 500ms)
- Updates strength indicator immediately
- Shows individual requirement status (✅/❌)
- Provides suggestions for unmet requirements

---

## useFieldError Hook

**Purpose**: Extract and format error messages from react-hook-form errors object

**Import Path**: `@/features/form-validation/hooks/useFieldError`

### Signature

```typescript
function useFieldError(
  fieldName: string,
  errors: FieldErrors<any>
): string | undefined
```

### Parameters

- **fieldName** (required): Name of the form field
- **errors** (required): Errors object from react-hook-form

### Return Type

- **string | undefined**: Formatted error message or undefined if no error

### Usage Example

```typescript
import { useFieldError } from '@/features/form-validation/hooks/useFieldError';
import { useForm } from 'react-hook-form';

function FormWithErrors() {
  const { control, formState: { errors } } = useForm();
  const emailError = useFieldError('email', errors);
  const passwordError = useFieldError('password', errors);

  return (
    <View>
      <TextInput placeholder="Email" />
      {emailError && <Text>{emailError}</Text>}
      
      <TextInput placeholder="Password" secureTextEntry />
      {passwordError && <Text>{passwordError}</Text>}
    </View>
  );
}
```

### Behavior

- Handles nested field errors (e.g., `user.email`)
- Returns first error message if multiple errors exist
- Returns `undefined` if no error for that field
- Automatically formats Zod error messages

---

## useDebouncedValidation Hook

**Purpose**: Debounce validation to prevent excessive calls during typing

**Import Path**: `@/features/form-validation/hooks/useDebouncedValidation`

### Signature

```typescript
function useDebouncedValidation<T>(
  value: T,
  validator: (value: T) => ValidationResult,
  delay?: number
): ValidationResult | null
```

### Parameters

- **value** (required): Current value to validate
- **validator** (required): Validation function
- **delay** (optional): Debounce delay in ms (default: 500ms)

### Return Type

- **ValidationResult | null**: Validation result or null if still debouncing

### Usage Example

```typescript
import { useDebouncedValidation } from '@/features/form-validation/hooks/useDebouncedValidation';

function DebouncedEmailField() {
  const [email, setEmail] = useState('');
  
  const validateEmail = (value: string) => ({
    isValid: /\S+@\S+\.\S+/.test(value),
    errors: /\S+@\S+\.\S+/.test(value) ? [] : ['Email inválido'],
    ruleResults: {},
    validatedAt: Date.now(),
  });
  
  const validationResult = useDebouncedValidation(email, validateEmail, 500);

  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      {validationResult && !validationResult.isValid && (
        <Text>{validationResult.errors[0]}</Text>
      )}
    </View>
  );
}
```

### Behavior

- Delays validation until user stops typing for specified duration
- Returns `null` during debounce period (loading state)
- Immediately validates if value becomes empty
- Cancels pending validation if value changes

---

## Hook Composition Example

**Combining multiple hooks for a complete registration form:**

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useFormValidation } from '@/features/form-validation/hooks/useFormValidation';
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';
import { ValidatedEmailInput } from '@/features/form-validation/components/ValidatedEmailInput';
import { ValidatedPasswordInput } from '@/features/form-validation/components/ValidatedPasswordInput';

const registrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

export function RegistrationForm() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid },
    watch,
  } = useFormValidation(registrationSchema);

  const password = watch('password');
  const { strength, requirements } = usePasswordValidation(password);

  const onSubmit = (data) => {
    console.log('Registration data:', data);
    // API call
  };

  return (
    <View>
      <ValidatedEmailInput
        name="email"
        label="Email"
        control={control}
        error={errors.email?.message}
      />

      <ValidatedPasswordInput
        name="password"
        label="Senha"
        control={control}
        error={errors.password?.message}
        showStrengthIndicator={true}
        showRequirements={true}
      />

      <ValidatedInput
        name="confirmPassword"
        label="Confirmar Senha"
        control={control}
        error={errors.confirmPassword?.message}
        secureTextEntry
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid || strength.score < 3}
      />
    </View>
  );
}
```

---

## Performance Characteristics

All hooks guarantee:

- **Debouncing**: 500ms default delay for onChange validation
- **Memoization**: Validation functions memoized to prevent recreation
- **Minimal Re-renders**: Only update when validation state changes
- **No Memory Leaks**: Properly clean up timers and subscriptions

### Performance Benchmarks

- **Email Validation**: < 10ms average
- **Password Strength Calculation**: < 50ms average
- **Debounce Overhead**: < 5ms
- **Hook Re-render Cost**: < 1ms

---

## Versioning & Breaking Changes

### Current Version: 1.0.0

**Semantic Versioning Promise**:
- **MAJOR** (2.0.0): Breaking API changes, signature changes, behavior changes
- **MINOR** (1.1.0): New hooks, new return properties, backward-compatible additions
- **PATCH** (1.0.1): Bug fixes, performance improvements

### Deprecation Policy

- Deprecated hooks will log console warnings
- Deprecations remain for at least one MINOR version
- Migration guides provided in CHANGELOG.md

### Stable APIs (guaranteed until 2.0.0)

- All hook signatures and return types listed above
- Hook export paths
- Validation timing behavior
- Debounce defaults

---

## TypeScript Support

All hooks provide:

- Full type inference for generic parameters
- Strict mode compatibility
- IntelliSense support for all properties
- Type guards for discriminated unions
- Generic constraints for schema types

### Type Example

```typescript
import { z } from 'zod';
import { useFormValidation } from '@/features/form-validation/hooks/useFormValidation';

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

function Component() {
  const { control, handleSubmit } = useFormValidation(userSchema);
  
  // TypeScript knows the shape of the form data
  const onSubmit = (data) => {
    data.email // string
    data.age   // number
  };

  return <View />;
}
```

---

## Testing Hooks

All hooks can be tested independently using `@testing-library/react-hooks`:

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';

describe('usePasswordValidation', () => {
  it('should calculate password strength', () => {
    const { result } = renderHook(() => usePasswordValidation());
    
    act(() => {
      result.current.setValue('Abc123!');
    });
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.strength.score).toBe(4);
    expect(result.current.requirements).toEqual({
      minLength: true,
      hasUppercase: true,
      hasLowercase: true,
      hasNumber: true,
      hasSymbol: true,
    });
  });
});
```

---

## Summary

- **5 custom hooks** with stable APIs
- **Full TypeScript inference** for all return types
- **Performance optimized** with debouncing and memoization
- **Composable design** for complex form scenarios
- **Independently testable** with testing-library

Hooks are ready for implementation and can be used standalone or with provided components.
