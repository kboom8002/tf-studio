# Prompt Assembly and Constants-Variables Isolation Spec

## 원칙
- Prompt는 조립 가능한 객체다.
- 상수는 정책 자산이다.
- 변수는 실행 시점 값이다.
- 최종 병합은 서버에서 수행한다.
- 프리셋 전환은 변수 보존, 상수 교체가 원칙이다.

## Prompt Assembly 단계
1. Template Resolution
2. Variable Binding
3. Sanitization Pass
4. TF8 Finalization
5. Provider Envelope Construction
6. Execution Record
