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
    // Load Razorpay SDK
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const handlePayment = () => {
    setLoading(true)

    // ⚠️ IMPORTANT: Replace the key below with your actual Razorpay Live Key ID
    // It looks like: rzp_live_XXXXXXXXXXXXXXXXXX
    // Get it from: Razorpay Dashboard → Settings → API Keys
    const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere'

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: 'INR',
      name: 'ResumeAI Pro',
      description: isPremium
        ? 'Premium Plan — Resume + Cover Letter + LinkedIn'
        : 'Basic Plan — ATS Resume Optimisation',
      image: 'https://via.placeholder.com/150/FF5C1A/FFFFFF?text=R',
      prefill: {
        name: name || 'Job Seeker',
        email: email || '',
      },
      notes: {
        plan: plan,
        user_email: email,
      },
      theme: {
        color: '#FF5C1A',
      },
      handler: function (response) {
        // Payment successful!
        setLoading(false)
        setPaid(true)
        toast.success('Payment successful! Credits added 🎉')
        // Store payment info and redirect after 2 seconds
        setTimeout(() => {
          router.push(`/optimize?plan=${plan}&payment_id=${response.razorpay_payment_id}`)
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
      rzp.on('payment.failed', function (response) {
        setLoading(false)
        toast.error('Payment failed. Please try again.')
        console.error('Payment failed:', response.error)
      })
      rzp.open()
    } else {
      setLoading(false)
      toast.error('Payment system loading, please try again in a moment')
    }
  }

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--paper)]">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-12 card max-w-md mx-4"
        >
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>Payment Done!</h2>
          <p className="text-[var(--muted)] mb-2">₹{amount} paid successfully</p>
          <p className="text-sm text-[var(--muted)]">Redirecting to your resume optimiser...</p>
          <div className="mt-4 flex justify-center gap-1">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Payment — ResumeAI Pro</title>
      </Head>

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
              <div className="text-sm font-semibold mb-3">What you get:</div>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Full ATS-optimised resume</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> ATS keyword injection for your job role</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Professional summary rewrite</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent)]">✓</span> Downloadable PDF</li>
                {isPremium && <li className="flex items-center gap-2"><span className="text-[var(--gold)]">✓</span> Custom cover letter</li>}
                {isPremium && <li className="flex items-center gap-2"><span className="text-[var(--gold)]">✓</span> LinkedIn profile summary</li>}
              </ul>
            </div>

            {/* Pay button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-lg hover:bg-orange-500 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Opening Payment...
                </>
              ) : (
                `Pay ₹${amount} via UPI / Card →`
              )}
            </button>

            {/* Payment methods */}
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
            By paying you agree to our Terms of Service. Refunds within 24 hours if unsatisfied.
          </p>
        </div>
      </div>
    </>
  )
}
