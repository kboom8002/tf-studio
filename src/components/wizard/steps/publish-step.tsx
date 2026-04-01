'use client'

import { useWizardStore } from '@/lib/client/store/wizard'
import { certifySSoTAction } from '@/app/actions/wizard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function PublishStep() {
  const { sessionId, inputs, draftOutput, reviewFeedback } = useWizardStore()
  const [isPublishing, setIsPublishing] = useState(false)
  const router = useRouter()
  
  const isApproved = reviewFeedback?.includes('APPROVED')

  const handlePublish = async () => {
    if (!sessionId) return
    setIsPublishing(true)
    const res = await certifySSoTAction(sessionId, inputs)
    setIsPublishing(false)
    if (res.success) {
      alert('SSoT 승인 완료 및 허브(Hub)에 자산 등록되었습니다.')
      router.push('/hub') // Hub로 튕김
    } else {
      alert('자산화 중 오류 발생: ' + res.error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">6. 자산화 및 SSoT 배포</h2>
      <p className="text-gray-500 text-sm">작성된 결과물을 팀의 자산으로 등록하고 공식 문서 상태(SSoT)로 승인합니다.</p>
      
      <div className="p-6 border rounded-md bg-slate-50 text-center space-y-4">
        {!isApproved ? (
          <div>
            <div className="text-orange-500 font-semibold mb-2">승인되지 않은 초안입니다.</div>
            <p className="text-sm text-gray-600">Review 단계를 통과해야(APPROVED) 공식 자산으로 등록할 수 있습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-green-600 font-bold text-lg">최종 산출물 검수 완료 (SSoT Ready)</div>
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isPublishing ? '자산 등록 중...' : 'Prompt Hub 등록 및 게시'}
            </button>
          </div>
        )}
      </div>

      {draftOutput && (
        <details className="mt-8 text-sm text-gray-500">
          <summary className="cursor-pointer font-medium">최종 문서 프리뷰 보기</summary>
          <div className="mt-2 p-4 border bg-white rounded-md whitespace-pre-wrap text-black">
            {draftOutput}
          </div>
        </details>
      )}
    </div>
  )
}
