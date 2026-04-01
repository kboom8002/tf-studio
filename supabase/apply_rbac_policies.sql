-- TASKFLOW Document OS 실제 RBAC 기반 RLS 보안 정책 적용 스크립트
-- 이 쿼리를 실행하면 데이터 고립(Isolation)이 완성되어, 소속되지 않은 유저는 데이터를 볼 수 없습니다.

-- 1. 기존에 열어둔 임시 오픈 정책 파기
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."templates";
DROP POLICY IF EXISTS "Enable read access for all users on workspace" ON "public"."workspaces";

-- 2. Templates (자산고) 보안 정책
-- 사용자는 자신이 속한(workspace_members 테이블에 등록된) 워크스페이스의 템플릿만 조회/적재 가능
CREATE POLICY "user_can_read_workspace_templates" ON "public"."templates"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "user_can_insert_workspace_templates" ON "public"."templates"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);

-- 3. Wizard Sessions (문서 작업 세션) 보안 정책
-- 사용자는 자신이 속한 워크스페이스의 작업 내역만 조회/수정 가능
CREATE POLICY "user_can_read_workspace_sessions" ON "public"."wizard_sessions"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "user_can_insert_workspace_sessions" ON "public"."wizard_sessions"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "user_can_update_workspace_sessions" ON "public"."wizard_sessions"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  )
);
