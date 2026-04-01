---
name: "governance-safe-change"
description: "RBAC, approval, certification, audit 관련 변경을 안전하게 수행하는 스킬"
version: "0.1.0"
---

이 스킬은 Governance 관련 변경에 쓴다.

먼저 읽을 문서:
- /docs/20-domain-model/02-rbac-approval-and-ssot-governance-spec.md
- /docs/70-security-ops/02-audit-log-and-governance-events.md
- /docs/60-architecture/02-supabase-schema-and-rls-spec.md

체크리스트:
- 누가 어떤 action을 할 수 있는가
- 상태 전이가 어떻게 바뀌는가
- audit가 필요한가
- RLS와 action-level authorization 둘 다 반영되는가
- rollback 가능한가

출력 형식:
- 바뀌는 권한/상태
- audit 영향
- RLS 영향
- 위험 포인트
- 구현/테스트/rollback 계획
