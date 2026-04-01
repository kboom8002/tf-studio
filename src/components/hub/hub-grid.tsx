'use client'

import { useState } from 'react'
import Link from 'next/link'

export function HubGrid({ templates }: { templates: any[] }) {
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.length === 0 ? (
          <div className="col-span-full py-10 text-center text-gray-500 bg-white border rounded border-dashed">
            아직 SSoT 승인을 받은 에셋이 없습니다. Studio에서 하나 생성해 보세요!
          </div>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="p-6 bg-white border rounded-xl shadow-sm flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                    {template.studio_type}
                  </span>
                  {template.is_ssot && (
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded flex items-center">
                      ✓ SSoT 인증 자산
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-slate-900">{template.title}</h2>
              </div>
              <button
                onClick={() => setSelectedTemplate(template)}
                className="text-center w-full py-2 bg-slate-100 hover:bg-slate-200 text-sm font-semibold rounded-md transition-colors"
              >
                세부 내용 미리보기
              </button>
            </div>
          ))
        )}
      </div>

      {/* Preview Modal Overlay */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto flex flex-col">
            <div className="border-b px-6 py-4 flex justify-between items-center bg-slate-50 rounded-t-xl">
              <div>
                <div className="text-xs font-semibold text-blue-600 mb-1">{selectedTemplate.studio_type}</div>
                <h3 className="text-xl font-bold text-slate-900">{selectedTemplate.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="text-slate-400 hover:text-slate-600 p-2"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 flex-1 space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 border-b pb-2 mb-3">미리보기 (TF8 구조)</h4>
                <div className="space-y-4">
                  {selectedTemplate.tf8_schema?.tas_target && (
                    <div className="bg-slate-50 p-3 rounded border text-sm">
                      <span className="font-bold text-slate-700 block mb-1">Target (작성 목적)</span>
                      {selectedTemplate.tf8_schema.tas_target}
                    </div>
                  )}
                  {selectedTemplate.tf8_schema?.tas_audience && (
                    <div className="bg-slate-50 p-3 rounded border text-sm">
                      <span className="font-bold text-slate-700 block mb-1">Audience (독자/수신자)</span>
                      {selectedTemplate.tf8_schema.tas_audience}
                    </div>
                  )}
                  {selectedTemplate.tf8_schema?.tas_style && (
                    <div className="bg-slate-50 p-3 rounded border text-sm">
                      <span className="font-bold text-slate-700 block mb-1">Style (문체 및 형식)</span>
                      {selectedTemplate.tf8_schema.tas_style}
                    </div>
                  )}
                  
                  {/* JSON Fallback for other arbitrary keys */}
                  <details className="mt-4 text-xs text-slate-500">
                    <summary className="cursor-pointer hover:text-slate-700">전체 Raw Schema 보기</summary>
                    <pre className="bg-slate-900 text-green-400 p-3 mt-2 rounded overflow-x-auto">
                      {JSON.stringify(selectedTemplate.tf8_schema, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </div>

            <div className="border-t p-4 bg-slate-50 rounded-b-xl flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="px-4 py-2 border rounded-md text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                닫기
              </button>
              <Link
                href={`/studio/${selectedTemplate.studio_type}?templateId=${selectedTemplate.id}`}
                className="px-6 py-2 bg-black text-white rounded-md text-sm font-bold shadow-md hover:bg-slate-800 transition-colors"
              >
                이 템플릿으로 작성 시작
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
