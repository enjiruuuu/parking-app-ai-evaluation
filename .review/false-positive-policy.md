# False Positive Policy

This document defines the false positive mitigation policies to ensure the AI reviewer does not penalize idiomatic SolidJS patterns.

## Component Size

**Do NOT deduct points for:**
- Components being large
- Helpers being inside component closures
- Reactive logic being colocated

**Rationale:** SolidJS component closures run exactly once during initialization. Keeping layout patterns and local helper closures under one function scope is idiomatic to protect reactive context.

## Reactivity Patterns

**Do NOT penalize for:**
- Signals being accessed as functions (e.g., `count()`)
- Callback-style accessor patterns in conditional layouts
- Type narrowing via callback accessors

**Rationale:** Standard static evaluation often thinks variables passed down inside conditional logic are undefined. In SolidJS, the callback-style accessor pattern safely narrows types.

## Framework Differences

**Do NOT penalize for patterns that differ from React conventions:**
- SolidJS-specific reactivity patterns
- SolidJS lifecycle hooks (onMount, onCleanup)
- SolidJS store patterns
- SolidJS memoization (createMemo)

**Rationale:** SolidJS has different paradigms than Virtual DOM frameworks. React conventions do not apply.

## Security Pattern Matching

**Semgrep findings are candidates only.**

The Security Agent MUST validate:
- Is the data attacker-controlled?
- Is the sink dangerous?
- Is sanitization present?
- Is the pattern exploitable?

**Do NOT mark a vulnerability only because a pattern matches.**

**Confidence Levels:**
- HIGH: Clear exploit path
- MEDIUM: Potential issue
- LOW: Pattern only

Only HIGH and MEDIUM confidence findings should impact scores. LOW confidence findings are informational only.

## Type Narrowing False Positives

When checking children inside Solid's structural layout (`<Show when="{user()}">`), verify if the code implements the callback-style accessor pattern. If implemented, mark the type contract as safely narrowed.

Standard static evaluation false positives:
- Variables passed down inside conditional logic appear undefined
- Destructured signals appear to lose type information

These are false positives in SolidJS context and should not be penalized.
