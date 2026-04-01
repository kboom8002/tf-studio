# High Risk Change Prompts

고위험 변경:
- TF8 schema 변경
- constants / variables 분리 방식 변경
- Prompt Assembly 계약 변경
- sanitization gate 변경
- main run / review run 구조 변경
- role / membership / RLS 변경
- SSoT 승인 상태 전이 변경

먼저 문서를 읽고 상태 전이 / 권한 경계 / 영향 레이어 / rollback / 테스트 포인트를 계획으로 제시한 뒤 구현한다.
