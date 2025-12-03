import React from 'react'
import { useEmailContext } from '../contexts/EmailContext'

const FrameworksSection = () => {
  const { hasAccess, requireEmail } = useEmailContext()

  const frameworks = [
    {
      title: 'AI Readiness Assessment',
      description: 'Evaluate your facility\'s readiness for AI implementation across 12 key dimensions',
      size: '2-page PDF'
    },
    {
      title: '30-Day Pilot Framework',
      description: 'Step-by-step guide to launching your first AI pilot program with measurable outcomes',
      size: '5-page PDF'
    },
    {
      title: 'ROI Calculator',
      description: 'Excel template to calculate potential time savings and cost reductions from AI',
      size: 'Excel workbook'
    },
    {
      title: 'Vendor Selection Rubric',
      description: 'Score and compare AI vendors across 15 critical criteria',
      size: '3-page PDF'
    }
  ]

  const handleDownload = (frameworkTitle) => {
    if (!hasAccess) {
      requireEmail()
    } else {
      // TODO: Implement actual download
      alert(`Downloading: ${frameworkTitle}`)
    }
  }

  return (
    <section id="frameworks" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Downloadable Frameworks & Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practical resources to guide your AI implementation journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {frameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">
                  {framework.title}
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {framework.size}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {framework.description}
              </p>
              <button
                onClick={() => handleDownload(framework.title)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                {hasAccess ? 'Download' : 'Enter Email to Download'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FrameworksSection
