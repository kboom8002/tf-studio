'use client'

import { useWizardStore } from '@/lib/client/store/wizard'
import { TASStep } from './steps/tas-step'
import { KStep } from './steps/k-step'
import { FLOWStep } from './steps/flow-step'
import { DraftStep } from './steps/draft-step'
import { ReviewStep } from './steps/review-step'
import { PublishStep } from './steps/publish-step'

const stepsComponents = [
  <TASStep key="tas" />,
  <KStep key="k" />,
  <FLOWStep key="flow" />,
  <DraftStep key="draft" />,
  <ReviewStep key="review" />,
  <PublishStep key="publish" />
]

const stepLabels = ['1. 과업설정 (T/A/S)', '2. K블록', '3. 형식지정 (F/L/O/W)', '4. 초안생성', '5. 리뷰/수정', '6. 자산화']

export function WizardContainer({ studioName, studioType }: { studioName: string, studioType: string }) {
  const { currentStepIndex, prevStep, nextStep, steps } = useWizardStore()

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-8">
      {/* Studio Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{studioName}</h1>
        <p className="text-gray-500 mt-2">TASKFLOW 6단계 마법사를 통해 작성됩니다.</p>
      </div>

      {/* ProgressBar Area */}
      <div className="w-full flex justify-between items-center mb-8 border-b pb-4">
        {stepLabels.map((label, idx) => (
          <div 
            key={idx} 
            className={`text-sm font-semibold \${idx === currentStepIndex ? 'text-blue-600' : 'text-gray-400'}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Step Content Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border">
        {stepsComponents[currentStepIndex]}
      </div>

      {/* Navigation Area */}
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          className="px-4 py-2 border rounded-md disabled:bg-gray-100 disabled:text-gray-400"
        >
          이전 단계
        </button>
        <button 
          onClick={nextStep}
          disabled={currentStepIndex === steps.length - 1}
          className="px-4 py-2 bg-black text-white rounded-md disabled:bg-gray-400"
        >
          {currentStepIndex === steps.length - 1 ? '완료' : '다음 단계'}
        </button>
      </div>
    </div>
  )
}
