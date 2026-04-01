-- TASKFLOW Document OS: 10개 프롬프트 허브 샘플 에셋 시드 스크립트
-- 이 스크립트를 Supabase SQL Editor에서 실행하시면 허브(Hub)에 10개의 SSoT 템플릿 카드가 생성됩니다.

-- 1. 외래키(Foreign Key) 제약 조건을 위한 더미 Organization 및 Workspace 생성
-- (이미 존재하면 무시되거나 에러가 나지 않도록 임시로 분리해서 실행하거나 기본 ID를 사용합니다)
-- 테스트용 Workspace ID: '00000000-0000-0000-0000-000000000000'
-- 테스트용 Org ID: '11111111-1111-1111-1111-111111111111'

INSERT INTO organizations (id, name) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Sample Demo Org')
ON CONFLICT (id) DO NOTHING;

INSERT INTO workspaces (id, org_id, name)
VALUES ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Sample Dev Workspace')
ON CONFLICT (id) DO NOTHING;

-- 2. 10개의 SSoT 템플릿(Assets) 삽입
INSERT INTO templates (id, workspace_id, title, studio_type, tf8_schema, is_ssot, status, created_by, created_at)
VALUES 
  -- 보도자료 (Press Release)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '글로벌 투자사 대상 시리즈 A 유치 보도자료', 'press_release', '{"tas_target": "시리즈A 100억 투자 유치 성공", "tas_audience": "실리콘밸리 글로벌 벤처캐피탈(VC)", "tas_style": "객관적, 신뢰감, 글로벌 비전 강조"}', true, 'active', gen_random_uuid(), now()),
  
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '신제품(SaaS) 정식 출시 보도 양식', 'press_release', '{"tas_target": "B2B 엔터프라이즈 AI SaaS 정식 론칭", "tas_audience": "국내 주요 IT 전문 매체 및 기업 경영진", "tas_style": "혁신성 부각, B2B 업무 효율성 강조"}', true, 'active', gen_random_uuid(), now()),
  
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '임원 영입(C-Level) 홍보 보도자료', 'press_release', '{"tas_target": "구글/MS 출신 C-Level 임원 영입", "tas_audience": "국내 경제/사회 리더", "tas_style": "인재 중심, 회사의 기술력/성장 가능성 어필"}', true, 'active', gen_random_uuid(), now()),
  
  -- 회의록 (Meeting Minutes)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '주간 임원진 경영 전략 회의 요약', 'meeting_minutes', '{"tas_target": "경영 목표 달성 여부 및 이슈 논의", "tas_audience": "전사 임원 및 리더급", "tas_style": "핵심 위주, To-Do 명확화, 시크릿 유지"}', true, 'active', gen_random_uuid(), now()),
  
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '외부 파트너십/제휴 체결 킥오프 회의', 'meeting_minutes', '{"tas_target": "양사 간 시스템 인테그레이션(API 연동) 범위 획정", "tas_audience": "양측 PM 및 개발팀", "tas_style": "일정(Timeline) 중심, 상호 책임(R&R) 명시"}', true, 'active', gen_random_uuid(), now()),

  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '신규 입사자 온보딩 인터뷰 평가', 'meeting_minutes', '{"tas_target": "지원자의 성장 배경 및 회사 핵심가치(Core Values) 일치 여부", "tas_audience": "인사위원회(HR) 및 실무 면접관", "tas_style": "객관적 평가, 강점/약점 분리, 평어체"}', true, 'active', gen_random_uuid(), now()),

  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '고객 클레임 심층 원인 분석 VOC', 'meeting_minutes', '{"tas_target": "배송 지연에 따른 대량 환불 사태 원인 규명", "tas_audience": "물류팀 및 경영진", "tas_style": "감정 배제, 발생 원인 및 재발 방지책(Action Plan) 포커스"}', true, 'active', gen_random_uuid(), now()),

  -- 공지 이메일 (Announcement Email)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '전사 시스템 점검 서비스 순단 안내 메일', 'announcement_email', '{"tas_target": "AWS 데이터베이스 점검으로 인한 2시간 서비스 순단 안내", "tas_audience": "전체 B2B 사용 고객사 및 내부 영업팀", "tas_style": "정중함, 명확한 시간 명시, 사과문 톤"}', true, 'active', gen_random_uuid(), now()),

  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '우수 성과자 포상 및 축하 격려금 안내', 'announcement_email', '{"tas_target": "Q3 매출 120% 달성 기념 특별 보너스 지급 건", "tas_audience": "수여 대상 선발 임직원 전원", "tas_style": "밝고 긍정적, 칭찬, 소속감 고취"}', true, 'active', gen_random_uuid(), now()),

  (gen_random_uuid(), '00000000-0000-0000-0000-000000000000', '사내 보안 지침 위반 경고 안내', 'announcement_email', '{"tas_target": "개인용 클라우드 드라이브 접속 불가 및 보안 수칙 재안내", "tas_audience": "전사 임직원(경영지원팀 파송)", "tas_style": "단호하고 보수적, 법적 책임 강조"}', true, 'active', gen_random_uuid(), now());
