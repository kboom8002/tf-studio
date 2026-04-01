# Sanitization and Red-Team Review Pipeline Spec

## Sanitization 원칙
- K 블록은 정제 후 전달한다.
- unresolved PII가 있으면 실행을 차단한다.
- sanitization 결과와 로그를 남긴다.

## Review 원칙
- 생성과 검수는 분리된 실행이어야 한다.
- lint findings는 severity를 가진다.
- critical finding unresolved면 다음 단계 차단.

## 탐지 대상
- 이메일
- 전화번호
- 주민번호 형식
- 계좌번호 형식
- 주소 패턴
- 실명 후보
- 내부 식별자
