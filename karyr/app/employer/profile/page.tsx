'use client'
import { useState } from 'react'
import { Globe, MapPin, Users } from 'lucide-react'

export default function EmployerProfile() {
  const [saved, setSaved] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Company Profile</h1>
          <p className="text-gray-500 text-sm mt-1">A strong profile helps attract better candidates.</p>
        </div>
        {saved && <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">✓ Saved!</span>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company identity */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Company Information</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-xl bg-black text-white flex items-center justify-center font-display text-2xl font-bold">T</div>
            <div>
              <button type="button" className="btn-secondary text-xs px-3 py-2">Upload logo</button>
              <p className="text-xs text-gray-400 mt-1">PNG or JPG. 400×400px recommended.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="label">Company name <span className="text-red-400">*</span></label>
              <input className="input-field" defaultValue="TechCorp Pvt Ltd" required/>
            </div>
            <div>
              <label className="label">Website</label>
              <div className="relative">
                <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="url" className="input-field pl-9" defaultValue="https://techcorp.in"/>
              </div>
            </div>
            <div>
              <label className="label">Headquarters</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input className="input-field pl-9" defaultValue="Bangalore, Karnataka"/>
              </div>
            </div>
            <div>
              <label className="label">Industry</label>
              <select className="select-field" defaultValue="technology">
                <option value="technology">Technology</option>
                <option value="finance">Finance & Fintech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="edtech">EdTech</option>
                <option value="healthcare">Healthcare</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">Company size</label>
              <div className="relative">
                <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"/>
                <select className="select-field pl-9" defaultValue="51-200">
                  <option>1–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>201–500</option>
                  <option>500+</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="label">About the company</label>
              <textarea className="input-field resize-none" rows={4}
                defaultValue="TechCorp is a fast-growing B2B SaaS company building the next generation of enterprise tools. We're backed by top VCs and used by 500+ companies worldwide."/>
            </div>
          </div>
        </div>

        {/* Recruiter info */}
        <div className="card p-6">
          <h2 className="section-title mb-5">Recruiter Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Your name</label>
              <input className="input-field" defaultValue="Rahul Verma"/>
            </div>
            <div>
              <label className="label">Designation</label>
              <input className="input-field" defaultValue="HR Manager"/>
            </div>
            <div>
              <label className="label">Work email</label>
              <input type="email" className="input-field" defaultValue="rahul@techcorp.in"/>
            </div>
            <div>
              <label className="label">Phone</label>
              <input type="tel" className="input-field" defaultValue="+91 98765 43210"/>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button type="submit" className="btn-primary px-8 py-3">Save Profile</button>
          <button type="button" className="btn-secondary px-6 py-3">Cancel</button>
        </div>
      </form>
    </div>
  )
}
