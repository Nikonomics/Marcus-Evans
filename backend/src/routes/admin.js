import express from 'express'
import db from '../database/init.js'

const router = express.Router()

// Get all email submissions
router.get('/emails', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT
        id,
        email,
        newsletter_opt_in,
        created_at,
        ip_address,
        user_agent
      FROM emails
      ORDER BY created_at DESC
    `)

    const emails = stmt.all()

    // Return both JSON and HTML based on Accept header
    const acceptsHTML = req.headers.accept && req.headers.accept.includes('text/html')

    if (acceptsHTML) {
      // Return HTML table for browser viewing
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Submissions - Marcus Evans 2025</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="mb-6">
              <h1 class="text-3xl font-bold text-gray-900">Email Submissions</h1>
              <p class="text-gray-600 mt-2">Total: ${emails.length} submissions</p>
            </div>

            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Newsletter</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  ${emails.map(email => `
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${email.id}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${email.email}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ${email.newsletter_opt_in ?
                          '<span class="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Yes</span>' :
                          '<span class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 rounded-full">No</span>'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${new Date(email.created_at).toLocaleString()}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${email.ip_address || 'N/A'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="mt-6 flex gap-4">
              <a href="/analytics-dashboard.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Analytics Dashboard
              </a>
              <button onclick="exportCSV()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Export as CSV
              </button>
            </div>
          </div>

          <script>
            function exportCSV() {
              const emails = ${JSON.stringify(emails)};
              const csv = [
                ['ID', 'Email', 'Newsletter Opt-In', 'Created At', 'IP Address'],
                ...emails.map(e => [e.id, e.email, e.newsletter_opt_in ? 'Yes' : 'No', e.created_at, e.ip_address || ''])
              ].map(row => row.join(',')).join('\\n');

              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'email-submissions-' + new Date().toISOString().split('T')[0] + '.csv';
              a.click();
            }
          </script>
        </body>
        </html>
      `
      res.send(html)
    } else {
      // Return JSON for API consumption
      res.json({
        total: emails.length,
        emails
      })
    }
  } catch (error) {
    console.error('Error fetching emails:', error)
    res.status(500).json({ error: 'Failed to fetch emails' })
  }
})

// Get email stats
router.get('/email-stats', (req, res) => {
  try {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM emails')
    const total = totalStmt.get().total

    const newsletterStmt = db.prepare('SELECT COUNT(*) as count FROM emails WHERE newsletter_opt_in = 1')
    const newsletterOptIns = newsletterStmt.get().count

    const recentStmt = db.prepare(`
      SELECT COUNT(*) as count
      FROM emails
      WHERE created_at >= datetime('now', '-7 days')
    `)
    const lastWeek = recentStmt.get().count

    const todayStmt = db.prepare(`
      SELECT COUNT(*) as count
      FROM emails
      WHERE DATE(created_at) = DATE('now')
    `)
    const today = todayStmt.get().count

    res.json({
      total,
      newsletterOptIns,
      newsletterOptInRate: total > 0 ? (newsletterOptIns / total * 100).toFixed(1) + '%' : '0%',
      lastWeek,
      today
    })
  } catch (error) {
    console.error('Error fetching email stats:', error)
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
