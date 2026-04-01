# AGENT ENTRYPOINT

이 문서는 TASKFLOW 문서 OS 저장소에서 작업을 시작하는 사람과 AI 에이전트를 위한 **최우선 진입 문서**다.

## 먼저 읽을 문서
1. `/docs/00-start-here/DOCUMENT-MAP.md`
2. `/docs/00-start-here/READING-ORDER.md`
3. `/docs/00-start-here/GLOSSARY.md`
4. `/docs/10-product/00-product-brief.md`
5. `/docs/20-domain-model/00-tf8-domain-model-spec.md`
6. `/docs/20-domain-model/01-tf8-json-zod-schema-pack-spec.md`
7. `/docs/30-wizard-and-runtime/00-6-step-wizard-flow-spec.md`
8. `/docs/30-wizard-and-runtime/01-prompt-assembly-and-constants-variables-isolation-spec.md`
9. `/docs/30-wizard-and-runtime/02-sanitization-and-red-team-review-pipeline-spec.md`
10. `/docs/60-architecture/00-system-architecture-nextjs-supabase-gemini-spec.md`

## 불변조건
- TF8은 문자열 장식이 아니라 시스템 전반의 데이터 스키마다.
- constants와 variables는 저장, 편집, 실행, 자산화 전 과정에서 분리되어야 한다.
- 최종 병합은 서버에서 수행한다.
- 자유 입력창이 아니라 6단계 Wizard가 메인 표면이다.
- sanitization은 generation보다 앞선다.
- main run과 review run은 분리된 실행이어야 한다.
- Hub에는 재사용 가능한 로직만 남고 raw one-off data는 남지 않는다.
- SSoT는 단순 배지가 아니라 승인 가능한 거버넌스 상태다.
- organization / workspace / membership / role / RLS는 추정해서 바꾸면 안 된다.
- Studio Apps는 Core OS 위의 장르별 실행 앱이다.
