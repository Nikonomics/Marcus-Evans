import React from 'react'

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About This Workshop
          </h2>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              "Bringing AI to Life in Senior Living Communities"
            </h3>
            <p className="text-gray-700">
              Presented at the Marcus Evans Long-Term Care & Senior Living CXO Summit
            </p>
            <p className="text-sm text-gray-600 mt-2">December 2025</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Workshop Overview</h3>
            <p className="text-gray-700 mb-4">
              This comprehensive workshop provides senior living operators with practical frameworks,
              tools, and guidance for successfully implementing AI in their facilities. From identifying
              your first AI opportunity to scaling successful pilots, we cover the complete implementation journey.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>How to identify high-impact AI opportunities in your facility</li>
              <li>The 5 Attributes Framework for evaluating AI readiness</li>
              <li>Choosing between AI Assistants vs. Agents for different workflows</li>
              <li>Designing and executing a 30-day pilot program</li>
              <li>Measuring ROI and building the business case for AI</li>
              <li>Change management strategies for successful adoption</li>
              <li>Vendor selection criteria and due diligence</li>
              <li>Compliance, privacy, and regulatory considerations</li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Resources Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">AI Chatbot Consultant</h4>
                <p className="text-sm text-gray-600">
                  Interactive assistant trained on senior living AI implementation
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Downloadable Frameworks</h4>
                <p className="text-sm text-gray-600">
                  Ready-to-use templates and assessment tools
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Case Studies</h4>
                <p className="text-sm text-gray-600">
                  Real examples from successful implementations
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">Implementation Playbooks</h4>
                <p className="text-sm text-gray-600">
                  Step-by-step guides for common AI use cases
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">About Marcus Evans</h3>
            <p className="text-gray-700">
              Marcus Evans is a leading producer of business conferences and events, bringing together
              senior executives from around the world to share insights, network, and learn about the
              latest industry trends and innovations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
