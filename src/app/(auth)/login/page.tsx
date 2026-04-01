import Link from 'next/link'
import { loginUser } from '@/app/actions/auth'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen w-full items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-blue-600 block mb-2">
            TASKFLOW Document OS
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">엔터프라이즈 계정 로그인</h1>
        </div>

        <form action={loginUser} className="space-y-4">
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

          <button type="submit" className="w-full py-2 bg-black text-white rounded-md font-semibold hover:bg-slate-800 transition-colors mt-6">
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          아직 조직 계정이 없으신가요? <Link href="/register" className="text-blue-600 font-semibold hover:underline">가입 요청하기</Link>
        </div>
      </div>
    </div>
  )
}
