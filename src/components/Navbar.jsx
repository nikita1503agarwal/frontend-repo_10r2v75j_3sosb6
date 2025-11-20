import { useState } from 'react'

function Navbar({ onRefresh }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full sticky top-0 z-20 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center shadow">
            <span className="text-white font-bold">AQ</span>
          </div>
          <div>
            <h1 className="text-white font-semibold leading-tight">Air Quality Analyzer</h1>
            <p className="text-xs text-slate-400">Live air-quality monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm transition"
          >
            Refresh
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden px-3 py-2 rounded-md bg-slate-800 text-slate-200 border border-white/10"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 text-slate-300 text-sm">Clean, responsive dashboard with live updates.</div>
      )}
    </header>
  )
}

export default Navbar
