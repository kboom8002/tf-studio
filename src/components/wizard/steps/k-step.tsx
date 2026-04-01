'use client'

import { useWizardStore } from '@/lib/client/store/wizard'

export function KStep() {
  const { inputs, updateInput } = useWizardStore()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">2. Knowledge (K 블록)</h2>
      <p className="text-gray-500 text-sm">LLM에 전달될 핵심 정보입니다. 이 필드는 모델 전송 전 자동 비식별화(Sanitization)됩니다.</p>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">핵심 내용 (민감 정보 포함)</label>
        <textarea 
          value={inputs['k_knowledge'] || ''} 
          onChange={(e) => updateInput('k_knowledge', e.target.value)}
          className="w-full border rounded-md p-2 text-sm min-h-[150px]"
          placeholder="[K: 민감한 사내 정보나 기밀 데이터 등을 여기에 입력...]"
        />
      </div>
    </div>
  )
}
