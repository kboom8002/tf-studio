# Main Generation and Review Run Contracts

## Main Run
입력: PromptAssembly.finalTF8, studioType, output schema, provider options
출력: rendered text, structured output, token usage, latency, status

## Review Run
입력: Main Run output, W block, studio rubric / rules
출력: LintFinding[], severity summary, optional score, status

## 원칙
- 별도 id
- silent failure 금지
- review 실패는 publish blocker가 될 수 있음
