'use client'
import { useState } from 'react'
import { Search, MapPin, Filter, Bookmark, X } from 'lucide-react'

const allJobs = [
  { id:'1', title:'Software Engineering Intern', company:'Google', location:'Bangalore', type:'Internship', pay:'₹60,000/mo', logo:'G', skills:['Python','Go','ML'], posted:'2d ago', desc:'Join our AI team and work on products used by billions.' },
  { id:'2', title:'Data Analyst', company:'Razorpay', location:'Pune', type:'Full-time', pay:'₹8–12 LPA', logo:'R', skills:['SQL','Python','Tableau'], posted:'3d ago', desc:'Analyze payments data to drive product decisions.' },
  { id:'3', title:'Product Management Intern', company:'Zepto', location:'Mumbai', type:'Internship', pay:'₹40,000/mo', logo:'Z', skills:['Product','Analytics'], posted:'1d ago', desc:'Own a product area end-to-end from day one.' },
  { id:'4', title:'Frontend Developer', company:'Vercel', location:'Remote', type:'Full-time', pay:'₹15–20 LPA', logo:'V', skills:['React','Next.js','TypeScript'], posted:'5d ago', desc:'Build the future of web development tooling.' },
  { id:'5', title:'ML Engineer Intern', company:'CRED', location:'Bangalore', type:'Internship', pay:'₹50,000/mo', logo:'C', skills:['Python','TensorFlow','ML'], posted:'1w ago', desc:'Work on recommendation and fraud detection systems.' },
  { id:'6', title:'Growth Marketing', company:'Meesho', location:'Bangalore', type:'Full-time', pay:'₹6–10 LPA', logo:'M', skills:['Growth','SEO','Analytics'], posted:'4d ago', desc:'Drive user acquisition and retention for 100M+ users.' },
  { id:'7', title:'Backend Engineer Intern', company:'PhonePe', location:'Pune', type:'Internship', pay:'₹45,000/mo', logo:'P', skills:['Java','Microservices','SQL'], posted:'2d ago', desc:'Build high-scale payment infrastructure.' },
  { id:'8', title:'UX Design Intern', company:'Swiggy', location:'Bangalore', type:'Internship', pay:'₹35,000/mo', logo:'S', skills:['Figma','UX','Research'], posted:'6d ago', desc:'Design for 80 million hungry users.' },
]

export default function StudentJobs() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [selectedJob, setSelectedJob] = useState(allJobs[0])
  const [applied, setApplied] = useState<string[]>([])
  const [saved, setSaved] = useState<string[]>([])

  const types = ['All', 'Internship', 'Full-time']
  const locations = ['All', 'Bangalore', 'Mumbai', 'Pune', 'Remote']

  const filtered = allJobs.filter(j => {
    const matchSearch = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || j.type === typeFilter
    const matchLoc = locationFilter === 'All' || j.location.includes(locationFilter)
    return matchSearch && matchType && matchLoc
  })

  return (
    <div className="flex h-screen md:h-auto">
      {/* Left: list */}
      <div className="w-full md:w-96 flex flex-col border-r border-gray-200 bg-white">
        {/* Search & filters */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input className="input-field pl-9" placeholder="Search jobs, companies..." value={search} onChange={e=>setSearch(e.target.value)}/>
            {search && <button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"><X size={14}/></button>}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {types.map(t => (
              <button key={t} onClick={()=>setTypeFilter(t)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${typeFilter===t ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{t}</button>
            ))}
            <div className="w-px bg-gray-200 mx-1 flex-shrink-0"/>
            {locations.map(l => (
              <button key={l} onClick={()=>setLocationFilter(l)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${locationFilter===l ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{l}</button>
            ))}
          </div>
        </div>
        {/* Job list */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 text-xs text-gray-500 font-medium">{filtered.length} jobs found</div>
          {filtered.map(job => (
            <div key={job.id} onClick={()=>setSelectedJob(job)}
              className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedJob.id===job.id ? 'bg-gray-50 border-l-2 border-l-black' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm flex-shrink-0">{job.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-black truncate">{job.title}</div>
                  <div className="text-xs text-gray-500">{job.company}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10}/>{job.location}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${job.type==='Internship'?'bg-gray-100 text-gray-600':'bg-black text-white'}`}>{job.type}</span>
                  </div>
                  <div className="text-xs font-semibold text-black mt-1">{job.pay}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: detail */}
      <div className="hidden md:flex flex-1 flex-col bg-white overflow-y-auto">
        {selectedJob && (
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-xl">{selectedJob.logo}</div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-black">{selectedJob.title}</h1>
                  <div className="text-gray-500 mt-0.5">{selectedJob.company}</div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={13}/>{selectedJob.location}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedJob.type==='Internship'?'bg-gray-100 text-gray-700':'bg-black text-white'}`}>{selectedJob.type}</span>
                    <span className="text-xs text-gray-400">{selectedJob.posted}</span>
                  </div>
                </div>
              </div>
              <button onClick={()=>setSaved(s=>s.includes(selectedJob.id)?s.filter(x=>x!==selectedJob.id):[...s,selectedJob.id])}
                className={`p-2.5 rounded-lg border transition-colors ${saved.includes(selectedJob.id)?'bg-black text-white border-black':'border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                <Bookmark size={18}/>
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-wrap gap-6">
              <div><div className="text-xs text-gray-400 mb-0.5">Compensation</div><div className="font-semibold text-black">{selectedJob.pay}</div></div>
              <div><div className="text-xs text-gray-400 mb-0.5">Job type</div><div className="font-semibold text-black">{selectedJob.type}</div></div>
              <div><div className="text-xs text-gray-400 mb-0.5">Location</div><div className="font-semibold text-black">{selectedJob.location}</div></div>
            </div>
            <div className="mb-6">
              <h3 className="section-title mb-3">About this role</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{selectedJob.desc} This is a fantastic opportunity for students looking to gain real-world experience at a top company. You will collaborate with senior engineers and PMs, and your work will directly impact millions of users.</p>
            </div>
            <div className="mb-8">
              <h3 className="section-title mb-3">Required skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skills.map(s=><span key={s} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{s}</span>)}
              </div>
            </div>
            <div className="flex gap-3">
              {applied.includes(selectedJob.id)
                ? <button className="btn-secondary flex-1 py-3 text-sm" disabled>✓ Applied</button>
                : <button onClick={()=>setApplied(a=>[...a,selectedJob.id])} className="btn-primary flex-1 py-3 text-sm">Apply Now</button>
              }
              <button className="btn-secondary px-5 py-3 text-sm">Save for later</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
