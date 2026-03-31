interface StatCardProps {
  value: string
  label: string
  icon: React.ReactNode
  accent?: boolean
}

export default function StatCard({ value, label, icon, accent }: StatCardProps) {
  return (
    <div className={`card p-6 text-center ${accent ? 'bg-black border-black' : ''}`}>
      <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${accent ? 'bg-white/20' : 'bg-gray-100'}`}>
        <span className={accent ? 'text-white' : 'text-black'}>{icon}</span>
      </div>
      <div className={`font-display text-3xl font-bold mb-1 ${accent ? 'text-white' : 'text-black'}`}>{value}</div>
      <div className={`text-sm ${accent ? 'text-gray-300' : 'text-gray-500'}`}>{label}</div>
    </div>
  )
}
