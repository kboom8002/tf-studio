---
name: "studio-implementation-check"
description: "Studio App 구현 시 공통 Core OS와 장르별 규칙을 함께 점검하는 스킬"
version: "0.1.0"
---

이 스킬은 press_release, meeting_minutes, announcement_email 구현에 쓴다.

먼저 읽을 문서:
- /docs/40-studio-apps/00-studio-apps-spec-press-release-meeting-minutes-announcement-email.md
- 해당 studio 하위 spec / rubric / golden set
- /docs/50-ux-ia/01-studio-wizard-ia.md
- /docs/20-domain-model/01-tf8-json-zod-schema-pack-spec.md

체크리스트:
- studio-specific input/output schema가 반영되었는가
- studio-specific rubric이 반영되었는가
- critical blocker 조건이 반영되었는가
- 공통 Wizard shell을 재사용하는가
- studio 전용 로직이 Core OS를 오염시키지 않는가

출력 형식:
- 공통 재사용 요소
- studio-specific 요소
- 빠진 장르 규칙
- 리스크
