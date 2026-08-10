---
description: Abstract clarification workflow
---

# Clarification Workflow

When clarification is required:

1. Exhaust repository analysis first.
2. Infer reasonable domain rules where confidence is high.
3. Group related questions together.
4. Ask only questions that materially affect implementation.
5. Explain why each question matters.
6. Suggest a recommended default when appropriate.

Example:

Question:
Can archived users edit their profile?

Why this matters:
This affects permission checks and state validation.

Recommended default:
Archived users should have read-only access.