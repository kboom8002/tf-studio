# Incident and Rollback Runbook

## 주요 incident
provider outage, parse failure spike, sanitization gate failure, cross-tenant access issue, SSoT mis-certification, raw variable data exposure risk, job backlog saturation

## 공통 절차
incident 분류 → 영향 범위 식별 → 신규 쓰기 차단 여부 판단 → 운영자 공지 → 임시 완화 → root cause 조사 → 복구 및 회고
