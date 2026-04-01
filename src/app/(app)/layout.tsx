import Link from 'next/link'

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
            <div className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-800">
              Workspace Admin
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold">
              Sign Out
            </button>
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
