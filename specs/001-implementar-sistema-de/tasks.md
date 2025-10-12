# Implementation Tasks: Form Validation System

**Feature**: Form Validation System  
**Branch**: `001-implementar-sistema-de`  
**Generated**: 2025-10-12  
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Task Summary

- **Total Tasks**: 42
- **Parallelizable**: 20 tasks marked [P]
- **User Stories**: 3 (P1: Email, P2: Password, P3: Styling)
- **Estimated Effort**: ~28 hours

## Path Conventions
- React Native: `src/features/form-validation/{components,hooks,schemas,types,utils,constants}/`
- Tests (optional): `tests/{integration,unit}/`

---

## Phase 1: Setup

- [x] T001 [P] Create directory structure: `src/features/form-validation/{components,hooks,schemas,types,utils,constants}/`
- [x] T002 [P] Verify dependencies in package.json: zod, react-hook-form, @hookform/resolvers, @emotion/native
- [x] T003 [P] Create `src/features/form-validation/index.ts` with empty exports
- [x] T004 Verify tsconfig.json strict mode and path aliases

---

## Phase 2: Foundational Infrastructure

**Goal**: Shared types, schemas, and utilities for all user stories

- [x] T005 [P] Create ValidationState type in `types/index.ts`
- [x] T006 [P] Create ValidationRule interface in `types/index.ts`
- [x] T007 [P] Create ValidationResult interface in `types/index.ts`
- [x] T008 [P] Create FieldConfig interface in `types/index.ts`
- [x] T009 [P] Create ERROR_MESSAGES constants (Portuguese) in `constants/errorMessages.ts`
- [x] T010 [P] Create PASSWORD_STRENGTH_CONFIG in `constants/passwordStrength.ts`
- [x] T011 Create debounce utility in `utils/debounce.ts`
- [x] T012 [P] Create validation helpers in `utils/validationHelpers.ts`

**Checkpoint**: Foundational layer complete ✅

---

## Phase 3: US1 - Email Validation (P1 MVP)

**Goal**: Real-time email validation with error feedback

**Test**: Type "test@example.com" (valid), "invalid-email" (error), correct it (error clears)

- [x] T013 Create emailSchema in `schemas/emailSchema.ts` (Zod: min, max, email, trim, toLowerCase, refine)
- [x] T014 Create useEmailValidation hook in `hooks/useEmailValidation.ts` (value, setValue, error, isValid, validate, reset)
- [x] T015 Create ErrorMessage component in `components/ErrorMessage.tsx` (message, icon, accessibility)
- [x] T016 Create ValidatedInput component in `components/ValidatedInput.tsx` (base input with Controller, styled, error display)
- [x] T017 Create ValidatedEmailInput component in `components/ValidatedEmailInput.tsx` (wrapper with keyboardType="email-address")
- [x] T018 Update `index.ts`: export emailSchema, useEmailValidation, ValidatedInput, ValidatedEmailInput, ErrorMessage

**Checkpoint US1**: Email validation complete ✅

---

## Phase 4: US2 - Password Validation (P2)

**Goal**: Password strength validation with requirements checklist

**Test**: Type "abc" (4 errors), "Abc123!" (all valid), remove char (error reappears)

- [x] T019 Create PasswordStrength interface in `types/index.ts` (score, label, requirements, missingRequirements, suggestions)
- [x] T020 Create passwordSchema in `schemas/passwordSchema.ts` (Zod: min 6, refine uppercase/lowercase/number/symbol)
- [x] T021 Create calculatePasswordStrength in `utils/passwordStrength.ts` (checks requirements, returns PasswordStrength)
- [x] T022 Create usePasswordValidation hook in `hooks/usePasswordValidation.ts` (value, setValue, strength, requirements, isValid, errors)
- [x] T023 Create PasswordStrengthIndicator component in `components/PasswordStrengthIndicator.tsx` (bar, label, requirements checklist)
- [x] T024 Create ValidatedPasswordInput component in `components/ValidatedPasswordInput.tsx` (wraps ValidatedInput, shows indicator)
- [x] T025 Update `index.ts`: export passwordSchema, usePasswordValidation, ValidatedPasswordInput, PasswordStrengthIndicator

**Checkpoint US2**: Password validation complete ✅

---

## Phase 5: US3 - Custom Styling (P3)

**Goal**: Customizable colors, fonts, spacing via StyleConfig

**Test**: Apply custom StyleConfig, verify colors change, accessibility maintained

- [x] T026 Create StyleConfig interface in `types/index.ts` (colors, border, typography, spacing, errorStyle)
- [x] T027 Create defaultStyleConfig in `constants/defaultStyles.ts` (WCAG compliant defaults)
- [x] T028 Create mergeStyleConfig in `utils/styleHelpers.ts` (deep merge custom with defaults)
- [x] T029 Update ValidatedInput to accept styleConfig prop, apply to styled components
- [x] T030 Update ErrorMessage to accept custom styling from StyleConfig
- [x] T031 Update PasswordStrengthIndicator to accept custom colors
- [x] T032 Update `index.ts`: export StyleConfig, defaultStyleConfig, mergeStyleConfig

**Checkpoint US3**: Custom styling complete ✅

---

## Phase 6: Advanced Hooks

- [x] T033 [P] Create useFormValidation hook in `hooks/useFormValidation.ts` (generic, wraps react-hook-form with zodResolver)
- [x] T034 [P] Create useFieldError hook in `hooks/useFieldError.ts` (extracts error message from FieldErrors)
- [x] T035 [P] Create useDebouncedValidation hook in `hooks/useDebouncedValidation.ts` (debounced validation with delay)
- [x] T036 Update `index.ts`: export useFormValidation, useFieldError, useDebouncedValidation

---

## Phase N: Polish & Documentation

- [x] T037 [P] Create README.md in `src/features/form-validation/` (overview, API docs, examples, troubleshooting)
- [x] T038 [P] Create CHANGELOG.md with v1.0.0 entry
- [ ] T039 VoiceOver testing (iOS): Test all 12 scenarios, verify labels/hints/state announcements **[MANUAL - Requires physical device]**
- [ ] T040 TalkBack testing (Android): Test all 12 scenarios, verify touch targets 48x48dp **[MANUAL - Requires physical device]**
- [ ] T041 [P] Verify contrast ratios with WebAIM tool (error #D32F2F, valid #4CAF50, focus #2196F3) **[MANUAL - Use WebAIM checker]**
- [ ] T042 Cross-platform validation: Build and test on iOS and Android, verify identical behavior **[MANUAL - Requires npm run ios/android]**

---

## Dependencies

```
Setup (T001-T004) → Foundational (T005-T012) → User Stories can proceed independently:
  ├─ US1 (T013-T018) [P1 - MVP]
  ├─ US2 (T019-T025) [P2]
  └─ US3 (T026-T032) [P3]
     ↓
Advanced Hooks (T033-T036) → Polish (T037-T042)
```

---

## Parallel Execution Opportunities

**Phase 2 Foundational** (8 parallelizable):
- T005, T006, T007, T008 (types)
- T009, T010 (constants)
- T012 (utils)

**Phase 3 US1** (3 parallelizable):
- T015 (ErrorMessage)
- After T016 complete: T017 can proceed

**Phase 4 US2** (0 - sequential dependencies)

**Phase 5 US3** (0 - updates existing components)

**Phase 6 Advanced** (3 parallelizable):
- T033, T034, T035 (all independent hooks)

**Phase N Polish** (3 parallelizable):
- T037 (README), T038 (CHANGELOG), T041 (contrast check)

---

## MVP Scope (Recommended First Iteration)

Deliver US1 only for quickest value:
- Phase 1: Setup (4 tasks)
- Phase 2: Foundational (8 tasks)
- Phase 3: US1 Email Validation (6 tasks)
- **Total: 18 tasks (~10 hours)**

Then iterate with US2 (Password) and US3 (Styling) in subsequent releases.

---

## Testing Notes

**Tests are OPTIONAL per constitution**. Spec does not explicitly request automated tests.

**Manual testing required**:
- All 12 acceptance scenarios (4 for US1, 4 for US2, 4 for US3)
- VoiceOver (iOS) and TalkBack (Android) accessibility validation
- Cross-platform behavior verification

**Optional unit tests** (if team requests):
- Email validation edge cases
- Password strength calculation
- Debounce functionality
- Error message extraction

---

## Implementation Strategy

1. **Start with MVP** (US1): Deliver email validation first for immediate value
2. **Incremental delivery**: US2 and US3 can be deployed independently
3. **Parallel work**: Multiple developers can work on different user stories simultaneously after Phase 2
4. **Test continuously**: Manual test each user story upon completion
5. **Document as you go**: Update README with examples for each completed component

---

## File Structure (Final)

```
src/features/form-validation/
├── components/
│   ├── ValidatedInput.tsx
│   ├── ValidatedEmailInput.tsx
│   ├── ValidatedPasswordInput.tsx
│   ├── ErrorMessage.tsx
│   └── PasswordStrengthIndicator.tsx
├── hooks/
│   ├── useFormValidation.ts
│   ├── useEmailValidation.ts
│   ├── usePasswordValidation.ts
│   ├── useFieldError.ts
│   └── useDebouncedValidation.ts
├── schemas/
│   ├── emailSchema.ts
│   └── passwordSchema.ts
├── types/
│   └── index.ts
├── utils/
│   ├── debounce.ts
│   ├── validationHelpers.ts
│   ├── passwordStrength.ts
│   └── styleHelpers.ts
├── constants/
│   ├── errorMessages.ts
│   ├── passwordStrength.ts
│   └── defaultStyles.ts
├── index.ts
├── README.md
└── CHANGELOG.md
```

Total: 24 files across 7 subdirectories
