export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, currentResume, jobRole } = req.body

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        system: `You are an expert resume writer and career coach. The user has already had their resume optimised for a ${jobRole} role. They want to make further tweaks through natural conversation.

When they ask for changes:
1. Update the resume accordingly
2. Reply in a friendly, encouraging tone
3. Explain briefly what you changed and why

Always respond in this JSON format (no markdown, no backticks):
{
  "reply": "Your friendly message explaining what you changed",
  "updatedResume": "THE FULL UPDATED RESUME TEXT"
}

If the user asks a question without wanting a change, still respond in JSON but keep updatedResume the same as the current one.`,
        messages: [
          {
            role: 'user',
            content: `Current resume:\n\n${currentResume}\n\nUser request: ${message}`
          }
        ]
      })
    })

    const data = await response.json()

    if (data.error) {
      return res.status(500).json({ error: data.error.message })
    }

    const content = data.content[0].text

    let parsed
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      return res.json({
        reply: content,
        updatedResume: currentResume
      })
    }

    return res.json({
      reply: parsed.reply || 'Done! I\'ve updated your resume.',
      updatedResume: parsed.updatedResume || currentResume
    })

  } catch (error) {
    console.error('Chat error:', error)
    return res.status(500).json({ error: 'Chat failed. Please try again.' })
  }
}
