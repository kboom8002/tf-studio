import { z } from 'zod'

export const StudioTypeEnum = z.enum([
  'press_release',
  'meeting_minutes',
  'announcement_email',
])
export type StudioType = z.infer<typeof StudioTypeEnum>

export const RoleEnum = z.enum([
  'org_owner',
  'workspace_admin',
  'editor_reviewer',
  'author',
  'viewer',
])
export type Role = z.infer<typeof RoleEnum>

export const SeverityEnum = z.enum(['low', 'medium', 'high', 'critical'])
export type Severity = z.infer<typeof SeverityEnum>

export const SessionStatusEnum = z.enum([
  'draft',
  'sanitized',
  'generated',
  'reviewed',
  'approved',
  'archived',
])
export type SessionStatus = z.infer<typeof SessionStatusEnum>

export const TemplateStatusEnum = z.enum([
  'draft',
  'active',
  'deprecated',
  'archived',
])
export type TemplateStatus = z.infer<typeof TemplateStatusEnum>

export const VariableSlotSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  type: z.enum(['text', 'number', 'boolean', 'date', 'array']),
  required: z.boolean().default(true),
})

export const PartialTF8BlockSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  isConstant: z.boolean(),
  variables: z.array(VariableSlotSchema).optional(),
})

export const TF8BlockSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  blocks: z.array(PartialTF8BlockSchema),
})
export type TF8Block = z.infer<typeof TF8BlockSchema>

// Add other schemas iteratively as needed for Phase 1
