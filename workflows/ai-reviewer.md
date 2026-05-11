# 🛡️ AI Reviewer Workflow: Agentic Governance & Verification

## **Phase 1: Planning (Context Establishment)**
*Goal: Decompose the complex evaluation task into a structured path for deterministic reasoning.*

1.  **Repository Mapping:** The Agent performs a recursive scan of the `lib/` (source) and `test/` (verification) directories to establish architectural context.
2.  **Constraint Identification:** The Agent cross-references the current implementation against the **Contract of Correctness** (Functional Requirements and Technical Specifications).
3.  **Task Breakdown:**
    *   **Sub-task A (Dynamic Audit):** Verify functional integrity via End-to-End (E2E) test execution.
    *   **Sub-task B (Static Audit):** Extract structural telemetry and maintainability metrics.
    *   **Sub-task C (Ethical & Security Audit):** Scan for agentic vulnerabilities and safety breaches.
    *   **Sub-task D (Synthesis):** Apply weighted scoring logic and generate remediation paths.

---

## **Phase 2: Execution (Access to Tools & Guardrails)**
*Goal: Utilize specialized tools for high-fidelity telemetry and implement defensive error handling.*

### **Tool Suite Interaction**
*   **Dynamic Auditor (Playwright):** Executes the command `npx playwright test --reporter=json`. The Agent parses the output for binary pass/fail status on critical requirements.
*   **Static Auditor (DCM):** Executes `dcm analyze --reporter=json` and `dcm check-code-duplication --reporter=json`. The Agent extracts Cyclomatic Complexity, structural clones, and linting defects.
*   **Security Auditor:** Evaluates the codebase against **OWASP Top 10 for Agentic Applications (2026)**, specifically scanning for [ASI01] Goal Hijacking and [ASI06] Unexpected Code Execution.

### **Guardrails & Error Handling**
*   **Build Integrity Check:** If the source code fails to compile or the environment is unstable, the Agent triggers a **CRITICAL FAILURE: BUILD_STABILITY** and halts the workflow.
*   **Non-Deterministic Failure Strategy:** If a tool fails to return a valid JSON report, the Agent is authorized to retry the execution or fallback to a secondary analysis method (e.g., standard `dart analyze`).

---

## **Phase 3: Refinement (LLM-based Evaluation)**
*Goal: Examine the gathered telemetry and apply a detailed scoring rubric to provide critical reflection.*

### **1. The Metric Rubric**
| Metric | Weight | Logic | Critical Threshold |
| :--- | :---: | :--- | :--- |
| **Bugs ($m_1$)** | 35% | $10 - ((\text{Lint Errors} + \text{E2E Failures} \times 2))$ | **Automatic Fail if < 10** |
| **Complexity ($m_2$)** | 25% | Start 10. Deduct 1pt for every function > 10 CC. | Fail if < 5 |
| **Safety ($m_3$)** | 25% | Binary: 10 if zero security violations; 0 if any found. | **Critical if 0** |
| **Duplication ($m_4$)** | 15% | $10 - (\text{Structural Duplication \%} \times 0.5)$ | Fail if < 5 |

### **2. The Scoring Function ($S$)**
The overall **Trust Score** is calculated as a weighted average:

$$S = (m_1 \times 0.35) + (m_2 \times 0.25) + (m_3 \times 0.25) + (m_4 \times 0.15)$$

### **3. Decision Logic**
*   **PASS:** $S \ge 8.0$ AND zero **Critical Failures** detected.
*   **FAIL:** $S < 8.0$ OR any **Critical Failure** (e.g., failed Playwright test, security breach).

---

## **Phase 4: Output (Final Governance Report)**

**Status:** [PASS / FAIL]  
**Trust Score:** [S] / 10  
**Critical Breach Detected:** [Yes / No]

### **Traceability & Evidence**
*   **Functional Verification:** Playwright identified [X] failures in core E2E flows.
*   **Architectural Telemetry:** DCM reported a Maximum Cyclomatic Complexity of [X] in `[File Name]`.
*   **Structural Comparison:** [X%] duplication density identified via AST analysis.
*   **Security Audit:** Safety assessment completed against Giskard/OWASP (2026) standards.

### **Remediation & Human-in-the-Loop**
*   **Agent Refinement:** The Agent identifies that refactoring [Function Name] is required to reduce cognitive load and improve the Trust Score.
*   **Checkpoint:** If $S$ is within the [7.5 - 7.9] margin, the Agent triggers a **Human-in-the-Loop** request for manual override or guidance before final rejection.

---

## **Technical References**
*   **Giskard (2026)** *OWASP top 10 for agentic application 2026*. Available at: https://www.giskard.ai/knowledge/owasp-top-10-for-agentic-application-2026.
*   **Microsoft (2026)** *Building trustworthy AI: a practical framework for adaptive governance*. Available at: https://www.microsoft.com/en-us/power-platform/blog/2026/04/01/building-trustworthy-ai-a-practical-framework-for-adaptive-governance/.
*   **Qodo (2026)** *5 AI code review pattern predictions in 2026*. Available at: https://www.qodo.ai/blog/5-ai-code-review-pattern-predictions-in-2026/.
*   **Vellum (2024)** *Agentic workflows: emerging architectures and design patterns*. Available at: https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns.