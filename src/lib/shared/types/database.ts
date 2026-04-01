import { SessionStatus, StudioType, TemplateStatus, TF8Block } from '../schemas/tf8'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: { id: string; name: string; created_at: string }
        Insert: { id?: string; name: string; created_at?: string }
        Update: { id?: string; name?: string; created_at?: string }
      }
      workspaces: {
        Row: { id: string; org_id: string; name: string; created_at: string }
        Insert: { id?: string; org_id: string; name: string; created_at?: string }
        Update: { id?: string; org_id?: string; name?: string; created_at?: string }
      }
      workspace_members: {
        Row: { id: string; workspace_id: string; user_id: string; role: string; created_at: string }
        Insert: { id?: string; workspace_id: string; user_id: string; role?: string; created_at?: string }
        Update: { id?: string; workspace_id?: string; user_id?: string; role?: string; created_at?: string }
      }
      templates: {
        Row: {
          id: string; workspace_id: string; studio_type: StudioType; title: string; tf8_schema: Json; is_ssot: boolean | null; status: TemplateStatus | null; created_by: string; created_at: string
        }
        Insert: {
          id?: string; workspace_id: string; studio_type: StudioType; title: string; tf8_schema: Json; is_ssot?: boolean | null; status?: TemplateStatus | null; created_by: string; created_at?: string
        }
        Update: Partial<Database['public']['Tables']['templates']['Insert']>
      }
      wizard_sessions: {
        Row: {
          id: string; workspace_id: string; template_id: string | null; studio_type: StudioType; inputs: Json | null; draft_output: string | null; review_feedback: string | null; status: SessionStatus | null; author_id: string; approver_id: string | null; certified_at: string | null; created_at: string; updated_at: string
        }
        Insert: {
          id?: string; workspace_id: string; template_id?: string | null; studio_type: StudioType; inputs?: Json | null; draft_output?: string | null; review_feedback?: string | null; status?: SessionStatus | null; author_id: string; approver_id?: string | null; certified_at?: string | null; created_at?: string; updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['wizard_sessions']['Insert']>
      }
      audit_logs: {
        Row: {
          id: string; org_id: string; workspace_id: string; user_id: string; event_name: string; payload: Json | null; created_at: string
        }
        Insert: {
          id?: string; org_id: string; workspace_id: string; user_id: string; event_name: string; payload?: Json | null; created_at?: string
        }
        Update: Partial<Database['public']['Tables']['audit_logs']['Insert']>
      }
    }
  }
}
