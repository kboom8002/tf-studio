# DOCUMENT MAP

## 전체 구조 한눈에 보기
1. 진입과 공통 이해: `/docs/README.md`, `/docs/00-start-here/*`
2. 제품 전략: `/docs/10-product/*`
3. 도메인 정본: `/docs/20-domain-model/*`
4. Wizard와 런타임: `/docs/30-wizard-and-runtime/*`
5. Studio Apps: `/docs/40-studio-apps/*`
6. 구현과 운영: `/docs/50-ux-ia/*`, `/docs/60-architecture/*`, `/docs/70-security-ops/*`, `/docs/80-delivery/*`, `/docs/90-adrs/*`

## 문서 의존 관계
`제품 전략` → `도메인 모델` → `Wizard/Prompt Runtime` → `Studio App 실행 계약` → `UX / 기술 아키텍처` → `보안 / 운영 / 거버넌스` → `실행 백로그`

## 핵심 정본 문서
- 제품 정본: `/docs/10-product/00-product-brief.md`
- 도메인 정본: `/docs/20-domain-model/00-tf8-domain-model-spec.md`, `/docs/20-domain-model/01-tf8-json-zod-schema-pack-spec.md`
- 런타임 정본: `/docs/30-wizard-and-runtime/00-6-step-wizard-flow-spec.md`, `/docs/30-wizard-and-runtime/01-prompt-assembly-and-constants-variables-isolation-spec.md`, `/docs/30-wizard-and-runtime/02-sanitization-and-red-team-review-pipeline-spec.md`
- Studio 정본: `/docs/40-studio-apps/00-studio-apps-spec-press-release-meeting-minutes-announcement-email.md`
- 거버넌스 정본: `/docs/20-domain-model/02-rbac-approval-and-ssot-governance-spec.md`
- 기술 아키텍처 정본: `/docs/60-architecture/00-system-architecture-nextjs-supabase-gemini-spec.md`
