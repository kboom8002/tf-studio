# ADR 004 SANITIZATION BEFORE GENERATION

K 블록은 generation 전에 반드시 sanitization을 거친다. unresolved PII가 남아 있으면 실행을 차단한다.
