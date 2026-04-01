-- 00001_initial_schema.sql
-- TASKFLOW Document OS Core Database Schema
-- Multi-tenancy & TF8 JSONB Storage

-- 1. Organizations
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Workspaces
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Workspace Members (RBAC)
CREATE TYPE user_role AS ENUM ('org_owner', 'workspace_admin', 'editor_reviewer', 'author', 'viewer');

CREATE TABLE workspace_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- references auth.users in Supabase
    role user_role NOT NULL DEFAULT 'author',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_id, user_id)
);

-- 4. Templates (Prompt Hub Assets)
CREATE TYPE template_status AS ENUM ('draft', 'active', 'deprecated', 'archived');

CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    studio_type TEXT NOT NULL, -- 'press_release', 'meeting_minutes', 'announcement_email'
    title TEXT NOT NULL,
    tf8_schema JSONB NOT NULL, -- The TF8 Structured JSON
    is_ssot BOOLEAN DEFAULT false,
    status template_status DEFAULT 'draft',
    created_by UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Wizard Sessions (Ongoing & Generated Drafts)
CREATE TYPE session_status AS ENUM ('draft', 'sanitized', 'generated', 'reviewed', 'approved', 'archived');

CREATE TABLE wizard_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    template_id UUID REFERENCES templates(id),
    studio_type TEXT NOT NULL,
    inputs JSONB DEFAULT '{}'::jsonb, -- User's TF8 Inputs (K blocks, variables)
    draft_output TEXT,
    review_feedback TEXT,
    status session_status DEFAULT 'draft',
    author_id UUID NOT NULL,
    approver_id UUID,
    certified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID NOT NULL REFERENCES organizations(id),
    workspace_id UUID NOT NULL REFERENCES workspaces(id),
    user_id UUID NOT NULL,
    event_name TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizard_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Note: Exact RLS Policies can be added later, typically leveraging auth.uid() 
-- and comparing against workspace_members.
