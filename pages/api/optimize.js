export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { resumeText, jobRole, isPremium } = req.body

  if (!resumeText || !jobRole) {
    return res.status(400).json({ error: 'Resume text and job role are required' })
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const prompt = `You are an expert ATS resume optimiser and professional resume writer. You help job seekers in India land interviews by creating powerful, ATS-friendly resumes.

Here is the candidate's current resume:
---RESUME START---
${resumeText}
---RESUME END---

Target Job Role: ${jobRole}

Your job:
1. Fully optimise this resume for the target role
2. Inject relevant ATS keywords naturally
3. Rewrite bullet points with strong action verbs and quantified achievements
4. Write a powerful tailored professional summary
5. Keep the person's actual experience — do not fabricate
6. Make it ATS-friendly: clear section headers, no tables or graphics
${isPremium ? '7. Write a compelling cover letter\n8. Write an optimised LinkedIn About summary' : ''}

Respond in this EXACT JSON format only (no markdown, no backticks, no extra text before or after):
{
  "optimisedResume": "FULL OPTIMISED RESUME TEXT",
  "skillsGap": ["skill1", "skill2"],
  "keywordsAdded": ["keyword1", "keyword2"],
  ${isPremium ? '"coverLetter": "COVER LETTER TEXT", "linkedinSummary": "LINKEDIN SUMMARY",' : ''}
  "improvements": ["improvement1", "improvement2"]
}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error('Groq API error:', data.error)
      return res.status(500).json({ error: data.error.message })
    }

    const content = data.choices?.[0]?.message?.content || ''

    if (!content) {
      return res.status(500).json({ error: 'No response from AI. Please try again.' })
    }

    let parsed
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch (e) {
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
