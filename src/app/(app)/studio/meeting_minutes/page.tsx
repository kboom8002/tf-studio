import { WizardContainer } from '@/components/wizard/wizard-container'

export default function MeetingMinutesStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <WizardContainer 
        studioName="회의록 스튜디오 (Meeting Minutes Studio)" 
        studioType="meeting_minutes" 
      />
    </div>
  )
}
