import { createClient } from '@/utils/supabase/server'
import { Database } from '../../shared/types/database'
import { SessionStatus, StudioType } from '../../shared/schemas/tf8'

export async function createWizardSession(
  workspaceId: string,
  studioType: StudioType,
  authorId: string,
  templateId?: string
) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('wizard_sessions')
    .insert({
      workspace_id: workspaceId,
      studio_type: studioType,
      author_id: authorId,
      template_id: templateId || null,
      status: 'draft',
    })
    .select()
    .single()

  if (error) throw new Error(`세션 생성 실패: \${error.message}`)
  return data
}

export async function updateSessionDraft(
  sessionId: string,
  inputs: Record<string, any>,
  draftOutput: string
) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('wizard_sessions')
    .update({
      inputs,
      draft_output: draftOutput,
      status: 'generated',
    })
    .eq('id', sessionId)

  if (error) throw new Error(`초안 저장 실패: \${error.message}`)
}

export async function updateSessionReview(
  sessionId: string,
  reviewFeedback: string,
  isApproved: boolean
) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('wizard_sessions')
    .update({
      review_feedback: reviewFeedback,
      status: isApproved ? 'approved' : 'reviewed',
    })
    .eq('id', sessionId)

  if (error) throw new Error(`리뷰 저장 실패: \${error.message}`)
}

export async function getSession(sessionId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('wizard_sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (error) throw new Error(`세션 조회 실패: \${error.message}`)
  return data
}
