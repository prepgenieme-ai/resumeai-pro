import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [name, setName] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }
    const userName = email.split('@')[0]
    setName(userName)
    setLoggedIn(true)
    toast.success('Welcome! Let\'s optimise your resume 🎉')
    // ✅ Go DIRECTLY to optimize — no payment page
    setTimeout(() => {
      router.push('/optimize')
    }, 800)
  }

  // Sign in screen
  if (!loggedIn) {
    return (
      <>
        <Head>
          <title>Sign In — ResumeAI Pro</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--paper)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
              </div>
              <span className="font-semibold text-[var(--ink)]" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
            </Link>

            <div className="card p-8">
              <h1 className="text-3xl font-bold mb-2 text-center" style={{fontFamily:'Clash Display'}}>Get Started</h1>
              <p className="text-[var(--muted)] text-center mb-8 text-sm">Enter your email to save your optimised resume</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--paper)] focus:outline-none focus:border-[var(--accent)] transition-colors text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[var(--accent)] text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition-colors"
                >
                  Continue →
                </button>
              </form>

              <p className="text-xs text-center text-[var(--muted)] mt-6">
                No password needed. No spam. Ever. 🔒
              </p>
            </div>

            {/* What happens next — so user knows flow */}
            <div className="mt-4 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--muted)] text-center">
              ✅ Upload resume → AI optimises → See preview → Unlock for ₹19
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  // Brief redirect screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-5xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>
          Welcome, {name}!
        </h2>
        <p className="text-[var(--muted)] text-sm">Taking you to the resume optimiser...</p>
        <div className="mt-4 flex justify-center gap-1">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </motion.div>
    </div>
  )
}
