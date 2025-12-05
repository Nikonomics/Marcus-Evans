import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRouter from './routes/chat.js'
import emailRouter from './routes/email.js'
import analyticsRouter from './routes/analytics.js'
import adminRouter from './routes/admin.js'
import './database/init.js' // Initialize database on startup

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5172

// Validate required environment variables
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set in environment variables')
  process.exit(1)
}

// Middleware
app.use(express.json())

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:5174']

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

// Serve static files (for analytics dashboard)
app.use(express.static('public'))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api', chatRouter)
app.use('/api/email', emailRouter)
app.use('/api/analytics', analyticsRouter)
app.use('/api/admin', adminRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Marcus Evans 2025 API running on http://localhost:${PORT}`)
  console.log(`📡 CORS enabled for: ${allowedOrigins.join(', ')}`)
  console.log(`📧 Email database initialized`)
})
