import Link from 'next/link'
import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
      <Logo href="/" size="md" />
      <div className="font-display text-8xl font-extrabold text-gray-100 mt-8 mb-2">404</div>
      <h1 className="font-display text-2xl font-bold text-black mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-xs text-sm">This page doesn't exist — but your next opportunity does.</p>
      <Link href="/" className="btn-primary px-6 py-3">Back to home</Link>
    </div>
  )
}
