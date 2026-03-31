'use client'
import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import Badge from '@/components/ui/Badge'

type StatusType = 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected'

const applications = [
  { id:'1', company:'Google', role:'SWE Intern', location:'Bangalore', type:'Internship', pay:'₹60,000/mo', logo:'G', status:'shortlisted' as StatusType, applied:'Mar 25', lastUpdate:'Mar 27' },
  { id:'2', company:'Stripe', role:'Data Analyst', location:'Remote', type:'Full-time', pay:'₹10 LPA', logo:'S', status:'interview' as StatusType, applied:'Mar 22', lastUpdate:'Mar 26' },
  { id:'3', company:'Notion', role:'PM Intern', location:'San Francisco', type:'Internship', pay:'$40/hr', logo:'N', status:'applied' as StatusType, applied:'Mar 20', lastUpdate:'Mar 20' },
  { id:'4', company:'Microsoft', role:'Backend Intern', location:'Hyderabad', type:'Internship', pay:'₹55,000/mo', logo:'M', status:'applied' as StatusType, applied:'Mar 18', lastUpdate:'Mar 18' },
  { id:'5', company:'Linear', role:'Frontend Dev', location:'Remote', type:'Full-time', pay:'₹18 LPA', logo:'L', status:'rejected' as StatusType, applied:'Mar 12', lastUpdate:'Mar 15' },
  { id:'6', company:'PhonePe', role:'ML Intern', location:'Bangalore', type:'Internship', pay:'₹45,000/mo', logo:'P', status:'hired' as StatusType, applied:'Feb 28', lastUpdate:'Mar 10' },
]

const tabs: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'applied', label: 'Applied' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'interview', label: 'Interview' },
  { key: 'hired', label: 'Hired' },
  { key: 'rejected', label: 'Rejected' },
]

export default function StudentApplications() {
  const [tab, setTab] = useState('all')
  const filtered = tab === 'all' ? applications : applications.filter(a => a.status === tab)

  const counts = {
    all: applications.length,
    applied: applications.filter(a=>a.status==='applied').length,
    shortlisted: applications.filter(a=>a.status==='shortlisted').length,
    interview: applications.filter(a=>a.status==='interview').length,
    hired: applications.filter(a=>a.status==='hired').length,
    rejected: applications.filter(a=>a.status==='rejected').length,
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="page-title mb-1">My Applications</h1>
      <p className="text-gray-500 text-sm mb-6">Track all your job applications in one place.</p>

      {/* Summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {[
          { label: 'Total', count: counts.all, dark: true },
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

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab===t.key ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {t.label} {counts[t.key as keyof typeof counts] > 0 && <span className="ml-1.5 opacity-70">{counts[t.key as keyof typeof counts]}</span>}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Company & Role</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Location</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Applied</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Last update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(app => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm flex-shrink-0">{app.logo}</div>
                    <div>
                      <div className="font-semibold text-sm text-black">{app.role}</div>
                      <div className="text-xs text-gray-500">{app.company} · <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">{app.type}</span></div>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12}/>{app.location}</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12}/>{app.applied}</span>
                </td>
                <td className="p-4"><Badge status={app.status}/></td>
                <td className="p-4 hidden lg:table-cell"><span className="text-xs text-gray-400">{app.lastUpdate}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">📭</div>
            <div className="text-sm">No applications in this category.</div>
          </div>
        )}
      </div>
    </div>
  )
}
