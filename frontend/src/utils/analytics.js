// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Track an event
export const trackEvent = async (eventType, eventName, eventData = null) => {
  try {
    const sessionId = getSessionId()

    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5172'}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        eventName,
        eventData,
        sessionId
      })
    })

    // Silent fail - don't impact user experience if analytics fails
  } catch (error) {
    console.warn('Analytics tracking failed:', error)
  }
}

// Convenience functions for common events
export const analytics = {
  // Framework downloads
  trackFrameworkDownload: (frameworkName) => {
    trackEvent('framework_download', frameworkName)
  },

  // Chatbot interactions
  trackChatbotOpen: (mode = null) => {
    trackEvent('chatbot', 'open', mode ? { mode } : null)
  },

  trackChatbotMessage: () => {
    trackEvent('chatbot', 'message_sent')
  },

  trackChatbotMode: (mode) => {
    trackEvent('chatbot', 'mode_selected', { mode })
  },

  // Case study interactions
  trackCaseStudyView: (studyName) => {
    trackEvent('case_study', 'view', { studyName })
  },

  trackCaseStudyLearnMore: (studyName, url) => {
    trackEvent('case_study', 'learn_more', { studyName, url })
  },

  // Section views (when user scrolls to section)
  trackSectionView: (sectionName) => {
    trackEvent('section_view', sectionName)
  },

  // Email gate
  trackEmailSubmit: (hasNewsletterOptIn) => {
    trackEvent('email', 'submitted', { newsletterOptIn: hasNewsletterOptIn })
  },

  // Navigation
  trackNavClick: (destination) => {
    trackEvent('navigation', 'click', { destination })
  }
}

export default analytics
