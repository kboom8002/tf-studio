import { getHubTemplates } from '@/lib/server/db/hub'
import { HubGrid } from '@/components/hub/hub-grid'

export default async function PromptHubPage() {
  // 임시 워크스페이스 ID (테스트용)
  const MOCK_WORKSPACE_ID = '00000000-0000-0000-0000-000000000000'
  
  // DB에서 실제 SSoT 템플릿 목록 로드
  let hubTemplates = []
  try {
    hubTemplates = await getHubTemplates(MOCK_WORKSPACE_ID)
  } catch (error) {
    console.error('Hub Load Error:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4 max-w-5xl mx-auto py-8">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold">Prompt Hub</h1>
        <p className="text-gray-600 mt-2">
          1회성 프롬프트 찌꺼기가 아닌, 조직의 인증된 문서 로직 자산(SSoT)만 등록되는 곳입니다.
        </p>
      </div>

      <HubGrid templates={hubTemplates} />
    </div>
  )
}
