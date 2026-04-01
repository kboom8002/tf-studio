# Operating Protocol

## 기능 착수 예시

```text
이번 작업은 Press Release Studio의 Step 2 입력 정리 화면 구현이다.
목표는 fact 입력, 핵심 수치 입력, 임원 코멘트 원문 입력, sanitization preview를 한 화면에서 다루게 하는 것이다.
먼저 docs-orientation과 taskflow-feature-planning 방식으로 문서를 읽고, 영향 레이어를 정리한 뒤 구현 계획을 보여줘.
```

## 고위험 변경 예시

```text
이번 작업은 고위험 변경이다.
TF8 output schema와 ReviewRun contract를 함께 바꾸려 한다.
governance-safe-change와 tf8-runtime-change 관점으로 먼저 영향 범위와 rollback 계획만 정리해줘. 구현은 그 다음이다.
```

## 마감 점검 예시

```text
이제 release-readiness-taskflow 관점으로 최종 점검만 해줘.
TF8 schema, sanitization, review run, Hub save, SSoT governance, audit, usage events까지 확인하고, 남은 리스크를 정리해줘.
```
