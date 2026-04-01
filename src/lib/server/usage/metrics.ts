/**
 * Usage Metrics & Observability
 * 
 * 시스템 전반의 AI 호출(Main/Review Run)에 대한 품질 측정, 토큰 사용량, 지연시간(Latency) 모니터링
 */

export interface LLMUsageMetric {
  id: string
  sessionId: string
  runType: 'main' | 'review'
  model: string
  executionTimeMs: number
  estimatedTokens?: number
  timestamp: Date
}

export async function recordLLMUsage(metric: Omit<LLMUsageMetric, 'id' | 'timestamp'>) {
  const usageRecord: LLMUsageMetric = {
    ...metric,
    id: crypto.randomUUID(),
    timestamp: new Date()
  }

  // 실제 연동 시: Datadog, Sentry, 혹은 Supabase Analytics 테이블에 전송
  console.log(`[METRICS] \${usageRecord.runType.toUpperCase()} Run (Session: \${usageRecord.sessionId})`)
  console.log(`[METRICS] Model: \${usageRecord.model} | Time: \${usageRecord.executionTimeMs}ms | Tokens: \${usageRecord.estimatedTokens || 'Unknown'}`)
  
  return usageRecord
}
