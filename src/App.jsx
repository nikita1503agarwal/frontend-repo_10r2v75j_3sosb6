import { useEffect, useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import Indicator from './components/Indicator'
import Cards from './components/Cards'
import Chart from './components/Chart'

function App() {
  const [data, setData] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchLatest = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/air/latest`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [baseUrl])

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/air/history?limit=50`)
      if (!res.ok) return
      const json = await res.json()
      setHistory(json)
    } catch (e) {
      // ignore
    }
  }, [baseUrl])

  useEffect(() => {
    fetchLatest()
    fetchHistory()

    const id = setInterval(() => {
      fetchLatest()
      fetchHistory()
    }, 5000)
    return () => clearInterval(id)
  }, [fetchLatest, fetchHistory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar onRefresh={() => { fetchLatest(); fetchHistory() }} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Live AQI Dashboard</h2>
            <p className="text-slate-400 text-sm">Real-time readings with color-coded indicators</p>
          </div>
          <div className="hidden md:block">
            <Indicator aqi={data?.aqi ?? 0} />
          </div>
        </section>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-600/20 border border-red-600/40 text-sm">
            {error}
          </div>
        )}

        <section className="grid gap-6">
          <Cards data={data} />
          <Chart history={history} />
        </section>

        {loading && (
          <p className="mt-4 text-slate-400 text-sm">Updating…</p>
        )}
      </main>
    </div>
  )
}

export default App
