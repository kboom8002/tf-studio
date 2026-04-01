import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-slate-50 border-b">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-slate-900 px-3 py-1 text-sm text-white mb-4">
                  Introducing TASKFLOW Document OS
                </div>
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-slate-900 bg-clip-text">
                  조직의 성공 방정식을 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    자산(Asset)으로 구축하다.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-6">
                  개인의 파편화된 프롬프트 작성을 넘어, 철저한 통제와 거버넌스 기반의 엔터프라이즈 맞춤형 프롬프트 엔지니어링 플랫폼을 경험하세요.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center max-w-md">
                <Link
                  href="/studio/press_release"
                  className="inline-flex h-12 w-full lg:w-auto items-center justify-center rounded-md bg-slate-900 px-8 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                  보도자료 스튜디오 시작하기
                </Link>
                <Link
                  href="/hub"
                  className="inline-flex h-12 w-full lg:w-auto items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
                >
                  Prompt Hub (자산고) 둘러보기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 md:py-28 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-2 font-bold font-mono">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900">Core OS (제어 엔진)</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  TF8 스키마를 기반으로 메인 생성 모델과 레드팀 검수 모델(Review Run)이 나뉘어 동작하며, 
                  어떤 K블록(사내 기밀 데이터)도 안전하게 파이프라인 처리가 가능합니다.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-2 font-bold font-mono">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900">Studio Apps (마법사)</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Zustand 기반의 6단계 마법사 워크플로우를 통해 사용자의 의도를 정밀하게 타겟팅(Target, Audience, Structure)합니다. 빈칸만 채우면 최고의 결과물이 나옵니다.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 mb-2 font-bold font-mono">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900">Prompt Hub (자산화)</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Review Run을 통과하여 SSoT(Single Source of Truth) 인증을 받은 최고 품질의 산출물 포맷만 전사 자산으로 등록되어 즉시 재사용할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6 mx-auto flex items-center justify-center flex-col gap-2 sm:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 TASKFLOW Document OS. All rights reserved. MVP Phase 9 Implemented.
          </p>
        </div>
      </footer>
    </div>
  )
}

