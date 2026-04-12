import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const loadingMessages = [
  '📖 Reading your resume...',
  '🔍 Analysing job requirements...',
  '✨ Injecting ATS keywords...',
  '💪 Rewriting weak bullet points...',
  '📊 Quantifying achievements...',
  '🎯 Tailoring your summary...',
  '🚀 Final polish in progress...',
  '✅ Almost done!',
]

export default function OptimizePage() {
  const router = useRouter()
  const { plan, payment_id } = router.query
  const isPremium = plan === 'premium'

  const [step, setStep] = useState('upload') // upload | jobRole | processing | result
  const [resumeText, setResumeText] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [optimisedResume, setOptimisedResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [linkedinSummary, setLinkedinSummary] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(0)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('resume')
  const fileRef = useRef(null)
  const chatEndRef = useRef(null)

  // isPaid: false by default, true only after Razorpay success
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  // Load Razorpay SDK on mount
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => { if (document.body.contains(script)) document.body.removeChild(script) }
  }, [])

  const handleFileUpload = async (file) => {
    if (!file) return
    const fileName = file.name.toLowerCase()
    const isPdf = fileName.endsWith('.pdf')
    const isDocx = fileName.endsWith('.docx')
    if (isPdf || isDocx) {
      toast.loading('Reading your resume...', { id: 'upload' })
      try {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result.split(',')[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        const response = await fetch('/api/parse-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: base64, fileName: file.name, fileType: file.type }),
        })
        const data = await response.json()
        if (data.error) { toast.error(data.error, { id: 'upload' }); return }
        setResumeText(data.text)
        toast.success(`Resume read! ${data.wordCount} words detected ✅`, { id: 'upload' })
      } catch {
        toast.error('Failed to read file. Please paste your resume text instead.', { id: 'upload' })
      }
    } else {
      const text = await file.text()
      setResumeText(text)
      toast.success('Resume uploaded! ✅')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

  // AI processes resume — NO payment needed here
  const startOptimisation = async () => {
    if (!resumeText.trim()) { toast.error('Please upload or paste your resume'); return }
    if (!jobRole.trim()) { toast.error('Please tell us your target job role'); return }

    setStep('processing')
    let msgIdx = 0
    const interval = setInterval(() => {
      msgIdx++
      if (msgIdx < loadingMessages.length) setLoadingMsg(msgIdx)
    }, 2000)

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobRole, isPremium })
      })
      const data = await response.json()
      clearInterval(interval)
      if (data.error) throw new Error(data.error)
      setOptimisedResume(data.optimisedResume || '')
      setCoverLetter(data.coverLetter || '')
      setLinkedinSummary(data.linkedinSummary || '')
      setChatMessages([{
        role: 'ai',
        text: `🎉 Your resume has been optimised for **${jobRole}**! I can see some great improvements.\n\n🔒 Unlock to see the full resume, download it, and chat with me to tweak anything!`
      }])
      setStep('result')
    } catch (err) {
      clearInterval(interval)
      toast.error('Optimisation failed. Please try again.')
      setStep('jobRole')
    }
  }

  // AI chat — only works after payment
  const handleChat = async () => {
    if (!chatInput.trim() || chatLoading) return
    const userMsg = chatInput
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setChatLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, currentResume: optimisedResume, jobRole })
      })
      const data = await response.json()
      if (data.updatedResume && data.updatedResume.trim().length > 50) setOptimisedResume(data.updatedResume)
      let reply = data.reply || 'Done! Resume updated ✅'
      if (reply.includes('"reply"') || reply.startsWith('{')) reply = 'Done! I updated your resume. Check the preview! ✅'
      setChatMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }])
    }
    setChatLoading(false)
  }

  // Razorpay payment — triggers ONLY when user clicks unlock button
  const handleUnlockPayment = () => {
    const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere'
    const options = {
      key: RAZORPAY_KEY,
      amount: 1900, // ₹19 in paise
      currency: 'INR',
      name: 'ResumeAI Pro',
      description: 'Unlock Full Optimised Resume',
      theme: { color: '#FF5C1A' },
      handler: function () {
        setIsPaid(true)
        toast.success('🎉 Payment successful! Full resume unlocked!')
        setChatMessages(prev => [...prev, {
          role: 'ai',
          text: '🎉 You\'re unlocked! Your full resume is now visible. Tell me anything you want to change — "make it more senior", "add Python keywords", whatever you need!'
        }])
      },
      modal: {
        ondismiss: function () { toast.error('Payment cancelled') }
      }
    }
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => toast.error('Payment failed. Please try again.'))
      rzp.open()
    } else {
      toast.error('Payment loading, please try again in a moment')
    }
  }

  // Download as PDF — only available after payment
  const downloadAsPdf = () => {
    const lines = optimisedResume.split('\n')
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume</title>
    <style>
      body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:0.8in;line-height:1.5;color:#000;}
      .name{font-size:18pt;font-weight:bold;text-align:center;margin-bottom:4px;}
      .contact{text-align:center;font-size:10pt;color:#444;margin-bottom:10px;}
      .section{font-size:11pt;font-weight:bold;text-transform:uppercase;border-bottom:1.5px solid #000;margin:12px 0 5px;padding-bottom:2px;}
      .bullet{padding-left:14px;margin:2px 0;}
      .bullet::before{content:"• ";}
      p{margin:2px 0;}
      @media print{body{margin:0.5in;}}
    </style></head><body>`
    lines.forEach((line, i) => {
      const t = line.trim()
      if (!t) { html += '<br>'; return }
      if (i < 2 && t.length < 50 && !t.includes('@') && !t.includes('|') && !t.includes('+')) {
        html += `<div class="name">${t}</div>`
      } else if (t.includes('@') || t.includes('+91') || (t.includes('|') && i < 4)) {
        html += `<div class="contact">${t}</div>`
      } else if ((t === t.toUpperCase() && t.length > 3 && t.length < 40) || /^(SUMMARY|EXPERIENCE|EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS|WORK EXPERIENCE|PROFESSIONAL)/i.test(t)) {
        html += `<div class="section">${t}</div>`
      } else if (t.startsWith('-') || t.startsWith('•') || t.startsWith('*')) {
        html += `<div class="bullet">${t.replace(/^[-•*]\s*/, '')}</div>`
      } else {
        html += `<p>${t}</p>`
      }
    })
    html += `<script>window.onload=function(){window.print();setTimeout(()=>window.close(),2000)}<\/script></body></html>`
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    toast.success('Opening PDF — Save as PDF from print dialog 📄')
  }

  // Download as Word — only available after payment
  const downloadAsWord = () => {
    const lines = optimisedResume.split('\n')
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Resume</title>
    <style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:1in;line-height:1.5;}
    .name{font-size:18pt;font-weight:bold;text-align:center;}
    .contact{text-align:center;font-size:10pt;color:#444;}
    .section{font-weight:bold;text-transform:uppercase;border-bottom:1px solid #000;margin:10px 0 4px;}
    .bullet{margin-left:14px;}p{margin:2px 0;}</style></head><body>`
    lines.forEach((line, i) => {
      const t = line.trim()
      if (!t) { html += '<p>&nbsp;</p>'; return }
      if (i < 2 && t.length < 50 && !t.includes('@') && !t.includes('|') && !t.includes('+')) {
        html += `<p class="name">${t}</p>`
      } else if (t.includes('@') || t.includes('+91') || (t.includes('|') && i < 4)) {
        html += `<p class="contact">${t}</p>`
      } else if ((t === t.toUpperCase() && t.length > 3 && t.length < 40) || /^(SUMMARY|EXPERIENCE|EDUCATION|SKILLS|PROJECTS|CERTIFICATIONS|WORK EXPERIENCE|PROFESSIONAL)/i.test(t)) {
        html += `<p class="section">${t}</p>`
      } else if (t.startsWith('-') || t.startsWith('•') || t.startsWith('*')) {
        html += `<p class="bullet">• ${t.replace(/^[-•*]\s*/, '')}</p>`
      } else {
        html += `<p>${t}</p>`
      }
    })
    html += '</body></html>'
    const blob = new Blob([html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `resume-${jobRole.replace(/\s+/g, '-')}.doc`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as Word! 📝')
  }

  return (
    <>
      <Head><title>Optimise Resume — ResumeAI Pro</title></Head>

      <div className="min-h-screen bg-[var(--paper)]">
        {/* Nav — UNCHANGED */}
        <nav className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between bg-[var(--card)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
            </div>
            <span className="font-semibold" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            {isPremium && <span className="bg-[var(--gold)]/20 text-[var(--ink)] border border-[var(--gold)]/40 px-3 py-1 rounded-full text-xs font-medium">🚀 Premium</span>}
            {isPaid && <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">✅ Unlocked</span>}
          </div>
        </nav>

        {/* STEP: Upload — UNCHANGED */}
        {step === 'upload' && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>Upload Your Resume</h1>
              <p className="text-[var(--muted)] mb-10">PDF, Word, or paste text directly</p>
              <div
                onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="card p-10 text-center border-2 border-dashed border-[var(--border)] cursor-pointer hover:border-[var(--accent)] transition-colors mb-6"
              >
                <div className="text-5xl mb-4">📄</div>
                <p className="font-semibold mb-1">Drop your resume here</p>
                <p className="text-[var(--muted)] text-sm">or click to browse (PDF, DOCX, TXT)</p>
                <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0])} />
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-[var(--muted)] text-sm">or paste text</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>
              <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your resume content here..." className="w-full h-40 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm resize-none transition-colors" />
              {resumeText && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-[var(--muted)]">✅ {resumeText.split(' ').length} words detected</motion.div>}
              <button onClick={() => { if (!resumeText.trim()) { toast.error('Please upload or paste your resume'); return } setStep('jobRole') }} className="mt-8 w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-lg hover:bg-orange-500 transition-all">
                Next — Tell AI Your Job Role →
              </button>
            </motion.div>
          </div>
        )}

        {/* STEP: Job Role — UNCHANGED */}
        {step === 'jobRole' && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setStep('upload')} className="text-[var(--muted)] text-sm mb-6 hover:text-[var(--accent)] transition-colors">← Back</button>
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>What job are you applying for?</h1>
              <p className="text-[var(--muted)] mb-10">Be specific — the more detail, the better AI can tailor your resume</p>
              <div className="card p-6 mb-4">
                <div className="text-sm font-medium mb-3">Just type naturally, like:</div>
                {['Data Analyst at a fintech startup', 'Backend Engineer (Node.js) at Zepto', 'Product Manager at a Series B company'].map(ex => (
                  <button key={ex} onClick={() => setJobRole(ex)} className="block text-left w-full text-sm text-[var(--muted)] hover:text-[var(--accent)] py-1 transition-colors">→ "{ex}"</button>
                ))}
              </div>
              <textarea value={jobRole} onChange={(e) => setJobRole(e.target.value)} placeholder="e.g. Data Analyst role at a fintech startup focusing on SQL, Python and dashboards..." className="w-full h-32 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm resize-none transition-colors" />
              <button onClick={startOptimisation} className="mt-6 w-full py-4 rounded-2xl bg-[var(--ink)] text-[var(--paper)] font-bold text-lg hover:bg-[var(--accent)] transition-all duration-300">
                🚀 Optimise My Resume Now!
              </button>
            </motion.div>
          </div>
        )}

        {/* STEP: Processing — UNCHANGED */}
        {step === 'processing' && (
          <div className="max-w-xl mx-auto px-6 py-32 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-7xl mb-8 animate-bounce">✨</div>
              <h2 className="text-3xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>AI is working its magic...</h2>
              <p className="text-[var(--accent)] font-medium mb-8 text-lg min-h-[28px]">{loadingMessages[loadingMsg]}</p>
              <div className="w-full bg-[var(--border)] rounded-full h-2 mb-4">
                <div className="bg-[var(--accent)] h-2 rounded-full transition-all duration-2000" style={{ width: `${((loadingMsg + 1) / loadingMessages.length) * 100}%` }} />
              </div>
              <p className="text-xs text-[var(--muted)]">This usually takes 15–30 seconds</p>
            </motion.div>
          </div>
        )}

        {/* STEP: Result — left blurred until paid, right chat locked until paid */}
        {step === 'result' && (
          <div className="flex h-[calc(100vh-65px)]">

            {/* LEFT: Resume Preview */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Tabs — UNCHANGED */}
              <div className="flex border-b border-[var(--border)] bg-[var(--card)] px-4">
                {['resume', ...(isPremium ? ['cover', 'linkedin'] : [])].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'}`}>
                    {tab === 'resume' ? '📄 Resume' : tab === 'cover' ? '✉️ Cover Letter' : '💼 LinkedIn'}
                  </button>
                ))}
                {/* Download buttons — only after payment */}
                <div className="ml-auto py-2 flex gap-2">
                  {isPaid ? (
                    <>
                      <button onClick={downloadAsPdf} className="px-3 py-1.5 bg-[var(--ink)] text-white rounded-lg text-xs font-semibold hover:bg-[var(--accent)] transition-colors">📄 PDF</button>
                      <button onClick={downloadAsWord} className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-lg text-xs font-semibold hover:bg-orange-500 transition-colors">📝 Word</button>
                    </>
                  ) : (
                    <button onClick={handleUnlockPayment} className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-lg text-xs font-semibold hover:bg-orange-500 transition-colors animate-pulse">
                      🔒 Unlock ₹19
                    </button>
                  )}
                </div>
              </div>

              {/* Resume content area */}
              <div className="flex-1 overflow-y-auto p-6 bg-[var(--paper)]">
                <div className="max-w-2xl mx-auto card p-8">
                  {activeTab === 'resume' ? (
                    isPaid ? (
                      /* PAID: full resume visible */
                      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)]" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.7'}}>
                        {optimisedResume}
                      </pre>
                    ) : (
                      /* NOT PAID: show top ~15 lines clearly, rest blurred, lock overlay in middle */
                      <div>
                        {/* Preview lines — clearly visible */}
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)]" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.7'}}>
                          {optimisedResume.split('\n').slice(0, 15).join('\n')}
                        </pre>

                        {/* Lock card */}
                        <div className="my-4 border-2 border-dashed border-[var(--accent)]/40 rounded-2xl p-6 text-center bg-[var(--card)]">
                          <div className="text-3xl mb-2">🔒</div>
                          <h3 className="font-bold text-base mb-1" style={{fontFamily:'Clash Display'}}>Unlock Full Optimised Resume</h3>
                          <p className="text-[var(--muted)] text-xs mb-4">See all improvements — rewritten bullets, ATS keywords, professional summary + download as PDF & Word</p>
                          <button onClick={handleUnlockPayment} className="bg-[var(--accent)] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-500 transition-all hover:shadow-lg">
                            Unlock Full Resume for ₹19 →
                          </button>
                          <p className="text-xs text-[var(--muted)] mt-2">One-time • No subscription • UPI / Cards</p>
                        </div>

                        {/* Blurred rest */}
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)] blur-sm select-none pointer-events-none opacity-60" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.7'}}>
                          {optimisedResume.split('\n').slice(15).join('\n')}
                        </pre>
                      </div>
                    )
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)]" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.7'}}>
                      {activeTab === 'cover' ? coverLetter : linkedinSummary}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: AI Chat — UNCHANGED layout, locked until paid */}
            <div className="w-80 border-l border-[var(--border)] flex flex-col bg-[var(--card)]">
              <div className="p-4 border-b border-[var(--border)]">
                <h3 className="font-bold text-sm" style={{fontFamily:'Clash Display'}}>💬 Vibe Edit with AI</h3>
                <p className="text-xs text-[var(--muted)]">{isPaid ? 'Tell AI to tweak anything' : '🔒 Unlock to chat with AI'}</p>
              </div>

              {/* Messages — UNCHANGED */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-[var(--accent)] text-white rounded-tr-sm' : 'bg-[var(--paper)] border border-[var(--border)] text-[var(--ink)] rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--paper)] border border-[var(--border)] px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick prompts — only when paid */}
              {isPaid && (
                <div className="px-4 pb-2 flex flex-wrap gap-1">
                  {['Make it more senior', 'Add more keywords', 'Make it shorter', 'Stronger action verbs'].map(p => (
                    <button key={p} onClick={() => setChatInput(p)} className="text-xs bg-[var(--paper)] border border-[var(--border)] px-2 py-1 rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">{p}</button>
                  ))}
                </div>
              )}

              {/* Chat input — locked until paid */}
              <div className="p-4 border-t border-[var(--border)] flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && isPaid && handleChat()}
                  placeholder={isPaid ? 'e.g. Make it sound more senior...' : 'Unlock to chat with AI...'}
                  disabled={!isPaid}
                  className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--paper)] text-xs focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <button
                  onClick={isPaid ? handleChat : handleUnlockPayment}
                  disabled={chatLoading}
                  title={!isPaid ? 'Unlock to use AI chat' : 'Send'}
                  className="px-3 py-2 bg-[var(--accent)] text-white rounded-xl text-xs font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  {isPaid ? '→' : '🔒'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  )
}
