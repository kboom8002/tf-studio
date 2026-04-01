import { WizardContainer } from '@/components/wizard/wizard-container'

export default function PressReleaseStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <WizardContainer 
        studioName="보도자료 스튜디오 (Press Release Studio)" 
        studioType="press_release" 
      />
    </div>
  )
}
