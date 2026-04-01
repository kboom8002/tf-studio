# Supabase Schema and RLS Spec

## 핵심 테이블
organizations, workspaces, memberships, templates, variable_slots, wizard_sessions, sanitized_inputs, sanitization_logs, runs, review_runs, lint_findings, hub_entries, certifications, audit_logs, usage_events, jobs

## RLS 원칙
- organization/workspace scope를 모든 핵심 테이블에 반영
- role은 membership을 통해 해석
- reusable assets와 raw execution data 분리
- action-level authorization을 RLS와 함께 사용
