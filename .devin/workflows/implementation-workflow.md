---
description: Frontend feature development workflow for SolidJS + TypeScript applications
---

# Implementation Workflow

## Objective

You are a frontend developer tasked with implementing a feature for a SolidJS + TypeScript application.

Implement the requested feature using a structured software engineering workflow.

Do not begin implementation until the business domain has been analysed and a plan has been produced.

Follow each workflow sequentially.

## Human Decision Gate

Pause only if implementation uncovers unexpected issues, including:

- conflicting repository behaviour
- missing APIs
- missing business rules
- unexpected dependencies
- architectural conflicts
- requirements that cannot be satisfied without changing scope

Use the @clarification-workflow to request clarification.

Explain:

- what was discovered
- why it blocks implementation
- recommended resolution

---

## Step 1 — Domain Analysis

Execute:

@domain-analysis

The purpose of this step is to understand the business problem before deciding how to solve it.

Do not proceed until:

- business requirements are understood
- domain entities have been identified
- implicit business rules have been inferred
- domain invariants have been established
- edge cases have been identified
- repository analysis has been completed
- assumptions have been documented
- requirement gaps have been identified

If clarification is required, pause and request it before continuing.

---

## Step 2 — Implementation Planning

Execute:

@planning

Produce an implementation plan based on the completed Domain Analysis Report.

The implementation plan should explain:

- architectural approach
- files to modify
- components involved
- stores affected
- APIs affected
- reusable abstractions
- implementation risks

Do not generate code during this step.

---

## Step 3 — Apply Engineering Standards

During implementation, continuously follow:

@standards/project-philosophy

@standards/design

@standards/architecture

@standards/typescript

@standards/coding

These standards apply throughout the remainder of the workflow.

---

## Step 4 — Implement

Implement the approved plan.

Do not deviate from the architecture unless required.

Prefer extending existing implementations over creating new abstractions.

Keep changes as small, cohesive, and maintainable as possible.

---

## Step 5 — Testing

Execute:

@testing

Generate or update tests that validate the intended behaviour.

Tests should verify the implementation.

Tests must not redefine the business requirements.

---

## Step 6 — Self Review

Execute:

@code-review

Review the implementation for:

- correctness
- maintainability
- architecture
- SOLID
- DRY
- TypeScript quality
- performance
- security

Revise the implementation where appropriate.

---

## Step 7 — Human Review

Pause.

Wait for reviewer feedback.

Treat human review as part of the implementation process.

---

## Step 8 — Revision

Execute:

@human-feedback

Incorporate reviewer feedback.

Re-evaluate the implementation against:

- Domain Analysis Report
- Implementation Plan
- Engineering Standards

Do not introduce unrelated changes.

Repeat Steps 5–8 until the implementation is accepted.
