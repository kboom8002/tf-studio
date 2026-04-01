---
name: "taskflow-feature-planning"
description: "TASKFLOW 기능 구현 전 범위와 영향 레이어를 계획하는 스킬"
version: "0.1.0"
---

이 스킬은 기능 구현 전에 범위와 영향도를 계획한다.

절차:
1. 관련 문서를 읽는다.
2. 영향을 받는 엔티티를 적는다.
3. 영향을 받는 레이어를 나눈다.
   - Studio UI
   - Wizard
   - Prompt Assembly
   - Sanitization
   - Run / Review
   - Hub
   - Governance
   - DB / RLS
   - Audit / Usage
4. 구현 순서를 적는다.
5. 테스트 포인트를 적는다.

출력 형식:
- 범위 요약
- 영향 엔티티
- 영향 레이어
- 구현 순서
- 테스트 포인트
- 문서 수정 필요 여부
