export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { fileData, fileName, fileType } = req.body
    if (!fileData) return res.status(400).json({ error: 'No file data received' })
    const buffer = Buffer.from(fileData, 'base64')
    let extractedText = ''
    const lowerName = (fileName || '').toLowerCase()
    const isPdf = lowerName.endsWith('.pdf') || fileType === 'application/pdf'
    const isDocx = lowerName.endsWith('.docx')
    if (isPdf) {
      try {
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default
        const data = await pdfParse(buffer)
        extractedText = data.text
      } catch { return res.status(400).json({ error: 'Could not read PDF. Please paste text directly.' }) }
    } else if (isDocx) {
      try {
        const mammoth = await import('mammoth')
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value
      } catch { return res.status(400).json({ error: 'Could not read Word file. Please paste text directly.' }) }
    } else {
      extractedText = buffer.toString('utf-8')
    }
    extractedText = extractedText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
    if (!extractedText || extractedText.length < 30) return res.status(400).json({ error: 'Resume appears empty. Please paste text directly.' })
    return res.json({ text: extractedText, wordCount: extractedText.split(/\s+/).filter(Boolean).length })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to parse file. Please paste text directly.' })
  }
}
