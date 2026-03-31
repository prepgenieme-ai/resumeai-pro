import Logo from './Logo'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Logo href="/" inverted size="md" />
            <p className="text-sm text-gray-500 mt-3">Campus placement, reimagined.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {[['For Students', '/auth/student/signup'], ['For Employers', '/auth/employer/signup'], ['For Colleges', '/auth/college/login'], ['About', '/about']].map(([label, href]) => (
              <Link key={label} href={href} className="text-gray-500 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-900 text-xs text-gray-700">
          © {new Date().getFullYear()} Karyr. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
