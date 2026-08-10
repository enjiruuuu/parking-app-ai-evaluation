---
description: Abstract planning workflow for software development tasks
---

# Planning Workflow

Before writing any code:

## 1. Understand the Feature

Summarise:

- What is changing?
- Why?
- Which users are affected?
- Which components are involved?

---

## 2. Identify Domain Rules

Infer reasonable business rules from the feature.

Do not rely solely on explicitly written requirements.

Examples:

- A user cannot vote twice.
- Deleted users cannot authenticate.
- Quantities cannot become negative.
- Duplicate IDs should not exist.
- Start dates cannot occur after end dates.

List every inferred rule.

---

## 3. Identify Edge Cases

Consider:

- Empty input
- Null values
- Race conditions
- Invalid state transitions
- Concurrent requests
- Duplicate actions
- Partial failures
- Permission issues

List every identified edge case.

---

## 4. Identify Existing Code

Search for:

- Similar features
- Shared components
- Existing stores
- Existing services
- Existing utility functions

Prefer reuse.

---

## 5. Produce Implementation Plan

Describe:

- Files to change
- New files
- Stores affected
- Components affected
- APIs affected
- Risks

## Human Decision Gate

Before implementation begins, determine whether the proposed plan should be confirmed.

Pause if:

- multiple architectural approaches exist
- implementation affects shared infrastructure
- new abstractions are proposed
- existing architecture may require modification
- performance or scalability trade-offs exist
- implementation could affect unrelated features

Use the @clarification-workflow to request clarification.

Present:

- proposed approach
- alternatives considered
- rationale

Wait for approval before continuing.
