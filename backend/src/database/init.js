import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database file location
const dbDir = path.join(__dirname, '../../data')
const dbPath = path.join(dbDir, 'emails.db')

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Initialize database
const db = new Database(dbPath)

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    newsletter_opt_in BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT,
    user_agent TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_email ON emails(email);
  CREATE INDEX IF NOT EXISTS idx_created_at ON emails(created_at);
`)

console.log('✅ Database initialized at:', dbPath)

export default db
