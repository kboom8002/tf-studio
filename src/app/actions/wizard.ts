'use server'

import { executeMainRun } from '@/lib/server/runtime/main-run'
import { executeReviewRun } from '@/lib/server/runtime/review-run'
import { TF8Block } from '@/lib/shared/schemas/tf8'
import { VariableValues } from '@/lib/server/runtime/assembly'
import { createWizardSession, updateSessionDraft, updateSessionReview } from '@/lib/server/db/session'
import { logAuditEvent } from '@/lib/server/audit/logger'

const MOCK_WORKSPACE_ID = '00000000-0000-0000-0000-000000000000'
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000000'

// 예시용 기본 TF8 구조체 템플릿
const DEFAULT_TEMPLATE: TF8Block = {
  id: 'tmpl-001',
  title: 'TASKFLOW Studio App 기본 템플릿',
  blocks: [
    {
      id: 'b-001',
      isConstant: false,
      content: '다음의 목표와 대상을 가진 문서를 작성합니다:\n목표: {{tas_target}}\n대상: {{tas_audience}}',
      variables: [
        { id: 'tas_target', name: 'Target', type: 'text', required: true },
        { id: 'tas_audience', name: 'Audience', type: 'text', required: true }
      ]
    },
    {
      id: 'b-002',
      isConstant: false,
      content: '핵심 내용 및 입력 지식(Sanitization 대상):\n[K: {{k_knowledge}}]',
      variables: [
        { id: 'k_knowledge', name: 'Knowledge', type: 'text', required: true }
      ]
    },
    {
      id: 'b-003',
      isConstant: false,
      content: '다음 구조/분량 지침을 따릅니다:\n형식: {{flow_format}}\n분량: {{flow_length}}',
      variables: [
        { id: 'flow_format', name: 'Format', type: 'text', required: true },
        { id: 'flow_length', name: 'Length', type: 'text', required: true }
      ]
    }
  ]
}

export async function runDraftAction(inputs: Record<string, any>) {
  let sessionId = null

  try {
    // 1. Session Start Logging & Initialization (Database)
    try {
      const session = await createWizardSession(MOCK_WORKSPACE_ID, 'press_release', MOCK_USER_ID)
      sessionId = session?.id
      await logAuditEvent({ orgId: MOCK_WORKSPACE_ID, workspaceId: MOCK_WORKSPACE_ID, userId: MOCK_USER_ID, eventName: 'SESSION_START', payload: { inputs } })
    } catch (e) {
      console.warn('DB 연동이 처리되지 않아 세션을 건너뜁니다.', e)
    }

    // 2. Main Run Model Execution
    const result = await executeMainRun({
      systemPrompt: 'You are an expert ghostwriter creating professional content following specific constraints and provided knowledge.',
      template: DEFAULT_TEMPLATE,
      variables: inputs as VariableValues,
      model: 'gemini-2.5-pro'
    })
    
    // 3. Save Draft to Database
    if (sessionId) {
      try {
        await updateSessionDraft(sessionId, inputs, result.draftRestored)
        await logAuditEvent({ orgId: MOCK_WORKSPACE_ID, workspaceId: MOCK_WORKSPACE_ID, userId: MOCK_USER_ID, eventName: 'DRAFT_GENERATED', payload: { sessionId } })
      } catch (e) {
         console.warn('DB 초안 저장 실패:', e)
      }
    }

    return { success: true, draft: result.draftRestored, logs: result.sanitizationLogs, sessionId }
  } catch (error: any) {
    console.error('Draft Run Error:', error)
    return { success: false, error: error.message }
  }
}

export async function runReviewAction(draft: string, sessionId?: string) {
  try {
    const result = await executeReviewRun({
      draft,
      reviewGuidelines: '1. 타겟 독자에 어조가 맞는지 2. [K: ...] 등 민감 내용이 누출되거나 환각(Hallucination)이 없는지 3. 불필요하게 늘어지지 않는지.',
      model: 'gemini-2.5-pro'
    })
    
    // 4. Update Review Result in Database
    if (sessionId) {
      try {
        await updateSessionReview(sessionId, result.reviewFeedback, result.approved)
        await logAuditEvent({ orgId: MOCK_WORKSPACE_ID, workspaceId: MOCK_WORKSPACE_ID, userId: MOCK_USER_ID, eventName: 'REVIEW_COMPLETED', payload: { sessionId, approved: result.approved } })
      } catch (e) {
        console.warn('DB 검수 결과 저장 실패:', e)
      }
    }

    return { success: true, feedback: result.reviewFeedback, approved: result.approved }
  } catch (error: any) {
    console.error('Review Run Error:', error)
    return { success: false, error: error.message }
  }
}

import { publishToHub } from '@/lib/server/db/hub'

export async function certifySSoTAction(sessionId: string, inputs: Record<string, any>) {
  try {
    // 5. Publish to Hub & SSoT Verification
    const hubTemplate = await publishToHub(
      MOCK_WORKSPACE_ID,
      'press_release',
      '[SSoT] 템플릿 - ' + new Date().toLocaleDateString(),
      inputs, // In reality, this would be a TF8 Schema
      MOCK_USER_ID
    )

    await logAuditEvent({ orgId: MOCK_WORKSPACE_ID, workspaceId: MOCK_WORKSPACE_ID, userId: MOCK_USER_ID, eventName: 'SSOT_CERTIFIED', payload: { sessionId, hubTemplateId: hubTemplate.id } })

    return { success: true, hubId: hubTemplate.id }
  } catch (error: any) {
    console.error('SSoT Certification Error:', error)
    return { success: false, error: error.message }
  }
}
