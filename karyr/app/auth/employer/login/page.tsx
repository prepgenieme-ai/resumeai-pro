'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function EmployerLogin() {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/employer/dashboard'
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md"/></div>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold text-black mb-1">Employer sign in</h1>
          <p className="text-gray-500 text-sm mb-6">Manage your jobs and applicants.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="label">Work email</label><input type="email" className="input-field" placeholder="you@company.com" required/></div>
            <div><label className="label">Password</label><input type="password" className="input-field" placeholder="••••••••" required/></div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Signing in...' : 'Sign in'}</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">No account?{' '}<Link href="/auth/employer/signup" className="text-black font-semibold hover:underline">Sign up</Link></p>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4"><Link href="/auth/student/login" className="hover:text-black">Student login</Link>{' · '}<Link href="/auth/college/login" className="hover:text-black">College login</Link></p>
      </div>
    </div>
  )
}
