---
trigger: always_on
---

# Clean Architecture Layers

1. **Domain** (`src/domain`): entities, use-cases
2. **Data** (`src/data`): repositories, API/storage adapters
3. **Presentation** (`src/presentation`): components, screens, view-models
4. **Shared/Utils** (`src/shared`): helpers, constants, types

# Dependency Rule

- Dependencies should only point “up” the layer hierarchy (Presentation → Data → Domain).

# Layer Communication

- Use TypeScript `interface` abstractions for dependency injection.
- Presentation should call use-cases, not data adapters directly.

# Documentation

- Each domain/use-case/data adapter module must have a `README.md` describing its purpose, input/output contracts, and usage examples.
