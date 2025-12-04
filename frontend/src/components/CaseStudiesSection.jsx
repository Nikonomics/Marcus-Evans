import React from 'react'
import analytics from '../utils/analytics'

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'Glide: Admissions Documentation Revolution',
      facility: 'Multi-facility SNF operator',
      challenge: 'Admissions coordinators spending 72 hours per week on manual documentation and coding, leading to delayed admissions and staff burnout',
      keyResult: '97% time reduction: 72 hours → 2 hours per week',
      timeline: '30-day implementation',
      image: '/images/case-studies/glide/screenshot.png',
      websiteUrl: 'https://www.glideltc.com/'
    },
    {
      title: 'Contract Management System',
      facility: 'Large multi-state senior living operator',
      challenge: 'Over 13,000 vendor contracts scattered across facilities with no centralized visibility into terms, pricing, or renewal dates',
      keyResult: '$2.3M+ in financial clarity and cost savings identified',
      timeline: '90-day rollout',
      image: '/images/case-studies/contract-management/screenshot.png',
      websiteUrl: 'https://contractiq.us/'
    },
    {
      title: 'ReadyShift: Direct Staffing Marketplace',
      facility: 'Regional SNF network',
      challenge: 'Spending 30-50% premium on agency staffing fees with lack of control over clinician quality',
      keyResult: '30-50% reduction in staffing spend',
      timeline: '60-day pilot',
      image: '/images/case-studies/readyshift/screenshot.png',
      websiteUrl: 'https://readyshift.com/'
    },
    {
      title: 'SNFalyze: M&A Deal Intelligence',
      facility: 'Healthcare M&A advisory firm',
      challenge: 'Due diligence taking days to weeks per deal with manual extraction of financial data',
      keyResult: 'Days → hours for deal underwriting',
      timeline: '120-day build',
      image: '/images/case-studies/snfalyze/screenshot.png',
      websiteUrl: null
    },
    {
      title: 'SNFadvocate: Grassroots Advocacy',
      facility: 'State SNF association',
      challenge: 'Difficulty mobilizing members to contact legislators with low engagement rates',
      keyResult: '4,200+ emails sent to legislators',
      timeline: '30-day deployment',
      image: '/images/case-studies/snfadvocate/screenshot.png',
      websiteUrl: 'https://snfadvocate.com/'
    },
    {
      title: 'PACadvocate: Intelligence Hub',
      facility: 'State post-acute care associations',
      challenge: 'Members overwhelmed by regulatory changes scattered across multiple sources',
      keyResult: 'Single source of truth for regulations',
      timeline: '60-day development',
      image: '/images/case-studies/pacadvocate/screenshot.png',
      websiteUrl: null
    },
    {
      title: 'PCC Automation: User Provisioning',
      facility: 'Large SNF operator using PCC EHR',
      challenge: 'Manual user creation costing $20,000/month in outsourced support',
      keyResult: '$240,000 annual savings',
      timeline: '45-day implementation',
      image: null,
      websiteUrl: null
    },
    {
      title: 'SNF Pulse: Automated Reporting',
      facility: '70-facility SNF network',
      challenge: '140 hours/week spent manually compiling Key Factors reports across network',
      keyResult: '~$250,000/year in time savings',
      timeline: '60-day rollout',
      image: '/images/case-studies/snf-pulse/screenshot.png',
      websiteUrl: null
    },
    {
      title: 'ALF Reg Chatbot: Survey Prep',
      facility: 'Assisted living facilities',
      challenge: 'Staff spending hours searching through dense regulatory documents for compliance',
      keyResult: 'Instant answers vs. hours of searching',
      timeline: '30-day build',
      image: '/images/case-studies/alf-chatbot/screenshot.png',
      websiteUrl: null
    },
    {
      title: 'Medicaid Chatbot: Billing Guidance',
      facility: 'SNFs across multiple states',
      challenge: 'State-specific Medicaid rules causing claim denials and billing confusion',
      keyResult: 'Reduced denials, improved cash flow',
      timeline: '45-day implementation',
      image: '/images/case-studies/medicaid-chatbot/screenshot.png',
      websiteUrl: null
    }
  ]

  return (
    <section id="case-studies" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real-World Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how senior living operators are successfully implementing AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all flex flex-col"
            >
              {/* Hero Image */}
              {study.image && (
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* No Image Placeholder */}
              {!study.image && (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Facility Tag */}
                <div className="text-xs text-blue-600 font-semibold mb-2">
                  {study.facility}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {study.title}
                </h3>

                {/* Challenge */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {study.challenge}
                </p>

                {/* Key Result Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="text-xs font-semibold text-green-700 mb-1">Key Result</div>
                  <div className="text-sm font-bold text-green-900">{study.keyResult}</div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {study.timeline}
                  </div>

                  {/* Website Link */}
                  {study.websiteUrl && (
                    <a
                      href={study.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.trackCaseStudyLearnMore(study.title, study.websiteUrl)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      Learn more
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudiesSection
