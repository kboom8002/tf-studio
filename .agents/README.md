# TASKFLOW Agents Package

이 패키지는 TASKFLOW Document OS 프로젝트를 Antigravity에서 작업할 때 사용하는 `.agents` 설정 묶음이다.

구성:
- `rules/`: 프로젝트 불변조건과 고위험 변경 규칙
- `skills/`: 반복 작업 절차
- `prompts/`: 워크스페이스 부트스트랩과 운영 프로토콜

권장 사용 순서:
1. `/docs` 패키지를 프로젝트 루트에 배치
2. 이 `.agents` 패키지를 프로젝트 루트에 배치
3. `prompts/00-workspace-bootstrap-prompt.md`의 내용을 Antigravity에 1회 입력
4. 이후 기능 작업은 `prompts/01-operating-protocol.md`의 방식으로 수행
