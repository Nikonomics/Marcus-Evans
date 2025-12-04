import React from 'react'
import { useEmailContext } from '../contexts/EmailContext'
import analytics from '../utils/analytics'

const FrameworksSection = () => {
  const { hasAccess, requireEmail } = useEmailContext()

  const frameworks = [
    {
      step: 1,
      icon: '🩺',
      question: '"What\'s Wrong?"',
      title: 'Silent Killers Diagnostic',
      description: 'Identify which of the 5 Silent Killers is hurting you most: Data Disorganization, Documentation Burden, Manual Processes, Knowledge Silos, or Communication Overload',
      whatYouGet: [
        'Root-cause operational friction analysis',
        'Prioritized list of issues costing money, time, and morale',
        'Clear starting point for your AI journey'
      ],
      size: 'Word Doc',
      downloadUrl: '/frameworks/silent-killers-diagnostic.docx'
    },
    {
      step: 2,
      icon: '🔍',
      question: '"Where Do I Start?"',
      title: 'AI Opportunity Discovery System',
      description: 'Four proven methods to surface 10-20 workflow opportunities: Monday Morning Email, Friday Afternoon Audit, Spreadsheet Hero Hunt, and Complaint Log Review',
      whatYouGet: [
        'Staff-revealed pain points and high-urgency workflows',
        '10-20 concrete workflow opportunities',
        'Visibility into hidden operational pillars'
      ],
      size: 'Word Doc',
      downloadUrl: '/frameworks/opportunity-discovery-system.docx'
    },
    {
      step: 3,
      icon: '📊',
      question: '"Which Workflow Should I Pick?"',
      title: 'AI-Ready Workflow Scorecard',
      description: 'Evaluate workflows using the 5 AI-Ready Attributes: High Friction, High Frequency, High Urgency, High Annoyance, and High Predictability',
      whatYouGet: [
        'Scoring system for workflow readiness',
        'Prevents picking overly complex workflows',
        'Ensures early pilots succeed'
      ],
      size: 'Word Doc',
      downloadUrl: '/frameworks/ai-ready-scorecard.docx'
    },
    {
      step: 4,
      icon: '🤖',
      question: '"What Kind of AI Do I Need?"',
      title: 'TRUST: Assistant vs Agent Decision Tool',
      description: 'Determine whether your workflow needs an AI Assistant (advises) or AI Agent (acts) using the TRUST Framework: Time Sensitivity, Risk Tolerance, Uniformity, Staff Capacity, Training Investment',
      whatYouGet: [
        'Clear AI Assistant vs Agent decision framework',
        'Risk assessment for automation',
        'Examples of each type in senior living'
      ],
      size: 'Word Doc',
      downloadUrl: '/frameworks/trust-framework.docx'
    },
    {
      step: 5,
      icon: '🎯',
      question: '"How Do I Implement It?"',
      title: '30-Day AI Pilot Playbook',
      description: 'Step-by-step implementation guide: Week 1 (Find Your Hero), Weeks 2-3 (Document Reality), Week 4 (Pick Your Tool), Months 2-3 (Run Your Pilot)',
      whatYouGet: [
        'Week-by-week implementation timeline',
        'Metrics to track and success criteria',
        'Staff engagement strategies'
      ],
      size: 'Word Doc',
      downloadUrl: '/frameworks/30-day-pilot-playbook.docx'
    }
  ]

  const handleDownload = (framework) => {
    if (!hasAccess) {
      requireEmail()
    } else {
      // Track the download
      analytics.trackFrameworkDownload(framework.title)

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = framework.downloadUrl
      link.download = framework.downloadUrl.split('/').pop()
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleCompleteKitDownload = () => {
    if (!hasAccess) {
      requireEmail()
    } else {
      // Track the complete kit download
      analytics.trackFrameworkDownload('Complete AI Starter Kit')

      // Download the explainer PDF
      const link = document.createElement('a')
      link.href = '/frameworks/complete-kit-explainer.pdf'
      link.download = 'AI-5-Tool-System-Complete-Kit.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Optionally download all individual tools as well
      // You could create a ZIP on the backend or download them sequentially
      setTimeout(() => {
        alert('Complete Kit downloaded! The explainer guide includes links to download all 5 individual tools.')
      }, 500)
    }
  }

  return (
    <section id="frameworks" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Five-Tool AI Adoption System
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            A complete, sequential guide from "I don't know where to start" to "We ran a successful AI pilot"
          </p>
          <div className="max-w-4xl mx-auto bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <p className="text-gray-800 leading-relaxed">
              <span className="font-semibold text-blue-900">These five tools work together in sequence.</span> Each answers the next natural question operators ask when beginning their AI journey. Remove any one tool and the system breaks. Together, they give you a clear, safe, repeatable roadmap from uncertainty to execution.
            </p>
          </div>
        </div>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworks.map((framework, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => handleDownload(framework)}
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Step Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {framework.step}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {framework.size}
                  </span>
                </div>

                {/* Question Tag */}
                <div className="text-xs font-semibold text-blue-600 mb-2">
                  {framework.question}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {framework.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {framework.description}
                </p>

                {/* What You Get */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">What You Get:</h4>
                  <ul className="space-y-1.5">
                    {framework.whatYouGet.map((item, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start">
                        <svg className="w-3.5 h-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Hint */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Tool
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sequential Flow Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full">
            <span className="text-sm font-medium text-blue-900">Sequential System:</span>
            <div className="flex items-center gap-1">
              {frameworks.map((f, idx) => (
                <React.Fragment key={idx}>
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {f.step}
                  </span>
                  {idx < frameworks.length - 1 && (
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">
              Get the Complete AI Starter Kit
            </h3>
            <p className="text-blue-100 mb-6">
              Download all five tools plus the system explainer guide to start your AI journey today
            </p>
            <button
              onClick={handleCompleteKitDownload}
              className="bg-white text-blue-600 py-3 px-8 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              {hasAccess ? 'Download Complete Kit' : 'Enter Email to Download Complete Kit'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FrameworksSection
