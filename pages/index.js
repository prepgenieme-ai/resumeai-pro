import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
}

const testimonials = [
  { name: "Priya S.", role: "Got hired at Swiggy", text: "I got 3 interview calls in one week after optimising with ResumeAI. Worth every paisa!", avatar: "PS" },
  { name: "Rahul M.", role: "Software Engineer", text: "My old resume was getting zero responses. After ₹19, I landed at a Series B startup!", avatar: "RM" },
  { name: "Ananya K.", role: "Data Analyst", text: "The AI even told me I was missing SQL skills in my summary. Fixed it and boom — shortlisted!", avatar: "AK" },
]

const faqs = [
  { q: "How does the AI optimise my resume?", a: "Our AI parses your resume, understands the job role you're targeting, injects ATS keywords, rewrites weak bullet points with action verbs and metrics, and generates a tailored professional summary — all in under 60 seconds." },
  { q: "What formats can I upload?", a: "You can upload PDF, Word (.docx), or simply paste your resume text directly. All formats work perfectly." },
  { q: "Is my data safe?", a: "Yes. Your resume is processed securely, never shared with third parties, and you can delete your data anytime from your dashboard." },
  { q: "What's the difference between ₹19 and ₹29?", a: "The ₹19 Basic plan gives you a fully ATS-optimised resume. The ₹29 Premium plan adds a custom cover letter and LinkedIn profile summary for the same job role." },
  { q: "How many times can I optimise?", a: "Each credit = 1 optimisation. Buy as many credits as you need. No subscriptions, no hidden fees." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const [typedText, setTypedText] = useState('')
  const phrases = ['Data Analyst at Flipkart', 'Backend Engineer at Zepto', 'Product Manager at Razorpay', 'UI Designer at CRED']
  const [phraseIdx, setPhraseIdx] = useState(0)

  useEffect(() => {
    let i = 0
    const phrase = phrases[phraseIdx]
    const timer = setInterval(() => {
      setTypedText(phrase.slice(0, i + 1))
      i++
      if (i >= phrase.length) {
        clearInterval(timer)
        setTimeout(() => {
          setPhraseIdx((prev) => (prev + 1) % phrases.length)
          setTypedText('')
        }, 2000)
      }
    }, 60)
    return () => clearInterval(timer)
  }, [phraseIdx])

  return (
    <>
      <Head>
        <title>ResumeAI Pro — ATS Resume Optimiser for ₹19</title>
        <meta name="description" content="AI rewrites your resume for any job role. Get shortlisted faster. Starting ₹19." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--paper)]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
          </div>
          <span className="font-semibold text-[var(--ink)]" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <a href="#how-it-works" className="hover:text-[var(--ink)] transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-[var(--ink)] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[var(--ink)] transition-colors">FAQ</a>
        </div>
        <Link href="/dashboard">
          <button className="bg-[var(--ink)] text-[var(--paper)] px-5 py-2 rounded-full text-sm font-medium hover:bg-[var(--accent)] transition-colors duration-300">
            Try Now →
          </button>
        </Link>
      </nav>

      <main>
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)] opacity-10 rounded-full blur-3xl blob" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--gold)] opacity-10 rounded-full blur-3xl blob blob-delay-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--paper)] opacity-50 rounded-full blur-3xl" />

          <div className="relative text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-[var(--gold)]/20 text-[var(--ink)] border border-[var(--gold)]/40 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
                Starting at just ₹19 — Less than a chai ☕
              </span>
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-[var(--ink)]"
              style={{fontFamily:'Clash Display'}}
            >
              Your Resume,{' '}
              <span className="gradient-text">AI-Perfected</span>
              <br />in 60 Seconds
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg md:text-xl text-[var(--muted)] mb-4 max-w-2xl mx-auto"
            >
              Just tell us you want to be a{' '}
              <span className="text-[var(--accent)] font-semibold min-w-[280px] inline-block text-left">
                {typedText}<span className="animate-pulse">|</span>
              </span>
            </motion.p>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="text-[var(--muted)] mb-10 text-base"
            >
              Our AI reads your resume, fixes everything, and hands you an ATS-ready document. You don't write a single word.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="bg-[var(--accent)] text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 hover:shadow-xl hover:shadow-orange-200 transition-all duration-300">
                  Optimise My Resume — ₹19 →
                </button>
              </Link>
              <a href="#how-it-works">
                <button className="border border-[var(--border)] text-[var(--ink)] px-8 py-4 rounded-2xl text-lg font-medium hover:border-[var(--ink)] transition-all duration-300">
                  See How It Works
                </button>
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="mt-10 flex items-center justify-center gap-6 text-sm text-[var(--muted)]">
              <span>✅ No subscription</span>
              <span>✅ Pay once per resume</span>
              <span>✅ UPI & Cards accepted</span>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 bg-[var(--ink)] text-[var(--paper)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>
                3 Steps. Done.
              </h2>
              <p className="text-[#8B8680] text-lg">No forms. No back-and-forth. Just pure AI magic.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: '📄', title: 'Upload Your Resume', desc: 'Drop your PDF, Word file, or paste your resume text. Takes 10 seconds.' },
                { step: '02', icon: '💬', title: 'Tell AI Your Target Job', desc: 'Just type it naturally — "I want to apply for a Data Analyst role at a fintech startup"' },
                { step: '03', icon: '✨', title: 'AI Does Everything', desc: 'Keywords, bullet points, summary, formatting — all optimised. You download the final ATS-ready resume.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="absolute top-6 right-6 text-6xl font-bold text-white/5" style={{fontFamily:'Clash Display'}}>{item.step}</div>
                  <h3 className="text-xl font-bold mb-3" style={{fontFamily:'Clash Display'}}>{item.title}</h3>
                  <p className="text-[#8B8680] leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>
                What AI fixes in your resume
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: '🎯', title: 'ATS Keyword Injection', desc: 'AI adds the exact keywords recruiters search for — tailored to your job role.' },
                { icon: '💪', title: 'Bullet Point Rewrite', desc: 'Weak phrases become powerful action statements with measurable impact.' },
                { icon: '📊', title: 'Skills Gap Analysis', desc: 'Know exactly what\'s missing from your profile for that specific role.' },
                { icon: '✍️', title: 'Professional Summary', desc: 'A killer opening paragraph written specifically for your target job.' },
                { icon: '🏆', title: 'Achievement Quantification', desc: '"Managed a team" becomes "Led 8-member team, boosting output by 40%"' },
                { icon: '💬', title: 'Vibe Chat Editing', desc: 'Say "make it more senior" or "add fintech keywords" — AI updates instantly.' },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{f.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{fontFamily:'Clash Display'}}>{f.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6 bg-[var(--card)]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>
              Cheaper than printing at a cyber café
            </h2>
            <p className="text-[var(--muted)] mb-16 text-lg">No monthly fees. Pay only when you need it.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 text-left hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-2">📄</div>
                <h3 className="text-2xl font-bold mb-1" style={{fontFamily:'Clash Display'}}>Basic</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold text-[var(--accent)]" style={{fontFamily:'Clash Display'}}>₹19</span>
                  <span className="text-[var(--muted)]">/ resume</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  {['Full ATS keyword optimisation', 'Bullet point rewriting', 'Professional summary', 'Skills gap analysis', 'Downloadable PDF resume'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-[var(--accent)]">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard?plan=basic">
                  <button className="w-full py-3 rounded-xl border-2 border-[var(--ink)] text-[var(--ink)] font-semibold hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-300">
                    Get Started — ₹19
                  </button>
                </Link>
              </motion.div>

              {/* Premium */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-[var(--ink)] text-[var(--paper)] text-left hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-[var(--ink)] text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR ⭐
                </div>
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-2xl font-bold mb-1" style={{fontFamily:'Clash Display'}}>Premium</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold text-[var(--gold)]" style={{fontFamily:'Clash Display'}}>₹29</span>
                  <span className="text-[#8B8680]">/ resume</span>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  {['Everything in Basic', 'Custom cover letter', 'LinkedIn profile summary', 'Priority AI processing', 'Vibe chat editing (unlimited tweaks)'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="text-[var(--gold)]">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard?plan=premium">
                  <button className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-orange-500 transition-all duration-300 hover:shadow-lg">
                    Get Premium — ₹29
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily:'Clash Display'}}>
              Real people. Real jobs.
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-[var(--muted)]">{t.role}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--ink)] leading-relaxed">"{t.text}"</p>
                  <div className="mt-3 text-[var(--gold)]">★★★★★</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 px-6 bg-[var(--card)]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily:'Clash Display'}}>
              Questions? Answered.
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between font-semibold hover:text-[var(--accent)] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-xl transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-[var(--muted)] text-sm leading-relaxed border-t border-[var(--border)] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-[var(--ink)] text-[var(--paper)] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{fontFamily:'Clash Display'}}>
              Stop sending resumes<br />that get ignored.
            </h2>
            <p className="text-[#8B8680] mb-10 text-lg">Your next interview is ₹19 away.</p>
            <Link href="/dashboard">
              <button className="bg-[var(--accent)] text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-orange-900/50 transition-all duration-300">
                Optimise My Resume Now →
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center text-sm text-[var(--muted)] border-t border-[var(--border)]">
        <p>© 2025 ResumeAI Pro. Made with ❤️ in India 🇮🇳</p>
      </footer>
    </>
  )
}
