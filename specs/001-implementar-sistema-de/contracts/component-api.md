# Component API Contracts

**Feature**: Form Validation System  
**Type**: Public Component APIs  
**Version**: 1.0.0  
**Date**: 2025-10-12

## Overview

This document defines the public API contracts for all exported components in the form validation feature. These contracts are stable and follow semantic versioning.

---

## ValidatedInput Component

**Purpose**: Base validated text input component with real-time error display

**Import Path**: `@/features/form-validation/components/ValidatedInput`

### Props

```typescript
interface ValidatedInputProps {
  // Required
  name: string;
  label: string;
  control: Control<any>;
  
  // Optional
  placeholder?: string;
  error?: string;
  accessibilityHint?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  styleConfig?: StyleConfig;
  textInputProps?: Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'>;
}
```

### Usage Example

```typescript
import { ValidatedInput } from '@/features/form-validation/components/ValidatedInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function LoginForm() {
  const { control, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <ValidatedInput
      name="email"
      label="Email"
      placeholder="seu@email.com"
      control={control}
      error={errors.email?.message}
      keyboardType="email-address"
      autoCapitalize="none"
      accessibilityHint="Digite seu endereço de email para login"
    />
  );
}
```

### Behavior

- **Validation Timing**: Validates on blur, re-validates on change after first error
- **Error Display**: Shows error message below input when `error` prop is provided
- **Accessibility**: Includes `accessibilityLabel`, `accessibilityHint`, `accessibilityState` for screen readers
- **Visual States**: Idle (default), Focus (blue), Valid (green), Invalid (red)

### Accessibility Features

- `accessibilityLabel`: "[label] input" (e.g., "Email input")
- `accessibilityHint`: Custom hint or default field description
- `accessibilityState`: `{ invalid: !!error }` 
- `accessibilityLiveRegion`: "polite" for error announcements
- Touch Target: Minimum 44x44pt (enforced via padding)

---

## ValidatedEmailInput Component

**Purpose**: Email-specific input with built-in email validation schema

**Import Path**: `@/features/form-validation/components/ValidatedEmailInput`

### Props

```typescript
interface ValidatedEmailInputProps extends Omit<ValidatedInputProps, 'keyboardType' | 'autoCapitalize'> {
  // Inherits all ValidatedInput props except keyboardType and autoCapitalize
  // (automatically set to 'email-address' and 'none')
}
```

### Usage Example

```typescript
import { ValidatedEmailInput } from '@/features/form-validation/components/ValidatedEmailInput';

function SignupForm() {
  const { control, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  return (
    <ValidatedEmailInput
      name="email"
      label="Email"
      placeholder="seu@email.com"
      control={control}
      error={errors.email?.message}
    />
  );
}
```

### Pre-configured Settings

- `keyboardType`: Always "email-address"
- `autoCapitalize`: Always "none"
- `accessibilityHint`: "Digite seu endereço de email" (overridable)

---

## ValidatedPasswordInput Component

**Purpose**: Password input with strength indicator and requirement checklist

**Import Path**: `@/features/form-validation/components/ValidatedPasswordInput`

### Props

```typescript
interface ValidatedPasswordInputProps extends Omit<ValidatedInputProps, 'secureTextEntry'> {
  // Password-specific
  showStrengthIndicator?: boolean;  // Default: true
  showRequirements?: boolean;       // Default: true
  showToggleVisibility?: boolean;   // Default: false (out of scope for v1)
}
```

### Usage Example

```typescript
import { ValidatedPasswordInput } from '@/features/form-validation/components/ValidatedPasswordInput';

function ChangePasswordForm() {
  const { control, formState: { errors }, watch } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const password = watch('password');

  return (
    <ValidatedPasswordInput
      name="password"
      label="Nova Senha"
      placeholder="Digite sua nova senha"
      control={control}
      error={errors.password?.message}
      showStrengthIndicator={true}
      showRequirements={true}
    />
  );
}
```

### Features

- **Strength Indicator**: Visual bar showing password strength (0-5)
- **Requirements Checklist**: Shows ✅/❌ for each requirement in real-time
- **Secure Entry**: Always enabled (masked input)
- **Accessibility**: Announces strength level and unmet requirements to screen readers

---

## ErrorMessage Component

**Purpose**: Reusable error message display with icon and accessibility

**Import Path**: `@/features/form-validation/components/ErrorMessage`

### Props

```typescript
interface ErrorMessageProps {
  message: string;
  showIcon?: boolean;           // Default: true
  icon?: React.ReactNode;
  style?: ViewStyle | TextStyle;
  accessibilityLabel?: string;  // Default: "Error: {message}"
}
```

### Usage Example

```typescript
import { ErrorMessage } from '@/features/form-validation/components/ErrorMessage';

function CustomField() {
  const [error, setError] = useState<string | null>(null);

  return (
    <View>
      <TextInput />
      {error && <ErrorMessage message={error} />}
    </View>
  );
}
```

### Visual Design

- **Icon**: Red exclamation circle (⚠️) by default
- **Text Color**: #D32F2F (4.5:1 contrast ratio)
- **Font Size**: 14px
- **Spacing**: 8px gap above input

### Accessibility

- Announced immediately when displayed via `accessibilityLiveRegion="assertive"`
- Accessible label: "Error: [message text]"

---

## PasswordStrengthIndicator Component

**Purpose**: Visual indicator of password strength with detailed feedback

**Import Path**: `@/features/form-validation/components/PasswordStrengthIndicator`

### Props

```typescript
interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  showRequirements?: boolean;   // Default: false
  showSuggestions?: boolean;    // Default: false
  colors?: {
    weak: string;     // Default: #D32F2F
    medium: string;   // Default: #FBC02D
    strong: string;   // Default: #4CAF50
  };
  style?: ViewStyle;
}
```

### Usage Example

```typescript
import { PasswordStrengthIndicator } from '@/features/form-validation/components/PasswordStrengthIndicator';
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';

function PasswordField() {
  const { strength } = usePasswordValidation();

  return (
    <View>
      <TextInput secureTextEntry />
      <PasswordStrengthIndicator 
        strength={strength}
        showRequirements={true}
        showSuggestions={true}
      />
    </View>
  );
}
```

### Visual Elements

1. **Strength Bar**: Animated progress bar showing strength level (0-100%)
2. **Strength Label**: Text label ("Muito fraca", "Média", "Forte", etc.)
3. **Requirements List** (if `showRequirements=true`):
   - ✅ Mínimo 6 caracteres
   - ❌ Letra maiúscula
   - ✅ Letra minúscula
   - ❌ Número
   - ❌ Símbolo
4. **Suggestions** (if `showSuggestions=true`):
   - "Adicione uma letra maiúscula"
   - "Adicione um número"

### Accessibility

- Strength level announced: "Força da senha: Média"
- Each requirement announced with status: "Mínimo 6 caracteres: atendido"

---

## Component Composition Example

**Real-world login form using all components:**

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ValidatedEmailInput } from '@/features/form-validation/components/ValidatedEmailInput';
import { ValidatedPasswordInput } from '@/features/form-validation/components/ValidatedPasswordInput';

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginData) => {
    console.log('Login data:', data);
    // API call here
  };

  return (
    <View style={{ padding: 20 }}>
      <ValidatedEmailInput
        name="email"
        label="Email"
        placeholder="seu@email.com"
        control={control}
        error={errors.email?.message}
      />

      <ValidatedPasswordInput
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        control={control}
        error={errors.password?.message}
        showStrengthIndicator={false}
        showRequirements={false}
      />

      <Button
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
        accessibilityState={{ disabled: !isValid }}
      />
    </View>
  );
}
```

---

## Styling Customization

All components accept a `styleConfig` prop for custom styling:

```typescript
const customStyle: StyleConfig = {
  colors: {
    valid: '#00C853',    // Custom green
    invalid: '#FF1744',  // Custom red
    focus: '#448AFF',    // Custom blue
  },
  border: {
    width: 3,
    radius: 12,
  },
  typography: {
    fontSize: 18,
    fontWeight: '600',
  },
};

<ValidatedEmailInput
  name="email"
  label="Email"
  control={control}
  styleConfig={customStyle}
/>
```

---

## Versioning & Breaking Changes

### Current Version: 1.0.0

**Semantic Versioning Promise**:
- **MAJOR** (2.0.0): Breaking API changes, prop removals, behavior changes
- **MINOR** (1.1.0): New props, new features, backward-compatible additions
- **PATCH** (1.0.1): Bug fixes, performance improvements, documentation

### Deprecation Policy

- Deprecated features will be marked with console warnings
- Deprecations remain for at least one MINOR version
- Migration guides provided in CHANGELOG.md

### Stable APIs (guaranteed until 2.0.0)

- All prop names and types listed above
- Component export paths
- Error message formats
- Accessibility attributes
- Validation timing behavior

---

## Testing Contract

All components guarantee:

1. **Accessibility**: Pass VoiceOver and TalkBack navigation
2. **Cross-platform**: Identical behavior on iOS and Android
3. **Performance**: No input lag, maintain 60 FPS
4. **Error Handling**: Graceful degradation if props are invalid
5. **TypeScript**: Full type safety with strict mode

---

## Summary

- **5 exportable components** with stable APIs
- **Full TypeScript support** with prop type inference
- **WCAG 2.1 AA compliant** with screen reader support
- **Customizable styling** via StyleConfig
- **Semantic versioning** with deprecation policy

Components are ready for implementation and consumption by other features.
