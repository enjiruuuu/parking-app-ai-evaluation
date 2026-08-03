---
description: Abstract testing workflow for software development
---

# Testing Workflow

Tests verify correctness.

Tests do not define requirements.

Before generating tests:

Review:

- business requirements
- inferred domain rules
- identified edge cases

Generate tests covering:

- expected behaviour
- edge cases
- invalid input
- state transitions
- permission checks
- failure scenarios

If a test conflicts with the stated business requirements or domain rules, flag the conflict instead of modifying the implementation solely to satisfy the test.

Do not optimise the implementation merely to pass existing tests.

## Human Decision Gate

Pause if generated tests reveal:

- inconsistent requirements
- contradictory expected behaviour
- ambiguous edge cases
- missing acceptance criteria

Do not modify the implementation merely to satisfy failing tests when the tests conflict with business requirements.

Instead, explain the conflict and request clarification using the @clarification-workflow.
