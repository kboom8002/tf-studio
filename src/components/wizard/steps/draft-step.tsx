'use client'

import { useState } from 'react'
import { useWizardStore } from '@/lib/client/store/wizard'

import { runDraftAction } from '@/app/actions/wizard'

export function DraftStep() {
  const { inputs, setDraftOutput, setSessionId, draftOutput } = useWizardStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setErrorMsg(null)
    
    // Server Action 호출
    const res = await runDraftAction(inputs)
    
    if (res.success && res.draft) {
      setDraftOutput(res.draft)
      if (res.sessionId) setSessionId(res.sessionId)
    } else {
      setErrorMsg(res.error || '초안 생성 중 오류가 발생했습니다.')
    }
    
    setIsGenerating(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">4. Draft Generation (초안 생성)</h2>
      <p className="text-gray-500 text-sm">Main Run 엔진을 호출하여 T/A/S, K, F/L/O/W 기반으로 초안을 생성합니다.</p>
      
      {!draftOutput ? (
        <div className="space-y-2">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-4 bg-black text-white rounded-md font-semibold hover:bg-gray-800 disabled:opacity-50"
          >
            {isGenerating ? 'Main Run 엔진 구동 중 (Sanitization -> 생성)...' : '초안 생성하기'}
          </button>
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="block text-sm font-medium">생성된 초안 결과</label>
          <textarea 
            value={draftOutput} 
            onChange={(e) => setDraftOutput(e.target.value)}
            className="w-full border rounded-md p-2 text-sm min-h-[300px]"
          />
        </div>
      )}
    </div>
  )
}
