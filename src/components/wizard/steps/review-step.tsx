'use client'

import { useState } from 'react'
import { useWizardStore } from '@/lib/client/store/wizard'

import { runReviewAction } from '@/app/actions/wizard'

export function ReviewStep() {
  const { sessionId, draftOutput, reviewFeedback, setReviewFeedback } = useWizardStore()
  const [isReviewing, setIsReviewing] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleReview = async () => {
    setIsReviewing(true)
    setErrorMsg(null)
    
    // Server Action 호출 (sessionId 전달)
    const res = await runReviewAction(draftOutput || '', sessionId || undefined)
    
    if (res.success && res.feedback) {
      setReviewFeedback(res.feedback)
    } else {
      setErrorMsg(res.error || '검수 중 오류가 발생했습니다.')
    }
    
    setIsReviewing(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">5. Review & Revise (레드팀 검수)</h2>
      <p className="text-gray-500 text-sm">단절된 컨텍스트(Review Run)에서 프롬프트 엔지니어링 표준 및 정책 위반을 교차 검증합니다.</p>
      
      {!draftOutput ? (
        <div className="text-red-500 text-sm p-4 bg-red-50 rounded-md">이전 단계에서 초안이 생성되지 않았습니다.</div>
      ) : (
        <>
          <div className="space-y-2">
            <button 
              onClick={handleReview}
              disabled={isReviewing}
              className="w-full py-4 bg-slate-800 text-white rounded-md font-semibold hover:bg-slate-700 disabled:opacity-50"
            >
              {isReviewing ? '독립된 모델 컨텍스트에서 Red-Team 검수 중...' : 'Review Run (검수) 실행'}
            </button>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          </div>
          
          {reviewFeedback && (
            <div className={`mt-4 p-4 border rounded-md \${reviewFeedback.includes('REJECTED') ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
              <pre className="whitespace-pre-wrap text-sm">{reviewFeedback}</pre>
            </div>
          )}
        </>
      )}
    </div>
  )
}
