# System Architecture Spec
## Next.js + Supabase + Gemini for TASKFLOW Document OS

## 기술 스택
- Next.js App Router
- React / TypeScript / Zod
- Supabase Postgres / Auth / RLS / Storage
- Gemini 기본 provider + provider abstraction
- job table + worker/poller 패턴

## 계층
1. Studio UI Layer
2. Application Flow Layer
3. Domain Service Layer
4. Persistence Layer
5. AI Orchestration Layer
6. Observability and Governance Layer

## 권장 폴더 구조
- app/(app)/studio/[studioType]/...
- app/(app)/hub/...
- app/(app)/admin/...
- lib/server/services, runtime, governance, audit, usage
- lib/shared/schemas, types, studio-presets
