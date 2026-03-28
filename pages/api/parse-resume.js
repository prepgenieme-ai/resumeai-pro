import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 }) // 10MB max

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else resolve([fields, files])
      })
    })

    const file = files.resume?.[0] || files.resume
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileBuffer = fs.readFileSync(file.filepath)
    const mimeType = file.mimetype || ''
    const fileName = file.originalFilename || ''

    let extractedText = ''

    if (mimeType === 'application/pdf' || fileName.endsWith('.pdf')) {
      // Parse PDF
      const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default
      const data = await pdfParse(fileBuffer)
      extractedText = data.text
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileName.endsWith('.docx')
    ) {
      // Parse DOCX using mammoth
      const mammoth = await import('mammoth')
      const result = await mammoth.extractRawText({ buffer: fileBuffer })
      extractedText = result.value
    } else if (mimeType === 'text/plain' || fileName.endsWith('.txt')) {
      extractedText = fileBuffer.toString('utf-8')
    } else {
      // Try as plain text fallback
      extractedText = fileBuffer.toString('utf-8')
    }

    // Clean up the extracted text
    extractedText = extractedText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

    if (!extractedText || extractedText.length < 50) {
      return res.status(400).json({ error: 'Could not extract text from file. Please paste your resume text instead.' })
    }

    return res.json({ text: extractedText, wordCount: extractedText.split(/\s+/).length })

  } catch (error) {
    console.error('Parse error:', error)
    return res.status(500).json({ error: 'Failed to parse resume. Please paste your resume text directly.' })
  }
}
