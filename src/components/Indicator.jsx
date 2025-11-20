function Indicator({ aqi }) {
  const level = (() => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-emerald-500' }
    if (aqi <= 100) return { label: 'Satisfactory', color: 'bg-lime-500' }
    if (aqi <= 200) return { label: 'Moderate', color: 'bg-yellow-500' }
    if (aqi <= 300) return { label: 'Poor', color: 'bg-orange-500' }
    if (aqi <= 400) return { label: 'Very Poor', color: 'bg-red-500' }
    return { label: 'Severe', color: 'bg-red-700' }
  })()

  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
      <span className="text-slate-200 text-sm">{level.label}</span>
    </div>
  )
}

export default Indicator
