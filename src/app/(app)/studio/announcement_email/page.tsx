import { WizardContainer } from '@/components/wizard/wizard-container'

export default function AnnouncementEmailStudioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 px-4">
      <WizardContainer 
        studioName="공지 이메일 스튜디오 (Announcement Email Studio)" 
        studioType="announcement_email" 
      />
    </div>
  )
}
