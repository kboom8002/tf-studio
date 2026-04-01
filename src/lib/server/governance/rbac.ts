import { Role } from '../../shared/schemas/tf8'

export type Action = 'read:hub' | 'write:hub' | 'create:session' | 'review:session' | 'certify:ssot'

const ROLE_PERMISSIONS: Record<Role, Action[]> = {
  org_owner: ['read:hub', 'write:hub', 'create:session', 'review:session', 'certify:ssot'],
  workspace_admin: ['read:hub', 'write:hub', 'create:session', 'review:session', 'certify:ssot'],
  editor_reviewer: ['read:hub', 'create:session', 'review:session', 'certify:ssot'],
  author: ['read:hub', 'create:session'],
  viewer: ['read:hub']
}

/**
 * RBAC Evaluator
 * 
 * 불변조건 10: Role/Membership/RLS는 추정하지 않고 명시된 Rule에 의해서만 통제한다.
 */
export function hasPermission(role: Role, action: Action): boolean {
  return ROLE_PERMISSIONS[role].includes(action)
}

export function enforcePermission(role: Role, action: Action): void {
  if (!hasPermission(role, action)) {
    throw new Error(`Permission Denied: [${role}] 권한은 [${action}] 행동을 수행할 수 없습니다.`)
  }
}
