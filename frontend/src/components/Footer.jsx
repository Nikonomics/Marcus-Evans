import React from 'react'

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Marcus Evans 2025</h3>
            <p className="text-gray-400 mb-4">
              AI Implementation Resources for Senior Living Communities
            </p>
            <p className="text-sm text-gray-500">
              Long-Term Care & Senior Living CXO Summit
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('chatbot')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI Chatbot
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('frameworks')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Frameworks
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('case-studies')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Conference Info Column */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Conference</h4>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Event:</span> Long-Term Care & Senior Living CXO Summit
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Date:</span> December 2025
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Workshop:</span> Bringing AI to Life in Senior Living Communities
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Marcus Evans. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Built for conference attendees and senior living operators
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
