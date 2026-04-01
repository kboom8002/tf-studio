# Background Jobs, Retry and Fallback Spec

## 비동기 작업
- review run
- long main generation
- file parsing
- batch sanitization verification
- Hub publish 후 후처리
- metrics aggregation

## fallback
- structured parse 실패: 재시도 → 느슨한 parse → failed artifact
- provider failure: 재시도 → 필요 시 fallback provider
- review run 실패: pending_failed 상태로 표시
