import React, { useState } from 'react'
import ChatInterface from './ChatInterface'
import { useChatContext } from '../contexts/ChatContext'
import { useEmailContext } from '../contexts/EmailContext'

const FloatingChat = () => {
  const { isOpen, initialMessage, closeChat, openChat } = useChatContext()
  const { hasAccess, requireEmail } = useEmailContext()
  const [isMinimized, setIsMinimized] = useState(false)

  const handleOpenChat = () => {
    if (!hasAccess) {
      requireEmail()
      return
    }
    openChat()
  }

  if (!isOpen) {
    return (
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 bg-primary-600 text-white rounded-full px-6 py-4 shadow-lg hover:shadow-xl hover:bg-primary-700 transition-all duration-200 z-50 hover:scale-105 flex items-center gap-3 group"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="font-semibold text-lg">Chat</span>
        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl border-2 border-primary-500 z-50">
        <div className="flex items-center justify-between p-4 bg-primary-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="font-semibold">AI Consultant</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMinimized(false)}
              className="hover:bg-primary-700 rounded p-1 transition-colors"
              aria-label="Maximize"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button
              onClick={closeChat}
              className="hover:bg-primary-700 rounded p-1 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl border-2 border-gray-200 z-50 flex flex-col"
         style={{ width: '420px', height: '650px', maxHeight: 'calc(100vh - 100px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary-600 text-white rounded-t-lg flex-shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-semibold">AI Consultant</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="hover:bg-primary-700 rounded p-1 transition-colors"
            aria-label="Minimize"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={closeChat}
            className="hover:bg-primary-700 rounded p-1 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
        <ChatInterface initialMessage={initialMessage} isFloating={true} />
      </div>
    </div>
  )
}

export default FloatingChat
