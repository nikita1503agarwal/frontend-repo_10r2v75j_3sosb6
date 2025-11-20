import { useEffect, useRef } from 'react'

// Simple canvas line chart without external deps
function MiniChart({ data = [], color = '#60A5FA' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const w = canvas.width
    const h = canvas.height

    // Clear
    ctx.clearRect(0, 0, w, h)

    if (!data.length) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)'
      ctx.font = '12px sans-serif'
      ctx.fillText('No data yet', 10, h / 2)
      return
    }

    const values = data.map((d) => d.aqi || 0)
    const max = Math.max(50, ...values)
    const min = Math.min(0, ...values)

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(30, 10)
    ctx.lineTo(30, h - 20)
    ctx.lineTo(w - 10, h - 20)
    ctx.stroke()

    // Scale function
    const xStep = (w - 50) / (values.length - 1 || 1)
    const yScale = (val) => {
      if (max === min) return h - 20
      return h - 20 - ((val - min) / (max - min)) * (h - 40)
    }

    // Line
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()
    values.forEach((v, i) => {
      const x = 30 + i * xStep
      const y = yScale(v)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Dots
    ctx.fillStyle = color
    values.forEach((v, i) => {
      const x = 30 + i * xStep
      const y = yScale(v)
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [data, color])

  return <canvas ref={canvasRef} width={600} height={200} className="w-full h-40" />
}

export default function Chart({ history = [] }) {
  return (
    <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-200 text-sm">AQI over time</h3>
      </div>
      <div className="overflow-x-auto">
        <MiniChart data={history} />
      </div>
    </div>
  )
}
