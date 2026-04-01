import { createClient } from '@/utils/supabase/server'

export type AuditEventName = 
  | 'SESSION_START' 
  | 'DRAFT_GENERATED' 
  | 'SANITIZATION_TRIGGERED' 
  | 'REVIEW_COMPLETED' 
  | 'SSOT_CERTIFIED'

export interface AuditRecord {
  id: string
  eventName: AuditEventName
  userId: string
  orgId: string
  workspaceId: string
  timestamp: Date
  payload: Record<string, any>
}

/**
 * Audit Logger
 * 
 * 누가, 언제, 무엇을(어떤 모델로) 실행하고 승인했는지 불변의 로그로 기록합니다.
 */
export async function logAuditEvent(record: Omit<AuditRecord, 'id' | 'timestamp'>) {
  const supabase = await createClient()

  // Supabase RLS 및 감사 로깅용 Insert
  await supabase.from('audit_logs').insert({
    org_id: record.orgId,
    workspace_id: record.workspaceId,
    user_id: record.userId,
    event_name: record.eventName,
    payload: record.payload,
  })

  console.log(`[AUDIT LOG SAVED] \${record.eventName} by \${record.userId}`)
}
