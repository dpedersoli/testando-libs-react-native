---
trigger: always_on
---

# Project Context

Stack: React Native (0.79.5) + Expo (SDK 53)  
Language: TypeScript (strict mode)  
State Management: Zustand  
Navigation: expo-router v5.1.4  
Video: react-native-video / FFmpeg.wasm

# Import Rules

- **Do not use** default `any` imports; always type explicitly.
- **Avoid** dynamic `require()` in production; always use `import`, uless the lib specifically tells that is necessary.

# Component Standards

- UI components: `src/components` folder
- Screens: `src/screens` folder
- Custom hooks in `src/hooks`

# Library Configurations

- **expo-router**:
  - Use file-based routing with `_layout.tsx` for layout and `(tabs)` groups.
  - Configure modal routes via `<Stack.Screen name="modal" options={{ presentation: 'modal' }} />`.

- **@realm/react**:
  - Define schemas via classes extending `Realm.Object`.
  - Always supply default values and initialize via `constructor`.
  - Use `useRealm` and `useQuery` hooks for CRUD.

- **react-hook-form & zod**:
  - Integrate via `@hookform/resolvers/zod`.
  - Keep schemas in `src/schemas`.

- **Zustand**:
  - Define stores in `src/store`; separate file per domain.
  - Use Immer for immutability.
