'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Eye, Edit2, Trash2, MapPin, Clock } from 'lucide-react'
import Badge from '@/components/ui/Badge'

type AppStatus = 'applied' | 'shortlisted' | 'interview' | 'hired' | 'rejected'

const jobs = [
  { id: '1', title: 'Software Engineering Intern', type: 'Internship', location: 'Bangalore', pay: '₹60,000/mo', status: 'active', posted: 'Mar 20', deadline: 'Apr 10', applicants: 48 },
  { id: '2', title: 'Data Analyst', type: 'Full-time', location: 'Pune', pay: '₹8–12 LPA', status: 'active', posted: 'Mar 15', deadline: 'Apr 20', applicants: 31 },
  { id: '3', title: 'Product Management Intern', type: 'Internship', location: 'Remote', pay: '₹40,000/mo', status: 'active', posted: 'Mar 10', deadline: 'Apr 15', applicants: 22 },
  { id: '4', title: 'Marketing Associate', type: 'Full-time', location: 'Mumbai', pay: '₹5–7 LPA', status: 'closed', posted: 'Feb 1', deadline: 'Mar 1', applicants: 67 },
]

const applicantsByJob: Record<string, { name: string; college: string; avatar: string; status: AppStatus; applied: string; skills: string[] }[]> = {
  '1': [
    { name: 'Alex Kumar', college: 'IIT Delhi', avatar: 'AK', status: 'shortlisted', applied: 'Mar 27', skills: ['Python', 'ML', 'React'] },
    { name: 'Priya Singh', college: 'BITS Pilani', avatar: 'PS', status: 'applied', applied: 'Mar 26', skills: ['Go', 'SQL', 'AWS'] },
    { name: 'Rohit Verma', college: 'NIT Surathkal', avatar: 'RV', status: 'interview', applied: 'Mar 25', skills: ['Python', 'Django', 'PostgreSQL'] },
    { name: 'Sneha Iyer', college: 'IIT Bombay', avatar: 'SI', status: 'applied', applied: 'Mar 24', skills: ['Java', 'Spring', 'Microservices'] },
    { name: 'Karan Shah', college: 'VIT Vellore', avatar: 'KS', status: 'rejected', applied: 'Mar 22', skills: ['C++', 'DSA'] },
  ],
  '2': [
    { name: 'Ananya Nair', college: 'IIM Ahmedabad', avatar: 'AN', status: 'interview', applied: 'Mar 25', skills: ['SQL', 'Tableau', 'Python'] },
    { name: 'Dev Patel', college: 'NIT Trichy', avatar: 'DP', status: 'shortlisted', applied: 'Mar 24', skills: ['SQL', 'Power BI', 'Excel'] },
    { name: 'Meera Gupta', college: 'Delhi University', avatar: 'MG', status: 'applied', applied: 'Mar 23', skills: ['Python', 'R', 'Statistics'] },
  ],
  '3': [
    { name: 'Arjun Mehta', college: 'IIM Bangalore', avatar: 'AM', status: 'shortlisted', applied: 'Mar 26', skills: ['Product', 'Analytics', 'Figma'] },
    { name: 'Tanya Roy', college: 'XLRI Jamshedpur', avatar: 'TR', status: 'applied', applied: 'Mar 25', skills: ['Strategy', 'Excel', 'SQL'] },
  ],
  '4': [],
}

export default function EmployerJobs() {
  const [selectedJob, setSelectedJob] = useState(jobs[0])
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({})

  const applicants = applicantsByJob[selectedJob.id] || []

  const updateStatus = (name: string, status: AppStatus) => {
    setStatuses(s => ({ ...s, [`${selectedJob.id}-${name}`]: status }))
  }

  const getStatus = (name: string, defaultStatus: AppStatus): AppStatus => {
    return statuses[`${selectedJob.id}-${name}`] ?? defaultStatus
  }

  return (
    <div className="flex h-screen md:h-auto overflow-hidden md:overflow-visible">
      {/* Left: Job list */}
      <div className="w-full md:w-80 flex flex-col border-r border-gray-200 bg-white flex-shrink-0">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h1 className="section-title">My Jobs</h1>
          <Link href="/employer/jobs/new" className="btn-primary text-xs px-3 py-2 flex items-center gap-1.5"><Plus size={13}/>Post Job</Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          {jobs.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(job)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedJob.id === job.id ? 'bg-gray-50 border-l-2 border-l-black' : ''}`}>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="font-semibold text-sm text-black leading-snug">{job.title}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${job.status === 'active' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>{job.status}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1"><MapPin size={10}/>{job.location}</span>
                <span>·</span>
                <span>{job.type}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1"><Clock size={10}/>Due {job.deadline}</span>
                <span className="font-semibold text-black">{job.applicants} applicants</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Applicants */}
      <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto">
        {/* Job header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-black">{selectedJob.title}</h2>
              <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={13}/>{selectedJob.location}</span>
                <span>{selectedJob.type}</span>
                <span>{selectedJob.pay}</span>
                <span className="flex items-center gap-1"><Clock size={13}/>Deadline: {selectedJob.deadline}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost text-xs px-3 py-2 flex items-center gap-1.5"><Edit2 size={13}/>Edit</button>
              <button className="btn-ghost text-xs px-3 py-2 text-red-500 hover:bg-red-50 flex items-center gap-1.5"><Trash2 size={13}/>Close</button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            {[
              { label: 'Total', count: applicants.length },
              { label: 'Applied', count: applicants.filter(a=>getStatus(a.name,a.status)==='applied').length },
              { label: 'Shortlisted', count: applicants.filter(a=>getStatus(a.name,a.status)==='shortlisted').length },
              { label: 'Interview', count: applicants.filter(a=>getStatus(a.name,a.status)==='interview').length },
              { label: 'Hired', count: applicants.filter(a=>getStatus(a.name,a.status)==='hired').length },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display font-bold text-black">{s.count}</div>
                <div className="text-xs text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Applicants table */}
        <div className="flex-1 p-6">
          {applicants.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">📭</div>
              <div className="font-semibold text-black mb-1">No applicants yet</div>
              <div className="text-sm text-gray-400">Share your job posting to attract candidates.</div>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Candidate</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Skills</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Applied</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="text-left p-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applicants.map((a, i) => {
                    const currentStatus = getStatus(a.name, a.status)
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs flex-shrink-0">{a.avatar}</div>
                            <div>
                              <div className="font-semibold text-sm text-black">{a.name}</div>
                              <div className="text-xs text-gray-400">{a.college}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {a.skills.slice(0,2).map(s=><span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>)}
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <span className="text-xs text-gray-400">{a.applied}</span>
                        </td>
                        <td className="p-4"><Badge status={currentStatus}/></td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <button onClick={() => updateStatus(a.name, 'shortlisted')}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${currentStatus==='shortlisted'?'bg-gray-800 text-white border-gray-800':'border-gray-200 text-gray-600 hover:border-gray-800 hover:text-gray-800'}`}>
                              Shortlist
                            </button>
                            <button onClick={() => updateStatus(a.name, 'interview')}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${currentStatus==='interview'?'bg-gray-200 text-gray-900 border-gray-300':'border-gray-200 text-gray-600 hover:border-gray-400'}`}>
                              Interview
                            </button>
                            <button onClick={() => updateStatus(a.name, 'hired')}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-colors ${currentStatus==='hired'?'bg-black text-white border-black':'border-gray-200 text-gray-600 hover:border-black hover:text-black'}`}>
                              Hire
                            </button>
                            <button onClick={() => updateStatus(a.name, 'rejected')}
                              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium text-red-500 transition-colors ${currentStatus==='rejected'?'bg-red-50 border-red-200':'border-gray-200 hover:border-red-200 hover:bg-red-50'}`}>
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
