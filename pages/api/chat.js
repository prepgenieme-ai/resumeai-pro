export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, currentResume, jobRole } = req.body
  const GROQ_API_KEY = process.env.GROQ_API_KEY

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const prompt = `You are an expert resume writer. The user has an optimised resume for a ${jobRole} role and wants to tweak it.

Current resume:
${currentResume}

User request: ${message}

Update the resume based on their request and reply in a friendly tone explaining what you changed.

Respond in this EXACT JSON format only (no markdown, no backticks):
{
  "reply": "Your friendly message explaining what you changed",
  "updatedResume": "THE FULL UPDATED RESUME TEXT"
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
        max_tokens: 3000
      })
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    let parsed
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return res.json({ reply: content, updatedResume: currentResume })
    }

    return res.json({
      reply: parsed.reply || 'Done! Resume updated.',
      updatedResume: parsed.updatedResume || currentResume
    })

  } catch (error) {
    console.error('Chat error:', error)
    return res.status(500).json({ error: 'Chat failed. Please try again.' })
  }
}
