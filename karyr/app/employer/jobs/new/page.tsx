'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PostJob() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '', type: 'Internship', location: '', locationType: 'On-site',
    pay: '', payType: 'Monthly stipend', openings: '1',
    deadline: '', description: '', requirements: '', skills: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    router.push('/employer/jobs')
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/employer/jobs" className="btn-ghost p-2"><ArrowLeft size={18}/></Link>
        <div>
          <h1 className="page-title">Post a Job</h1>
          <p className="text-gray-500 text-sm mt-0.5">Fill in the details to attract the right candidates.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role basics */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Role Details</h2>
          <div className="space-y-4">
            <div>
              <label className="label">Job title <span className="text-red-400">*</span></label>
              <input className="input-field" placeholder="e.g. Software Engineering Intern" required value={form.title} onChange={e=>set('title',e.target.value)}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Job type <span className="text-red-400">*</span></label>
                <select className="select-field" value={form.type} onChange={e=>set('type',e.target.value)}>
                  <option>Internship</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="label">Number of openings</label>
                <input type="number" className="input-field" min="1" value={form.openings} onChange={e=>set('openings',e.target.value)}/>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Work location</label>
                <input className="input-field" placeholder="e.g. Bangalore, Karnataka" value={form.location} onChange={e=>set('location',e.target.value)}/>
              </div>
              <div>
                <label className="label">Work mode</label>
                <select className="select-field" value={form.locationType} onChange={e=>set('locationType',e.target.value)}>
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Compensation</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Pay type</label>
              <select className="select-field" value={form.payType} onChange={e=>set('payType',e.target.value)}>
                <option>Monthly stipend</option>
                <option>Annual CTC</option>
                <option>Hourly rate</option>
                <option>Unpaid</option>
              </select>
            </div>
            <div>
              <label className="label">Amount</label>
              <input className="input-field" placeholder="e.g. ₹40,000 or ₹8–12 LPA" value={form.pay} onChange={e=>set('pay',e.target.value)}/>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Job Description</h2>
          <div className="space-y-4">
            <div>
              <label className="label">About this role <span className="text-red-400">*</span></label>
              <textarea className="input-field resize-none" rows={5}
                placeholder="Describe the role, responsibilities, team, and what the candidate will work on..."
                required value={form.description} onChange={e=>set('description',e.target.value)}/>
            </div>
            <div>
              <label className="label">Requirements</label>
              <textarea className="input-field resize-none" rows={4}
                placeholder="List qualifications, educational background, experience level expected..."
                value={form.requirements} onChange={e=>set('requirements',e.target.value)}/>
            </div>
            <div>
              <label className="label">Required skills</label>
              <input className="input-field" placeholder="e.g. Python, SQL, React (comma-separated)" value={form.skills} onChange={e=>set('skills',e.target.value)}/>
              <p className="text-xs text-gray-400 mt-1">Separate skills with commas.</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Application Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Application deadline</label>
              <input type="date" className="input-field" value={form.deadline} onChange={e=>set('deadline',e.target.value)}/>
            </div>
            <div>
              <label className="label">Eligible graduation years</label>
              <select className="select-field">
                <option>2025 & 2026</option>
                <option>2025 only</option>
                <option>2026 only</option>
                <option>All years</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={loading} className="btn-primary px-8 py-3">
            {loading ? 'Publishing job...' : 'Publish Job'}
          </button>
          <button type="button" className="btn-secondary px-6 py-3">Save as Draft</button>
          <Link href="/employer/jobs" className="btn-ghost px-4 py-3">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
