export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { resumeText, jobRole, isPremium } = req.body

  if (!resumeText || !jobRole) {
    return res.status(400).json({ error: 'Resume text and job role are required' })
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const systemPrompt = `You are an expert ATS resume optimiser and professional resume writer with 15+ years of experience in HR and recruiting. You help job seekers in India land interviews by creating powerful, ATS-friendly resumes.

Your job is to:
1. Parse and understand the user's current resume
2. Understand the target job role deeply
3. Rewrite the resume to be fully ATS-optimised
4. Add relevant keywords naturally throughout
5. Rewrite bullet points with strong action verbs and quantified achievements
6. Write a tailored professional summary
7. Ensure clean, scannable formatting

Rules:
- Keep the person's actual experience and facts — don't fabricate
- Quantify achievements wherever possible (add estimates if reasonable)
- Use industry-standard keywords for the role
- Start bullets with powerful action verbs (Led, Built, Optimised, Increased, etc.)
- Make it ATS-friendly: no tables, no graphics, clear section headers
- Output clean plain text with proper formatting using | for separators and --- for dividers

${isPremium ? 'Also generate a cover letter and LinkedIn summary.' : ''}`

    const userPrompt = `Here is the candidate's current resume:

---RESUME START---
${resumeText}
---RESUME END---

Target Job Role: ${jobRole}

Please:
1. Fully optimise this resume for the target role
2. Inject relevant ATS keywords
3. Rewrite bullet points with action verbs and metrics
4. Write a powerful tailored professional summary
${isPremium ? '5. Write a compelling cover letter for this role\n6. Write an optimised LinkedIn "About" summary' : ''}

Respond in this EXACT JSON format (no markdown, no backticks):
{
  "optimisedResume": "FULL OPTIMISED RESUME TEXT HERE",
  "skillsGap": ["skill1", "skill2", "skill3"],
  "keywordsAdded": ["keyword1", "keyword2"],
  ${isPremium ? '"coverLetter": "FULL COVER LETTER HERE", "linkedinSummary": "LINKEDIN ABOUT SECTION HERE",' : ''}
  "improvements": ["improvement made 1", "improvement made 2"]
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userPrompt }
        ]
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error('Anthropic API error:', data.error)
      return res.status(500).json({ error: data.error.message })
    }

    const content = data.content[0].text

    // Parse JSON response
    let parsed
    try {
      // Clean up any potential markdown formatting
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch (e) {
      // If JSON parse fails, return the raw text as the resume
      return res.json({
        optimisedResume: content,
        coverLetter: '',
        linkedinSummary: '',
        skillsGap: [],
        improvements: []
      })
    }

    return res.json({
      optimisedResume: parsed.optimisedResume || '',
      coverLetter: parsed.coverLetter || '',
      linkedinSummary: parsed.linkedinSummary || '',
      skillsGap: parsed.skillsGap || [],
      keywordsAdded: parsed.keywordsAdded || [],
      improvements: parsed.improvements || []
    })

  } catch (error) {
    console.error('Optimisation error:', error)
    return res.status(500).json({ error: 'Optimisation failed. Please try again.' })
  }
}
