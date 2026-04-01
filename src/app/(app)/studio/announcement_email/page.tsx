import { WizardContainer } from '@/components/wizard/wizard-container'
import { getTemplateById } from '@/lib/server/db/hub'

export default async function AnnouncementEmailStudioPage({ searchParams }: { searchParams: { templateId?: string } }) {
  let templateObj = null
  
  if (searchParams.templateId) {
    try {
      templateObj = await getTemplateById(searchParams.templateId)
    } catch (e) {
      console.error('Failed to load template', e)
    }
  }

  const initialInputs = templateObj?.tf8_schema || undefined
  const initialTemplateName = templateObj?.title || undefined

  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <WizardContainer 
        studioName="사내 공지 이메일 스튜디오 (Announcement Email)" 
        studioType="announcement_email" 
        initialTemplateId={templateObj?.id}
        initialInputs={initialInputs}
        initialTemplateName={initialTemplateName}
      />
    </div>
  )
}
