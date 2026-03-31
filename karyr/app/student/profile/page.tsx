'use client'
import { useState } from 'react'
import { Upload, Plus, X } from 'lucide-react'

const suggestedSkills = ['Python','JavaScript','React','SQL','Machine Learning','Figma','Node.js','TypeScript','Excel','Communication']

export default function StudentProfile() {
  const [skills, setSkills] = useState(['Python','SQL','React'])
  const [newSkill, setNewSkill] = useState('')
  const [saved, setSaved] = useState(false)

  const addSkill = (s: string) => {
    if (s && !skills.includes(s)) setSkills(p=>[...p,s])
    setNewSkill('')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(()=>setSaved(false), 2500)
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Keep your profile updated to attract the best opportunities.</p>
        </div>
        {saved && <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">✓ Saved!</span>}
      </div>

      {/* Completion bar */}
      <div className="card p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-black">Profile completeness</span>
          <span className="text-sm font-bold text-black">60%</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2"><div className="bg-black h-2 rounded-full transition-all" style={{width:'60%'}}/></div>
        <p className="text-xs text-gray-500 mt-2">Add resume and preferred role to reach 100%</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic info */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Basic Information</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center font-display text-2xl font-bold">A</div>
            <button type="button" className="btn-secondary text-xs px-3 py-2">Change photo</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">Full name</label><input className="input-field" defaultValue="Alex Kumar" required/></div>
            <div><label className="label">Email</label><input type="email" className="input-field" defaultValue="alex@iitd.ac.in" required/></div>
            <div><label className="label">Phone</label><input type="tel" className="input-field" defaultValue="+91 98765 43210"/></div>
            <div><label className="label">City</label><input className="input-field" defaultValue="Bangalore"/></div>
            <div className="sm:col-span-2">
              <label className="label">Headline</label>
              <input className="input-field" placeholder="e.g. Final year CS student seeking SWE roles" defaultValue="Final year CS student at IIT Delhi | ML & Full-Stack"/>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Education</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="label">College / University</label><input className="input-field" defaultValue="IIT Delhi" required/></div>
            <div><label className="label">Degree & Course</label><input className="input-field" defaultValue="B.Tech Computer Science" required/></div>
            <div>
              <label className="label">Graduation Year</label>
              <select className="select-field" defaultValue="2026">
                {[2024,2025,2026,2027,2028].map(y=><option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map(s=>(
              <span key={s} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                {s}
                <button type="button" onClick={()=>setSkills(p=>p.filter(x=>x!==s))} className="text-gray-400 hover:text-black ml-0.5"><X size={13}/></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mb-4">
            <input className="input-field flex-1" placeholder="Add a skill..." value={newSkill} onChange={e=>setNewSkill(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addSkill(newSkill))}/>
            <button type="button" onClick={()=>addSkill(newSkill)} className="btn-secondary px-4 text-sm">Add</button>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">Suggestions:</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedSkills.filter(s=>!skills.includes(s)).map(s=>(
                <button type="button" key={s} onClick={()=>addSkill(s)}
                  className="flex items-center gap-1 text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-black hover:text-black transition-colors">
                  <Plus size={10}/>{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Job Preferences</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Preferred role</label>
              <select className="select-field" defaultValue="software-engineer">
                <option value="software-engineer">Software Engineer</option>
                <option value="data-analyst">Data Analyst</option>
                <option value="product-manager">Product Manager</option>
                <option value="designer">UX/UI Designer</option>
                <option value="ml-engineer">ML Engineer</option>
              </select>
            </div>
            <div>
              <label className="label">Job type</label>
              <select className="select-field" defaultValue="both">
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="label">Preferred location</label>
              <input className="input-field" defaultValue="Bangalore, Remote"/>
            </div>
            <div>
              <label className="label">Expected CTC / Stipend</label>
              <input className="input-field" placeholder="e.g. ₹40,000/mo or ₹8 LPA"/>
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="card p-6">
          <h2 className="section-title mb-2">Resume</h2>
          <p className="text-gray-500 text-xs mb-4">PDF format recommended. Max 5MB.</p>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-black transition-colors cursor-pointer group">
            <Upload size={24} className="mx-auto text-gray-400 group-hover:text-black mb-2 transition-colors"/>
            <p className="text-sm font-medium text-gray-700">Drop your resume here or <span className="text-black underline">browse</span></p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary px-8 py-3">Save Profile</button>
          <button type="button" className="btn-secondary px-6 py-3">Cancel</button>
        </div>
      </form>
    </div>
  )
}
