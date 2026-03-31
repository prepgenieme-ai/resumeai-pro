import { Briefcase, BookMarked, Bell, TrendingUp, Clock, CheckCircle2, ChevronRight, Search } from 'lucide-react'
import JobCard, { Job } from '@/components/JobCard'
import Link from 'next/link'

const recentJobs: Job[] = [
  { id: '1', title: 'Software Engineering Intern', company: 'Google', location: 'Mountain View, CA', type: 'Internship', salary: '$45–55/hr', logo: 'G', tags: ['Python', 'ML'], posted: '2 days ago', featured: true },
  { id: '2', title: 'Product Design Intern', company: 'Figma', location: 'San Francisco, CA', type: 'Internship', logo: 'F', tags: ['Figma', 'UX'], posted: '3 days ago' },
  { id: '3', title: 'Frontend Developer', company: 'Vercel', location: 'Remote', type: 'Contract', logo: 'V', tags: ['React', 'Next.js'], posted: '1 day ago' },
]

const applications = [
  { company: 'Stripe', role: 'Growth Marketing Intern', status: 'Interview', statusColor: 'text-gray-700 bg-gray-100', date: 'Mar 24' },
  { company: 'Notion', role: 'Operations Intern', status: 'Applied', statusColor: 'text-gray-600 bg-gray-100', date: 'Mar 20' },
  { company: 'Linear', role: 'Product Intern', status: 'Rejected', statusColor: 'text-gray-500 bg-gray-100 line-through', date: 'Mar 15' },
]

const stats = [
  { icon: <Briefcase size={18} />, label: 'Applications', value: '12', delta: '+3 this week' },
  { icon: <BookMarked size={18} />, label: 'Saved Jobs', value: '28', delta: '+5 new' },
  { icon: <Bell size={18} />, label: 'New Matches', value: '7', delta: 'Unread', accent: true },
  { icon: <TrendingUp size={18} />, label: 'Profile Views', value: '94', delta: '+18% vs last week' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">Good morning, Alex 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">You have 7 new job matches today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search jobs..." className="input-field pl-9 py-2.5 text-sm w-52 hidden sm:block" />
          </div>
          <Link href="/signup" className="btn-primary text-sm">Complete Profile</Link>
        </div>
      </div>

      {/* Profile completion banner */}
      <div className="bg-black rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white">Your profile is 65% complete</h3>
            <p className="text-gray-400 text-sm mt-0.5">Add your resume to get 4x more recruiter views</p>
            <div className="mt-2 bg-white/10 rounded-full h-1.5 w-48">
              <div className="bg-white h-1.5 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
        <Link href="/signup" className="bg-white text-black hover:bg-gray-100 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all whitespace-nowrap">
          Finish setup →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`card p-4 ${s.accent ? 'bg-black border-black' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${s.accent ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>{s.icon}</div>
            <div className={`font-display text-2xl font-bold ${s.accent ? 'text-white' : 'text-black'}`}>{s.value}</div>
            <div className={`text-xs mt-0.5 ${s.accent ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</div>
            <div className={`text-xs font-medium mt-1 ${s.accent ? 'text-gray-300' : 'text-gray-500'}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-black text-lg">Recommended for you</h2>
            <Link href="#" className="text-sm text-black hover:text-gray-600 font-medium">View all</Link>
          </div>
          <div className="space-y-3">
            {recentJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-black">Applications</h3>
              <Link href="#" className="text-xs text-black font-medium">View all</Link>
            </div>
            <div className="space-y-3">
              {applications.map((app, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-black truncate">{app.role}</div>
                    <div className="text-xs text-gray-400">{app.company} · {app.date}</div>
                  </div>
                  <span className={`ml-3 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${app.statusColor}`}>{app.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-black">Deadlines</h3>
              <Clock size={16} className="text-gray-400" />
            </div>
            <div className="space-y-3">
              {[
                { company: 'Microsoft', role: 'SWE Intern', deadline: 'Apr 1', urgent: true },
                { company: 'Meta', role: 'PM Intern', deadline: 'Apr 10', urgent: false },
                { company: 'Amazon', role: 'SDE Intern', deadline: 'Apr 15', urgent: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${item.urgent ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>{item.deadline}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-black truncate">{item.role}</div>
                    <div className="text-xs text-gray-400">{item.company}</div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 flex-shrink-0 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-semibold text-black mb-3">Career resources</h3>
            <div className="space-y-2">
              {['📝 Resume Review (Free)', '🎤 Mock Interviews', '📚 Offer Negotiation Guide'].map((item) => (
                <Link key={item} href="/signup" className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 text-sm text-gray-700 group transition-colors">
                  {item}
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-black transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
