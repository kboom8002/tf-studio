# TASKFLOW Document OS: 인지 단위 통합 유저 가이드 (Step-by-Step)

본 문서는 TASKFLOW Document OS의 초기 기획부터 최종 엔터프라이즈 B2B SaaS 인증(RBAC)까지의 진화 과정을 **사용자의 인지적 맥락(Cognitive Flow)**에 따라 재배열한 공식 유저 및 개발자 통합 가이드입니다. 

---

## 🧭 인지 모형 1: 시스템 철학의 이해 (What & Why)
TASKFLOW는 일회성 프롬프트 찌꺼기를 남기지 않습니다. 모든 출력물은 조직의 검증된 논리 구조인 **TF8 스키마**를 기반으로 하며, 레드팀 검수를 통과한 완벽한 결과물만 **Prompt Hub(자산고)**에 SSoT 인증 자산으로 보관됩니다.

*   **Core OS (제어 엔진)**: 텍스트 생성 라우팅 및 검열 처리
*   **Studio Apps (마법사)**: 보도자료, 회의록, 공지 메일 등 직관적인 6단계 폼 UI
*   **Prompt Hub (자산화)**: 검증 완료된 SSoT 프롬프트 자산을 사내 조직원과 재사용·공유

---

## 🛠 인지 모형 2: 인프라와 권한 확보 (Day 1 Setup)
시스템을 클론 받거나 처음 띄웠을 때, 가장 먼저 확보해야 할 것은 **저장소(Database)와 권한(Security)** 입니다.

### Step 1. Supabase 원격 연동 및 스키마 세팅
프론트엔드(`npm run dev`)를 실행하기 전, 백엔드 뼈대를 세워야 합니다.
1. Supabase 대시보드의 **SQL Editor**에 접속합니다.
2. 루트 디렉토리의 `supabase/migrations/20260401000000_initial_schema.sql` 내용을 복사해 실행하여 5대 핵심 테이블(`organizations`, `workspaces`, `templates`, `wizard_sessions`, `audit_logs`)을 구축합니다.

### Step 2. 초기 테스트용 샘플 자산(Asset) 주입
빈 플랫폼에서는 효용을 체감할 수 없으므로 시드 데이터를 넣습니다.
1. `supabase/seed_hub_templates.sql` 파일의 더미 데이터를 SQL Editor에서 실행합니다. (10개의 실무형 SSoT 템플릿 적재 완료)

### Step 3. 철저한 데이터 격리 (RLS 기반 RBAC 가동)
엔터프라이즈 환경이므로, "내 조직의 워크스페이스(Workspace) 데이터"는 나만 볼 수 있어야 합니다.
1. `supabase/apply_rbac_policies.sql` 스크립트를 실행하여, **Row Level Security (행 수준 암호화)** 정책을 DB에 결속시킵니다.

---

## 👤 인지 모형 3: 온보딩과 권한 승급 (Authentication)
보안망이 쳐진 상태이므로 익명 사용자는 내부 시스템에 접근할 수 없습니다.

### Step 4. 최초 회원 가입 및 로그인 통과
1. 브라우저에서 `localhost:3000/register` 메뉴로 진입하여 이메일(예: `kboom8002@gmail.com`)과 비밀번호를 입력해 가입합니다.
2. 가입 즉시 **AUTHOR(작성자)** 권한으로 시스템에 다이브(Dive)하게 되며, 상단 우측 GNB에 내 권한 배지가 나타납니다.

### Step 5. 최고 관리자 (Super Admin) 권한 획득 (백도어)
시스템의 룰을 제어하기 위해 본인 계정을 최고 관리자로 승급시켜야 합니다.
1. `supabase/set_super_admin.sql` 파일을 엽니다.
2. WHERE 절의 이메일을 본인이 가입한 이메일(`kboom8002@gmail.com`)로 작성 후 SQL Editor에서 실행합니다.
3. 웹페이지를 새로고침하면 `AUTHOR` 배지가 위엄 있는 파란색 **`ORG_OWNER`** 배지로 진화합니다!

---

## 🚀 인지 모형 4: 핵심 가치 창출 (The Core Experience)
세팅이 끝났습니다. 이제 TASKFLOW가 주는 궁극의 생산성 사이클을 경험할 차례입니다.

### Step 6. Prompt Hub (자산고) 탐색 및 미리보기
1. GNB의 **Hub** 메뉴를 클릭해 조직의 자산 리스트로 들어갑니다.
2. 다양한 실무 카드(예: `임원 영입 보도자료`) 중 하나에서 **[세부 내용 미리보기]** 버튼을 클릭합니다.
3. 팝업창(Modal) 안에서 선배들이 작성해 둔 `Target`, `Audience`, `Style` 구조를 인지적으로 파악합니다.

### Step 7. Studio Apps 마법사 작성 (Pre-fill 기능)
1. 모달창 하단의 **[이 템플릿으로 작성 시작]** 버튼을 누릅니다.
2. 놀랍게도 Studio(/studio/press_release)의 **6단계 마법사 폼에 방금 전 확인한 핵심 컨텍스트 값들이 이미 100% 채워져 있습니다(Injection).**
3. 사용자는 오직 빈칸(예: 이번 달 핵심 성과 데이터 - K 블록)만 추가 기입한 뒤 `[문서 생성]` 버튼을 눌러 작업을 순식간에 끝냅니다.

### Step 8. 종료 및 사이클의 반복
생성된 고품질 문서는 다시 'Review Run(레드팀 검수)'을 거쳐 새로운 SSoT 자산으로서 Hub에 등재됩니다. 
이를 통해 조직은 **"최상의 결과물(Best Practice)"만을 끝없이 복제하고 진화**시키는 무한한 자산 증식 사이클을 돌리게 됩니다.

---

> 🎉 **시스템 투어 완료!** 이제 당신은 TASKFLOW Document OS의 완벽한 지배자이자, 조직 생산성의 설계자(Architect)입니다.
