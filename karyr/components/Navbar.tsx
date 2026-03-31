'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo href="/" size="md" />

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/student/jobs" className="btn-ghost text-sm">Find Jobs</Link>
            <Link href="/about" className="btn-ghost text-sm">About</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {/* Sign in dropdown */}
            <div className="relative">
              <button onClick={() => setRoleOpen(!roleOpen)} className="btn-ghost text-sm flex items-center gap-1.5">
                Sign in <ChevronDown size={14} />
              </button>
              {roleOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                  <Link href="/auth/student/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setRoleOpen(false)}>Student</Link>
                  <Link href="/auth/employer/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setRoleOpen(false)}>Employer</Link>
                  <Link href="/auth/college/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium" onClick={() => setRoleOpen(false)}>College Admin</Link>
                </div>
              )}
            </div>
            <Link href="/auth/student/signup" className="btn-primary text-sm">Get started</Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          <Link href="/auth/student/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>Student Login</Link>
          <Link href="/auth/employer/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>Employer Login</Link>
          <Link href="/auth/college/login" className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm" onClick={() => setOpen(false)}>College Login</Link>
          <div className="pt-2 border-t border-gray-100 mt-2">
            <Link href="/auth/student/signup" className="btn-primary text-sm w-full text-center block" onClick={() => setOpen(false)}>Get started free</Link>
          </div>
        </div>
      )}
    </header>
  )
}
