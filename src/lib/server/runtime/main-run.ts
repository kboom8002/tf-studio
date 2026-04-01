import { TF8Block } from '../../shared/schemas/tf8'
import { assemblePrompt, VariableValues } from './assembly'
import { sanitizeInput, deSanitizeOutput } from './sanitization'
import { generateContent } from '../services/gemini'

export interface MainRunOptions {
  systemPrompt: string
  template: TF8Block
  variables: VariableValues
  model?: string
}

export interface MainRunResult {
  draftTokenized: string
  draftRestored: string
  sanitizationLogs: ReturnType<typeof sanitizeInput>['logs']
  executionTimeMs: number
}

/**
 * Main Run: 
 * 작성자가 제출한 변수를 TF8 스키마 기반 상수에 조립(Assemble)하고, 
 * 모델 호출 전 민감 정보 등(K블록)을 Sanitization 처리한 후 
 * LLM을 통해 초안(Draft)을 생성합니다. (불변조건 7: Main Run / Review Run 분리)
 */
export async function executeMainRun({
  systemPrompt,
  template,
  variables,
  model = 'gemini-2.5-pro'
}: MainRunOptions): Promise<MainRunResult> {
  const startTime = Date.now()

  // 1. 프롬프트 병합
  const assembledPrompt = assemblePrompt(template, variables)

  // 2. 파이프라인 Sanitization (K블록 필터링)
  const { sanitizedText, logs } = sanitizeInput(assembledPrompt)

  // 3. LLM API Call (생성)
  const response = await generateContent(systemPrompt, sanitizedText, model)
  const responseText = response.text || ''

  // 4. 파이프라인 DeSanitization (마스킹 복원 - 선택사항이나 Draft에서 복원 필요시)
  const mockDeSanitized = deSanitizeOutput(responseText, logs)

  return {
    draftTokenized: responseText,
    draftRestored: mockDeSanitized,
    sanitizationLogs: logs,
    executionTimeMs: Date.now() - startTime
  }
}
