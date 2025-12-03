# Marcus Evans 2025 - Development Guide

Quick reference for continuing development.

## 🏃 Quick Start

### Backend (Working ✅)
```bash
cd /Users/nikolashulewsky/snfalyze-local/marcusevans2025/backend
npm install
npm run dev
# Server runs on http://localhost:5172
```

### Frontend (Needs Rebuild 🚧)
```bash
cd /Users/nikolashulewsky/snfalyze-local/marcusevans2025/frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

## 📂 Project Structure

```
marcusevans2025/
├── backend/              ✅ Complete - Don't touch
│   ├── src/
│   │   ├── database/    # Email storage (SQLite)
│   │   ├── services/    # Email & Claude services
│   │   ├── routes/      # Chat & Email APIs
│   │   └── server.js
│   ├── knowledge/       # AI frameworks (reused)
│   └── data/            # emails.db (auto-created)
│
├── frontend/             🚧 Needs Complete Rebuild
│   ├── src/
│   │   ├── components/  # Need 11 new components
│   │   ├── contexts/    # Need EmailContext
│   │   ├── data/        # Need case studies
│   │   └── App.jsx      # Need major rewrite
│   └── public/
│       ├── pdfs/        # Framework downloads (empty)
│       └── images/      # Case study screenshots (empty)
│
└── PROJECT_STATUS.md    📋 Read this first!
```

## 🎯 Development Priority Order

### Phase 1: Email Gate (2-3 hours)
1. Create `EmailContext.jsx` - Global email state
2. Create `EmailGateModal.jsx` - Modal component
3. Test email submission flow

### Phase 2: Landing Page (4-5 hours)
4. Rewrite `App.jsx` - Multi-section layout
5. Create `Navigation.jsx` - Sticky nav
6. Create `Hero.jsx` - Conference branding
7. Create `Footer.jsx` - Footer section

### Phase 3: Content Sections (6-8 hours)
8. Create `ChatbotSection.jsx` - Wrap existing chat
9. Create `FrameworksSection.jsx` - Downloads grid
10. Create `AboutSection.jsx` - Bio and contact

### Phase 4: Case Studies (4-5 hours)
11. Create `caseStudies.js` - Data file
12. Create `CaseStudiesSection.jsx` - Grid with filters
13. Create `CaseStudyCard.jsx` - Expandable cards

### Phase 5: Polish (3-4 hours)
14. Update styling - Conference aesthetic
15. Mobile responsiveness
16. Performance optimization
17. Final testing

**Total Estimated Time**: 20-25 hours

## 🔌 API Endpoints (All Working)

### Chat
```javascript
POST /api/chat
Body: { messages: [{ role, content }] }
Response: Server-Sent Events (streaming)
```

### Email Collection
```javascript
POST /api/email/submit
Body: { email: string, newsletterOptIn: boolean }
Response: { success: true, message: string }
```

### Email Check
```javascript
POST /api/email/check
Body: { email: string }
Response: { exists: boolean }
```

### Admin Endpoints
```javascript
GET /api/email/stats
Response: { total, newsletter, percentage }

GET /api/email/export
Response: CSV file download
```

## 🎨 Design Tokens

### Conference Color Scheme
```javascript
// tailwind.config.js
colors: {
  conference: {
    navy: '#1a202c',      // Headers
    blue: '#2c5282',      // Primary
    lightBlue: '#4299e1', // Accent
    gray: '#4a5568',      // Text
    lightGray: '#e2e8f0', // Background
  }
}
```

### Typography
- Headlines: `font-bold text-4xl md:text-6xl`
- Subheadings: `font-semibold text-2xl md:text-3xl`
- Body: `text-base md:text-lg text-gray-700`

### Spacing
- Section padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4`

## 📝 Component Templates

### Basic Section Component
```jsx
const SectionName = () => {
  return (
    <section id="section-name" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Section Title
        </h2>
        {/* Content */}
      </div>
    </section>
  )
}

export default SectionName
```

### Email Gate Pattern
```jsx
import { useEmailContext } from '../contexts/EmailContext'

const GatedComponent = () => {
  const { hasAccess, requireEmail } = useEmailContext()

  const handleAction = () => {
    if (!hasAccess) {
      requireEmail()
      return
    }
    // Proceed with action
  }

  return <button onClick={handleAction}>Download</button>
}
```

## 🧪 Testing Checklist

### Backend Tests
- [ ] Email submission stores in database
- [ ] Duplicate emails handled gracefully
- [ ] Newsletter opt-in recorded correctly
- [ ] Export CSV works
- [ ] Chatbot still responds (reused from Healthcare Entrepreneur)

### Frontend Tests (After Rebuild)
- [ ] Email modal appears when accessing gated resources
- [ ] Email modal doesn't appear after submission
- [ ] Email stored in localStorage
- [ ] Newsletter checkbox works
- [ ] All sections scroll smoothly
- [ ] Navigation highlights current section
- [ ] Framework downloads trigger email gate
- [ ] Case studies expand/collapse
- [ ] Mobile responsive on all screen sizes

## 🚀 Deployment (Future)

### Prerequisites
- Vercel account
- Domain: marcusevans2025.com
- Anthropic API key

### Steps
1. Push to GitHub
2. Connect Vercel to repo
3. Configure environment variables in Vercel:
   - `ANTHROPIC_API_KEY`
   - `ALLOWED_ORIGINS`
4. Deploy frontend (static)
5. Deploy backend (serverless functions or separate)
6. Connect custom domain
7. Test production

## 💾 Database Management

### Location
```
/Users/nikolashulewsky/snfalyze-local/marcusevans2025/backend/data/emails.db
```

### View Emails
```bash
# Using SQLite CLI
sqlite3 backend/data/emails.db "SELECT * FROM emails ORDER BY created_at DESC;"
```

### Export to CSV
```bash
curl http://localhost:5172/api/email/export > emails.csv
```

### Backup
```bash
cp backend/data/emails.db backend/data/emails-backup-$(date +%Y%m%d).db
```

## 🐛 Common Issues

### "better-sqlite3" installation fails
```bash
# Make sure you have build tools installed
npm install --build-from-source
```

### Database permission errors
```bash
# Ensure data directory has write permissions
chmod 755 backend/data
```

### CORS errors
```bash
# Check ALLOWED_ORIGINS in backend/.env
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend not updating
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite
npm run dev
```

## 📚 Reference Docs

- **PROJECT_STATUS.md** - Detailed roadmap and requirements
- **KNOWLEDGE_INTEGRATION.md** - AI knowledge base docs
- **README.md** - Setup and deployment
- **QUICKSTART.md** - 5-minute setup guide

## 🎯 Current Focus

**Next Steps**: Build EmailGateModal and EmailContext

**Blocked On**: Nothing - ready to continue development

**Last Updated**: December 2, 2024
