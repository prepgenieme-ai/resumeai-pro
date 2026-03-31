'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function CollegeLogin() {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/college/dashboard'
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md"/></div>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold text-black mb-1">College admin sign in</h1>
          <p className="text-gray-500 text-sm mb-6">Track placements across your institution.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="label">College email</label><input type="email" className="input-field" placeholder="admin@college.edu" required/></div>
            <div><label className="label">Password</label><input type="password" className="input-field" placeholder="••••••••" required/></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">Contact your Karyr representative to get credentials.</p>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4"><Link href="/auth/student/login" className="hover:text-black">Student login</Link>{' · '}<Link href="/auth/employer/login" className="hover:text-black">Employer login</Link></p>
      </div>
    </div>
  )
}
