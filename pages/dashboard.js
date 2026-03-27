import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const router = useRouter()
  const { plan } = router.query

  const [user, setUser] = useState({ name: 'Job Seeker', email: '', credits: 0 })
  const [email, setEmail] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [history] = useState([])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }
    setUser({ name: email.split('@')[0], email, credits: 0 })
    setLoggedIn(true)
    toast.success('Welcome to ResumeAI Pro! 🎉')
  }

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

            {plan && (
              <div className="mt-4 p-4 rounded-xl bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-center text-sm">
                <span className="font-semibold">
                  {plan === 'premium' ? '🚀 Premium Plan (₹29) selected' : '📄 Basic Plan (₹19) selected'}
                </span>
                <br />
                <span className="text-[var(--muted)]">Sign in to proceed to payment</span>
              </div>
            )}
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Dashboard — ResumeAI Pro</title>
      </Head>

      <div className="min-h-screen bg-[var(--paper)]">
        {/* Top nav */}
        <nav className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between bg-[var(--card)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
            </div>
            <span className="font-semibold" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[var(--paper)] border border-[var(--border)] px-4 py-2 rounded-full text-sm">
              <span>🎟️</span>
              <span className="font-semibold">{user.credits}</span>
              <span className="text-[var(--muted)]">credits</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
              {user.name[0]?.toUpperCase()}
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>
              Hey, {user.name} 👋
            </h1>
            <p className="text-[var(--muted)] mb-10">Ready to land your dream job? Let's optimise that resume.</p>
          </motion.div>

          {user.credits === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="card p-8 mb-8 text-center">
                <div className="text-6xl mb-4">🎟️</div>
                <h2 className="text-2xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>Buy Credits to Start</h2>
                <p className="text-[var(--muted)] mb-8">Choose a plan to optimise your resume</p>

                <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
                  {/* Basic */}
                  <div className="card p-6 text-left hover:shadow-lg transition-all duration-300">
                    <div className="text-3xl mb-2">📄</div>
                    <h3 className="font-bold text-xl mb-1" style={{fontFamily:'Clash Display'}}>Basic</h3>
                    <div className="text-3xl font-bold text-[var(--accent)] mb-3" style={{fontFamily:'Clash Display'}}>₹19</div>
                    <ul className="text-xs text-[var(--muted)] space-y-1 mb-4">
                      <li>✓ ATS Resume Optimisation</li>
                      <li>✓ Keyword Injection</li>
                      <li>✓ PDF Download</li>
                    </ul>
                    <Link href={`/pay?plan=basic&email=${user.email}&name=${user.name}`}>
                      <button className="w-full py-2.5 rounded-xl border-2 border-[var(--ink)] text-sm font-semibold hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all">
                        Buy — ₹19
                      </button>
                    </Link>
                  </div>

                  {/* Premium */}
                  <div className="p-6 rounded-2xl bg-[var(--ink)] text-[var(--paper)] text-left hover:shadow-xl transition-all duration-300 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--ink)] text-xs font-bold px-3 py-0.5 rounded-full">
                      BEST VALUE
                    </div>
                    <div className="text-3xl mb-2">🚀</div>
                    <h3 className="font-bold text-xl mb-1" style={{fontFamily:'Clash Display'}}>Premium</h3>
                    <div className="text-3xl font-bold text-[var(--gold)] mb-3" style={{fontFamily:'Clash Display'}}>₹29</div>
                    <ul className="text-xs text-[#8B8680] space-y-1 mb-4">
                      <li>✓ Everything in Basic</li>
                      <li>✓ Cover Letter</li>
                      <li>✓ LinkedIn Summary</li>
                    </ul>
                    <Link href={`/pay?plan=premium&email=${user.email}&name=${user.name}`}>
                      <button className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-orange-500 transition-all">
                        Buy — ₹29
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-8 text-center mb-8"
            >
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-2xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>You have {user.credits} credit{user.credits > 1 ? 's' : ''}</h2>
              <p className="text-[var(--muted)] mb-6">Ready to optimise your resume!</p>
              <Link href="/optimize">
                <button className="bg-[var(--accent)] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-500 transition-colors">
                  Start Optimising →
                </button>
              </Link>
            </motion.div>
          )}

          {/* History */}
          <div>
            <h2 className="text-xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>Recent Optimisations</h2>
            {history.length === 0 ? (
              <div className="card p-8 text-center text-[var(--muted)]">
                <div className="text-4xl mb-3">📭</div>
                <p>No optimisations yet. Buy a credit and let's get started!</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}
