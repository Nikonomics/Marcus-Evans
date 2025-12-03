import React, { useState, useRef, useEffect } from 'react'
import Message from './Message'
import LoadingIndicator from './LoadingIndicator'
import StarterPrompts from './StarterPrompts'
import { useEmailContext } from '../contexts/EmailContext'

const ChatInterface = ({ initialMessage = null, isFloating = false }) => {
  const { hasAccess, requireEmail } = useEmailContext()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasReachedLimit, setHasReachedLimit] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const MAX_MESSAGE_PAIRS = 20

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      sendMessage(initialMessage)
    }
  }, [initialMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return

    // Require email before allowing chat
    if (!hasAccess) {
      requireEmail()
      return
    }

    // Check message limit (count user messages as pairs)
    const userMessageCount = messages.filter(m => m.role === 'user').length
    if (userMessageCount >= MAX_MESSAGE_PAIRS) {
      setHasReachedLimit(true)
      return
    }

    const userMessage = { role: 'user', content: messageText.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:5172/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      // Add empty assistant message that we'll update
      setMessages([...updatedMessages, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'content_block_delta') {
                assistantMessage += parsed.delta.text
                setMessages([...updatedMessages, { role: 'assistant', content: assistantMessage }])
              }
            } catch (e) {
              console.error('Error parsing SSE:', e)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleClear = () => {
    setMessages([])
    setInput('')
    setHasReachedLimit(false)
    inputRef.current?.focus()
  }

  const handleStarterPrompt = (prompt) => {
    sendMessage(prompt)
  }

  if (messages.length === 0) {
    return (
      <div className={isFloating ? 'h-full overflow-y-auto' : ''}>
        <StarterPrompts onSelectPrompt={handleStarterPrompt} />
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${isFloating ? 'h-full' : 'h-screen'} bg-gray-50`}>
      {/* Header - Only show if not floating (floating has its own header) */}
      {!isFloating && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Marcus Evans 2025 AI Consultant</h1>
            <p className="text-xs text-gray-500">
              {messages.filter(m => m.role === 'user').length} / {MAX_MESSAGE_PAIRS} messages
            </p>
          </div>
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Chat
          </button>
        </div>
      )}

      {/* Floating mode header */}
      {isFloating && (
        <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between flex-shrink-0">
          <p className="text-xs text-gray-500">
            {messages.filter(m => m.role === 'user').length} / {MAX_MESSAGE_PAIRS} messages
          </p>
          <button
            onClick={handleClear}
            className="px-2 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className={isFloating ? '' : 'max-w-3xl mx-auto'}>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
          {hasReachedLimit && (
            <div className="text-center py-4">
              <p className="text-xs text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                You've reached the conversation limit ({MAX_MESSAGE_PAIRS} messages).
                Please clear the chat to start a new conversation.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-3 py-3 flex-shrink-0">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasReachedLimit ? "Clear chat to continue" : "Type your message..."}
              disabled={isLoading || hasReachedLimit}
              className={`flex-1 ${isFloating ? 'px-3 py-2 text-sm' : 'px-4 py-3'} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed`}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || hasReachedLimit}
              className={`${isFloating ? 'px-4 py-2 text-sm' : 'px-6 py-3'} bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
