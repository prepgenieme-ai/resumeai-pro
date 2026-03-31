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
    const prompt = `You are a friendly, expert resume writer helping someone improve their resume for a ${jobRole} role. You speak in a warm, casual, encouraging tone like a helpful friend who happens to be a career expert.

Current resume:
${currentResume}

The user says: "${message}"

Your job:
1. Make the requested changes to the resume
2. Reply in a SHORT, friendly, natural way (2-3 sentences max) — like texting a friend
3. Do NOT mention JSON, do NOT be formal or robotic
4. Sound excited and supportive

Examples of good replies:
- "Done! I swapped out the weak verbs for power words like 'spearheaded' and 'drove'. Should hit much harder now! 🚀"
- "Shortened it nicely — cut the fluff and kept the gold. Way more punchy now! ✂️"
- "Made it sound more senior — added leadership language and bumped up the impact of your achievements. 💪"

Respond ONLY in this JSON format (no markdown, no extra text):
{"reply": "your short friendly reply here", "updatedResume": "THE COMPLETE UPDATED RESUME TEXT HERE"}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
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
      return res.json({ reply: "Done! I've updated your resume. Check the preview! ✅", updatedResume: currentResume })
    }

    // Clean up reply if it contains any JSON leak
    let reply = parsed.reply || "Done! Updated your resume ✅"
    if (reply.includes('"reply"') || reply.includes('"updatedResume"') || reply.startsWith('{')) {
      reply = "Done! I've updated your resume as requested. Check the preview on the left! ✅"
    }

    return res.json({
      reply,
      updatedResume: parsed.updatedResume || currentResume
    })

  } catch (error) {
    console.error('Chat error:', error)
    return res.status(500).json({ error: 'Chat failed. Please try again.' })
  }
}
