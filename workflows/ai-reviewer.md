# 🛡️ AI Reviewer Workflow: Governed Evaluation & Scoring

## **1. Executive Summary**
This workflow implements an **Adaptive Governance Framework** to evaluate code quality, structural integrity, and security risks. It utilizes a weighted scoring system to provide a quantitative "Trust Score" for AI-generated code.

---

## **2. Evaluation Metrics & Rubric**

The reviewer must evaluate each metric out of **10 points**.

| Metric | Identifier | Weight | Failure Threshold | Calculation Logic |
| :--- | :--- | :--- | :--- | :--- |
| **Complexity** | $m_1$ | 40% | $< 5$ | Start at 10. Deduct 1 pt per function with McCabe score $> 10$. |
| **Duplication** | $m_2$ | 20% | $< 7$ | Start at 10. Deduct 2 pts per unique duplicated block found. |
| **Safety** | $m_3$ | 40% | $10$ | **Binary:** 10 if 0 violations; 0 if any ASI violation is detected. |

---

## **3. Severity Scale for Defects**
Each identified issue must be labeled with a **Severity Level**:

* **🔴 CRITICAL:** Total logic failure or security risk (e.g., **ASI01 Goal Hijacking**). Results in immediate **FAILED** status.
* **🟡 MAJOR:** High complexity ($> 15$) or significant duplication ($> 15\%$). Requires refactoring.
* **🔵 MINOR:** Slight complexity or style inconsistencies. Recommendation provided.

---

## **4. Scoring Function ($S$)**
The overall **Trust Score** is calculated using the following weighted average:

$$S = (m_1 \times 0.4) + (m_2 \times 0.2) + (m_3 \times 0.4)$$

**Pass/Fail Criteria:**
* **PASS:** $S \ge 8.0$ AND zero **CRITICAL** issues.
* **FAIL:** $S < 8.0$ OR any **CRITICAL** issues detected.

---

## **5. Execution Workflow**

### **Step 1: Planning & Repository Scan**
- **Action:** Perform a global scan of the `lib/` directory.
- **Reference:** *Vellum (2026)* - Implements the **Planning Pattern** to establish context before analysis.

### **Step 2: Quantitative Audit**
- **Action:** Calculate Cyclomatic Complexity and identify code duplication.
- **Reference:** *Qodo.ai (2026)* - Utilizes context-aware analysis for "Quality Health Scores."

### **Step 3: Security Stress Test (OWASP)**
- **Action:** Scan for **OWASP Top 10 for Agentic Applications (2026)** vulnerabilities.
- **Focus:** [ASI01] Goal Hijacking, [ASI02] Tool Misuse, and [ASI06] Unexpected Code Execution.
- **Reference:** *Giskard/OWASP (2026)* - Standardizes agentic defect taxonomy.

### **Step 4: Result Generation**
- **Action:** Calculate $S$ and generate the final report.
- **Reference:** *Microsoft (2026)* - Employs **Adaptive Governance** by providing feedback loops for failed checks.

---

## **6. Final Report Format**

**Status:** [PASS / FAIL]  
**Trust Score:** [S] / 10  

### **Detailed Findings**
| Metric | Raw Data | Score |
| :--- | :--- | :--- |
| Complexity | [Avg McCabe] | [m1] |
| Duplication | [Dupe %] | [m2] |
| Safety | [ASI Count] | [m3] |

### **Failure & Recommendation Log (If S < 8.0 or Critical found)**
- **Issue:** [Description]
- **Severity:** [Critical/Major/Minor]
- **Reference:** [OWASP ID or Metric Name]
- **Recommendation:** [Specific refactoring instruction]