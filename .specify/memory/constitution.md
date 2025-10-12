<!--
SYNC IMPACT REPORT
==================
Version: N/A → 1.0.0
Change Type: Initial constitution creation
Modified Principles: N/A (new constitution)
Added Sections:
  - Core Principles (7): Modular Architecture, State Management, Cross-Platform Optimization,
    Clean Code, Accessibility First, API Documentation, Semantic Versioning
  - Platform Standards: Technology Stack, Performance Requirements
  - Development Workflow: Code Quality Gates, Testing Strategy, Branch & Commit Strategy
  - Governance: Constitution Authority, Amendment Process, Compliance & Enforcement
Removed Sections: N/A
Templates Status:
  ✅ plan-template.md - Updated Constitution Check with all 9 gates, updated Project Structure
                        to React Native modular architecture with feature-based folders
  ✅ spec-template.md - Added mandatory Accessibility Requirements section per Principle V
                        (WCAG 2.1 Level AA) with concrete requirements and testing mandates
  ✅ tasks-template.md - Updated Path Conventions for React Native modular structure,
                         updated Polish phase tasks with constitution compliance checks
Follow-up TODOs: None
-->

# testando-libs React Native Constitution

## Core Principles

### I. Modular Architecture (NON-NEGOTIABLE)

Every feature MUST be developed as an independent, self-contained module with clear boundaries and responsibilities. Modules MUST:
- Expose a single, well-defined public API
- Be independently testable without requiring the full app context
- Have zero cross-module imports except through designated public interfaces
- Include comprehensive JSDoc documentation for all exported functions, types, and components
- Follow the feature-based folder structure: `src/features/[feature-name]/{components,hooks,services,types}`

**Rationale**: Modular architecture prevents tight coupling, enables parallel development, simplifies testing, and makes the codebase more maintainable and scalable as the project grows.

### II. Consistent State Management

State management MUST follow a consistent, predictable pattern across the entire application using Zustand as the primary state library. All state MUST:
- Be managed through Zustand stores with explicit, typed actions
- Separate concerns: UI state (local), feature state (Zustand), and server state (React Query or similar)
- Never use prop drilling beyond 2 levels—use stores or context instead
- Include clear documentation of state shape, actions, and side effects
- Implement persistence only when explicitly required, using `expo-secure-store` for sensitive data

**Rationale**: Consistent state patterns reduce cognitive load, prevent bugs from scattered state logic, and make debugging significantly easier. Zustand provides a lightweight, TypeScript-friendly solution without Redux boilerplate.

### III. Cross-Platform Optimization

All features MUST work identically on iOS and Android unless platform-specific behavior is explicitly required and documented. Developers MUST:
- Test on both iOS and Android before marking work complete
- Use platform-specific code (`Platform.select`, `.ios.tsx`, `.android.tsx`) only when necessary
- Document platform-specific behavior in component/module JSDoc with `@platform` tags
- Prioritize React Native built-in components and Expo APIs over third-party libraries
- Validate performance on physical devices, not just simulators/emulators

**Rationale**: Consistent cross-platform behavior prevents user frustration, reduces maintenance burden, and ensures feature parity. Platform-specific optimizations should be strategic, not accidental.

### IV. Clean & Maintainable Code

Code MUST be written for humans first, computers second. All code MUST:
- Follow TypeScript strict mode—no `any` types except in explicitly justified cases
- Use descriptive variable/function names that reveal intent (avoid abbreviations)
- Keep functions under 50 lines; extract helpers when logic becomes complex
- Follow ESLint/Prettier configurations without exceptions
- Include JSDoc comments for all exported functions, types, and components
- Avoid premature optimization—prioritize readability over micro-optimizations

**Rationale**: Clean code reduces onboarding time, prevents bugs, and accelerates long-term development velocity. Code is read 10x more than it's written.

### V. Accessibility First (WCAG 2.1 Level AA)

Accessibility is NOT optional—all UI components MUST meet WCAG 2.1 Level AA standards. Implementation requirements:
- All interactive elements MUST have `accessibilityLabel` and `accessibilityHint`
- Touch targets MUST be at least 44x44 points (iOS) / 48x48 dp (Android)
- Color contrast MUST meet 4.5:1 ratio for normal text, 3:1 for large text
- Support screen readers (VoiceOver/TalkBack) with meaningful navigation order
- Provide alternative text for all images and icons via `accessibilityLabel`
- Test with VoiceOver (iOS) and TalkBack (Android) before completion

**Rationale**: Accessibility is a legal requirement in many jurisdictions and a moral imperative. Building accessible UIs from the start is 10x easier than retrofitting.

### VI. API & Component Documentation

All public APIs, hooks, and reusable components MUST be comprehensively documented. Documentation MUST include:
- JSDoc comments with `@param`, `@returns`, `@throws`, and `@example` tags
- Usage examples for all exported hooks and components
- Storybook stories for all shared UI components (when applicable)
- Migration guides when APIs change (link in commit messages)
- README.md in each feature module explaining purpose, usage, and dependencies

**Rationale**: Self-documenting code prevents knowledge silos, accelerates onboarding, and reduces support burden. Examples are worth 1000 words of prose.

### VII. Semantic Versioning & Change Management

All features, libraries, and APIs MUST follow semantic versioning (MAJOR.MINOR.PATCH). Version changes MUST:
- MAJOR: Breaking changes (API removal, signature changes, behavior changes)
- MINOR: New features, backward-compatible additions
- PATCH: Bug fixes, performance improvements, documentation updates
- Be documented in CHANGELOG.md with migration instructions for breaking changes
- Include deprecation warnings for at least one minor version before removal
- Tag releases in Git with version and release notes

**Rationale**: Semantic versioning provides a contract with consumers, prevents surprise breakages, and enables confident dependency updates.

## Platform Standards

### Technology Stack

**MUST USE** (non-negotiable):
- React Native 0.70+ with TypeScript strict mode
- Expo SDK (latest stable)
- Zustand for global state management
- React Hook Form + Zod for form validation
- Expo Router for navigation
- React Native Paper for UI components
- Realm for local database (when persistence required)

**MAY USE** (with justification):
- Additional libraries only if no Expo/React Native equivalent exists
- Platform-specific modules when cross-platform solution is not feasible

**MUST NOT USE**:
- Class components (use functional components + hooks)
- Any deprecated React Native APIs
- Libraries with known security vulnerabilities

### Performance Requirements

- App launch time: < 3 seconds on mid-range devices (iPhone 11, Pixel 4)
- Screen navigation: < 300ms transition time
- List rendering: maintain 60 FPS with virtualization for lists > 50 items
- Bundle size: < 40MB per platform (iOS/Android)
- Memory usage: < 200MB for typical user sessions

## Development Workflow

### Code Quality Gates

All code MUST pass these gates before merge:
1. **Linting**: Zero ESLint errors (warnings require justification)
2. **Type Checking**: Zero TypeScript errors
3. **Testing**: All tests pass (if tests exist for the feature)
4. **Platform Testing**: Validated on iOS AND Android physical devices or simulators
5. **Accessibility**: Screen reader navigation verified
6. **Code Review**: At least one approval from team member familiar with the module

### Testing Strategy

- **Unit Tests**: OPTIONAL unless feature is business-critical or complex logic
- **Integration Tests**: OPTIONAL unless feature involves API/database interactions
- **End-to-End Tests**: OPTIONAL unless feature is part of critical user journey
- **Manual Testing**: REQUIRED for all UI changes on both iOS and Android

**Note**: Tests are encouraged but not mandatory by default. Test requirements are specified per-feature in the spec document.

### Branch & Commit Strategy

- Feature branches: `###-feature-name` format (e.g., `001-user-authentication`)
- Commit messages: Follow conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- Pull requests: Must reference feature spec and include screenshots/videos for UI changes

## Governance

### Constitution Authority

This constitution supersedes all other development practices and conventions. When conflicts arise between this document and other guidance, the constitution takes precedence.

### Amendment Process

1. Propose amendment with clear rationale and impact analysis
2. Discuss with team for at least 48 hours
3. Achieve consensus (no blocking objections)
4. Update constitution with incremented version
5. Propagate changes to dependent templates and documentation
6. Communicate changes to all team members

### Compliance & Enforcement

- All PRs MUST include a constitution compliance checklist
- Code reviews MUST verify adherence to principles
- Violations require explicit justification or immediate correction
- Repeated violations warrant team discussion on principle refinement

### Complexity Justification

Any code that violates simplicity principles (e.g., exceeding 50-line function limit, using `any` type, adding third-party dependencies) MUST be justified in PR description with:
- Why simpler alternatives are insufficient
- What complexity is being introduced
- How it will be maintained going forward

**Version**: 1.0.0 | **Ratified**: 2025-10-12 | **Last Amended**: 2025-10-12