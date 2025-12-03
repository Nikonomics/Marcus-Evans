import React from 'react'
import { useEmailContext } from '../contexts/EmailContext'
import { useChatContext } from '../contexts/ChatContext'

const ChatbotSection = () => {
  const { hasAccess, requireEmail } = useEmailContext()
  const { openChat } = useChatContext()

  const modes = [
    {
      emoji: '🔍',
      name: 'DISCOVER',
      description: 'Find AI opportunities I\'m not seeing',
      prompt: 'Help me find AI opportunities in my facility'
    },
    {
      emoji: '✅',
      name: 'EVALUATE',
      description: 'Check if a specific workflow is AI-ready',
      prompt: 'I have a specific workflow I want to evaluate for AI'
    },
    {
      emoji: '⚖️',
      name: 'DECIDE',
      description: 'Figure out if I need an Assistant or Agent',
      prompt: 'Help me decide if I need an AI Assistant or Agent'
    },
    {
      emoji: '📋',
      name: 'PLAN',
      description: 'Build my 30-day pilot plan',
      prompt: 'I\'m ready to build my 30-day pilot plan'
    },
    {
      emoji: '📚',
      name: 'LEARN',
      description: 'See real examples of AI in senior living',
      prompt: 'Show me examples of AI working in senior living'
    }
  ]

  const handleModeClick = (prompt) => {
    if (!hasAccess) {
      requireEmail()
      return
    }
    openChat(prompt)
  }

  return (
    <section id="chatbot" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI Implementation Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Get personalized guidance on implementing AI in your facility.
          </p>
          <p className="text-lg text-gray-500">
            Choose your path below to start a conversation
          </p>
        </div>

        {/* Mode Cards */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Choose Your Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modes.map((mode, index) => (
              <button
                key={index}
                onClick={() => handleModeClick(mode.prompt)}
                className="p-6 text-left bg-white rounded-lg shadow-md hover:shadow-xl hover:bg-primary-50 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">{mode.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-primary-700 transition-colors">
                      {mode.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {mode.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChatbotSection
