import { createClient } from '@/utils/supabase/server'
import { StudioType } from '../../shared/schemas/tf8'

export async function publishToHub(
  workspaceId: string,
  studioType: StudioType,
  title: string,
  tf8Schema: any,
  createdBy: string
) {
  const supabase = await createClient()
  
  // SSoT 승인 시 자동으로 Hub(템플릿 자산고)에 등록
  const { data, error } = await supabase
    .from('templates')
    .insert({
      workspace_id: workspaceId,
      studio_type: studioType,
      title: title,
      tf8_schema: tf8Schema,
      is_ssot: true,
      status: 'active',
      created_by: createdBy,
    })
    .select()
    .single()

  if (error) throw new Error(`Hub 자산화 실패: \${error.message}`)
  return data
}

export async function getHubTemplates(workspaceId: string, studioType?: StudioType) {
  const supabase = await createClient()
  
  let query = supabase
    .from('templates')
    .select('*')
    .eq('workspace_id', workspaceId)
    .eq('is_ssot', true) // Hub는 SSoT 인증된 것만 노출
    .eq('status', 'active')

  if (studioType) {
    query = query.eq('studio_type', studioType)
  }

  const { data, error } = await query

  if (error) throw new Error(`Hub 데이터 로드 실패: \${error.message}`)
  return data
}
