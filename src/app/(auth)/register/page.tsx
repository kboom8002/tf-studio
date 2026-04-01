import Link from 'next/link'
import { signupUser } from '@/app/actions/auth'

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600 block mb-2">
            TASKFLOW Document OS
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">엔터프라이즈 계정 등록</h1>
          <p className="text-sm text-gray-500 mt-2">새로운 사내 작성자로 등록하기 위해 정보를 입력해 주세요.</p>
        </div>

        <form action={signupUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">이름 (Display Name)</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              required 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="홍길동" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">사내 이메일 주소</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">비밀번호</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors mt-6">
            계정 생성 완료
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요? <Link href="/login" className="text-blue-600 font-semibold hover:underline">로그인 하러 가기</Link>
        </div>
      </div>
    </div>
  )
}
