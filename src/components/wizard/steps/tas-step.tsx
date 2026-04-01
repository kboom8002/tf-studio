'use client'

import { useWizardStore } from '@/lib/client/store/wizard'

export function TASStep() {
  const { inputs, updateInput } = useWizardStore()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">1. Target / Audience / Structure</h2>
      <p className="text-gray-500 text-sm">과업의 목표(Target), 주요 독자(Audience), 기본 구조(Structure)를 설정하세요.</p>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Target (목표)</label>
        <input 
          type="text" 
          value={inputs['tas_target'] || ''} 
          onChange={(e) => updateInput('tas_target', e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
          placeholder="예: 신규 AI 스튜디오 앱 출시 안내"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Audience (독자)</label>
        <input 
          type="text" 
          value={inputs['tas_audience'] || ''} 
          onChange={(e) => updateInput('tas_audience', e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
          placeholder="예: IT 전문 기자, 기존 고객"
        />
      </div>
    </div>
  )
}
