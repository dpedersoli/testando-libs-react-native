---
trigger: always_on
---

# React Native Components

- Use **Function Components** + Hooks only.
- Memoize pure components with `React.memo()`.
- Limit props to a maximum of 5 per component.

# TypeScript

- Enable `strict` in `tsconfig.json`:
  - `strictNullChecks: true`
  - `noImplicitAny: true`
- Avoid `as any`; prefer `unknown` + runtime validation.

# Styling

- No inline styles; use `StyleSheet.create()`.
- Place styles in `*.styles.ts` next to each component.

# Video & FFmpeg

- Abstract FFmpeg command execution into a single helper in `src/utils/videoUtils.ts`.
- Validate input/output formats before execution and handle errors.

# Testing

- Cover rendering and key interactions.
- Mock navigation and store hooks in tests.
