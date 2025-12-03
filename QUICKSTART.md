# Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Anthropic API key ([Get one here](https://console.anthropic.com/settings/keys))

## Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Configure API Key

```bash
# In backend directory
cd backend
cp .env.example .env
```

Edit `backend/.env` and add your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open Browser

Visit: `http://localhost:5173`

## Test It Out

Try these starter prompts:
- "Help me find my first AI opportunity"
- "Should I use an AI Assistant or Agent for prior authorizations?"
- "Score my workflow using the 5 Attributes"

## Troubleshooting

**"API key not set" error:**
- Make sure you created `.env` file in `backend/` directory
- Check that your API key is valid

**CORS errors:**
- Ensure both frontend (5173) and backend (5172) are running
- Check that ports aren't already in use

**Can't install dependencies:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read the full [README.md](./README.md) for deployment instructions
- Customize the system prompt in `backend/src/services/claudeService.js`
- Modify colors in `frontend/tailwind.config.js`

---

Need help? Check the [README.md](./README.md) for detailed documentation.
