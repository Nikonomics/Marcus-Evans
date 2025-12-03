# Case Study Images & Videos Guide

## 📁 Folder Structure

```
/public/images/case-studies/
├── glide/
├── contract-management/
├── readyshift/
├── billing-automation/
├── snfalyze/
├── snfadvocate/
├── pacadvocate/
├── pcc-automation/
├── snf-pulse/
├── alf-chatbot/
└── medicaid-chatbot/
```

## 📸 How to Add Screenshots

### Step 1: Take Screenshots
- Capture high-quality screenshots of each project (PNG or JPG)
- Recommended size: 1200x800px or larger
- Use descriptive filenames like `dashboard.png`, `workflow.png`, `results.png`

### Step 2: Save to Project Folder
Drop your screenshots into the appropriate folder:

```
/public/images/case-studies/glide/
├── screenshot-1.png
├── screenshot-2.png
└── screenshot-3.png
```

### Step 3: Update CaseStudiesSection.jsx

Find the project in `/src/components/CaseStudiesSection.jsx` and add your image paths:

```javascript
{
  title: 'Glide: Admissions Documentation Revolution',
  // ...other fields
  images: [
    '/images/case-studies/glide/screenshot-1.png',
    '/images/case-studies/glide/screenshot-2.png',
    '/images/case-studies/glide/screenshot-3.png'
  ],
  videoUrl: ''
}
```

**Note:** Paths start with `/images/` (not `/public/images/`)

## 🎥 How to Add Videos

### Option 1: Loom (Recommended)
1. Record your screen demo with Loom
2. Click "Share" → Get embed URL
3. Copy the embed URL (looks like: `https://www.loom.com/embed/abc123...`)
4. Add to `videoUrl` field in CaseStudiesSection.jsx

### Option 2: YouTube
1. Upload video to YouTube
2. Click "Share" → "Embed"
3. Copy the embed URL (looks like: `https://www.youtube.com/embed/abc123`)
4. Add to `videoUrl` field

### Example:

```javascript
{
  title: 'Glide: Admissions Documentation Revolution',
  // ...other fields
  images: ['/images/case-studies/glide/screenshot-1.png'],
  videoUrl: 'https://www.loom.com/embed/abc123...'
}
```

## 🎨 Display Features

### Image Gallery
- Shows 1-3 screenshots per project (grid layout)
- Click any image to enlarge (lightbox view)
- Hover effects with zoom icon
- Responsive: adapts to mobile/tablet/desktop

### Video Embed
- 16:9 aspect ratio player
- Fullscreen support
- Auto-responsive

## 💡 Best Practices

1. **Image Quality**
   - Use high-resolution screenshots (min 1200px width)
   - Compress to reduce file size (use TinyPNG or similar)
   - Keep under 500KB per image

2. **What to Screenshot**
   - Main dashboard/interface
   - Key features in action
   - Results/metrics visualization
   - Before/after comparisons

3. **Video Length**
   - Keep under 3 minutes
   - Show the "wow" moments
   - Include narration explaining the value

4. **Naming Convention**
   - `dashboard.png` - Main interface
   - `workflow.png` - Process flow
   - `results.png` - Metrics/outcomes
   - `feature-X.png` - Specific features

## 📊 Example: Complete Glide Case Study

```javascript
{
  title: 'Glide: Admissions Documentation Revolution',
  facility: 'Multi-facility SNF operator',
  challenge: '...',
  solution: '...',
  results: [...],
  timeline: '30-day implementation',
  images: [
    '/images/case-studies/glide/dashboard.png',
    '/images/case-studies/glide/coding-interface.png',
    '/images/case-studies/glide/time-savings.png'
  ],
  videoUrl: 'https://www.loom.com/embed/abc123...'
}
```

## 🚀 Testing

After adding images/videos:
1. Save the file
2. Refresh http://localhost:5174
3. Scroll to Case Studies section
4. Expand the project card
5. Verify images and video load correctly

## 🔧 Troubleshooting

**Images not showing?**
- Check file path starts with `/images/` (not `/public/images/`)
- Verify file exists in the correct folder
- Check browser console for 404 errors
- Make sure filenames match exactly (case-sensitive)

**Video not playing?**
- Use embed URL (not regular video page URL)
- For Loom: should start with `https://www.loom.com/embed/`
- For YouTube: should start with `https://www.youtube.com/embed/`
- Check browser console for errors

---

## 📝 Quick Reference

| Project | Folder Name |
|---------|-------------|
| Glide | `glide/` |
| Contract Management | `contract-management/` |
| ReadyShift | `readyshift/` |
| Part B Billing | `billing-automation/` |
| SNFalyze | `snfalyze/` |
| SNFadvocate | `snfadvocate/` |
| PACadvocate | `pacadvocate/` |
| PCC Automation | `pcc-automation/` |
| SNF Pulse | `snf-pulse/` |
| ALF Reg Chatbot | `alf-chatbot/` |
| Medicaid Chatbot | `medicaid-chatbot/` |

---

**Need help?** Check the CaseStudiesSection.jsx file for examples or contact the dev team.
