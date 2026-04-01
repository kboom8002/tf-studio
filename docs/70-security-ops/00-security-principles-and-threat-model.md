# Security Principles and Threat Model

## 원칙
- constants/variables 서버 병합
- raw input 최소 보존
- sanitization before generation
- tenant isolation by default
- auditability for high-risk actions
- least privilege
- no silent security downgrade

## 주요 위협
prompt injection, PII leakage, cross-tenant data exposure, unauthorized SSoT certification, governance drift
