import { generateContent } from '../services/gemini'

export interface ReviewRunOptions {
  draft: string
  reviewGuidelines: string
  model?: string
}

export interface ReviewRunResult {
  reviewFeedback: string
  approved: boolean
  executionTimeMs: number
}

/**
 * Review Run (Red-Team):
 * 작성된 초안을 기반으로 독립된 컨텍스트에서 검수/Red-Teaming 구동을 수행.
 * 불변조건 7: Main Run / Review Run 분리에 따라 완전 별개의 LLM 세션/시스템 가이드 위에서 실행.
 */
export async function executeReviewRun({
  draft,
  reviewGuidelines,
  model = 'gemini-2.5-pro'
}: ReviewRunOptions): Promise<ReviewRunResult> {
  const startTime = Date.now()

  // 리뷰어 페르소나와 검수 가이드를 System 프롬프트로 주입
  const systemPrompt = `You are a critical, detail-oriented Red-Team Editor for TASKFLOW. 
Your job is to strictly review the following draft based on these guidelines:
${reviewGuidelines}

Provide structural feedback, catch any hallucination or banned content, and evaluate if this document passes the criteria.
End your review exactly with "[STATUS: APPROVED]" if it's completely perfect, or "[STATUS: REJECTED]" if changes are needed.`

  const userPrompt = `Here is the DRAFT to review:\n\n${draft}`

  const response = await generateContent(systemPrompt, userPrompt, model)
  const responseText = response.text || ''

  // 간단한 승인 판별 파서
  const isApproved = responseText.includes('[STATUS: APPROVED]')

  return {
    reviewFeedback: responseText,
    approved: isApproved,
    executionTimeMs: Date.now() - startTime
  }
}
