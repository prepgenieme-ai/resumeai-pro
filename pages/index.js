import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } })
}

const tools = [
  { icon: '📊', title: 'ATS Score', desc: 'Know exactly why your resume is getting rejected', color: 'bg-blue-50 border-blue-100' },
  { icon: '✍️', title: 'Resume Optimizer', desc: 'AI rewrites bullets with action verbs + keywords', color: 'bg-orange-50 border-orange-100' },
  { icon: '📧', title: 'Cover Letter', desc: 'Personalized to the JD — under 200 words', color: 'bg-green-50 border-green-100' },
  { icon: '💼', title: 'LinkedIn DM', desc: 'Cold message recruiters that actually gets replies', color: 'bg-purple-50 border-purple-100' },
  { icon: '📨', title: 'HR Email', desc: 'Formal application email with a punchy subject line', color: 'bg-yellow-50 border-yellow-100' },
  { icon: '🎯', title: 'Interview Prep', desc: 'Top 10 Q&A specific to your JD and role', color: 'bg-red-50 border-red-100' },
]

const steps = [
  { step: '01', icon: '📄', title: 'Upload Your Resume', desc: 'PDF or paste text. Takes 10 seconds.' },
  { step: '02', icon: '📋', title: 'Paste Job Description', desc: 'Copy JD from LinkedIn, Naukri, or any site.' },
  { step: '03', icon: '⚡', title: 'Get Everything Instantly', desc: 'ATS score, resume, cover letter, LinkedIn DM, interview prep — all in 1 click.' },
]

const testimonials = [
  { name: 'Priya S.', college: 'VIT Vellore', text: 'My ATS score went from 34 to 87. Got 3 calls in one week after that!', result: 'Hired at Swiggy' },
  { name: 'Rahul M.', college: 'IIIT Hyderabad', text: 'The LinkedIn DM template got me a reply from a Razorpay recruiter in 2 hours.', result: 'Interview at Razorpay' },
  { name: 'Ananya K.', college: 'Manipal', text: 'I was applying to 50 jobs with zero response. After the interview prep, cleared my first attempt.', result: 'Placed at Infosys' },
]

const faqs = [
  { q: 'How is this different from ChatGPT?', a: 'ChatGPT gives generic outputs. We analyze YOUR resume against the SPECIFIC job description — every output is personalized. Plus everything is in one place, no prompt engineering needed.' },
  { q: 'What is an ATS score?', a: 'ATS (Applicant Tracking System) is software that scans resumes before humans see them. Most companies use it. If your score is below 60, your resume gets auto-rejected. We tell you exactly what to fix.' },
  { q: 'How much does it cost?', a: 'Free to check your ATS score and see a preview of all tools. Unlock the full job application pack for just ₹19 — one-time, no subscription. Pro plan at ₹99/month for unlimited applications.' },
  { q: 'Will it work for freshers with no experience?', a: 'Yes — especially for freshers! We help you present your projects, internships and skills in a way that matches what recruiters are looking for.' },
  { q: 'Is my data safe?', a: 'Your resume and JD are only used to generate outputs. We never share or sell your data. You can delete your account anytime.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const [score, setScore] = useState(34)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setScore(s => { if (s >= 87) { clearInterval(interval); return 87 } return s + 1 })
      }, 30)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Job Application Copilot — Resume + Cover Letter + Interview Prep in 1 Click</title>
        <meta name="description" content="Upload resume + paste job description → get ATS score, optimised resume, cover letter, LinkedIn DM, HR email, interview prep. Starting ₹19." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--paper)]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
          </div>
          <span className="font-bold text-[var(--ink)]" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[var(--muted)]">
          <a href="#tools" className="hover:text-[var(--ink)] transition-colors">Tools</a>
          <a href="#how-it-works" className="hover:text-[var(--ink)] transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-[var(--ink)] transition-colors">Pricing</a>
        </div>
        <Link href="/dashboard">
          <button className="bg-[var(--ink)] text-[var(--paper)] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--accent)] transition-colors duration-300">
            Try Free →
          </button>
        </Link>
      </nav>

      <main>
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--accent)] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-3xl" />

          <div className="relative text-center max-w-4xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-[var(--gold)]/20 border border-[var(--gold)]/40 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                1,200+ freshers from IIT, VIT, BITS already using this
              </span>
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-[var(--ink)]" style={{fontFamily:'Clash Display'}}>
              Your Complete
              <span className="gradient-text"> Job Application</span>
              <br />Copilot
            </motion.h1>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-lg md:text-xl text-[var(--muted)] mb-4 max-w-2xl mx-auto">
              Upload resume + paste job description →<br />
              <strong className="text-[var(--ink)]">ATS score • Optimised resume • Cover letter • LinkedIn DM • HR email • Interview prep</strong>
            </motion.p>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3} className="text-[var(--muted)] mb-10 text-base">
              Everything you need to get shortlisted — in 60 seconds. Starting ₹19.
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="bg-[var(--accent)] text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 hover:shadow-xl hover:shadow-orange-200 transition-all duration-300">
                  Check My ATS Score — Free →
                </button>
              </Link>
              <a href="#how-it-works">
                <button className="border border-[var(--border)] text-[var(--ink)] px-8 py-4 rounded-2xl text-lg font-medium hover:border-[var(--ink)] transition-all duration-300">
                  See How It Works
                </button>
              </a>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="mt-10 flex items-center justify-center gap-6 text-sm text-[var(--muted)]">
              <span>✅ Free ATS check</span>
              <span>✅ No subscription</span>
              <span>✅ UPI accepted</span>
            </motion.div>
          </div>
        </section>

        {/* ATS DEMO */}
        <section className="py-16 px-6 bg-[var(--ink)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{fontFamily:'Clash Display'}}>
                Why is your resume getting ignored?
              </h2>
              <p className="text-[#8B8680]">Most resumes score below 50 on ATS. Here's what happens when you fix it.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[#8B8680] text-sm mb-3">BEFORE — Your resume now</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-red-400" style={{fontFamily:'Clash Display'}}>34</div>
                  <div>
                    <div className="text-white font-semibold">ATS Score</div>
                    <div className="text-red-400 text-sm">❌ Auto-rejected by most companies</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[#8B8680]">
                  <div>❌ Missing 12 keywords from JD</div>
                  <div>❌ Weak bullet points, no metrics</div>
                  <div>❌ No professional summary</div>
                  <div>❌ Wrong format for ATS parsing</div>
                </div>
              </div>
              {/* After */}
              <div className="p-6 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/30">
                <div className="text-[var(--accent)] text-sm mb-3">AFTER — With ResumeAI Pro</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl font-bold text-[var(--accent)]" style={{fontFamily:'Clash Display'}}>{score}</div>
                  <div>
                    <div className="text-white font-semibold">ATS Score</div>
                    <div className="text-green-400 text-sm">✅ Gets seen by recruiters</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[#8B8680]">
                  <div>✅ 94% keyword match with JD</div>
                  <div>✅ Action verbs + quantified metrics</div>
                  <div>✅ Tailored professional summary</div>
                  <div>✅ ATS-friendly formatting</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 TOOLS */}
        <section id="tools" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>
                6 tools. 1 click. Job done.
              </h2>
              <p className="text-[var(--muted)] text-lg">Everything you need to go from "applied" to "interview called"</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className={`card p-6 border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{fontFamily:'Clash Display'}}>{tool.title}</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 bg-[var(--ink)] text-[var(--paper)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>3 steps. 60 seconds.</h2>
              <p className="text-[#8B8680] text-lg">No forms. No templates. Just pure AI personalization.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="relative p-8 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-5xl mb-4">{s.icon}</div>
                  <div className="absolute top-6 right-6 text-6xl font-bold text-white/5" style={{fontFamily:'Clash Display'}}>{s.step}</div>
                  <h3 className="text-xl font-bold mb-3" style={{fontFamily:'Clash Display'}}>{s.title}</h3>
                  <p className="text-[#8B8680] leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-24 px-6 bg-[var(--card)]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>Less than a cup of chai ☕</h2>
            <p className="text-[var(--muted)] mb-16 text-lg">No monthly traps. Pay only when you need it.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Free */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8 text-left">
                <div className="text-2xl mb-1" style={{fontFamily:'Clash Display'}}>Free</div>
                <div className="text-4xl font-bold text-[var(--muted)] mb-4" style={{fontFamily:'Clash Display'}}>₹0</div>
                <ul className="space-y-2 text-sm text-[var(--muted)] mb-8">
                  <li>✓ ATS score check</li>
                  <li>✓ Preview of all 6 tools</li>
                  <li>✓ Keyword gap analysis</li>
                  <li className="text-[var(--border)]">✗ Full outputs locked</li>
                </ul>
                <Link href="/dashboard"><button className="w-full py-3 rounded-xl border-2 border-[var(--border)] text-[var(--muted)] font-semibold">Start Free</button></Link>
              </motion.div>

              {/* Basic */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="card p-8 text-left border-2 border-[var(--accent)]">
                <div className="text-xs font-bold text-[var(--accent)] mb-1">MOST POPULAR</div>
                <div className="text-2xl font-bold mb-1" style={{fontFamily:'Clash Display'}}>Basic Pack</div>
                <div className="text-4xl font-bold text-[var(--accent)] mb-4" style={{fontFamily:'Clash Display'}}>₹19</div>
                <div className="text-xs text-[var(--muted)] mb-4">per job application</div>
                <ul className="space-y-2 text-sm mb-8">
                  <li>✓ Full ATS report</li>
                  <li>✓ Optimised resume</li>
                  <li>✓ Cover letter</li>
                  <li>✓ LinkedIn DM</li>
                  <li>✓ HR email template</li>
                  <li>✓ Interview prep (10 Q&A)</li>
                  <li>✓ PDF + Word download</li>
                </ul>
                <Link href="/dashboard"><button className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-bold hover:bg-orange-500 transition-colors">Unlock for ₹19</button></Link>
              </motion.div>

              {/* Pro */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[var(--ink)] text-[var(--paper)] text-left">
                <div className="text-2xl font-bold mb-1" style={{fontFamily:'Clash Display'}}>Pro</div>
                <div className="text-4xl font-bold text-[var(--gold)] mb-1" style={{fontFamily:'Clash Display'}}>₹99</div>
                <div className="text-xs text-[#8B8680] mb-4">per month • unlimited applications</div>
                <ul className="space-y-2 text-sm text-[#8B8680] mb-8">
                  <li>✓ Everything in Basic</li>
                  <li>✓ Unlimited job packs</li>
                  <li>✓ Resume saved in dashboard</li>
                  <li>✓ Priority AI processing</li>
                  <li>✓ WhatsApp support</li>
                </ul>
                <Link href="/dashboard"><button className="w-full py-3 rounded-xl bg-[var(--gold)] text-[var(--ink)] font-bold hover:opacity-90 transition-opacity">Get Pro — ₹99/mo</button></Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily:'Clash Display'}}>Real freshers. Real results.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="card p-6">
                  <div className="text-[var(--gold)] mb-3">★★★★★</div>
                  <p className="text-sm text-[var(--ink)] leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">{t.name[0]}</div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-[var(--muted)]">{t.college} • {t.result}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-[var(--card)]">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{fontFamily:'Clash Display'}}>Questions? Answered.</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between font-semibold hover:text-[var(--accent)] transition-colors">
                    <span>{faq.q}</span>
                    <span className="text-xl transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                  </button>
                  {openFaq === i && <div className="px-6 pb-6 text-[var(--muted)] text-sm leading-relaxed border-t border-[var(--border)] pt-4">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-6 bg-[var(--ink)] text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{fontFamily:'Clash Display'}}>
              Stop applying blindly.<br />Start getting called.
            </h2>
            <p className="text-[#8B8680] mb-10 text-lg">Check your ATS score free. Fix it for ₹19.</p>
            <Link href="/dashboard">
              <button className="bg-[var(--accent)] text-white px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300">
                Check My ATS Score — Free →
              </button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center text-sm text-[var(--muted)] border-t border-[var(--border)]">
        <p>© 2025 ResumeAI Pro • Job Application Copilot 🇮🇳 Made in India</p>
      </footer>
    </>
  )
}
