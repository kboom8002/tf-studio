/**
 * Sanitization Pipeline
 * 
 * 불변조건 6: K 블록(Knowledge Block, 내부 민감정보 등)은 sanitization 없이 직접 LLM에 보내지 않는다.
 */

export interface SanitizationResult {
  sanitizedText: string
  logs: SanitizationLog[]
}

export interface SanitizationLog {
  id: string
  original: string
  replacedWith: string
  reason: string
}

export function sanitizeInput(rawInput: string): SanitizationResult {
  // 실제 프로덕션 단계에서는 PII 탐지기나 정규표현식, 혹은 별도 경량 LLM 필터 모델을 태웁니다.
  // 본 Phase 2 데모 로직: 특정 민감 패턴 하드코딩 필터 (예: [K: 내부 기밀] 등)
  
  const logs: SanitizationLog[] = []
  
  let sanitizedText = rawInput

  // 단순 예시 정규식: [K: ... ] 포맷으로 작성된 K 블록을 마스킹
  const kBlockRegex = /\[K:\s*(.*?)\]/g
  
  sanitizedText = sanitizedText.replace(kBlockRegex, (match, p1) => {
    const replacement = `[CONFIDENTIAL_REDACTED_${Date.now()}]`
    logs.push({
      id: crypto.randomUUID(),
      original: match,
      replacedWith: replacement,
      reason: 'K-Block Redacted before Generation',
    })
    return replacement
  })

  // TODO: Add more advanced PII detection (주민번호, 이메일, 계좌 등)
  
  return {
    sanitizedText,
    logs
  }
}

export function deSanitizeOutput(sanitizedOutput: string, logs: SanitizationLog[]): string {
  // LLM이 마스킹된 토큰 그대로 결과물을 가져왔을 때, 다시 복원하는 로직
  let restoredText = sanitizedOutput

  for (const log of logs) {
    const escapedToken = log.replacedWith.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(escapedToken, 'g')
    restoredText = restoredText.replace(regex, log.original)
  }

  return restoredText
}
