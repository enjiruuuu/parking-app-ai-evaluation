---
description: Abstract domain analysis workflow
---

# Domain Analysis Workflow

## Objective

Develop a complete understanding of the business domain before proposing any implementation.

Do not assume the feature request contains every necessary business rule.

Your responsibility is to understand the domain, identify implicit constraints, preserve domain integrity, and highlight ambiguity before implementation begins.

Think like an experienced software engineer who is responsible for the long-term quality and correctness of the system, not simply producing code that satisfies the written prompt.

---

# Core Principles

## Domain Integrity

Protect the integrity of the business domain.

Identify the invariants that must always remain true.

Ask yourself:

- What data should never exist?
- What operations should never be possible?
- What state transitions are invalid?
- What conditions must always hold true?

Examples:

- A user cannot vote more than once in the same poll.
- An order cannot have a negative total.
- A completed payment cannot become pending.
- A booking cannot end before it begins.
- A deleted account cannot authenticate.
- A comment cannot exist without a parent resource.

These invariants should guide implementation unless explicitly overridden by business requirements.

---

## Scope Guard

Infer only rules that are necessary to preserve:

- correctness
- consistency
- security
- expected domain behaviour

Do not invent:

- new product features
- new business workflows
- UI behaviour
- business policies
- assumptions that materially change the requested functionality

If additional information is required, document the ambiguity and request clarification instead of expanding the feature scope.

---

# Step 1 — Understand the Business Goal

Summarise the feature in your own words.

Identify:

- business objective
- user problem being solved
- intended users
- expected outcome
- success criteria

If the business objective is unclear, pause and request clarification.

---

# Step 2 — Extract Explicit Requirements

List every explicit requirement from the feature request.

Separate them into:

## Functional Requirements

Describe what the system must do.

## Non-functional Requirements

Examples include:

- performance
- accessibility
- maintainability
- security
- responsiveness
- compatibility

Do not infer additional requirements during this step.

---

# Step 3 — Identify Domain Entities

Identify every domain entity involved.

For each entity determine:

- responsibility
- ownership
- lifecycle
- relationships
- important properties

Example

Entity:
Vote

Relationships:

- belongs to one Poll
- belongs to one User

Lifecycle:

- created once
- immutable after submission

Responsibilities:

- records a user's choice

---

# Step 4 — Infer Domain Rules

Using the business requirements and domain knowledge, identify implicit business rules that a reasonable user would naturally expect.

Examples include:

Authentication

- deleted users cannot log in
- suspended users cannot perform restricted actions

Voting

- users cannot vote twice
- voting closes after the deadline
- votes require an existing poll

Commerce

- stock cannot become negative
- payment cannot be processed twice
- refunded orders cannot be refunded again

Scheduling

- end date cannot occur before start date
- overlapping bookings may not be allowed

Content

- deleted content cannot be edited
- unpublished content should not be publicly accessible

Clearly distinguish inferred rules from explicit requirements.

Do not invent new business functionality.

---

# Step 5 — Identify Domain Invariants

Identify conditions that must always remain true throughout the lifetime of the system.

Examples:

- IDs are unique.
- Users own only their own resources unless authorised.
- State transitions follow valid lifecycle rules.
- Duplicate records cannot exist where uniqueness is expected.
- Financial balances remain internally consistent.

Every implementation should preserve these invariants.

If an implementation would violate one, highlight the issue before continuing.

---

# Step 6 — Identify Edge Cases

Identify scenarios that should be handled even if they are not explicitly documented.

Consider:

## Input Validation

- empty values
- malformed data
- invalid identifiers
- null values

## Business Logic

- duplicate submissions
- repeated actions
- conflicting operations
- invalid state transitions

## Concurrency

- simultaneous requests
- race conditions
- stale data
- optimistic update failures

## Permissions

- expired sessions
- insufficient permissions
- unauthorized access

## Failure Scenarios

- network failures
- unavailable dependencies
- partial success
- rollback requirements

## Boundary Conditions

- zero values
- minimum values
- maximum values
- very large datasets

## Lifecycle

- archived entities
- deleted entities
- inactive entities

Only include scenarios relevant to the requested feature.

---

# Step 7 — Analyse Existing Implementation

Before proposing a solution, search the repository for:

- similar features
- existing domain logic
- reusable components
- reusable stores
- reusable services
- reusable validation
- reusable utilities

Prefer extending existing implementations over introducing new abstractions.

Avoid duplicating business logic.

Respect existing architectural patterns.

---

# Step 8 — Identify Assumptions

List every assumption that would influence implementation.

For each assumption include:

- the assumption
- why it was necessary
- associated risk
- whether clarification is recommended

Do not silently implement assumptions.

---

# Step 9 — Identify Requirement Gaps

Determine whether important information is missing.

Examples:

- How should duplicate requests be handled?
- What permissions are required?
- What validation rules apply?
- Is the operation reversible?
- Should actions be audited?
- Are there performance requirements?
- Are there existing business rules this feature must respect?

If missing information could materially affect correctness or architecture, pause and request clarification before implementation.

---

# Deliverable

Produce a Domain Analysis Report containing:

## Business Goal

...

## Explicit Requirements

...

## Functional Requirements

...

## Non-functional Requirements

...

## Domain Entities

...

## Domain Rules

...

## Domain Invariants

...

## Edge Cases

...

## Existing Code Reuse Opportunities

...

## Assumptions

...

## Requirement Gaps

...

## Clarifications Required (if any)

...

## Human Decision Gate

Before beginning implementation planning, determine whether the domain has been sufficiently understood.

Pause and request clarification if any of the following apply:

- Business requirements are incomplete.
- Multiple interpretations are equally valid.
- Important domain rules cannot be inferred confidently.
- Domain invariants depend on product decisions.
- Required user permissions are unknown.
- Error handling behaviour is unspecified.
- Existing repository behaviour conflicts with the requested feature.

When requesting clarification:

invoke the @clarification-workflow workflow.

- Explain why each question affects implementation.
- Do not ask questions that can be answered through repository analysis or reasonable domain inference.

If sufficient confidence exists, proceed to the Planning Workflow.