# TF8 Domain Model Spec

## 핵심 원칙
- Prompt는 문자열이 아니라 객체다.
- 상수와 변수는 다른 생애주기를 가진다.
- 생성보다 상태 전이가 우선한다.
- 결과물뿐 아니라 생산 방식도 자산화한다.

## 핵심 엔티티
- Organization
- Workspace
- Membership
- TF8BlockSet
- Template
- TemplateBlock
- VariableSlot
- WizardSession
- PromptAssembly
- Run
- ReviewRun
- LintFinding
- HubEntry
- Certification
- StudioDefinition
- QualityRubric

## WizardSession 상태
draft → in_progress → generated → reviewed → ready_to_save → saved_to_hub → archived
예외:
- blocked_validation
- blocked_sanitization
- blocked_review
- run_failed

## Template 상태
draft → published → ssot_candidate → certified_ssot → deprecated → archived
