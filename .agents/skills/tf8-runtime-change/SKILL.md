---
name: "tf8-runtime-change"
description: "TF8 schema, Prompt Assembly, main/review run 변경용 스킬"
version: "0.1.0"
---

이 스킬은 TF8 runtime 관련 변경에 쓴다.

먼저 읽을 문서:
- /docs/20-domain-model/00-tf8-domain-model-spec.md
- /docs/20-domain-model/01-tf8-json-zod-schema-pack-spec.md
- /docs/30-wizard-and-runtime/01-prompt-assembly-and-constants-variables-isolation-spec.md
- /docs/30-wizard-and-runtime/02-sanitization-and-red-team-review-pipeline-spec.md

체크리스트:
- TF8 block 의미가 바뀌는가
- constants/variables 분리가 유지되는가
- final merge가 서버에 남아 있는가
- studio output schema에 영향이 있는가
- review run contract에 영향이 있는가
- parse fallback이 필요한가

출력 형식:
- runtime 변경 범위
- 영향 schema
- 영향 studio
- 위험 포인트
- fallback / test 계획
