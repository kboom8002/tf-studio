# TF8 JSON / Zod Schema Pack Spec

## 설계 원칙
- 도메인 정본은 schema다.
- Zod는 앱 내부 검증에, JSON Schema는 외부 계약과 LLM structured output에 쓴다.
- 모든 핵심 엔티티는 versioned schema를 가진다.
- schema는 narrow해야 한다.

## 공통 enum
- StudioType: press_release / meeting_minutes / announcement_email
- Role: org_owner / workspace_admin / editor_reviewer / author / viewer
- Severity: low / medium / high / critical
- SessionStatus
- TemplateStatus

## 핵심 스키마
- TF8BlockSchema
- PartialTF8BlockSchema
- VariableSlotSchema
- TemplateSchema
- TemplateBlockSchema
- WizardSessionSchema
- PromptAssemblySnapshotSchema
- SanitizationLogEntrySchema
- SanitizedInputArtifactSchema
- RunSchema
- LintFindingSchema
- ReviewRunSchema
- HubEntrySchema
- CertificationSchema
- PressReleaseInput/Output
- MeetingMinutesInput/Output
- AnnouncementEmailInput/Output
