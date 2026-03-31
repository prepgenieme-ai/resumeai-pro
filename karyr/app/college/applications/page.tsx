'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import Badge from '@/components/ui/Badge'

type AppStatus = 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected'

const applications = [
  { id:'1', student:'Alex Kumar', course:'B.Tech CSE', company:'Google', role:'SWE Intern', type:'Internship', status:'hired' as AppStatus, applied:'Mar 25', package:'₹60,000/mo' },
  { id:'2', student:'Priya Singh', course:'B.Tech ECE', company:'Stripe', role:'Data Analyst', type:'Full-time', status:'interview' as AppStatus, applied:'Mar 24', package:'₹12 LPA' },
  { id:'3', student:'Rohit Verma', course:'M.Tech AI', company:'Microsoft', role:'Backend Intern', type:'Internship', status:'shortlisted' as AppStatus, applied:'Mar 23', package:'₹55,000/mo' },
  { id:'4', student:'Ananya Nair', course:'MBA', company:'Zepto', role:'PM Intern', type:'Internship', status:'hired' as AppStatus, applied:'Mar 22', package:'₹40,000/mo' },
  { id:'5', student:'Dev Patel', course:'B.Tech CSE', company:'PhonePe', role:'ML Intern', type:'Internship', status:'interview' as AppStatus, applied:'Mar 21', package:'₹45,000/mo' },
  { id:'6', student:'Sneha Iyer', course:'B.Tech IT', company:'Razorpay', role:'Data Analyst', type:'Full-time', status:'applied' as AppStatus, applied:'Mar 20', package:'₹8 LPA' },
  { id:'7', student:'Karan Shah', course:'B.Tech Mech', company:'Mahindra', role:'Graduate Trainee', type:'Full-time', status:'rejected' as AppStatus, applied:'Mar 18', package:'₹6 LPA' },
  { id:'8', student:'Meera Gupta', course:'B.Tech CSE', company:'CRED', role:'ML Intern', type:'Internship', status:'shortlisted' as AppStatus, applied:'Mar 17', package:'₹50,000/mo' },
  { id:'9', student:'Alex Kumar', course:'B.Tech CSE', company:'Notion', role:'PM Intern', type:'Internship', status:'applied' as AppStatus, applied:'Mar 16', package:'₹35,000/mo' },
  { id:'10', student:'Rohit Verma', course:'M.Tech AI', company:'DeepMind', role:'Research Intern', type:'Internship', status:'applied' as AppStatus, applied:'Mar 15', package:'₹80,000/mo' },
]

const statusTabs = ['All','applied','shortlisted','interview','hired','rejected']

export default function CollegeApplications() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('All')

  const filtered = applications.filter(a => {
    const q = search.toLowerCase()
    const matchQ = a.student.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
    const matchTab = tab === 'All' || a.status === tab
    return matchQ && matchTab
  })

  const counts = {
    All: applications.length,
    applied: applications.filter(a=>a.status==='applied').length,
    shortlisted: applications.filter(a=>a.status==='shortlisted').length,
    interview: applications.filter(a=>a.status==='interview').length,
    hired: applications.filter(a=>a.status==='hired').length,
    rejected: applications.filter(a=>a.status==='rejected').length,
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="page-title">All Applications</h1>
        <p className="text-gray-500 text-sm mt-1">Track where every student has applied across your institution.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total', count: counts.All, dark: true },
          { label: 'Applied', count: counts.applied },
          { label: 'Shortlisted', count: counts.shortlisted },
          { label: 'Interview', count: counts.interview },
          { label: 'Hired', count: counts.hired },
          { label: 'Rejected', count: counts.rejected },
        ].map(s => (
          <div key={s.label} className={`card p-3 text-center ${s.dark ? 'bg-black border-black' : ''}`}>
            <div className={`font-display text-2xl font-bold ${s.dark ? 'text-white' : 'text-black'}`}>{s.count}</div>
            <div className={`text-xs mt-0.5 ${s.dark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + tabs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input className="input-field pl-9" placeholder="Search student, company, or role..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {statusTabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${tab===t?'bg-black text-white':'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {t} <span className="opacity-60 ml-1">{counts[t as keyof typeof counts]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Company & Role</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Package</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Applied</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">
                      {a.student.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-black">{a.student}</div>
                      <div className="text-xs text-gray-400">{a.course}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <div className="font-medium text-sm text-black">{a.role}</div>
                  <div className="text-xs text-gray-500">{a.company} · <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${a.type==='Internship'?'bg-gray-100 text-gray-600':'bg-black text-white'}`}>{a.type}</span></div>
                </td>
                <td className="p-4 hidden lg:table-cell">
                  <span className="text-sm font-semibold text-black">{a.package}</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="text-xs text-gray-400">{a.applied}</span>
                </td>
                <td className="p-4"><Badge status={a.status}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-sm">No applications match your filters.</div>
          </div>
        )}
      </div>
    </div>
  )
}
