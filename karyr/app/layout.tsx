import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Karyr – Campus Placement Platform',
  description: 'Connecting students, employers, and colleges for smarter campus placement.',
  keywords: 'campus placement, internships, jobs, students, employers, college recruiting',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  )
}
