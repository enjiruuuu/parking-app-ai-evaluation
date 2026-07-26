# Architecture Standards

Technology:

- SolidJS
- TypeScript

Architecture:

Flux

Always respect existing architectural boundaries.

Business logic must not exist inside UI components.

Separate:

- View
- Store
- Actions
- API layer
- Domain logic

Do not introduce new architectural patterns unless explicitly requested.

State should have a single source of truth.

Avoid duplicated state.

Keep data flow predictable.

Prefer composition over inheritance.

Respect existing folder structure.