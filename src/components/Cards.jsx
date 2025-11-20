function Card({ title, value, unit, color }) {
  return (
    <div className="p-4 rounded-xl bg-slate-800/60 border border-white/10 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-slate-300 text-sm">{title}</h3>
        {color && <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>}
      </div>
      <div className="text-2xl md:text-3xl font-semibold text-white">
        {value}
        {unit && <span className="text-slate-400 text-base ml-1">{unit}</span>}
      </div>
    </div>
  )
}

function Cards({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Card title="AQI" value={data?.aqi ?? '--'} unit={null} color="bg-sky-400" />
      <Card title="PM2.5" value={data?.pm25 ?? '--'} unit="µg/m³" color="bg-emerald-400" />
      <Card title="PM10" value={data?.pm10 ?? '--'} unit="µg/m³" color="bg-lime-400" />
      <Card title="CO₂" value={data?.co2 ?? '--'} unit="ppm" color="bg-yellow-400" />
      <Card title="Temp" value={data?.temperature ?? '--'} unit="°C" color="bg-orange-400" />
      <Card title="Humidity" value={data?.humidity ?? '--'} unit="%" color="bg-cyan-400" />
    </div>
  )
}

export default Cards
