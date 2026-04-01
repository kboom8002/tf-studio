# ADR 002 TF8 AS SCHEMA NOT STRING

TF8은 문자열 템플릿이 아니라 데이터 스키마로 취급한다. 이렇게 해야 Wizard, Prompt Assembly, structured output, Hub 자산화, 검수 규칙이 안정적으로 연결된다.
