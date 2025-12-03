import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext()

export function ChatContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMessage, setInitialMessage] = useState(null)

  const openChat = (message = null) => {
    setInitialMessage(message)
    setIsOpen(true)
  }

  const closeChat = () => {
    setIsOpen(false)
    // Don't clear initialMessage immediately to allow for animations
    setTimeout(() => setInitialMessage(null), 300)
  }

  const toggleChat = () => {
    if (isOpen) {
      closeChat()
    } else {
      openChat()
    }
  }

  return (
    <ChatContext.Provider value={{ isOpen, initialMessage, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within ChatContextProvider')
  }
  return context
}
