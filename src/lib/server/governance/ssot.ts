import { SessionStatus } from '../../shared/schemas/tf8'

export interface SSoTDocument {
  id: string
  title: string
  content: string
  status: SessionStatus
  authorId: string
  approverId: string | null
  certifiedAt: Date | null
}

/**
 * Single Source of Truth Manager
 * 
 * 불변조건 9: SSoT는 단순 배지가 아니라 승인과 감사가 가능한 거버넌스 상태다.
 * Review Run을 거치지 않은 초안은 절대 SSoT(approved) 상태로 넘어갈 수 없다.
 */
export async function certifyDocumentAsSSoT(
  doc: SSoTDocument, 
  approverId: string, 
  approvalFeedback: string | null
): Promise<SSoTDocument> {
  // 거버넌스 로직: 문서가 본 생성(generated) 외에 반드시 검수(reviewed)를 마쳤는지 확인
  if (doc.status !== 'reviewed') {
    throw new Error('문서가 Review Run(레드팀 검수)을 거치지 않았으므로 SSoT 승인이 불가합니다.')
  }

  // 여기서 DB 트랜잭션 등 처리 (이후 Audit Logger 연계)
  
  return {
    ...doc,
    status: 'approved',
    approverId,
    certifiedAt: new Date()
  }
}

export function verifySSoTIntegrity(doc: SSoTDocument): boolean {
  // SSoT 배지가 달린 문서는 본문(content)이 변조되지 않았는지, 
  // 인증받은 시기(certifiedAt)와 승인자(approverId)가 온전한지 암호학적 해시 검증 등을 수행하는 뼈대
  if (doc.status === 'approved' && !doc.certifiedAt) {
    return false
  }
  return true
}
