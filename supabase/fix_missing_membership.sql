-- 누락된 RLS 정책 보강 및 멤버십 강제 복구 스크립트 

-- 1. workspace_members 테이블에 대한 기본 Read/Insert 정책 추가
-- (이 정책이 없어서 최초 가입 시 멤버십 자동 등록이 RLS에 막혀 누락되었습니다)
DROP POLICY IF EXISTS "user_can_read_own_membership" ON "public"."workspace_members";
CREATE POLICY "user_can_read_own_membership" ON "public"."workspace_members"
AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "user_can_join_workspace" ON "public"."workspace_members";
CREATE POLICY "user_can_join_workspace" ON "public"."workspace_members"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- 2. 이미 가입되었으나 멤버십 등록에 실패한 사용자 계정을 
-- 강제로 워크스페이스에 넣고, 동시에 'org_owner'(최고관리자)로 승급시킵니다.
-- 아래 YOUR_EMAIL@DOMAIN.COM 만 가입하신 이메일로 변경 후 실행하세요!

INSERT INTO public.workspace_members (workspace_id, user_id, role)
SELECT '00000000-0000-0000-0000-000000000000', id, 'org_owner'
FROM auth.users
WHERE email = 'YOUR_EMAIL@DOMAIN.COM'
ON CONFLICT (workspace_id, user_id) 
DO UPDATE SET role = 'org_owner';
