import { Users, Briefcase, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react'
import StatsCard from '@/components/ui/StatsCard'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

type AppStatus = 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected'

const topPlacements = [
  { name: 'Alex Kumar', company: 'Google', role: 'SWE Intern', status: 'hired' as AppStatus, package: '₹60,000/mo' },
  { name: 'Priya Singh', company: 'Stripe', role: 'Data Analyst', status: 'interview' as AppStatus, package: '₹12 LPA' },
  { name: 'Rohit Verma', company: 'Microsoft', role: 'Backend Intern', status: 'shortlisted' as AppStatus, package: '₹55,000/mo' },
  { name: 'Ananya Nair', company: 'Zepto', role: 'PM Intern', status: 'hired' as AppStatus, package: '₹40,000/mo' },
  { name: 'Dev Patel', company: 'PhonePe', role: 'ML Intern', status: 'interview' as AppStatus, package: '₹45,000/mo' },
]

const topCompanies = [
  { name: 'Google', hired: 4, logo: 'G' },
  { name: 'Microsoft', hired: 3, logo: 'M' },
  { name: 'Razorpay', hired: 3, logo: 'R' },
  { name: 'Zepto', hired: 2, logo: 'Z' },
  { name: 'PhonePe', hired: 2, logo: 'P' },
]

const monthlyData = [
  { month: 'Oct', apps: 12, hired: 2 },
  { month: 'Nov', apps: 18, hired: 4 },
  { month: 'Dec', apps: 8, hired: 1 },
  { month: 'Jan', apps: 24, hired: 6 },
  { month: 'Feb', apps: 31, hired: 9 },
  { month: 'Mar', apps: 43, hired: 14 },
]
const maxApps = Math.max(...monthlyData.map(d => d.apps))

export default function CollegeDashboard() {
  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Placement Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">IIT Delhi · Career Development Centre · 2024–25</p>
        </div>
        <Link href="/college/students" className="btn-primary text-sm">+ Add Students</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Students" value="248" icon={<Users size={18}/>} sub="Registered on Karyr"/>
        <StatsCard label="Total Applications" value="892" icon={<Briefcase size={18}/>} sub="Across all students"/>
        <StatsCard label="Shortlisted" value="134" icon={<TrendingUp size={18}/>} sub="15% conversion rate"/>
        <StatsCard label="Hired / Placed" value="36" icon={<CheckCircle size={18}/>} sub="This season" dark/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Applications trend chart */}
        <div className="lg:col-span-2 card p-6">
          <h2 className="section-title mb-6">Applications over time</h2>
          <div className="flex items-end gap-3 h-32">
            {monthlyData.map(d => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col items-center gap-0.5">
                  <div className="text-xs font-bold text-black">{d.hired}</div>
                  <div className="w-full bg-black rounded-t-sm" style={{height: `${(d.apps / maxApps) * 80}px`}}/>
                  <div className="w-full bg-gray-200 rounded-t-sm" style={{height: `${(d.hired / maxApps) * 80}px`, marginTop: '-100%', opacity: 0.5}}/>
                </div>
                <div className="text-xs text-gray-400">{d.month}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-black rounded-sm"/><span className="text-xs text-gray-500">Applications</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-400 rounded-sm"/><span className="text-xs text-gray-500">Hired</span></div>
          </div>
        </div>

        {/* Top companies */}
        <div className="card p-6">
          <h2 className="section-title mb-4">Top hiring companies</h2>
          <div className="space-y-3">
            {topCompanies.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-xs flex-shrink-0">{c.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-black">{c.name}</div>
                  <div className="mt-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-black h-1.5 rounded-full" style={{width: `${(c.hired / topCompanies[0].hired) * 100}%`}}/>
                  </div>
                </div>
                <div className="text-xs font-bold text-black flex-shrink-0">{c.hired}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent placements</h2>
            <Link href="/college/applications" className="text-sm text-black font-medium hover:underline flex items-center gap-1">View all <ArrowRight size={14}/></Link>
          </div>
          <div className="divide-y divide-gray-100">
            {topPlacements.map((p, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">
                  {p.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-black">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.role} @ {p.company}</div>
                </div>
                <div className="text-xs font-semibold text-black hidden sm:block">{p.package}</div>
                <Badge status={p.status}/>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Placement funnel</h2>
          <div className="space-y-3">
            {[
              { label: 'Total Students', count: 248, pct: 100, color: 'bg-gray-200' },
              { label: 'Active on Karyr', count: 224, pct: 90, color: 'bg-gray-300' },
              { label: 'Applied to jobs', count: 186, pct: 75, color: 'bg-gray-500' },
              { label: 'Shortlisted', count: 134, pct: 54, color: 'bg-gray-700' },
              { label: 'Interviews', count: 68, pct: 27, color: 'bg-gray-800' },
              { label: 'Hired / Placed', count: 36, pct: 15, color: 'bg-black' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">{s.label}</span>
                  <span className="text-xs font-bold text-black">{s.count}</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className={`${s.color} h-2 rounded-full transition-all`} style={{width: `${s.pct}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
