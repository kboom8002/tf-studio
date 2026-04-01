-- TASKFLOW Document OS 최고 관리자(Super Admin) 승급 스크립트
-- 
-- 보안상의 이유로 최고 관리자 권한은 앱 내 회원가입 폼에서 발급할 수 없습니다.
-- 먼저 앱의 /register 페이지에서 이메일 회원가입을 정상적으로 완료하신 다음,
-- 아래 스크립트에서 YOUR_EMAIL@DOMAIN.COM 부분을 본인의 가입 이메일로 수정하여
-- Supabase SQL Editor에서 실행하시면 됩니다.

-- 'org_owner' 역할(Role)은 조직의 모든 워크스페이스 세팅과 멤버십을 제어할 수 있는 최고 권한입니다.

UPDATE public.workspace_members
SET role = 'org_owner'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@DOMAIN.COM'
);

-- 만약 'workspace_admin' (해당 워크스페이스 내 관리자) 권한만 부여하고 싶다면:
-- UPDATE public.workspace_members
-- SET role = 'workspace_admin'
-- WHERE user_id = (
--   SELECT id FROM auth.users WHERE email = 'YOUR_EMAIL@DOMAIN.COM'
-- );
