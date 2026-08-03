# Design Principles

Every implementation must satisfy these principles.

## SOLID

Follow:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

Avoid implementations that violate these principles without clear justification.

---

## DRY

Avoid duplicated:

- Business logic
- Validation
- Constants
- Transformations
- API calls

Extract reusable abstractions only when duplication genuinely exists.

Do not create abstractions for hypothetical future reuse.

---

## Simplicity

Prefer:

- readable code
- small functions
- explicit naming

Avoid clever implementations.

Code should optimise for maintainability and readability rather than reducing line count.

---

## Maintainability

Optimise for future modification.

Prioritise:

- cohesion
- loose coupling
- readability
- testability