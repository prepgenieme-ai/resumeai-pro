'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function EmployerSignup() {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/employer/dashboard'
  }
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-12">
        <Logo inverted size="md"/>
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-4">Hire top campus talent.</h2>
          <ul className="space-y-3">
            {['Post jobs in minutes','Access 200K+ student profiles','AI-powered candidate matching','Manage all applications in one place'].map(t=>(
              <li key={t} className="flex items-center gap-3 text-gray-400 text-sm"><span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">✓</span>{t}</li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600 text-sm">First job posting is free.</p>
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo size="md"/></div>
          <h1 className="font-display text-2xl font-bold text-black mb-1">Create employer account</h1>
          <p className="text-gray-500 text-sm mb-6">Start hiring the best students today.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Recruiter name</label>
              <input className="input-field" placeholder="Your full name" required/>
            </div>
            <div>
              <label className="label">Company name</label>
              <input className="input-field" placeholder="e.g. TechCorp Pvt Ltd" required/>
            </div>
            <div>
              <label className="label">Company website</label>
              <input type="url" className="input-field" placeholder="https://yourcompany.com" required/>
            </div>
            <div>
              <label className="label">Work email</label>
              <input type="email" className="input-field" placeholder="you@company.com" required/>
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input-field" placeholder="Min. 8 characters" minLength={8} required/>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating account...' : 'Create Employer Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-5">Already have an account?{' '}<Link href="/auth/employer/login" className="text-black font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
