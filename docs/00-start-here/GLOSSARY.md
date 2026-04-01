# GLOSSARY

## Core OS 관련 용어
### TASKFLOW Document OS
TF8 기반의 공통 문서 운영체제 계층. Wizard, Prompt Assembly, Sanitization, Review, Hub, Governance를 포함한다.

### Studio App
Core OS 위에 올라가는 장르별 실행 앱. 예: Press Release, Meeting Minutes, Announcement Email

### TF8
- T_Task
- A_Audience
- S_Situation
- K_Knowledge
- F_Flow
- L_LanguageTone
- O_OutputFormat
- W_WarningGuardrail

### VariableSlot
사용자가 입력해야 할 가변 슬롯 정의.

### Prompt Assembly
상수와 변수, sanitization 결과를 병합해 최종 TF8 payload와 provider envelope를 만드는 런타임 과정.

## Wizard 관련 용어
### Wizard
자유 텍스트 대신 6단계 상태 머신을 따라 입력하게 만드는 UI/UX 구조.

### WizardSession
한 번의 문서 작성 실행 세션.

### Blocker
다음 단계로 넘어가기 전에 반드시 해결해야 하는 차단 조건.

## Review 관련 용어
### Main Run
문서 초안을 생성하는 메인 LLM 실행 기록.

### Review Run
검수용 LLM 실행 기록.

### Lint Finding
Review Run이 생성한 개별 품질/리스크 문제 항목.

## Hub / Governance 관련 용어
### Prompt Hub
조직 내부 템플릿 자산 저장소.

### SSoT
조직 공식으로 인증된 문서 생성 로직의 정본.

### RBAC
Role-Based Access Control.

### RLS
Row Level Security.
