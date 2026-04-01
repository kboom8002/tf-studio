import { TF8Block } from '../../shared/schemas/tf8'

export interface VariableValues {
  [slotId: string]: string | number | boolean | string[]
}

/**
 * 조립기(Assembly Core): Constants(상수형 템플릿)와 Variables(동적 입력값)의 결합을 수행.
 * 불변조건 4: 최종 병합은 클라이언트가 아니라 서버에서만 수행한다.
 */
export function assemblePrompt(tf8Template: TF8Block, variables: VariableValues): string {
  let assembledText = `[PROMPT ASSEMBLY - ${tf8Template.title}]\n\n`

  for (const block of tf8Template.blocks) {
    let blockContent = block.content

    // 변수가 포함된 블록이라면 변수 치환(Interpolation) 수행
    if (!block.isConstant && block.variables && block.variables.length > 0) {
      for (const vSlot of block.variables) {
        const val = variables[vSlot.id]
        
        let stringifiedVal = ''
        if (val !== undefined && val !== null) {
          if (Array.isArray(val)) {
            stringifiedVal = val.join(', ')
          } else {
            stringifiedVal = String(val)
          }
        } else if (vSlot.required) {
          throw new Error(`필수 변수 누락 오류: ${vSlot.name} (ID: ${vSlot.id})`)
        }

        // 간단한 템플릿 치환 로직 (예: {{slotId}} 형태)
        const regex = new RegExp(`\\{\\{${vSlot.id}\\}\\}`, 'g')
        blockContent = blockContent.replace(regex, stringifiedVal)
      }
    }

    assembledText += `${blockContent}\n\n`
  }

  return assembledText.trim()
}
