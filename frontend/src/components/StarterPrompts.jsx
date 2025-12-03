import React, { useState } from 'react'

const StarterPrompts = ({ onSelectPrompt }) => {
  const [customInput, setCustomInput] = useState('')

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

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (customInput.trim()) {
      onSelectPrompt(customInput.trim())
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-3 py-4">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800 mb-3 text-center">
          Choose Your Path
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {modes.map((mode, index) => (
            <button
              key={index}
              onClick={() => onSelectPrompt(mode.prompt)}
              className="p-3 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 shadow-sm hover:shadow-md group"
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl flex-shrink-0">{mode.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-primary-700 transition-colors">
                    {mode.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight">
                    {mode.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <form onSubmit={handleCustomSubmit}>
          <label htmlFor="custom-question" className="block text-center text-xs text-gray-600 mb-2">
            Or type your own question...
          </label>
          <div className="flex gap-2">
            <input
              id="custom-question"
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-4 py-2 text-sm bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Start
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StarterPrompts
