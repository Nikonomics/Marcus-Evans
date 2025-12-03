import React from 'react'
import { EmailContextProvider } from './contexts/EmailContext'
import { ChatContextProvider } from './contexts/ChatContext'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ChatbotSection from './components/ChatbotSection'
import FrameworksSection from './components/FrameworksSection'
import CaseStudiesSection from './components/CaseStudiesSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import EmailGateModal from './components/EmailGateModal'
import FloatingChat from './components/FloatingChat'

function App() {
  return (
    <EmailContextProvider>
      <ChatContextProvider>
        <div className="min-h-screen">
          <Navigation />
          <Hero />
          <ChatbotSection />
          <FrameworksSection />
          <CaseStudiesSection />
          <AboutSection />
          <Footer />
          <EmailGateModal />
          <FloatingChat />
        </div>
      </ChatContextProvider>
    </EmailContextProvider>
  )
}

export default App
