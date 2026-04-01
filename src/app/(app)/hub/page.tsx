import Link from 'next/link'

// 임시 템플릿 데이터 (자산화된 허브 등록 형태)
const hubTemplates = [
  { id: 'h-01', title: '월간 성과 보고 양식 v2', studio: 'Meeting Minutes', isSSoT: true },
  { id: 'h-02', title: '투자사 대상 신제품 출시 보도자료', studio: 'Press Release', isSSoT: true },
  { id: 'h-03', title: '전사 휴무 안내 이메일 세트', studio: 'Announcement Email', isSSoT: true },
]

export default function PromptHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4 max-w-5xl mx-auto py-8">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold">Prompt Hub</h1>
        <p className="text-gray-600 mt-2">
          1회성 프롬프트 찌꺼기가 아닌, 조직의 인증된 문서 로직 자산(SSoT)만 등록되는 곳입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubTemplates.map(template => (
          <div key={template.id} className="p-6 bg-white border rounded-xl shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                  {template.studio}
                </span>
                {template.isSSoT && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center">
                    ✓ SSoT 승인
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold">{template.title}</h2>
            </div>
            <Link 
              href={`/studio/\${template.studio.toLowerCase().replace(' ', '_')}?templateId=\${template.id}`}
              className="text-center w-full py-2 bg-gray-100 hover:bg-gray-200 text-sm font-semibold rounded-md"
            >
              이 템플릿으로 작성 시작
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
