# TypeScript Standards

Use strict typing.

Avoid:

- any
- unknown

Use them only when unavoidable and explain why.

Always:

- prefer explicit interfaces
- prefer discriminated unions
- narrow types correctly
- use readonly where appropriate
- avoid unnecessary type assertions

Model the domain accurately.

Avoid optional properties unless genuinely optional.

NEVER weaken types merely to satisfy the compiler.