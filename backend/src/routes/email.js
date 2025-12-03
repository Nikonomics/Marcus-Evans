import express from 'express'
import { saveEmail, emailExists, getEmailStats, exportEmails } from '../services/emailService.js'

const router = express.Router()

// Submit email
router.post('/submit', async (req, res) => {
  try {
    const { email, newsletterOptIn } = req.body

    // Validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' })
    }

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress
    const userAgent = req.get('user-agent')

    // Save to database
    const result = saveEmail(email, newsletterOptIn, ipAddress, userAgent)

    res.json({
      success: true,
      message: result.message || 'Email registered successfully',
      newsletterOptIn: newsletterOptIn || false
    })
  } catch (error) {
    console.error('Error saving email:', error)
    res.status(500).json({ error: 'Failed to register email' })
  }
})

// Check if email exists (optional - for UX)
router.post('/check', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const exists = emailExists(email)
    res.json({ exists })
  } catch (error) {
    console.error('Error checking email:', error)
    res.status(500).json({ error: 'Failed to check email' })
  }
})

// Get stats (admin endpoint - should be protected in production)
router.get('/stats', async (req, res) => {
  try {
    const stats = getEmailStats()
    res.json(stats)
  } catch (error) {
    console.error('Error getting stats:', error)
    res.status(500).json({ error: 'Failed to get stats' })
  }
})

// Export emails (admin endpoint - should be protected in production)
router.get('/export', async (req, res) => {
  try {
    const newsletterOnly = req.query.newsletter === 'true'
    const emails = exportEmails(newsletterOnly)

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=emails.csv')

    // CSV header
    res.write('Email,Newsletter Opt-In,Created At\n')

    // CSV rows
    emails.forEach(row => {
      res.write(`${row.email},${row.newsletter_opt_in ? 'Yes' : 'No'},${row.created_at}\n`)
    })

    res.end()
  } catch (error) {
    console.error('Error exporting emails:', error)
    res.status(500).json({ error: 'Failed to export emails' })
  }
})

export default router
