import React, { useState } from 'react'
import { useEmailContext } from '../contexts/EmailContext'

const EmailGateModal = () => {
  const { showModal, grantAccess, closeModal } = useEmailContext()
  const [email, setEmail] = useState('')
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!showModal) return null

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:5172/api/email/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          newsletterOptIn
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Show success state
        setShowSuccess(true)

        // Wait 2 seconds, then grant access and close modal
        setTimeout(() => {
          grantAccess(email.trim())
          setShowSuccess(false)
          setEmail('')
          setNewsletterOptIn(true)
        }, 2000)
      } else {
        setError(data.message || 'Failed to submit email. Please try again.')
        setIsSubmitting(false)
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  const handleMaybeLater = () => {
    closeModal()
    setEmail('')
    setNewsletterOptIn(true)
    setError('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        {showSuccess ? (
          // Success State
          <div className="text-center py-8">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome!
            </h3>
            <p className="text-gray-600">
              You now have access to all conference resources
            </p>
          </div>
        ) : (
          // Email Form
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Access Conference Resources
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email to unlock the AI consultant, frameworks, and case studies
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="your.email@company.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterOptIn}
                    onChange={(e) => setNewsletterOptIn(e.target.checked)}
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm text-gray-700">
                    Subscribe to weekly AI & senior living insights
                  </span>
                </label>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleMaybeLater}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Maybe Later
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              We respect your privacy. Your email will only be used for conference updates.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default EmailGateModal
