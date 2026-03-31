'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Briefcase, Eye, EyeOff, Mail, Lock, User, GraduationCap, CheckCircle2 } from 'lucide-react'
import Button from '@/components/Button'

type Role = 'student' | 'employer'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<Role>('student')
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Briefcase size={16} className="text-black" />
          </div>
          <span className="font-display font-bold text-xl text-white">Karyr</span>
        </Link>

        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-white">Your next big opportunity starts here.</h2>
          <ul className="space-y-4">
            {[
              { icon: '🎯', text: 'Personalized job recommendations' },
              { icon: '📩', text: 'Apply to top companies in 1 click' },
              { icon: '🏆', text: 'Stand out with a verified profile' },
              { icon: '💬', text: 'Connect directly with recruiters' },
            ].map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-gray-400 text-sm">
                <span className="text-xl">{item.icon}</span>{item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 size={14} className="text-gray-400" />
          Free forever for students
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <Briefcase size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-black">Karyr</span>
          </div>

          <h1 className="font-display text-3xl font-bold text-black mb-2">Create your account</h1>
          <p className="text-gray-500 mb-6">Free forever. No credit card required.</p>

          {/* Role toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {(['student', 'employer'] as Role[]).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${role === r ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {r === 'student' ? <GraduationCap size={15} /> : <Briefcase size={15} />}
                {r === 'student' ? 'Student' : 'Employer'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Your name" className="input-field pl-10" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{role === 'student' ? 'University email' : 'Work email'}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required placeholder={role === 'student' ? 'you@university.edu' : 'you@company.com'} className="input-field pl-10" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} required minLength={8} placeholder="Min. 8 characters" className="input-field pl-10 pr-10" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <Button type="submit" fullWidth size="lg" loading={loading}>
              {loading ? 'Creating account...' : `Join as ${role === 'student' ? 'a Student' : 'an Employer'}`}
            </Button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">
            By signing up, you agree to our <Link href="#" className="text-black hover:underline">Terms</Link> and <Link href="#" className="text-black hover:underline">Privacy Policy</Link>.
          </p>

          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-200" /><span className="text-xs text-gray-400 font-medium">OR</span><div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 btn-secondary py-3 text-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-semibold hover:text-gray-600">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
