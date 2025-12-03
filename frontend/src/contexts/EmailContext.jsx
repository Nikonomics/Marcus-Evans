import React, { createContext, useContext, useState, useEffect } from 'react'

const EmailContext = createContext()

export const useEmailContext = () => {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error('useEmailContext must be used within EmailContextProvider')
  }
  return context
}

export const EmailContextProvider = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userEmail, setUserEmail] = useState(null)

  // Check localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    const emailSubmitted = localStorage.getItem('emailSubmitted')

    if (emailSubmitted === 'true' && storedEmail) {
      setHasAccess(true)
      setUserEmail(storedEmail)
    }
  }, [])

  // Function to trigger email gate modal
  const requireEmail = () => {
    if (!hasAccess) {
      setShowModal(true)
    }
  }

  // Function called after successful email submission
  const grantAccess = (email) => {
    setHasAccess(true)
    setUserEmail(email)
    setShowModal(false)
    localStorage.setItem('emailSubmitted', 'true')
    localStorage.setItem('userEmail', email)
  }

  // Function to manually close modal (for "Maybe Later" button)
  const closeModal = () => {
    setShowModal(false)
  }

  const value = {
    hasAccess,
    showModal,
    userEmail,
    requireEmail,
    grantAccess,
    closeModal
  }

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  )
}
