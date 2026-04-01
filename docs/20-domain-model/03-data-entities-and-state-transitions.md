# Data Entities and State Transitions

## 핵심 엔티티
Organization, Workspace, Membership, Template, VariableSlot, WizardSession, SanitizedInputArtifact, Run, ReviewRun, LintFinding, HubEntry, Certification, AuditLog, UsageEvent, Job

## 핵심 상태
- WizardSession: draft → in_progress → generated → reviewed → ready_to_save → saved_to_hub → archived
- Template: draft → published → ssot_candidate → certified_ssot → deprecated → archived
- Certification: pending → approved / rejected → revoked
