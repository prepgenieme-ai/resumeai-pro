import Link from 'next/link'
import { FileText, BookMarked, TrendingUp, ArrowRight, Clock } from 'lucide-react'
import StatsCard from '@/components/ui/StatsCard'
import Badge from '@/components/ui/Badge'

const recentApps = [
  { company: 'Google', role: 'SWE Intern', status: 'shortlisted' as const, date: 'Mar 25', logo: 'G' },
  { company: 'Stripe', role: 'Data Analyst', status: 'applied' as const, date: 'Mar 22', logo: 'S' },
  { company: 'Notion', role: 'PM Intern', status: 'interview' as const, date: 'Mar 18', logo: 'N' },
  { company: 'Linear', role: 'Frontend Dev', status: 'rejected' as const, date: 'Mar 12', logo: 'L' },
]
const recJobs = [
  { id: '1', title: 'Software Engineering Intern', company: 'Microsoft', location: 'Bangalore', type: 'Internship', pay: '₹60,000/mo', logo: 'M' },
  { id: '2', title: 'Data Analyst', company: 'Razorpay', location: 'Pune · Remote', type: 'Full-time', pay: '₹8–12 LPA', logo: 'R' },
  { id: '3', title: 'Product Intern', company: 'Zepto', location: 'Mumbai', type: 'Internship', pay: '₹40,000/mo', logo: 'Z' },
]

export default function StudentDashboard() {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="page-title">Good morning, Alex 👋</h1>
        <p className="text-gray-500 text-sm mt-1">You have 3 new job matches and 1 interview scheduled.</p>
      </div>
      <div className="card p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-black">
        <div>
          <h3 className="font-semibold text-black text-sm">Complete your profile — 60% done</h3>
          <p className="text-gray-500 text-xs mt-0.5">Add your resume and skills to get 3x more recruiter views.</p>
          <div className="mt-2 bg-gray-200 rounded-full h-1.5 w-48"><div className="bg-black h-1.5 rounded-full" style={{width:'60%'}}/></div>
        </div>
        <Link href="/student/profile" className="btn-primary text-xs px-4 py-2 whitespace-nowrap">Complete profile →</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Applications" value="12" icon={<FileText size={18}/>} sub="+3 this week"/>
        <StatsCard label="Saved Jobs" value="28" icon={<BookMarked size={18}/>}/>
        <StatsCard label="Interviews" value="2" icon={<Clock size={18}/>} sub="Upcoming" dark/>
        <StatsCard label="Profile Views" value="94" icon={<TrendingUp size={18}/>} sub="+18%"/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recommended for you</h2>
            <Link href="/student/jobs" className="text-sm text-black font-medium hover:underline flex items-center gap-1">View all <ArrowRight size={14}/></Link>
          </div>
          <div className="space-y-3">
            {recJobs.map(job => (
              <div key={job.id} className="card p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 flex-shrink-0">{job.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-black truncate">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.company} · {job.location}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{job.type}</span>
                    <span className="text-xs text-gray-500">{job.pay}</span>
                  </div>
                </div>
                <Link href="/student/jobs" className="btn-primary text-xs px-3 py-2 flex-shrink-0">Apply</Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent applications</h2>
            <Link href="/student/applications" className="text-sm text-black font-medium hover:underline">View all</Link>
          </div>
          <div className="card divide-y divide-gray-100">
            {recentApps.map((app, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm flex-shrink-0">{app.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-black truncate">{app.role}</div>
                  <div className="text-xs text-gray-400">{app.company} · {app.date}</div>
                </div>
                <Badge status={app.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
