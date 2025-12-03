# Marcus Evans 2025 - Project Status & Roadmap

**Last Updated**: December 2, 2024
**Project**: Marcus Evans 2025 AI Implementation Resources
**Presentation**: "Bringing AI to Life in Senior Living Communities"

---

## ✅ COMPLETED (Backend - 100%)

### Database System
- ✅ **SQLite database** configured with `better-sqlite3`
- ✅ **Email storage table** created with schema:
  - `id` (primary key)
  - `email` (unique, indexed)
  - `newsletter_opt_in` (boolean)
  - `created_at` (timestamp)
  - `ip_address` (for analytics)
  - `user_agent` (for analytics)
- ✅ **Database initialization** script: `backend/src/database/init.js`
- ✅ **Data directory** auto-created at `backend/data/emails.db`

### Email Services
- ✅ **Email service** module: `backend/src/services/emailService.js`
  - `saveEmail()` - Store email with newsletter preference
  - `emailExists()` - Check if email already registered
  - `getEmailStats()` - Admin statistics (total, newsletter %)
  - `exportEmails()` - CSV export for marketing

### API Endpoints
- ✅ **Email routes** created: `backend/src/routes/email.js`
  - `POST /api/email/submit` - Submit email with opt-in
  - `POST /api/email/check` - Check email existence
  - `GET /api/email/stats` - Statistics dashboard
  - `GET /api/email/export` - CSV download
- ✅ **Validation** - Email format validation
- ✅ **Error handling** - Duplicate email handling
- ✅ **Security** - IP and user-agent logging

### Server Configuration
- ✅ **Server updated** with email routes
- ✅ **Database auto-init** on server startup
- ✅ **CORS configured** for frontend
- ✅ **Package.json** updated with `better-sqlite3` dependency

### Existing AI Chatbot (From Healthcare Entrepreneur)
- ✅ **Claude Sonnet 4 integration** - Streaming responses
- ✅ **Knowledge base** - All frameworks, playbooks, case studies loaded
- ✅ **Chat API** - `POST /api/chat` endpoint working
- ✅ **System prompt** - Full consultant persona with frameworks

---

## 🚧 IN PROGRESS (Frontend - 0%)

**Current State**: Frontend still shows "The Healthcare Entrepreneur" branding and simple chat interface. Needs complete transformation into multi-section conference website.

---

## 📋 REMAINING WORK - Frontend Transformation

### Phase 1: Core Infrastructure (HIGH PRIORITY)

#### 1.1 Email Gate Modal Component
**File**: `frontend/src/components/EmailGateModal.jsx`

**Requirements**:
- Modal overlay (dark background, centered modal)
- Form fields:
  - Email input (with validation)
  - Checkbox: "Subscribe to weekly AI & senior living insights"
- Submit button (calls `/api/email/submit`)
- Success state (shows checkmark, closes after 2 seconds)
- Error handling (invalid email, network errors)
- Stores email in localStorage after submission (to avoid re-prompting)
- Closes automatically after successful submission

**State Management**:
- Need global state to track if user has submitted email
- Use React Context or simple localStorage check
- Check on mount: `const hasSubmittedEmail = localStorage.getItem('emailSubmitted')`

**UI Design**:
```
┌─────────────────────────────────────┐
│  Access Conference Resources        │
│                                     │
│  Email: [_________________]         │
│                                     │
│  ☐ Subscribe to weekly insights    │
│                                     │
│  [Submit] [Maybe Later]             │
└─────────────────────────────────────┘
```

#### 1.2 Email Gate Context Provider
**File**: `frontend/src/contexts/EmailContext.jsx`

**Purpose**:
- Track email submission status across app
- Provide `hasAccess` boolean to all components
- Provide `requireEmail()` function to trigger modal

**Example**:
```javascript
const { hasAccess, requireEmail } = useEmailContext()

const handleDownload = () => {
  if (!hasAccess) {
    requireEmail() // Shows modal
  } else {
    // Download PDF
  }
}
```

---

### Phase 2: Landing Page Structure (HIGH PRIORITY)

#### 2.1 New App Layout
**File**: `frontend/src/App.jsx` (major rewrite)

**Structure**:
```jsx
<EmailContextProvider>
  <Navigation />
  <Hero />
  <ChatbotSection />
  <FrameworksSection />
  <CaseStudiesSection />
  <AboutSection />
  <Footer />
  <EmailGateModal />
</EmailContextProvider>
```

#### 2.2 Navigation Component
**File**: `frontend/src/components/Navigation.jsx`

**Requirements**:
- Sticky header (dark background)
- Logo/Title: "Marcus Evans 2025"
- Nav links: Home | Chatbot | Frameworks | Case Studies | About
- Smooth scroll to sections
- Mobile hamburger menu

**Design**:
- Dark navy background (#1a202c or similar)
- White text
- Transparent on scroll to top, solid on scroll down
- Marcus Evans professional aesthetic

#### 2.3 Hero Section
**File**: `frontend/src/components/Hero.jsx`

**Requirements**:
- Full-width hero with gradient background
- Conference branding
- Title: "AI Implementation Resources for Senior Living Operators"
- Subtitle: "Marcus Evans Long-Term Care & Senior Living CXO Summit | December 2025"
- Description: "Access the AI chatbot assistant, downloadable frameworks, case studies, and implementation tools from our session"
- Presenter name: "From the 'Bringing AI to Life in Senior Living Communities' workshop"
- Primary CTA button: "Start Exploring" (scrolls to chatbot)
- Secondary CTA: "Download Frameworks" (scrolls to frameworks)

**Design**:
- Professional gradient (blue to dark blue)
- Large, bold typography
- Conference-quality visuals
- Mobile-responsive (stack on mobile)

---

### Phase 3: Chatbot Section (MEDIUM PRIORITY - Minor Updates)

#### 3.1 Chatbot Section Wrapper
**File**: `frontend/src/components/ChatbotSection.jsx`

**Requirements**:
- Section container with padding
- Title: "AI Implementation Assistant"
- Description: "Get personalized guidance on implementing AI in your facility"
- Embed existing `<ChatInterface />` component
- Email gate: Check if user has access before showing chat
  - If no access: Show teaser + "Enter Email to Access" button
  - If has access: Show full chat interface

#### 3.2 Update ChatInterface
**File**: `frontend/src/components/ChatInterface.jsx` (minor updates)

**Changes Needed**:
- Update title from "The Healthcare Entrepreneur" to "AI Implementation Assistant"
- Keep all existing functionality (already works!)
- Ensure it's wrapped in email gate check

#### 3.3 Update StarterPrompts
**File**: `frontend/src/components/StarterPrompts.jsx` (minor updates)

**Changes**:
- Update header text to conference context
- Starter prompts already correct (no changes needed!)

---

### Phase 4: Frameworks Section (HIGH PRIORITY - Email Gated)

#### 4.1 Frameworks Section Component
**File**: `frontend/src/components/FrameworksSection.jsx`

**Requirements**:
- Grid of downloadable framework cards (3 columns desktop, 1 mobile)
- Each framework card shows:
  - PDF icon
  - Framework title
  - Brief description (1-2 sentences)
  - "Download PDF" button
- Email gate on click: If no email submitted, show modal

**Frameworks to Include**:
1. **TRUST Framework Guide** - "Decide between AI Assistants and Agents using our 5-dimension analysis"
2. **5 Attributes Worksheet** - "Score your workflows to identify AI-ready opportunities"
3. **AI Opportunity Discovery Worksheet** - "Use the 4-Touch Discovery Method to find your first pilot"
4. **30-Day Pilot Plan Template** - "Step-by-step guide for running a controlled AI pilot"
5. **Vendor Evaluation Checklist** - "Red flags, green flags, and questions to ask AI vendors"
6. **Friday Afternoon Test Guide** - "Walk your building at 3 PM Friday to find AI opportunities"
7. **ROI Calculator Template** - "Calculate the business case for your AI investment"
8. **Spreadsheet Heroes Guide** - "Find and shadow your Excel power users"

**File Structure**:
```
frontend/public/pdfs/
├── trust-framework.pdf
├── 5-attributes-worksheet.pdf
├── discovery-worksheet.pdf
├── 30-day-pilot.pdf
├── vendor-evaluation.pdf
├── friday-afternoon-test.pdf
├── roi-calculator.pdf
└── spreadsheet-heroes.pdf
```

**Note**: You'll create these PDFs later. For now, use placeholder download buttons.

#### 4.2 Framework Card Component
**File**: `frontend/src/components/FrameworkCard.jsx`

**Props**: `{ title, description, filename, icon }`

**Behavior**:
- On click: Check email access
- If no access: Trigger email modal
- If has access: Download PDF from `/pdfs/{filename}`

---

### Phase 5: Case Studies Section (HIGH PRIORITY)

#### 5.1 Case Studies Section Component
**File**: `frontend/src/components/CaseStudiesSection.jsx`

**Requirements**:
- Section title: "AI Implementation Case Studies"
- Filter buttons: All | By Department | By Silent Killer | By Type
- Grid of case study cards (3 columns desktop, 1 mobile)
- Each card expands inline on click

#### 5.2 Case Study Data
**File**: `frontend/src/data/caseStudies.js`

**Structure**:
```javascript
export const caseStudies = [
  {
    id: 'glide',
    title: 'Glide: 72 Hours → 2 Hours',
    category: 'Documentation',
    department: 'Clinical',
    type: 'Assistant',
    problem: 'Prior auth narratives taking 45 minutes per admission',
    solution: 'AI reads clinical records and drafts narratives',
    results: '72 hours of work per week reduced to 2 hours',
    metrics: {
      timeSaved: '70 hours/week',
      roi: '$180K annually',
      implementation: '30 days'
    },
    screenshot: '/images/case-studies/glide-placeholder.png',
    website: 'https://glidehealth.com',
    expandedContent: `
      [Full case study details - you'll provide this]
    `
  },
  // ... 10 more case studies
]
```

**Note**: You'll need to populate full content, screenshots, and websites. For now, placeholders are fine.

#### 5.3 Case Study Card Component
**File**: `frontend/src/components/CaseStudyCard.jsx`

**States**:
- Collapsed: Shows title, problem, key metric, "Read More"
- Expanded: Shows full case study with screenshot, metrics, website link

**Design**:
- Card with hover effect
- Expand animation (smooth height transition)
- Professional styling

---

### Phase 6: About & Contact (MEDIUM PRIORITY)

#### 6.1 About Section
**File**: `frontend/src/components/AboutSection.jsx`

**Requirements**:
- Section title: "About the Presenter"
- Your photo (placeholder for now)
- Bio paragraph
- Contact form:
  - Name (required)
  - Email (required)
  - Facility Name (optional)
  - Message (optional)
  - Submit button
- LinkedIn profile link

**Contact Form**:
- On submit: Send to `/api/email/submit` with additional fields
- Show success message
- No external email service needed yet (just store in database)

#### 6.2 Footer Component
**File**: `frontend/src/components/Footer.jsx`

**Requirements**:
- "Resources from the Marcus Evans 2025 AI Implementation Workshop"
- Conference info (if allowed)
- Privacy note: "Conversations are not stored. All interactions are private."
- Contact information
- Copyright

---

### Phase 7: Styling & Polish (MEDIUM PRIORITY)

#### 7.1 Update Tailwind Config
**File**: `frontend/tailwind.config.js`

**Conference Color Scheme** (inspired by Marcus Evans):
```javascript
colors: {
  conference: {
    navy: '#1a202c',      // Dark navy for headers
    blue: '#2c5282',      // Professional blue
    lightBlue: '#4299e1', // Accent blue
    gray: '#4a5568',      // Text gray
    lightGray: '#e2e8f0', // Background gray
  }
}
```

#### 7.2 Global Styles
**File**: `frontend/src/index.css`

**Requirements**:
- Professional typography (Inter or similar)
- Smooth scrolling between sections
- Section padding consistency
- Mobile responsiveness throughout

---

## 📦 File Structure Summary

**New Files to Create** (17 files):

```
frontend/src/
├── contexts/
│   └── EmailContext.jsx           # NEW - Email gate state
├── components/
│   ├── EmailGateModal.jsx         # NEW - Email collection modal
│   ├── Navigation.jsx             # NEW - Sticky nav
│   ├── Hero.jsx                   # NEW - Conference hero
│   ├── ChatbotSection.jsx         # NEW - Chatbot wrapper
│   ├── FrameworksSection.jsx      # NEW - Frameworks grid
│   ├── FrameworkCard.jsx          # NEW - Individual framework
│   ├── CaseStudiesSection.jsx     # NEW - Case studies grid
│   ├── CaseStudyCard.jsx          # NEW - Individual case study
│   ├── AboutSection.jsx           # NEW - About/contact
│   └── Footer.jsx                 # NEW - Footer
├── data/
│   └── caseStudies.js             # NEW - Case study content
└── App.jsx                        # MAJOR REWRITE

frontend/public/
├── pdfs/                          # NEW FOLDER - Framework PDFs
│   └── (8 placeholder PDFs)
└── images/
    └── case-studies/              # NEW FOLDER - Screenshots
        └── (11 placeholder images)
```

**Files to Update** (3 files):
- `frontend/src/components/ChatInterface.jsx` - Minor branding updates
- `frontend/src/components/StarterPrompts.jsx` - Minor text updates
- `frontend/tailwind.config.js` - Add conference colors

---

## 🧪 Testing Current State

### Backend Testing

1. **Install dependencies**:
```bash
cd /Users/nikolashulewsky/snfalyze-local/marcusevans2025/backend
npm install
```

2. **Start backend**:
```bash
npm run dev
```

3. **Test email submission** (using curl or Postman):
```bash
curl -X POST http://localhost:5172/api/email/submit \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","newsletterOptIn":true}'
```

Expected response:
```json
{
  "success": true,
  "message": "Email registered successfully",
  "newsletterOptIn": true
}
```

4. **Check database**:
```bash
# Database location:
ls -la /Users/nikolashulewsky/snfalyze-local/marcusevans2025/backend/data/emails.db
```

5. **Test export** (admin endpoint):
```bash
curl http://localhost:5172/api/email/export > emails.csv
```

6. **Test chatbot** (still works):
```bash
curl -X POST http://localhost:5172/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Help me find my first AI opportunity"}]}'
```

### Frontend Testing

**Current state**: Frontend still shows old Healthcare Entrepreneur branding. Will need full rebuild.

```bash
cd /Users/nikolashulewsky/snfalyze-local/marcusevans2025/frontend
npm install
npm run dev
```

Visit: http://localhost:5173

**Expected**: Old chatbot interface (needs transformation)

---

## 🚀 Next Steps - Recommended Order

### Immediate (This Week):

1. **Test backend** - Verify email storage works
2. **Create EmailGateModal** - Core gating functionality
3. **Create EmailContext** - State management
4. **Update App.jsx** - New multi-section layout
5. **Create Hero** - Conference branding

### Short-term (Next Week):

6. **Create Navigation** - Sticky nav with smooth scroll
7. **Create ChatbotSection** - Wrap existing chat with gate
8. **Create FrameworksSection** - With email gate
9. **Style everything** - Marcus Evans aesthetic

### Medium-term (Following Week):

10. **Create case studies data** - Full content for 11 case studies
11. **Create CaseStudiesSection** - With expand/collapse
12. **Create AboutSection** - Your bio and contact
13. **Add screenshots** - For case studies
14. **Create framework PDFs** - From existing playbook content

### Before Launch:

15. **Test all email gates** - Ensure seamless flow
16. **Mobile optimization** - Test on all screen sizes
17. **Performance** - Lazy loading, image optimization
18. **Deploy to Vercel** - Frontend and backend
19. **Connect domain** - marcusevans2025.com
20. **Final QA** - End-to-end testing

---

## 📊 Progress Tracking

**Overall Completion**: 30%

- ✅ Backend: 100% (Database, API, Email storage)
- 🚧 Frontend: 0% (Needs full rebuild)

**Estimated Remaining Work**: 20-30 hours of development

---

## 💡 Key Decisions Made

1. ✅ **Reuse existing backend** - Healthcare Entrepreneur chatbot backend is perfect
2. ✅ **SQLite for emails** - Simple, no external dependencies
3. ✅ **Email gate** - Required for resource access
4. ✅ **Newsletter opt-in** - Checkbox, not required
5. ✅ **No Calendly** - Will add later if needed
6. ✅ **Case studies expand inline** - No separate pages
7. ✅ **Placeholder content** - PDFs and screenshots added later

---

## 📝 Notes for Development

- Keep existing `backend/knowledge/` directory - it's perfect as-is
- Reuse `ChatInterface.jsx`, `Message.jsx`, `LoadingIndicator.jsx` - minor updates only
- Focus on email gate UX - should feel natural, not annoying
- Marcus Evans aesthetic: Professional, corporate, high-credibility
- Mobile-first approach for all new components
- Test email flow frequently - critical user path

---

**Questions?** Review this document before starting each development session.
**Blocked?** Check PROJECT_STATUS.md for current state and next steps.
