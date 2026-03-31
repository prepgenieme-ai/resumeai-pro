'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function StudentLogin() {
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    window.location.href = '/student/dashboard'
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8"><Logo href="/" size="md" /></div>
        <div className="card p-8">
          <h1 className="font-display text-2xl font-bold text-black mb-1">Student sign in</h1>
          <p className="text-gray-500 text-sm mb-6">Welcome back! Continue your job search.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input type="email" className="input-field" placeholder="you@college.edu" required/>
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" className="input-field" placeholder="••••••••" required/>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <div className="mt-4 text-center space-y-2">
            <Link href="#" className="text-xs text-gray-500 hover:text-black block">Forgot password?</Link>
            <p className="text-sm text-gray-500">Don't have an account?{' '}<Link href="/auth/student/signup" className="text-black font-semibold hover:underline">Sign up free</Link></p>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-4">
          Employer or College?{' '}
          <Link href="/auth/employer/login" className="text-black font-medium hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  )
}
