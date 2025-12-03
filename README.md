# The Healthcare Entrepreneur

An AI-powered chatbot helping senior living operators implement AI solutions in their facilities. Built with React, Express, and Claude AI (Sonnet 4).

## Features

- 🤖 **Expert AI Consultant**: Specialized in senior living facility AI implementation
- 📚 **Comprehensive Knowledge Base**: Domain knowledge, frameworks, playbooks, case studies, and anti-patterns
- 💬 **Real-time Chat**: Streaming responses from Claude API
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 🎯 **Starter Prompts**: Quick access to common questions
- 📊 **Conversation Management**: Message history with 20-message limit
- 🎨 **Professional UI**: Clean, modern interface with Tailwind CSS

## Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS
- Server-Sent Events (SSE) for streaming

**Backend:**
- Node.js + Express
- Anthropic Claude API (Sonnet 4)
- CORS enabled
- Streaming responses

## Project Structure

```
healthcare-entrepreneur-chatbot/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx    # Main chat component
│   │   │   ├── Message.jsx          # Individual message bubble
│   │   │   ├── StarterPrompts.jsx   # Starter question cards
│   │   │   └── LoadingIndicator.jsx # Typing indicator
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── claudeService.js    # Claude API integration
│   │   ├── routes/
│   │   │   └── chat.js             # Chat endpoint
│   │   └── server.js               # Express app
│   ├── knowledge/                   # AI knowledge base
│   │   ├── system-prompt.txt
│   │   ├── domain-knowledge.txt
│   │   ├── common-scenarios.txt
│   │   ├── case_study_library.md
│   │   ├── anti-patterns.txt
│   │   └── playbooks/
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Anthropic API key ([Get one here](https://console.anthropic.com/settings/keys))

### 1. Clone and Install

```bash
# Clone the repository
cd healthcare-entrepreneur-chatbot

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure Environment Variables

```bash
# In the backend directory
cd backend
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_actual_api_key_here
PORT=5172
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Run Locally

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5172
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

## Deployment

### Frontend Deployment (Vercel/Netlify)

**Option 1: Vercel**

```bash
cd frontend

# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# - Build Command: npm run build
# - Output Directory: dist
```

**Option 2: Netlify**

```bash
cd frontend

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod

# Follow prompts:
# - Build Command: npm run build
# - Publish Directory: dist
```

After deployment, update your backend's `ALLOWED_ORIGINS` to include your frontend URL.

### Backend Deployment

**Option 1: Railway**

1. Sign up at [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select the `backend` folder
4. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `PORT=5172`
   - `ALLOWED_ORIGINS=https://your-frontend-url.vercel.app`
5. Deploy!

**Option 2: Render**

1. Sign up at [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in the Render dashboard
6. Deploy!

**Option 3: Fly.io**

```bash
cd backend

# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login and launch
fly launch

# Set environment variables
fly secrets set ANTHROPIC_API_KEY=your_key_here
fly secrets set ALLOWED_ORIGINS=https://your-frontend-url.vercel.app

# Deploy
fly deploy
```

### Update Frontend API URL

After deploying backend, update the frontend's Vite config:

```javascript
// frontend/vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://your-backend-url.railway.app', // Update this
        changeOrigin: true,
      }
    }
  }
})
```

Or set environment variable in Vercel/Netlify:
- `VITE_API_URL=https://your-backend-url.railway.app`

Then update frontend API calls to use this URL.

## Configuration

### Message Limits

Currently set to 20 message pairs per conversation (~$0.50-1.00 per session).

To adjust, edit `frontend/src/components/ChatInterface.jsx`:

```javascript
const MAX_MESSAGE_PAIRS = 30 // Change this value
```

### Knowledge Base

The chatbot is powered by a comprehensive knowledge base located in `backend/knowledge/`:

- **system-prompt.txt**: Core frameworks (Assistant vs Agent, TRUST, 5 Attributes, $100K Rule)
- **domain-knowledge.txt**: Senior living industry expertise and context
- **common-scenarios.txt**: 20 operator scenarios with framework-based responses
- **case_study_library.md**: Real implementation examples with metrics
- **anti-patterns.txt**: 7 common AI failure patterns to avoid
- **playbooks/**: Step-by-step guides for discovery, pilots, vendor evaluation, and ROI

To update the knowledge:
1. Edit files in `backend/knowledge/`
2. Restart the backend server
3. Changes load automatically - no code changes needed

See `backend/knowledge/README.md` for detailed documentation.

### Styling

Colors are defined in `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Change primary color
    600: '#0284c7',
    // ...
  }
}
```

## API Endpoints

### `POST /api/chat`

Send messages and receive streaming responses.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Help me find my first AI opportunity" }
  ]
}
```

**Response:** Server-Sent Events (SSE) stream

```
data: {"type":"content_block_delta","delta":{"text":"I'd be"}}
data: {"type":"content_block_delta","delta":{"text":" happy to"}}
data: [DONE]
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-02T10:30:00.000Z"
}
```

## Cost Estimation

Claude Sonnet 4 Pricing:
- Input: $3 per million tokens
- Output: $15 per million tokens

With 20 message limit:
- Average cost per session: **$0.50 - $1.00**
- $3 budget ≈ **3-6 full conversations**

## Troubleshooting

### CORS Errors

Make sure:
1. Backend `ALLOWED_ORIGINS` includes your frontend URL
2. Frontend is making requests to correct backend URL

### API Key Issues

```bash
# Check if API key is set
echo $ANTHROPIC_API_KEY

# Test the key
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01"
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

- Use `npm run dev` in both frontend and backend for hot reloading
- Check browser console and server logs for errors
- Test API directly with `curl` or Postman before frontend integration

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for senior living operators implementing AI solutions.
