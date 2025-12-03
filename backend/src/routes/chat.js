import express from 'express'
import { streamChatCompletion } from '../services/claudeService.js'

const router = express.Router()

router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' })
    }

    // Set headers for SSE (Server-Sent Events)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    // Get the stream from Claude API
    const stream = await streamChatCompletion(messages)

    // Stream the response back to the client
    stream.on('text', (text) => {
      res.write(`data: ${JSON.stringify({ type: 'content_block_delta', delta: { text } })}\n\n`)
    })

    stream.on('end', () => {
      res.write('data: [DONE]\n\n')
      res.end()
    })

    stream.on('error', (error) => {
      console.error('Stream error:', error)
      res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`)
      res.end()
    })
  } catch (error) {
    console.error('Error in chat route:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

export default router
