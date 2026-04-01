# PII Sanitization Policy

## 기본 원칙
- raw PII는 직접 LLM에 보내지 않는다
- unresolved PII가 있으면 실행 차단
- sanitization 결과와 로그를 남긴다
- Hub에는 raw variable 데이터 저장 금지
- 최종 gate는 서버가 판단

## 탐지 대상
이메일, 전화번호, 주민번호 형식, 계좌번호 형식, 상세 주소, 실명 후보, 내부 식별자
