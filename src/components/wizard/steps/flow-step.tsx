'use client'

import { useWizardStore } from '@/lib/client/store/wizard'

export function FLOWStep() {
  const { inputs, updateInput } = useWizardStore()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b pb-2">3. Format / Length / Objective / Words</h2>
      <p className="text-gray-500 text-sm">최종 문서의 분량과 형식, 어조 등 제약조건을 설정합니다.</p>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">형식 체재 (Format)</label>
        <select 
          value={inputs['flow_format'] || 'bullet'} 
          onChange={(e) => updateInput('flow_format', e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
        >
          <option value="bullet">개조식 (Bullet Points)</option>
          <option value="paragraph">서술형 (Paragraphs)</option>
          <option value="email">이메일 (Email Body)</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">요구 글자 수 (Length)</label>
        <input 
          type="text" 
          value={inputs['flow_length'] || ''} 
          onChange={(e) => updateInput('flow_length', e.target.value)}
          className="w-full border rounded-md p-2 text-sm"
          placeholder="예: 500단어 이내"
        />
      </div>
    </div>
  )
}
