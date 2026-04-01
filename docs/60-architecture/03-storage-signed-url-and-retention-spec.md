# Storage, Signed URL and Retention Spec

## 버킷
- raw-inputs
- sanitized-artifacts
- exports
- studio-assets

## 원칙
- 업로드/다운로드는 signed URL 기반
- raw inputs 장기 보관 최소화
- Hub에는 reusable template logic만 저장
- raw variable data는 장기 자산에 남기지 않음
