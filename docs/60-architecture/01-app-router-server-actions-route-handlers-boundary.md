# App Router, Server Actions, Route Handlers Boundary

## 원칙
- 읽기와 초기 렌더는 서버 우선
- 짧은 mutation은 Server Action 우선
- 외부 연동, 업로드, 장시간 처리, LLM 실행은 Route Handler 우선
- 실제 로직은 domain services에 둔다

## 예시 엔드포인트
- POST /api/run/main
- POST /api/run/review
- POST /api/presets/switch
- POST /api/uploads/sign
- GET /api/jobs/[jobId]
- POST /api/admin/certify
