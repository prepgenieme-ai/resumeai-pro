export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { resumeText, jdText, companyName, jobRole } = req.body
  if (!resumeText || !jdText) return res.status(400).json({ error: 'Resume and JD required' })

  const GROQ_API_KEY = process.env.GROQ_API_KEY
  if (!GROQ_API_KEY) return res.status(500).json({ error: 'API key not configured' })

  const callGroq = async (prompt) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 2000
      })
    })
    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  }

  try {
    // Run all 6 in parallel for speed
    const [atsRaw, resumeOut, coverOut, linkedinOut, emailOut, interviewOut] = await Promise.all([

      // 1. ATS SCORE
      callGroq(`You are an expert ATS resume screener. Analyze this resume against the job description.

Resume: ${resumeText.slice(0, 3000)}
Job Description: ${jdText.slice(0, 2000)}
Job Role: ${jobRole}

Return ONLY valid JSON (no markdown, no backticks):
{"score": 0-100, "matched": ["keyword1","keyword2"], "missing": ["keyword3","keyword4"], "fixes": ["fix1","fix2","fix3"], "verdict": "one sentence honest verdict"}`),

      // 2. RESUME OPTIMIZER
      callGroq(`You are a senior resume writer for the Indian job market. Rewrite this resume for the job description.

Rules:
- Start every bullet with a strong action verb (Led, Built, Increased, Reduced, Designed, Developed)
- Add quantified metrics wherever possible
- Inject these skills from the JD naturally into the resume
- Keep it ATS-friendly: clear sections, no tables
- Professional Summary must mention: role, top 2 skills, years of experience
- Do NOT fabricate experience or companies
- Output clean plain text

Resume: ${resumeText.slice(0, 3000)}
Job Description: ${jdText.slice(0, 2000)}
Target Role: ${jobRole}
Company: ${companyName || 'the company'}

Output the full optimised resume as plain text only. No JSON, no markdown.`),

      // 3. COVER LETTER
      callGroq(`Write a cover letter for an Indian job seeker.

Rules:
- Under 200 words — Indian HRs don't read long letters
- First line must hook: mention company name + something specific
- Second paragraph: connect top 2 resume achievements to JD requirements
- Third paragraph: enthusiasm + 1 specific thing about the company
- End: "I would love to discuss how I can contribute to ${companyName || 'your team'}"
- Tone: confident, professional, human
- NO generic phrases like "I am writing to express my interest"

Resume summary (first 1000 chars): ${resumeText.slice(0, 1000)}
Job Description: ${jdText.slice(0, 1500)}
Company: ${companyName || 'the company'}
Role: ${jobRole}

Write the cover letter as plain text only. No JSON.`),

      // 4. LINKEDIN DM
      callGroq(`Write a LinkedIn cold message from a job seeker to a recruiter.

Rules:
- Maximum 60 words — must fit in LinkedIn preview
- Open with a genuine compliment or observation about the company
- Mention the role in first 2 lines
- Include 1 specific achievement from the resume
- End with soft ask: "Would love to learn more about the team"
- NO desperate language, NO "please help me"
- Sound like a confident professional

Resume highlights (first 500 chars): ${resumeText.slice(0, 500)}
Company: ${companyName || 'your company'}
Role: ${jobRole}

Write the LinkedIn DM as plain text only. No JSON.`),

      // 5. HR EMAIL
      callGroq(`Write a formal job application email for an Indian job seeker.

Rules:
- Subject line: "Application for ${jobRole} — [Candidate Name] | [Top Skill] | [X]YOE"
  (Use the candidate's actual top skill from resume, estimate YOE from resume)
- Body under 150 words
- Para 1: Who you are + role applying for
- Para 2: Top 2 achievements relevant to JD
- Para 3: Availability for interview + "Resume attached"
- Professional closing
- Replace [Candidate Name] with "Candidate" if unknown

Resume: ${resumeText.slice(0, 1000)}
Job Description: ${jdText.slice(0, 1000)}
Company: ${companyName || 'the company'}
Role: ${jobRole}

Write the full email as plain text. Start with Subject: on first line.`),

      // 6. INTERVIEW PREP
      callGroq(`You are a senior interviewer at a top Indian tech company. Generate interview prep for a fresher.

Generate top 10 interview questions for ${jobRole} at ${companyName || 'a tech company'} based on this JD.

For each question:
Q1. [Question]
Why asked: [Interviewer's intent in 1 line]
How to answer: [STAR framework guidance]
Sample answer: [2-3 sentence strong answer using resume context]

Include:
- 3 technical questions specific to JD skills
- 3 behavioral questions (common in Indian interviews)  
- 2 scenario-based questions
- 1 "Why this company" question
- 1 salary expectation question

Resume context: ${resumeText.slice(0, 1500)}
JD: ${jdText.slice(0, 1500)}

Write as plain text. Number each question clearly.`)
    ])

    // Parse ATS JSON
    let ats = { score: 50, matched: [], missing: [], fixes: [], verdict: 'Analysis complete' }
    try {
      const cleaned = atsRaw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      ats = JSON.parse(cleaned)
    } catch { /* keep defaults */ }

    return res.json({
      ats,
      resume: resumeOut,
      coverLetter: coverOut,
      linkedinDm: linkedinOut,
      hrEmail: emailOut,
      interviewPrep: interviewOut
    })

  } catch (error) {
    console.error('Analyze error:', error)
    return res.status(500).json({ error: 'Analysis failed. Please try again.' })
  }
}
