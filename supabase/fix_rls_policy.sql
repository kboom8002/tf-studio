-- MVP용 임시 RLS(Row Level Security) 해제 정책
-- Supabase는 RLS가 `ENABLE` 상태일 때 Policy가 없으면 조회가 차단(0건 반환)됩니다.

-- 아래 두 쿼리를 Supabase SQL Editor에서 실행하여 Templates 조회를 허용해 주세요.
CREATE POLICY "Enable read access for all users" ON "public"."templates"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable read access for all users on workspace" ON "public"."workspaces"
AS PERMISSIVE FOR SELECT
TO public
USING (true);
