import React from 'react'

const LiveBuildBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span className="text-white font-bold text-sm uppercase tracking-wide">Live Now</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Watch Us Build This Live!
          </h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            See how we're implementing AI in real-time. Follow along with our live build and learn as we create.
          </p>

          <a
            href="https://marcusevansfido.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            VIEW LIVE BUILD
          </a>
        </div>
      </div>
    </section>
  )
}

export default LiveBuildBanner
