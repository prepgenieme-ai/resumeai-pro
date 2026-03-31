'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Search, FileText, User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '../Logo'

const links = [
  { href: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/student/jobs', icon: Search, label: 'Find Jobs' },
  { href: '/student/applications', icon: FileText, label: 'My Applications' },
  { href: '/student/profile', icon: User, label: 'My Profile' },
]

export default function StudentSidebar() {
  const path = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const nav = (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, icon: Icon, label }) => (
        <Link key={href} href={href} onClick={() => setMobileOpen(false)}
          className={path === href ? 'sidebar-link-active' : 'sidebar-link'}>
          <Icon size={18} />{label}
        </Link>
      ))}
    </nav>
  )
  return (
    <>
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-white border-r border-gray-200 p-4 fixed top-0 left-0 z-30">
        <div className="mb-8 pt-2 px-1"><Logo href="/student/dashboard" size="md" /></div>
        {nav}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">A</div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-black truncate">Alex Kumar</div>
              <div className="text-xs text-gray-400">Student</div>
            </div>
          </div>
          <Link href="/" className="sidebar-link text-red-500 hover:text-red-600 hover:bg-red-50"><LogOut size={18} />Log out</Link>
        </div>
      </aside>
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
        <Logo href="/student/dashboard" size="sm" />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg hover:bg-gray-100">{mobileOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div className="w-64 h-full bg-white p-4 shadow-xl" onClick={e=>e.stopPropagation()}>
            <div className="mb-6"><Logo href="/student/dashboard" size="md"/></div>{nav}
          </div>
        </div>
      )}
    </>
  )
}
