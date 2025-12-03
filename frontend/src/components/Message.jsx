import React from 'react'
import ReactMarkdown from 'react-markdown'

const Message = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-primary-600 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="text-sm prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-li:my-0">
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
              em: ({node, ...props}) => <em className="italic" {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default Message
