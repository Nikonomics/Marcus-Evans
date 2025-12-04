import express from 'express'
import { trackEvent, getEventSummary, getEventsByType, getRecentEvents, getEventStats } from '../db/analytics.js'

const router = express.Router()

// Track an event
router.post('/track', (req, res) => {
  try {
    const { eventType, eventName, eventData, sessionId } = req.body

    if (!eventType || !eventName) {
      return res.status(400).json({
        error: 'eventType and eventName are required'
      })
    }

    trackEvent(eventType, eventName, eventData, sessionId)

    res.json({ success: true })
  } catch (error) {
    console.error('Error tracking event:', error)
    res.status(500).json({ error: 'Failed to track event' })
  }
})

// Get summary of all events
router.get('/summary', (req, res) => {
  try {
    const summary = getEventSummary()
    res.json(summary)
  } catch (error) {
    console.error('Error getting summary:', error)
    res.status(500).json({ error: 'Failed to get summary' })
  }
})

// Get events by type
router.get('/by-type/:type', (req, res) => {
  try {
    const { type } = req.params
    const events = getEventsByType(type)
    res.json(events)
  } catch (error) {
    console.error('Error getting events by type:', error)
    res.status(500).json({ error: 'Failed to get events' })
  }
})

// Get recent events
router.get('/recent', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100
    const events = getRecentEvents(limit)
    res.json(events)
  } catch (error) {
    console.error('Error getting recent events:', error)
    res.status(500).json({ error: 'Failed to get recent events' })
  }
})

// Get comprehensive stats
router.get('/stats', (req, res) => {
  try {
    const stats = getEventStats()
    res.json(stats)
  } catch (error) {
    console.error('Error getting stats:', error)
    res.status(500).json({ error: 'Failed to get stats' })
  }
})

export default router
