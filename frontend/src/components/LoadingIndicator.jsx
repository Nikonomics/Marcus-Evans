import React from 'react'

const LoadingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm text-gray-500">AI is thinking...</span>
    </div>
  )
}

export default LoadingIndicator
