import Link from 'next/link'
import { getHubTemplates } from '@/lib/server/db/hub'

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubTemplates.length === 0 ? (
          <div className="col-span-full py-10 text-center text-gray-500 bg-white border rounded border-dashed">
            아직 SSoT 승인을 받은 에셋이 없습니다. Studio에서 하나 생성해 보세요!
          </div>
        ) : (
          hubTemplates.map((template: any) => (
            <div key={template.id} className="p-6 bg-white border rounded-xl shadow-sm flex flex-col justify-between">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                    {template.studio_type}
                  </span>
                  {template.is_ssot && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center">
                      ✓ SSoT 승인
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold">{template.title}</h2>
              </div>
              <Link 
                href={`/studio/${template.studio_type}?templateId=${template.id}`}
                className="text-center w-full py-2 bg-gray-100 hover:bg-gray-200 text-sm font-semibold rounded-md"
              >
                이 템플릿으로 작성 시작
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
