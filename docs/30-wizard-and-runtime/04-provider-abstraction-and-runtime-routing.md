# Provider Abstraction and Runtime Routing

## 원칙
- Gemini 기본 provider
- interface first
- structured output 우선
- provider-specific envelope는 adapter 내부 생성
- task type(main/review)에 따라 라우팅 가능

## 권장 인터페이스
- generateStructured<T>
- reviewStructured<T>
- streamText
- countTokens
