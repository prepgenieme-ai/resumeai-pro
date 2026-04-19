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
        // Use require() to avoid webpack bundling issues
        const pdfParse = require('pdf-parse')
        const data = await pdfParse(buffer)
        extractedText = data.text
      } catch (e) {
        console.error('PDF parse error:', e)
        return res.status(400).json({ error: 'Could not read PDF. Please paste your resume text directly.' })
      }
    } else if (isDocx) {
      try {
        const mammoth = require('mammoth')
        const result = await mammoth.extractRawText({ buffer })
        extractedText = result.value
      } catch (e) {
        console.error('DOCX parse error:', e)
        return res.status(400).json({ error: 'Could not read Word file. Please paste your resume text directly.' })
      }
    } else {
      extractedText = buffer.toString('utf-8')
    }

    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    if (!extractedText || extractedText.length < 30) {
      return res.status(400).json({ error: 'Resume appears empty. Please paste your resume text directly.' })
    }

    return res.json({
      text: extractedText,
      wordCount: extractedText.split(/\s+/).filter(Boolean).length
    })

  } catch (error) {
    console.error('Parse error:', error)
    return res.status(500).json({ error: 'Failed to parse file. Please paste your resume text directly.' })
  }
}
