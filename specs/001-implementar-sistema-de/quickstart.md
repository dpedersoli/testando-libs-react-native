# Quickstart Guide: Form Validation System

**Feature**: Form Validation System  
**Version**: 1.0.0  
**Date**: 2025-10-12

## Overview

This guide helps developers quickly integrate the form validation system into their React Native app. Follow these steps to add validated email and password inputs to your forms.

---

## Prerequisites

Ensure your project has these dependencies (already in testando-libs):

```json
{
  "react": "^19.0.0",
  "react-native": "^0.79.5",
  "expo": "~53.0.20",
  "zod": "^4.1.5",
  "react-hook-form": "^7.62.0",
  "@hookform/resolvers": "^5.2.1",
  "@emotion/native": "^11.11.0"
}
```

---

## 5-Minute Quick Start

### Step 1: Create a Form Schema

Define your form validation rules with Zod:

```typescript
// app/schemas/loginSchema.ts
import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Por favor, insira um email válido')
  .trim()
  .toLowerCase();

export const passwordSchema = z
  .string()
  .min(6, 'Mínimo 6 caracteres obrigatório')
  .refine((pwd) => /[A-Z]/.test(pwd), 'Deve incluir letra maiúscula')
  .refine((pwd) => /[a-z]/.test(pwd), 'Deve incluir letra minúscula')
  .refine((pwd) => /[0-9]/.test(pwd), 'Deve incluir número')
  .refine((pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), 'Deve incluir símbolo');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
```

### Step 2: Use Validated Components

```typescript
// app/(tabs)/login.tsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidatedEmailInput } from '@/features/form-validation/components/ValidatedEmailInput';
import { ValidatedPasswordInput } from '@/features/form-validation/components/ValidatedPasswordInput';
import { loginFormSchema, LoginFormData } from '@/schemas/loginSchema';

export default function LoginScreen() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login with:', data);
    // Call your authentication API here
  };

  return (
    <View style={styles.container}>
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
      />

      <Button
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});
```

### Step 3: Test Your Form

1. **Run the app**:
   ```bash
   npm start
   npm run android  # or npm run ios
   ```

2. **Test validation**:
   - Type "invalid-email" → See error message
   - Type "test@example.com" → Error clears
   - Type "abc" in password → See requirement errors
   - Type "Abc123!" → All requirements met ✅

3. **Test accessibility**:
   - Enable VoiceOver (iOS) or TalkBack (Android)
   - Navigate through form fields
   - Verify error messages are announced

---

## Common Use Cases

### Use Case 1: Registration Form with Password Strength

```typescript
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

export default function RegistrationScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

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

      <ValidatedPasswordInput
        name="confirmPassword"
        label="Confirmar Senha"
        control={control}
        error={errors.confirmPassword?.message}
        showStrengthIndicator={false}
      />

      <Button title="Cadastrar" onPress={handleSubmit(onRegister)} />
    </View>
  );
}
```

### Use Case 2: Custom Styling

```typescript
const customStyle: StyleConfig = {
  colors: {
    valid: '#00C853',
    invalid: '#FF1744',
    focus: '#448AFF',
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

### Use Case 3: Using Hooks Directly

```typescript
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';

function CustomPasswordField() {
  const { value, setValue, strength, requirements, isValid } = usePasswordValidation();

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        secureTextEntry
        placeholder="Digite sua senha"
      />
      
      <Text>Força: {strength.label}</Text>
      <Text>{requirements.minLength ? '✅' : '❌'} Mínimo 6 caracteres</Text>
      <Text>{requirements.hasUppercase ? '✅' : '❌'} Letra maiúscula</Text>
      <Text>{requirements.hasLowercase ? '✅' : '❌'} Letra minúscula</Text>
      <Text>{requirements.hasNumber ? '✅' : '❌'} Número</Text>
      <Text>{requirements.hasSymbol ? '✅' : '❌'} Símbolo</Text>
    </View>
  );
}
```

---

## Validation Modes

### Mode: onBlur (Recommended)

Validates when user leaves the field:

```typescript
useForm({
  mode: 'onBlur',
  reValidateMode: 'onChange',
});
```

**Best for**: Login forms, less aggressive validation

### Mode: onChange

Validates as user types (debounced):

```typescript
useForm({
  mode: 'onChange',
});
```

**Best for**: Registration forms, immediate feedback

### Mode: onSubmit

Validates only when form is submitted:

```typescript
useForm({
  mode: 'onSubmit',
});
```

**Best for**: Simple forms, minimal interruption

---

## Accessibility Checklist

Before shipping, verify:

- [ ] All inputs have `accessibilityLabel`
- [ ] Touch targets are at least 44x44pt
- [ ] Error messages have 4.5:1 contrast ratio
- [ ] Form works with VoiceOver (iOS)
- [ ] Form works with TalkBack (Android)
- [ ] Error messages are announced immediately
- [ ] Submit button disabled state is announced

---

## Troubleshooting

### Error: "Invalid hook call"

**Problem**: Using hooks outside of React component

**Solution**: Ensure hooks are called inside functional components:

```typescript
// ❌ Wrong
const { control } = useForm();

function MyComponent() {
  return <View />;
}

// ✅ Correct
function MyComponent() {
  const { control } = useForm();
  return <View />;
}
```

### Error: "Cannot find module '@/features/form-validation'"

**Problem**: Path alias not configured

**Solution**: Check `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Validation not working

**Problem**: Schema not passed to resolver

**Solution**: Ensure zodResolver is configured:

```typescript
const { control } = useForm({
  resolver: zodResolver(yourSchema), // ← Don't forget this
});
```

### Password strength not updating

**Problem**: Not watching password field

**Solution**: Use `watch()` to monitor changes:

```typescript
const password = watch('password');
const { strength } = usePasswordValidation(password);
```

---

## Performance Tips

1. **Memoize schemas** to prevent recreation:
   ```typescript
   const schema = useMemo(() => z.object({
     email: emailSchema,
     password: passwordSchema,
   }), []);
   ```

2. **Use `React.memo()` for custom components**:
   ```typescript
   const CustomField = React.memo(({ name, control }) => {
     return <ValidatedInput name={name} control={control} />;
   });
   ```

3. **Debounce onChange validation** (already built-in, default 500ms):
   ```typescript
   useForm({
     mode: 'onChange', // Automatically debounced
   });
   ```

---

## Testing Your Forms

### Manual Testing Script

1. **Email Field**:
   - [ ] Type "test" → Should show "Email inválido"
   - [ ] Type "test@" → Should still show error
   - [ ] Type "test@example.com" → Error clears
   - [ ] Leave field empty and blur → "Email é obrigatório"

2. **Password Field**:
   - [ ] Type "abc" → Shows 4 requirement errors
   - [ ] Type "Abc" → 3 errors remain
   - [ ] Type "Abc1" → 2 errors remain
   - [ ] Type "Abc1!" → 1 error remains (length)
   - [ ] Type "Abc1!@" → All requirements met ✅

3. **Form Submission**:
   - [ ] Submit with empty fields → Shows all errors
   - [ ] Submit with invalid email → Form blocked
   - [ ] Submit with valid data → `onSubmit` called

### Unit Testing Example

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { usePasswordValidation } from '@/features/form-validation/hooks/usePasswordValidation';

describe('Password Validation', () => {
  it('validates password requirements', () => {
    const { result } = renderHook(() => usePasswordValidation());
    
    act(() => {
      result.current.setValue('Abc123!');
    });
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.requirements.minLength).toBe(true);
    expect(result.current.requirements.hasUppercase).toBe(true);
  });
});
```

---

## Next Steps

1. **Read the API documentation**:
   - [Component API](./contracts/component-api.md)
   - [Hooks API](./contracts/hooks-api.md)
   - [Data Model](./data-model.md)

2. **Explore advanced features**:
   - Custom validation rules
   - Multi-step forms
   - Conditional validation
   - Async validation (API calls)

3. **Customize for your design system**:
   - Configure `StyleConfig`
   - Create themed components
   - Add your own icons

4. **Add more validators**:
   - Phone number validation
   - Credit card validation
   - Custom business rules

---

## Support & Resources

- **Feature README**: `src/features/form-validation/README.md`
- **Type Definitions**: `src/features/form-validation/types/`
- **Examples**: `src/features/form-validation/examples/`
- **Zod Documentation**: https://zod.dev
- **React Hook Form Docs**: https://react-hook-form.com

---

## Summary

You now have a working form validation system! Key takeaways:

✅ Use Zod schemas for type-safe validation  
✅ Use provided components for quick integration  
✅ Customize styling via StyleConfig  
✅ Test accessibility with VoiceOver/TalkBack  
✅ Follow validation modes (onBlur recommended)

Happy coding! 🚀
