interface StatsCardProps { label: string; value: string | number; icon: React.ReactNode; sub?: string; dark?: boolean }
export default function StatsCard({ label, value, icon, sub, dark }: StatsCardProps) {
  return (
    <div className={`card p-5 ${dark ? 'bg-black border-black' : ''}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${dark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>{icon}</div>
        <span className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-500'}`}>{label}</span>
      </div>
      <div className={`font-display text-3xl font-bold ${dark ? 'text-white' : 'text-black'}`}>{value}</div>
      {sub && <div className={`text-xs mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{sub}</div>}
    </div>
  )
}
