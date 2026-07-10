# Scoring Rubric

This document defines the deterministic scoring rubric used by the AI reviewer to ensure consistent evaluation across runs.

## Metric A: Cyclomatic Complexity (20% weight)

**Scoring Formula:**
$$Score_A = \max(0, 10 - (0.5 \times C_{10}) - (1 \times C_{15}) - (2 \times C_{20}))$$

Where:
- $C_{10}$ = count of functions with CC > 10
- $C_{15}$ = count of functions with CC > 15
- $C_{20}$ = count of functions with CC > 20

**Thresholds:**
- Score ≥ 8: PASS
- 6 ≤ Score < 8: WARNING
- Score < 6: FAIL

## Metric B: Defect Density (25% weight)

**Scoring Formula:**
$$Score_B = \max(0, 10 - (2 \times F_{e2e}))$$

Where $F_{e2e}$ = count of failing E2E tests

**Thresholds:**
- Score ≥ 8: PASS
- 6 ≤ Score < 8: WARNING
- Score < 6: FAIL

## Metric C: Code Duplication (15% weight)

**Scoring Formula:**
$$Score_C = \max(0, 10 - (0.1 \times D_{percentage}))$$

Where $D_{percentage}$ = percentage of duplicated code

**Thresholds:**
- Score ≥ 8 (≤20% duplication): PASS
- 6 ≤ Score < 8 (20-40% duplication): WARNING
- Score < 6 (>40% duplication): FAIL

## Metric D: Security Analysis (20% weight)

**Scoring Formula:**
$$Score_D = \max(0, 10 - (5 \times C) - (3 \times H) - (1 \times M) - (0.25 \times L))$$

Where C, H, M, L are counts of validated Critical, High, Medium, Low findings

**Thresholds:**
- Any Critical finding with HIGH confidence: AUTOMATIC FAIL
- Score ≥ 8: PASS
- 6 ≤ Score < 8: WARNING
- Score < 6: FAIL

## Metric E: Software Quality (10% weight)

**Scoring Formula:**
$$Score_E = 10 - (E1 \times 0.4) - (E2 \times 0.25) - (E3 \times 0.2) - (E4 \times 0.15)$$

Where:
- E1 = SolidJS Reactivity Correctness score (0-4)
- E2 = Lifecycle Management score (0-3)
- E3 = Component Architecture score (0-3)
- E4 = Maintainability score (0-3)

**Thresholds:**
- Score ≥ 8: PASS
- 6 ≤ Score < 8: WARNING
- Score < 6: FAIL

## Metric F: TypeScript + SolidJS Correctness (10% weight)

**Scoring Formula:**
$$Score_F = \max(0, 10 - (2 \times H) - (1 \times M) - (0.5 \times L))$$

Where H, M, L are counts of HIGH, MEDIUM, LOW findings

**Thresholds:**
- Score ≥ 8: PASS
- 6 ≤ Score < 8: WARNING
- Score < 6: FAIL

## Overall Quality Score

$$Q = (Score_A \times 0.20) + (Score_B \times 0.25) + (Score_C \times 0.15) + (Score_D \times 0.20) + (Score_E \times 0.10) + (Score_F \times 0.10)$$

**Decision Logic:**
- $Q \ge 8.0$ AND zero Critical security findings: PASS
- $7.0 \le Q < 8.0$ AND zero Critical security findings: WARNING
- $Q < 7.0$ OR any Critical security finding: FAIL
- Any individual metric score < 6: FAIL
