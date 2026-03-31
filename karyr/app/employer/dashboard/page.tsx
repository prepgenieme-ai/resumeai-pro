import Link from 'next/link'
import { Briefcase, Users, TrendingUp, ArrowRight, Eye, CheckCircle } from 'lucide-react'
import StatsCard from '@/components/ui/StatsCard'
import Badge from '@/components/ui/Badge'

const recentApplicants = [
  { name: 'Alex Kumar', role: 'SWE Intern', college: 'IIT Delhi', status: 'shortlisted' as const, applied: 'Mar 27', avatar: 'AK' },
  { name: 'Priya Singh', role: 'SWE Intern', college: 'BITS Pilani', status: 'applied' as const, applied: 'Mar 26', avatar: 'PS' },
  { name: 'Rohit Sharma', role: 'Data Analyst', college: 'NIT Trichy', status: 'interview' as const, applied: 'Mar 25', avatar: 'RS' },
  { name: 'Ananya Nair', role: 'PM Intern', college: 'IIM Ahmedabad', status: 'applied' as const, applied: 'Mar 25', avatar: 'AN' },
  { name: 'Dev Patel', role: 'Data Analyst', college: 'VIT Vellore', status: 'rejected' as const, applied: 'Mar 24', avatar: 'DP' },
]

const activeJobs = [
  { id: '1', title: 'Software Engineering Intern', type: 'Internship', applicants: 48, new: 12, deadline: 'Apr 10' },
  { id: '2', title: 'Data Analyst', type: 'Full-time', applicants: 31, new: 5, deadline: 'Apr 20' },
  { id: '3', title: 'Product Management Intern', type: 'Internship', applicants: 22, new: 8, deadline: 'Apr 15' },
]

export default function EmployerDashboard() {
  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="page-title">Welcome back, TechCorp 👋</h1>
          <p className="text-gray-500 text-sm mt-1">You have 25 new applicants across your active jobs.</p>
        </div>
        <Link href="/employer/jobs/new" className="btn-primary text-sm flex items-center gap-2">
          + Post a Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Active Jobs" value="3" icon={<Briefcase size={18}/>} sub="2 expiring soon"/>
        <StatsCard label="Total Applicants" value="101" icon={<Users size={18}/>} sub="All time"/>
        <StatsCard label="New This Week" value="25" icon={<TrendingUp size={18}/>} sub="+18% vs last week" dark/>
        <StatsCard label="Hired" value="6" icon={<CheckCircle size={18}/>} sub="This quarter"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Active jobs */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Active job postings</h2>
            <Link href="/employer/jobs" className="text-sm text-black font-medium hover:underline flex items-center gap-1">View all <ArrowRight size={14}/></Link>
          </div>
          <div className="space-y-3">
            {activeJobs.map(job => (
              <div key={job.id} className="card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-black">{job.title}</div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded-full font-medium ${job.type==='Internship'?'bg-gray-100 text-gray-600':'bg-black text-white'}`}>{job.type}</span>
                      <span>Deadline: {job.deadline}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-xl font-bold text-black">{job.applicants}</div>
                    <div className="text-xs text-gray-400">applicants</div>
                    {job.new > 0 && <div className="text-xs text-black font-semibold mt-0.5">+{job.new} new</div>}
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <Link href={`/employer/jobs`} className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"><Eye size={13}/>View applicants</Link>
                  <Link href={`/employer/jobs`} className="btn-ghost text-xs px-3 py-1.5">Edit posting</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/employer/jobs/new" className="card p-4 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-black hover:border-black transition-all border-2 border-dashed w-full">
              + Post a new job
            </Link>
          </div>
        </div>

        {/* Recent applicants */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent applicants</h2>
            <Link href="/employer/jobs" className="text-sm text-black font-medium hover:underline">View all</Link>
          </div>
          <div className="card divide-y divide-gray-100">
            {recentApplicants.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">{a.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-black truncate">{a.name}</div>
                  <div className="text-xs text-gray-400 truncate">{a.role} · {a.college}</div>
                </div>
                <Badge status={a.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
