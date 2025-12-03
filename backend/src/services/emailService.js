import db from '../database/init.js'

export function saveEmail(email, newsletterOptIn, ipAddress = null, userAgent = null) {
  try {
    const stmt = db.prepare(`
      INSERT INTO emails (email, newsletter_opt_in, ip_address, user_agent)
      VALUES (?, ?, ?, ?)
    `)

    const result = stmt.run(
      email.toLowerCase().trim(),
      newsletterOptIn ? 1 : 0,
      ipAddress,
      userAgent
    )

    return { success: true, id: result.lastInsertRowid }
  } catch (error) {
    // Handle duplicate email
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.code === 'SQLITE_CONSTRAINT') {
      return { success: true, message: 'Email already registered' }
    }
    throw error
  }
}

export function emailExists(email) {
  const stmt = db.prepare('SELECT id FROM emails WHERE email = ?')
  const result = stmt.get(email.toLowerCase().trim())
  return !!result
}

export function getEmailStats() {
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM emails')
  const newsletterStmt = db.prepare('SELECT COUNT(*) as total FROM emails WHERE newsletter_opt_in = 1')

  const total = totalStmt.get().total
  const newsletter = newsletterStmt.get().total

  return { total, newsletter, percentage: total > 0 ? (newsletter / total * 100).toFixed(1) : 0 }
}

export function exportEmails(newsletterOnly = false) {
  let query = 'SELECT email, newsletter_opt_in, created_at FROM emails'
  if (newsletterOnly) {
    query += ' WHERE newsletter_opt_in = 1'
  }
  query += ' ORDER BY created_at DESC'

  const stmt = db.prepare(query)
  return stmt.all()
}
