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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleFileUpload = async (file) => {
    if (!file) return
    const text = await file.text()
    setResumeText(text)
    toast.success('Resume uploaded! ✅')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFileUpload(file)
  }

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
        text: `✅ Done! I've fully optimised your resume for the **${jobRole}** role. I added ATS keywords, rewrote your bullet points with action verbs, and crafted a tailored summary.\n\nWant me to tweak anything? Just tell me — like "make it sound more senior" or "add more fintech keywords"!`
      }])
      setStep('result')
    } catch (err) {
      clearInterval(interval)
      toast.error('Optimisation failed. Please try again.')
      setStep('jobRole')
    }
  }

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
        body: JSON.stringify({
          message: userMsg,
          currentResume: optimisedResume,
          jobRole
        })
      })
      const data = await response.json()
      if (data.updatedResume) setOptimisedResume(data.updatedResume)
      setChatMessages(prev => [...prev, { role: 'ai', text: data.reply }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'Sorry, something went wrong. Please try again.' }])
    }
    setChatLoading(false)
  }

  const downloadResume = () => {
    const blob = new Blob([optimisedResume], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `optimised-resume-${jobRole.replace(/\s+/g, '-')}.txt`
    a.click()
    toast.success('Resume downloaded! 🎉')
  }

  return (
    <>
      <Head>
        <title>Optimise Resume — ResumeAI Pro</title>
      </Head>

      <div className="min-h-screen bg-[var(--paper)]">
        {/* Nav */}
        <nav className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between bg-[var(--card)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
            </div>
            <span className="font-semibold" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            {isPremium && (
              <span className="bg-[var(--gold)]/20 text-[var(--ink)] border border-[var(--gold)]/40 px-3 py-1 rounded-full text-xs font-medium">
                🚀 Premium
              </span>
            )}
            {payment_id && (
              <span className="text-[var(--muted)] text-xs">Payment: ✅</span>
            )}
          </div>
        </nav>

        {/* STEP: Upload */}
        {step === 'upload' && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>
                Upload Your Resume
              </h1>
              <p className="text-[var(--muted)] mb-10">PDF, Word, or paste text directly</p>

              {/* Drop zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileRef.current?.click()}
                className="card p-10 text-center border-2 border-dashed border-[var(--border)] cursor-pointer hover:border-[var(--accent)] transition-colors mb-6"
              >
                <div className="text-5xl mb-4">📄</div>
                <p className="font-semibold mb-1">Drop your resume here</p>
                <p className="text-[var(--muted)] text-sm">or click to browse (PDF, DOCX, TXT)</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[var(--border)]" />
                <span className="text-[var(--muted)] text-sm">or paste text</span>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here..."
                className="w-full h-40 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm resize-none transition-colors"
              />

              {resumeText && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-[var(--muted)]">
                  ✅ {resumeText.split(' ').length} words detected
                </motion.div>
              )}

              <button
                onClick={() => {
                  if (!resumeText.trim()) { toast.error('Please upload or paste your resume'); return }
                  setStep('jobRole')
                }}
                className="mt-8 w-full py-4 rounded-2xl bg-[var(--accent)] text-white font-bold text-lg hover:bg-orange-500 transition-all"
              >
                Next — Tell AI Your Job Role →
              </button>
            </motion.div>
          </div>
        )}

        {/* STEP: Job Role */}
        {step === 'jobRole' && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <button onClick={() => setStep('upload')} className="text-[var(--muted)] text-sm mb-6 hover:text-[var(--accent)] transition-colors">
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>
                What job are you applying for?
              </h1>
              <p className="text-[var(--muted)] mb-10">Be specific — the more detail, the better AI can tailor your resume</p>

              <div className="card p-6 mb-4">
                <div className="text-sm font-medium mb-3">Just type naturally, like:</div>
                {[
                  'Data Analyst at a fintech startup',
                  'Backend Engineer (Node.js) at Zepto',
                  'Product Manager at a Series B company',
                ].map(ex => (
                  <button
                    key={ex}
                    onClick={() => setJobRole(ex)}
                    className="block text-left w-full text-sm text-[var(--muted)] hover:text-[var(--accent)] py-1 transition-colors"
                  >
                    → "{ex}"
                  </button>
                ))}
              </div>

              <textarea
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                placeholder="e.g. Data Analyst role at a fintech startup focusing on SQL, Python and dashboards..."
                className="w-full h-32 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm resize-none transition-colors"
              />

              <button
                onClick={startOptimisation}
                className="mt-6 w-full py-4 rounded-2xl bg-[var(--ink)] text-[var(--paper)] font-bold text-lg hover:bg-[var(--accent)] transition-all duration-300"
              >
                🚀 Optimise My Resume Now!
              </button>
            </motion.div>
          </div>
        )}

        {/* STEP: Processing */}
        {step === 'processing' && (
          <div className="max-w-xl mx-auto px-6 py-32 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-7xl mb-8 animate-bounce">✨</div>
              <h2 className="text-3xl font-bold mb-4" style={{fontFamily:'Clash Display'}}>
                AI is working its magic...
              </h2>
              <p className="text-[var(--accent)] font-medium mb-8 text-lg min-h-[28px]">
                {loadingMessages[loadingMsg]}
              </p>
              <div className="w-full bg-[var(--border)] rounded-full h-2 mb-4">
                <div
                  className="bg-[var(--accent)] h-2 rounded-full transition-all duration-2000"
                  style={{ width: `${((loadingMsg + 1) / loadingMessages.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[var(--muted)]">This usually takes 15–30 seconds</p>
            </motion.div>
          </div>
        )}

        {/* STEP: Result */}
        {step === 'result' && (
          <div className="flex h-[calc(100vh-65px)]">
            {/* Left: Resume Viewer */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-[var(--border)] bg-[var(--card)] px-4">
                {['resume', ...(isPremium ? ['cover', 'linkedin'] : [])].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-[var(--accent)] text-[var(--accent)]'
                        : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {tab === 'resume' ? '📄 Resume' : tab === 'cover' ? '✉️ Cover Letter' : '💼 LinkedIn'}
                  </button>
                ))}
                <div className="ml-auto py-2">
                  <button
                    onClick={downloadResume}
                    className="px-4 py-1.5 bg-[var(--accent)] text-white rounded-lg text-xs font-semibold hover:bg-orange-500 transition-colors"
                  >
                    ⬇ Download
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-[var(--paper)]">
                <div className="max-w-2xl mx-auto card p-8">
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[var(--ink)]" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.7'}}>
                    {activeTab === 'resume' ? optimisedResume : activeTab === 'cover' ? coverLetter : linkedinSummary}
                  </pre>
                </div>
              </div>
            </div>

            {/* Right: AI Chat */}
            <div className="w-80 border-l border-[var(--border)] flex flex-col bg-[var(--card)]">
              <div className="p-4 border-b border-[var(--border)]">
                <h3 className="font-bold text-sm" style={{fontFamily:'Clash Display'}}>💬 Vibe Edit with AI</h3>
                <p className="text-xs text-[var(--muted)]">Tell AI to tweak anything</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--accent)] text-white rounded-tr-sm'
                        : 'bg-[var(--paper)] border border-[var(--border)] text-[var(--ink)] rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[var(--paper)] border border-[var(--border)] px-3 py-2 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick prompts */}
              <div className="px-4 pb-2 flex flex-wrap gap-1">
                {['Make it more senior', 'Add more keywords', 'Make it shorter', 'Stronger action verbs'].map(p => (
                  <button
                    key={p}
                    onClick={() => setChatInput(p)}
                    className="text-xs bg-[var(--paper)] border border-[var(--border)] px-2 py-1 rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[var(--border)] flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="e.g. Make it sound more senior..."
                  className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--paper)] text-xs focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <button
                  onClick={handleChat}
                  disabled={chatLoading}
                  className="px-3 py-2 bg-[var(--accent)] text-white rounded-xl text-xs font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
