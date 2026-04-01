import { WizardContainer } from '@/components/wizard/wizard-container'
import { getTemplateById } from '@/lib/server/db/hub'

export default async function PressReleaseStudioPage({ searchParams }: { searchParams: { templateId?: string } }) {
  let templateObj = null
  
  if (searchParams.templateId) {
    try {
      templateObj = await getTemplateById(searchParams.templateId)
    } catch (e) {
      console.error('Failed to load template', e)
    }
  }

  // tf8_schema에서 이전 사용자가 입력했던 초기 상태값(Context/variables)을 추출한다고 가정
  // (실제 프로덕션에서는 TF8 구조에서 variables를 매핑하는 파싱 로직 필요)
  const initialInputs = templateObj?.tf8_schema || undefined
  const initialTemplateName = templateObj?.title || undefined

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <WizardContainer 
        studioName="보도자료 스튜디오 (Press Release Studio)" 
        studioType="press_release" 
        initialTemplateId={templateObj?.id}
        initialInputs={initialInputs}
        initialTemplateName={initialTemplateName}
      />
    </div>
  )
}
