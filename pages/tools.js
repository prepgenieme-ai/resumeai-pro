import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const TOOLS = [
  { id: 'ats', icon: '📊', title: 'ATS Score', desc: 'See your resume score + keyword gaps', free: true },
  { id: 'resume', icon: '✍️', title: 'Resume Optimizer', desc: 'AI-rewritten resume with ATS keywords', free: false },
  { id: 'cover', icon: '📧', title: 'Cover Letter', desc: 'Personalized to the job description', free: false },
  { id: 'linkedin', icon: '💼', title: 'LinkedIn DM', desc: 'Cold message recruiters that gets replies', free: false },
  { id: 'email', icon: '📨', title: 'HR Email', desc: 'Formal job application email', free: false },
  { id: 'interview', icon: '🎯', title: 'Interview Prep', desc: 'Top 10 Q&A for your specific role', free: false },
]

export default function ToolsPage() {
  const [resumeText, setResumeText] = useState('')
  const [jdText, setJdText] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTool, setActiveTool] = useState(null)
  const [outputs, setOutputs] = useState({})
  const [isPaid, setIsPaid] = useState(false)
  const [activeTab, setActiveTab] = useState('ats')
  const fileRef = useRef(null)

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
    if (fileName.endsWith('.pdf') || fileName.endsWith('.docx')) {
      toast.loading('Reading resume...', { id: 'upload' })
      try {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result.split(',')[1])
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
        const res = await fetch('/api/parse-resume', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: base64, fileName: file.name, fileType: file.type })
        })
        const data = await res.json()
        if (data.error) { toast.error(data.error, { id: 'upload' }); return }
        setResumeText(data.text)
        toast.success(`Resume read! ${data.wordCount} words ✅`, { id: 'upload' })
      } catch { toast.error('Failed to read. Paste text instead.', { id: 'upload' }) }
    } else {
      const text = await file.text()
      setResumeText(text)
      toast.success('Resume uploaded ✅')
    }
  }

  const runAllTools = async () => {
    if (!resumeText.trim()) { toast.error('Please upload or paste your resume first'); return }
    if (!jdText.trim()) { toast.error('Please paste the job description'); return }
    if (!jobRole.trim()) { toast.error('Please enter the job role'); return }

    setLoading(true)
    toast.loading('AI is analysing...', { id: 'analyze' })

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jdText, companyName, jobRole })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setOutputs(data)
      setActiveTab('ats')
      toast.success('Analysis complete! 🎉', { id: 'analyze' })
    } catch (err) {
      toast.error('Failed. Please try again.', { id: 'analyze' })
    }
    setLoading(false)
  }

  const handleUnlockPayment = () => {
    const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere'
    const options = {
      key: RAZORPAY_KEY,
      amount: 1900,
      currency: 'INR',
      name: 'ResumeAI Pro',
      description: 'Full Job Application Pack — All 6 Tools',
      theme: { color: '#FF5C1A' },
      handler: function () {
        setIsPaid(true)
        toast.success('🎉 Unlocked! All 6 tools now available!')
      },
      modal: { ondismiss: () => toast.error('Payment cancelled') }
    }
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } else toast.error('Payment loading, try again')
  }

  const downloadAsPdf = (content, filename) => {
    const lines = content.split('\n')
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${filename}</title>
    <style>body{font-family:Calibri,Arial,sans-serif;font-size:11pt;margin:0.8in;line-height:1.5;}
    h1{font-size:16pt;border-bottom:2px solid #333;padding-bottom:4px;margin-bottom:8px;}
    .bullet{padding-left:14px;margin:2px 0;}.bullet::before{content:"• ";}
    p{margin:3px 0;}</style></head><body>`
    lines.forEach(line => {
      const t = line.trim()
      if (!t) { html += '<br>'; return }
      if (t.startsWith('-') || t.startsWith('•')) html += `<div class="bullet">${t.replace(/^[-•]\s*/, '')}</div>`
      else html += `<p>${t}</p>`
    })
    html += `<script>window.onload=function(){window.print();setTimeout(()=>window.close(),2000)}<\/script></body></html>`
    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    toast.success('Opening PDF download 📄')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard! 📋')
  }

  const hasOutput = Object.keys(outputs).length > 0

  const currentTool = TOOLS.find(t => t.id === activeTab)
  const isToolLocked = !isPaid && currentTool && !currentTool.free

  const getOutputContent = () => {
    if (activeTab === 'ats') return null // special rendering
    if (activeTab === 'resume') return outputs.resume || ''
    if (activeTab === 'cover') return outputs.coverLetter || ''
    if (activeTab === 'linkedin') return outputs.linkedinDm || ''
    if (activeTab === 'email') return outputs.hrEmail || ''
    if (activeTab === 'interview') return outputs.interviewPrep || ''
    return ''
  }

  return (
    <>
      <Head><title>Job Application Copilot — ResumeAI Pro</title></Head>
      <div className="min-h-screen bg-[var(--paper)]">

        {/* Nav */}
        <nav className="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between bg-[var(--card)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{fontFamily:'Clash Display'}}>R</span>
            </div>
            <span className="font-bold" style={{fontFamily:'Clash Display'}}>ResumeAI Pro</span>
          </Link>
          <div className="flex items-center gap-3">
            {isPaid && <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">✅ Unlocked</span>}
            {!isPaid && hasOutput && (
              <button onClick={handleUnlockPayment} className="bg-[var(--accent)] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-500 transition-colors animate-pulse">
                🔒 Unlock All — ₹19
              </button>
            )}
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {!hasOutput ? (
            /* INPUT PANEL */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily:'Clash Display'}}>Job Application Copilot</h1>
              <p className="text-[var(--muted)] mb-8">Upload resume + paste job description → get everything to apply in 1 click</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Resume Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">📄 Your Resume</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="card p-4 text-center border-2 border-dashed border-[var(--border)] cursor-pointer hover:border-[var(--accent)] transition-colors mb-3"
                  >
                    <div className="text-2xl mb-1">📎</div>
                    <p className="text-sm text-[var(--muted)]">Click to upload PDF / DOCX</p>
                    <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={e => handleFileUpload(e.target.files[0])} />
                  </div>
                  <textarea value={resumeText} onChange={e => setResumeText(e.target.value)}
                    placeholder="Or paste your resume text here..."
                    className="w-full h-40 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-xs resize-none transition-colors" />
                  {resumeText && <p className="text-xs text-green-600 mt-1">✅ {resumeText.split(' ').filter(Boolean).length} words loaded</p>}
                </div>

                {/* JD Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">📋 Job Description</label>
                  <textarea value={jdText} onChange={e => setJdText(e.target.value)}
                    placeholder="Paste the full job description from LinkedIn, Naukri, or any job site..."
                    className="w-full h-52 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-xs resize-none transition-colors mb-3" />
                  {jdText && <p className="text-xs text-green-600">✅ JD loaded ({jdText.split(' ').filter(Boolean).length} words)</p>}
                </div>
              </div>

              {/* Company + Role */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">🏢 Company Name</label>
                  <input value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="e.g. Swiggy, Zepto, Razorpay"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">💼 Job Role</label>
                  <input value={jobRole} onChange={e => setJobRole(e.target.value)} placeholder="e.g. Data Analyst, Backend Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] focus:outline-none focus:border-[var(--accent)] text-sm transition-colors" />
                </div>
              </div>

              {/* What you'll get */}
              <div className="card p-4 mb-6">
                <p className="text-xs font-semibold text-[var(--muted)] mb-3">You'll get all 6 of these instantly:</p>
                <div className="grid grid-cols-3 gap-2">
                  {TOOLS.map(t => (
                    <div key={t.id} className="flex items-center gap-2 text-xs">
                      <span>{t.icon}</span>
                      <span className={t.free ? 'text-green-600 font-medium' : 'text-[var(--muted)]'}>{t.title}{t.free ? ' (free)' : ''}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={runAllTools} disabled={loading}
                className="w-full py-4 rounded-2xl bg-[var(--ink)] text-white font-bold text-lg hover:bg-[var(--accent)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analysing...</> : '⚡ Analyse & Generate Everything'}
              </button>
            </motion.div>
          ) : (
            /* RESULTS PANEL */
            <div className="flex gap-6 h-[calc(100vh-140px)]">

              {/* LEFT: Tool selector */}
              <div className="w-56 flex-shrink-0 flex flex-col gap-2">
                <div className="text-xs font-semibold text-[var(--muted)] mb-1 uppercase tracking-wider">Tools</div>
                {TOOLS.map(tool => (
                  <button key={tool.id} onClick={() => setActiveTab(tool.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-sm font-medium ${activeTab === tool.id ? 'bg-[var(--ink)] text-white' : 'bg-[var(--card)] text-[var(--ink)] hover:bg-[var(--border)]'}`}>
                    <span className="text-lg">{tool.icon}</span>
                    <div>
                      <div>{tool.title}</div>
                      {tool.free && <div className="text-xs text-green-400">Free</div>}
                      {!tool.free && !isPaid && <div className="text-xs text-[var(--accent)]">🔒 Locked</div>}
                    </div>
                  </button>
                ))}

                <div className="mt-auto pt-4 border-t border-[var(--border)]">
                  <button onClick={() => setOutputs({})} className="w-full py-2 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
                    ← New Application
                  </button>
                </div>
              </div>

              {/* RIGHT: Output content */}
              <div className="flex-1 overflow-hidden flex flex-col card">

                {/* Tool header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{currentTool?.icon}</span>
                    <div>
                      <h2 className="font-bold" style={{fontFamily:'Clash Display'}}>{currentTool?.title}</h2>
                      <p className="text-xs text-[var(--muted)]">{currentTool?.desc}</p>
                    </div>
                  </div>
                  {isPaid && activeTab !== 'ats' && (
                    <div className="flex gap-2">
                      <button onClick={() => copyToClipboard(getOutputContent())} className="px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-xs font-semibold hover:border-[var(--ink)] transition-colors">
                        📋 Copy
                      </button>
                      <button onClick={() => downloadAsPdf(getOutputContent(), `${activeTab}-${jobRole}`)} className="px-3 py-1.5 bg-[var(--ink)] text-white rounded-lg text-xs font-semibold hover:bg-[var(--accent)] transition-colors">
                        📄 PDF
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* ATS SCORE - special rendering */}
                  {activeTab === 'ats' && outputs.ats && (
                    <div className="max-w-2xl mx-auto">
                      {/* Score circle */}
                      <div className="flex items-center gap-8 mb-8 card p-6">
                        <div className="text-center">
                          <div className={`text-7xl font-bold ${outputs.ats.score >= 70 ? 'text-green-500' : outputs.ats.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`} style={{fontFamily:'Clash Display'}}>
                            {outputs.ats.score}
                          </div>
                          <div className="text-sm text-[var(--muted)]">ATS Score / 100</div>
                        </div>
                        <div>
                          <div className={`font-bold text-lg mb-1 ${outputs.ats.score >= 70 ? 'text-green-500' : outputs.ats.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {outputs.ats.score >= 70 ? '✅ Good — Likely to pass ATS' : outputs.ats.score >= 50 ? '⚠️ Average — May get filtered' : '❌ Low — Getting auto-rejected'}
                          </div>
                          <div className="text-sm text-[var(--muted)]">{outputs.ats.verdict}</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="card p-4">
                          <h3 className="font-bold text-sm mb-3 text-green-600">✅ Matched Keywords ({outputs.ats.matched?.length || 0})</h3>
                          <div className="flex flex-wrap gap-2">
                            {outputs.ats.matched?.map((k, i) => <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs">{k}</span>)}
                          </div>
                        </div>
                        <div className="card p-4">
                          <h3 className="font-bold text-sm mb-3 text-red-500">❌ Missing Keywords ({outputs.ats.missing?.length || 0})</h3>
                          <div className="flex flex-wrap gap-2">
                            {outputs.ats.missing?.map((k, i) => <span key={i} className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs">{k}</span>)}
                          </div>
                        </div>
                      </div>

                      <div className="card p-4 mb-6">
                        <h3 className="font-bold text-sm mb-3">🔧 Quick Fixes</h3>
                        <div className="space-y-2">
                          {outputs.ats.fixes?.map((fix, i) => <div key={i} className="flex items-start gap-2 text-sm"><span className="text-[var(--accent)] mt-0.5">→</span><span>{fix}</span></div>)}
                        </div>
                      </div>

                      {!isPaid && (
                        <div className="card p-6 text-center border-2 border-dashed border-[var(--accent)]/40">
                          <div className="text-3xl mb-2">🔒</div>
                          <h3 className="font-bold text-lg mb-2" style={{fontFamily:'Clash Display'}}>Unlock All 5 Tools for ₹19</h3>
                          <p className="text-[var(--muted)] text-sm mb-4">Get the fixed resume, cover letter, LinkedIn DM, HR email + interview prep</p>
                          <button onClick={handleUnlockPayment} className="bg-[var(--accent)] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-500 transition-colors">
                            Unlock Full Pack — ₹19 →
                          </button>
                          <p className="text-xs text-[var(--muted)] mt-2">One-time • No subscription • UPI / Cards</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* OTHER TOOLS */}
                  {activeTab !== 'ats' && (
                    isToolLocked ? (
                      <div className="max-w-lg mx-auto text-center pt-16">
                        <div className="text-5xl mb-4">🔒</div>
                        <h3 className="font-bold text-2xl mb-2" style={{fontFamily:'Clash Display'}}>Unlock {currentTool?.title}</h3>
                        <p className="text-[var(--muted)] mb-6">Get this + all other tools for just ₹19 — one-time payment</p>
                        <button onClick={handleUnlockPayment} className="bg-[var(--accent)] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-500 transition-all hover:shadow-xl">
                          Unlock Everything for ₹19 →
                        </button>
                        <p className="text-xs text-[var(--muted)] mt-3">Resume + Cover Letter + LinkedIn DM + HR Email + Interview Prep + PDF Download</p>
                      </div>
                    ) : (
                      <div className="max-w-2xl mx-auto">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink)]" style={{fontFamily:'Georgia, serif', fontSize:'13px', lineHeight:'1.8'}}>
                          {getOutputContent()}
                        </pre>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
