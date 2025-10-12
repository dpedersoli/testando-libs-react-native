# Form Validation System

Reusable form validation components and hooks for React Native with Zod and react-hook-form. Provides real-time validation feedback with full WCAG 2.1 Level AA accessibility compliance.

**Version**: 1.0.0  
**License**: MIT

---

## Features

✅ **Email Validation** - Real-time email format validation (RFC 5322)  
✅ **Password Validation** - Strength indicator with security requirements  
✅ **Custom Styling** - Fully customizable via StyleConfig  
✅ **Accessibility** - WCAG 2.1 AA compliant with screen reader support  
✅ **TypeScript** - Full type safety with strict mode  
✅ **Lightweight** - Minimal bundle size (~23KB total)

---

## Installation

Dependencies are already included in the project:

```bash
# Already installed
zod ^4.1.5
react-hook-form ^7.62.0
@hookform/resolvers ^5.2.1
@emotion/native ^11.11.0
```

---

## Quick Start

### 1. Create a Zod Schema

```typescript
import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/features/form-validation';

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;
```

### 2. Build Your Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ValidatedEmailInput,
  ValidatedPasswordInput,
} from '@/features/form-validation';

export function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Valid data:', data);
    // Call your API here
  };

  return (
    <View>
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
      />

      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

### 3. Test Your Form

- Type invalid email → See error "Por favor, insira um email válido"
- Type valid email → Error clears
- Type weak password → See strength indicator
- Enable VoiceOver/TalkBack → Verify accessibility

---

## Components

### ValidatedEmailInput

Email input with pre-configured settings:

```typescript
<ValidatedEmailInput
  name="email"
  label="Email"
  control={control}
  error={errors.email?.message}
/>
```

**Props**:
- `name` (string) - Field name
- `label` (string) - Label text
- `control` (Control) - react-hook-form control
- `error?` (string) - Error message to display
- `placeholder?` (string) - Placeholder text
- `styleConfig?` (StyleConfig) - Custom styling

### ValidatedPasswordInput

Password input with strength indicator:

```typescript
<ValidatedPasswordInput
  name="password"
  label="Senha"
  control={control}
  error={errors.password?.message}
  showStrengthIndicator={true}
  showRequirements={true}
/>
```

**Props**:
- All ValidatedEmailInput props, plus:
- `showStrengthIndicator?` (boolean) - Show strength bar (default: true)
- `showRequirements?` (boolean) - Show requirements checklist (default: true)

### ValidatedInput

Base input component (used by above components):

```typescript
<ValidatedInput
  name="username"
  label="Nome de usuário"
  control={control}
  error={errors.username?.message}
  keyboardType="default"
/>
```

### ErrorMessage

Standalone error message component:

```typescript
<ErrorMessage message="Campo obrigatório" showIcon={true} />
```

### PasswordStrengthIndicator

Visual password strength indicator:

```typescript
<PasswordStrengthIndicator
  strength={strength}
  showRequirements={true}
  showSuggestions={true}
/>
```

---

## Hooks

### useFormValidation

Generic form validation with Zod:

```typescript
const { control, handleSubmit, formState, getFieldError } = useFormValidation(schema, {
  mode: 'onBlur',
  reValidateMode: 'onChange',
});
```

### useEmailValidation

Standalone email validation:

```typescript
const { value, setValue, error, isValid } = useEmailValidation();
```

### usePasswordValidation

Standalone password validation with strength:

```typescript
const { value, setValue, strength, requirements, isValid, errors } = usePasswordValidation();
```

### useFieldError

Extract error message from react-hook-form errors:

```typescript
const emailError = useFieldError('email', errors);
```

### useDebouncedValidation

Debounced validation for custom use cases:

```typescript
const result = useDebouncedValidation(value, validator, 500);
```

---

## Schemas

### emailSchema

Zod schema for email validation:

```typescript
import { emailSchema } from '@/features/form-validation';

const schema = z.object({
  email: emailSchema, // Validates RFC 5322 format
});
```

**Rules**:
- Required
- Valid email format
- Max 254 characters
- Trims whitespace
- Converts to lowercase

### passwordSchema

Zod schema for password validation:

```typescript
import { passwordSchema } from '@/features/form-validation';

const schema = z.object({
  password: passwordSchema,
});
```

**Rules**:
- Minimum 6 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one digit (0-9)
- At least one symbol (!@#$%^&*, etc.)

---

## Custom Styling

All components accept `styleConfig` prop:

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
  control={control}
  styleConfig={customStyle}
/>
```

**Default Colors** (WCAG 2.1 AA compliant):
- Idle: #757575
- Valid: #4CAF50
- Invalid: #D32F2F (4.5:1 contrast)
- Focus: #2196F3

---

## Accessibility

All components are WCAG 2.1 Level AA compliant:

✅ `accessibilityLabel` on all inputs  
✅ `accessibilityHint` describing requirements  
✅ `accessibilityState` for validation status  
✅ `accessibilityLiveRegion` for error announcements  
✅ Touch targets ≥ 44x44pt (iOS) / 48x48dp (Android)  
✅ 4.5:1 contrast ratio for error messages  
✅ Screen reader compatible (VoiceOver/TalkBack)

**Testing**: Validate with VoiceOver (iOS) and TalkBack (Android) before deployment.

---

## API Reference

See detailed API documentation in:
- [Component API](../../../specs/001-implementar-sistema-de/contracts/component-api.md)
- [Hooks API](../../../specs/001-implementar-sistema-de/contracts/hooks-api.md)
- [Data Model](../../../specs/001-implementar-sistema-de/data-model.md)

---

## Examples

### Login Form

```typescript
const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

<ValidatedEmailInput name="email" control={control} error={errors.email?.message} />
<ValidatedPasswordInput name="password" control={control} error={errors.password?.message} />
```

### Registration Form with Password Strength

```typescript
const registrationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

<ValidatedPasswordInput
  name="password"
  showStrengthIndicator={true}
  showRequirements={true}
/>
```

---

## Troubleshooting

**Q: Validation not working?**  
A: Ensure `zodResolver(schema)` is passed to `useForm({ resolver: zodResolver(schema) })`

**Q: TypeScript errors?**  
A: Verify strict mode is enabled in `tsconfig.json`: `"strict": true`

**Q: Custom styling not applying?**  
A: Check that `styleConfig` is passed correctly and colors meet WCAG contrast requirements

**Q: Screen reader not announcing errors?**  
A: Verify `accessibilityLiveRegion` is set to "polite" or "assertive" on error messages

---

## License

MIT © 2025
