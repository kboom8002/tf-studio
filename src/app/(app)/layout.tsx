import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { signOutUser } from '@/app/actions/auth'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let roleBadge = null
  if (user) {
    const { data: member } = await supabase
      .from('workspace_members')
      .select('role')
      .eq('user_id', user.id)
      .single()
    roleBadge = member?.role
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Global Navigation Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/hub" className="text-xl font-bold tracking-tight text-blue-600">
              TASKFLOW
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/hub" className="text-sm font-medium text-gray-700 hover:text-blue-600">Hub</Link>
              <Link href="/studio/press_release" className="text-sm font-medium text-gray-700 hover:text-blue-600">홍보(PR)</Link>
              <Link href="/studio/meeting_minutes" className="text-sm font-medium text-gray-700 hover:text-blue-600">회의록</Link>
              <Link href="/studio/announcement_email" className="text-sm font-medium text-gray-700 hover:text-blue-600">공지메일</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link href="/login" className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold">
                Sign In
              </Link>
            ) : (
              <>
                <div className="flex flex-col text-right mr-2 hidden sm:block">
                  <span className="text-xs font-semibold text-gray-900 block">{user.email}</span>
                </div>
                {roleBadge && (
                  <div className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                    {roleBadge.toUpperCase()}
                  </div>
                )}
                <form action={signOutUser} className="inline-block">
                  <button type="submit" className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                    Sign Out
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}
