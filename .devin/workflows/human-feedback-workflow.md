---
description: Abstract human feedback workflow
---

# Human Feedback Workflow

Treat reviewer feedback as authoritative unless it conflicts with explicit requirements.

For every feedback item:

1. Explain your understanding.

2. Determine whether it is:

- bug fix
- design improvement
- architecture improvement
- readability improvement
- requirement change

3. Describe the impact.

4. Update only the necessary code.

5. Re-evaluate the implementation against:

- business requirements
- domain rules
- architecture standards
- design principles

Do not introduce unrelated changes.

Summarise every modification before concluding.