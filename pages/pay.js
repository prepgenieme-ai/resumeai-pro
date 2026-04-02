import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function PayPage() {
  const router = useRouter()
  const { plan, email, name } = router.query
  const isPremium = plan === 'premium'
  const amount = isPremium ? 29 : 19
  const amountPaise = amount * 100
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const handlePayment = () => {
    setLoading(true)
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere'

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: 'INR',
      name: 'ResumeAI Pro',
      description: isPremium
        ? 'Premium — Resume + Cover Letter + LinkedIn Summary'
        : 'Basic — ATS Resume Optimisation',
      prefill: { name: name || 'Job Seeker', email: email || '' },
      theme: { color: '#FF5C1A' },
      handler: function (response) {
        setLoading(false)
        setPaid(true)
        toast.success('Payment successful! 🎉')
        setTimeout(() => {
          router.push(`/optimize?plan=${plan}&payment_id=${response.razorpay_payment_id}&email=${email || ''}`)
        }, 2000)
      },
      modal: {
        ondismiss: function () {
          setLoading(false)
          toast.error('Payment cancelled')
        }
      }
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function () {
        setLoading(false)
        toast.error('Payment failed. Please try again.')
      })
      rzp.open()
    } else {
      setLoading(false)
      toast.error('Payment system loading, please try again')
    }
  }

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-12 card max-w-md mx-4">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>Payment Done!</h2>
          <p className="text-[var(--muted)] mb-2">₹{amount} paid successfully</p>
          <p className="text-sm text-[var(--muted)]">Redirecting to your resume optimiser...</p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Head><title>Payment — ResumeAI Pro</title></Head>
      <div className="min-h-screen bg-[var(--paper)] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Link href="/dashboard" className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
            </div>
            <span className="font-semibold" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">

            {/* Plan summary */}
            <div className={`rounded-xl p-6 mb-6 ${isPremium ? 'bg-[var(--ink)] text-[var(--paper)]' : 'bg-[var(--paper)] border border-[var(--border)]'}`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-xl" style={{fontFamily:'Clash Display'}}>
                    {isPremium ? '🚀 Premium Plan' : '📄 Basic Plan'}
                  </div>
                  <div className={`text-sm ${isPremium ? 'text-[#8B8680]' : 'text-[var(--muted)]'}`}>
                    {isPremium ? 'Resume + Cover Letter + LinkedIn' : 'ATS Resume Optimisation'}
                  </div>
                </div>
                <div className={`text-4xl font-bold ${isPremium ? 'text-[var(--gold)]' : 'text-[var(--accent)]'}`} style={{fontFamily:'Clash Display'}}>
                  ₹{amount}
                </div>
              </div>
              <div className={`text-xs ${isPremium ? 'text-[#8B8680]' : 'text-[var(--muted)]'}`}>
                One-time payment • No subscription • No hidden fees
              </div>
            </div>

            {/* What you get */}
            <div className="mb-6">
              <div className="text-sm font-semibold mb-3">✅ What you get after paying:</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  <span><strong>ATS-optimised resume</strong> — keywords, action verbs, tailored summary for your exact job role</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  <span><strong>Download as PDF & Word</strong> — properly formatted, ready to send</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  <span><strong>Vibe chat editing</strong> — tell AI "make it shorter" or "add more keywords" and it updates instantly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  <span><strong>Manual editing</strong> — edit any part of your resume yourself</span>
                </li>
                {isPremium && (
                  <>
                    <li className="flex items-start gap-2 pt-2 border-t border-[var(--border)]">
                      <span className="text-[var(--gold)] mt-0.5">★</span>
                      <span><strong>Custom Cover Letter</strong> — written specifically for your target job role and company type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--gold)] mt-0.5">★</span>
                      <span><strong>LinkedIn Profile Summary</strong> — optimised "About" section to attract recruiters on LinkedIn</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--gold)] mt-0.5">★</span>
                      <span><strong>Skills Gap Analysis</strong> — know exactly what skills you're missing for this role</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Pay button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-lg hover:bg-orange-500 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Opening Payment...</>
              ) : (
                `Pay ₹${amount} via UPI / Card →`
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-[var(--muted)]">
              <span>🔒 Secured by Razorpay</span>
              <span>•</span>
              <span>📱 UPI / Cards / Net Banking</span>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
              <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                ← Back to Dashboard
              </Link>
            </div>
          </motion.div>

          <p className="text-center text-xs text-[var(--muted)] mt-4">
            Refund available within 24 hours if unsatisfied.
          </p>
        </div>
      </div>
    </>
  )
}
