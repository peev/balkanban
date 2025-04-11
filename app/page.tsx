'use client'

import { Board } from '@/components/Board'

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-board-bg/50 border-b border-white/10 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-white text-xl font-semibold">Process Tracking</h1>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-board-bg flex items-center justify-center text-white text-sm">
                JD
              </div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-board-bg flex items-center justify-center text-white text-sm">
                AS
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-board-bg flex items-center justify-center text-white text-sm">
                RK
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-sm transition-colors">
                +23
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-sm transition-colors">
                Invite
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-sm transition-colors">
            Acme, Inc.
          </button>
        </div>
      </header>
      <div className="p-4">
        <Board />
      </div>
    </main>
  )
} 