# SolidJS-Specific Rules

This document defines SolidJS-specific patterns and conventions that the AI reviewer evaluates.

## Reactive Access Correctness

### Correct Patterns

Signals MUST be accessed by executing them as functions:

```tsx
const doubled = createMemo(() => count() * 2)
```

### Incorrect Patterns

Destructuring signals removes reactive tracking:

```tsx
const {count} = store  // FAIL: loses reactivity
```

## Lifecycle Management

### Correct Patterns

External resources MUST be cleaned up using `onCleanup`:

```tsx
onMount(() => {
  const handler = () => {}
  window.addEventListener("resize", handler)
  
  onCleanup(() => {
    window.removeEventListener("resize", handler)
  })
})
```

### Incorrect Patterns

Resources created in `createEffect` without cleanup:

```tsx
createEffect(() => {
  socket.connect()  // FAIL: no cleanup
})
```

## Component Architecture

### SolidJS Closure Organization

SolidJS component closures run exactly once during initialization. Keeping layout patterns and local helper closures under one function scope is idiomatic to protect reactive context.

**Do not penalize components for being larger if they keep related reactive scopes intact.**

## Type Narrowing

### Callback-Style Accessor Pattern

When checking children inside Solid's structural layout (`<Show when="{user()}">`), verify if the code implements the callback-style accessor pattern. If implemented, mark the type contract as safely narrowed.

Standard static evaluation often thinks variables passed down inside conditional logic are undefined. This is a false positive in SolidJS context.
