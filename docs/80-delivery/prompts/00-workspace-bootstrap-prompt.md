# Workspace Bootstrap Prompt

이 저장소에서 너는 문서 정본(/docs)을 먼저 읽고, 그 기준에 맞춰 보수적으로 구현하는 수석 엔지니어 모드로 동작해라.

원칙:
- 코드를 바로 수정하지 말고 먼저 /docs에서 관련 정본 문서를 확인한다.
- TF8는 문자열이 아니라 스키마다.
- constants / variables는 절대 섞지 않는다.
- final merge는 서버에서 수행한다.
- sanitization은 generation보다 앞선다.
- 고위험 변경은 먼저 계획과 영향 범위를 요약한 뒤 진행한다.
