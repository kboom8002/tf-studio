import { create } from 'zustand'
import { SessionStatus } from '../../shared/schemas/tf8'

export type WizardStepKey = 
  | 'TAS'    // 1. Task/Audience/Structure (과업 정렬)
  | 'K'      // 2. Knowledge (입력 정리)
  | 'FLOW'   // 3. Format/Length/Objective (구조 설계)
  | 'DRAFT'  // 4. Draft Generation (초안 생성 - Main Run 진행)
  | 'REVIEW' // 5. Review & Revise (검수 및 개정 - Review Run 연계)
  | 'ASSET'  // 6. Assetization (자산화)

interface WizardState {
  currentStepIndex: number
  steps: WizardStepKey[]
  sessionStatus: SessionStatus
  
  // 사용자 입력 상태 (Constants가 아닌 유저 동적 Variables 및 Context)
  inputs: Record<string, any>
  
  // 결과물
  sessionId: string | null
  draftOutput: string | null
  reviewFeedback: string | null
  
  // Actions
  setSessionId: (id: string) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (stepIndex: number) => void
  updateInput: (key: string, value: any) => void
  setDraftOutput: (draft: string) => void
  setReviewFeedback: (feedback: string) => void
}

export const useWizardStore = create<WizardState>((set) => ({
  currentStepIndex: 0,
  steps: ['TAS', 'K', 'FLOW', 'DRAFT', 'REVIEW', 'ASSET'],
  sessionStatus: 'draft',
  
  inputs: {},
  sessionId: null,
  draftOutput: null,
  reviewFeedback: null,

  setSessionId: (id) => set({ sessionId: id }),

  nextStep: () => set((state) => ({
    currentStepIndex: Math.min(state.currentStepIndex + 1, state.steps.length - 1)
  })),

  prevStep: () => set((state) => ({
    currentStepIndex: Math.max(state.currentStepIndex - 1, 0)
  })),

  goToStep: (index) => set((state) => {
    // 엄격한 단계 전진: 건너뛰기 방지 로직 필요 시 이 부분에 추가
    return { currentStepIndex: Math.max(0, Math.min(index, state.steps.length - 1)) }
  }),

  updateInput: (key, value) => set((state) => ({
    inputs: { ...state.inputs, [key]: value }
  })),

  setDraftOutput: (draft) => set({ draftOutput: draft, sessionStatus: 'generated' }),
  setReviewFeedback: (feedback) => set({ reviewFeedback: feedback, sessionStatus: 'reviewed' }),
}))
