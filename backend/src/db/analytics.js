import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const db = new Database(path.join(__dirname, 'analytics.db'))

// Create analytics events table
db.exec(`
  CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_data TEXT,
    session_id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Create index for faster queries
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_event_type ON analytics_events(event_type);
  CREATE INDEX IF NOT EXISTS idx_event_name ON analytics_events(event_name);
  CREATE INDEX IF NOT EXISTS idx_timestamp ON analytics_events(timestamp);
`)

export const trackEvent = (eventType, eventName, eventData = null, sessionId = null) => {
  const stmt = db.prepare(`
    INSERT INTO analytics_events (event_type, event_name, event_data, session_id)
    VALUES (?, ?, ?, ?)
  `)

  return stmt.run(
    eventType,
    eventName,
    eventData ? JSON.stringify(eventData) : null,
    sessionId
  )
}

export const getEventSummary = () => {
  const stmt = db.prepare(`
    SELECT
      event_type,
      event_name,
      COUNT(*) as count
    FROM analytics_events
    GROUP BY event_type, event_name
    ORDER BY count DESC
  `)

  return stmt.all()
}

export const getEventsByType = (eventType) => {
  const stmt = db.prepare(`
    SELECT
      event_name,
      COUNT(*) as count
    FROM analytics_events
    WHERE event_type = ?
    GROUP BY event_name
    ORDER BY count DESC
  `)

  return stmt.all(eventType)
}

export const getRecentEvents = (limit = 100) => {
  const stmt = db.prepare(`
    SELECT *
    FROM analytics_events
    ORDER BY timestamp DESC
    LIMIT ?
  `)

  return stmt.all(limit)
}

export const getEventStats = () => {
  // Get total events
  const totalStmt = db.prepare('SELECT COUNT(*) as total FROM analytics_events')
  const total = totalStmt.get().total

  // Get events by type
  const byTypeStmt = db.prepare(`
    SELECT event_type, COUNT(*) as count
    FROM analytics_events
    GROUP BY event_type
    ORDER BY count DESC
  `)
  const byType = byTypeStmt.all()

  // Get top events
  const topEventsStmt = db.prepare(`
    SELECT event_type, event_name, COUNT(*) as count
    FROM analytics_events
    GROUP BY event_type, event_name
    ORDER BY count DESC
    LIMIT 10
  `)
  const topEvents = topEventsStmt.all()

  // Get events by day (last 7 days)
  const byDayStmt = db.prepare(`
    SELECT
      DATE(timestamp) as date,
      COUNT(*) as count
    FROM analytics_events
    WHERE timestamp >= DATE('now', '-7 days')
    GROUP BY DATE(timestamp)
    ORDER BY date DESC
  `)
  const byDay = byDayStmt.all()

  return {
    total,
    byType,
    topEvents,
    byDay
  }
}

export default db
