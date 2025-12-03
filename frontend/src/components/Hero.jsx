import React from 'react'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-slate-800"
    >
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Conference Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
            Marcus Evans Conference - December 2025
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          AI Implementation Resources for Senior Living Operators
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-blue-200 mb-4">
          Long-Term Care & Senior Living CXO Summit
        </p>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
          Access the AI chatbot assistant, downloadable frameworks, case studies, and implementation tools from our session
        </p>

        {/* Workshop Attribution */}
        <p className="text-md text-gray-400 mb-10 italic">
          From the "Bringing AI to Life in Senior Living Communities" workshop
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection('chatbot')}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Start Exploring
          </button>
          <button
            onClick={() => scrollToSection('frameworks')}
            className="px-8 py-4 bg-white text-blue-900 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
          >
            Download Frameworks
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16">
          <button
            onClick={() => scrollToSection('chatbot')}
            className="text-gray-400 hover:text-white transition-colors animate-bounce"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
