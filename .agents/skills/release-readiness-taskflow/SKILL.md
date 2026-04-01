---
name: "release-readiness-taskflow"
description: "TASKFLOW 릴리즈 전 schema, sanitization, governance, observability를 점검하는 스킬"
version: "0.1.0"
---

이 스킬은 배포 직전 최종 점검에 쓴다.

먼저 읽을 문서:
- /docs/70-security-ops/03-release-readiness-checklist.md
- /docs/70-security-ops/00-security-principles-and-threat-model.md
- /docs/60-architecture/05-measurement-and-observability-architecture.md

체크리스트:
- TF8 schema와 코드가 충돌하지 않는가
- unresolved PII gate가 동작하는가
- review run failure가 숨겨지지 않는가
- raw variable 데이터가 Hub에 남지 않는가
- SSoT approval이 role에 맞게 제한되는가
- audit / usage / events가 남는가

출력 형식:
- 릴리즈 대상 요약
- 핵심 체크 통과 여부
- 고위험 누락
- 문서 수정 필요
- release / rollback 권고
