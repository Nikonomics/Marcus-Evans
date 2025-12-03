import React, { useState } from 'react'

const CaseStudiesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [lightboxImage, setLightboxImage] = useState(null)

  const caseStudies = [
    {
      icon: '📋',
      title: 'Glide: Admissions Documentation Revolution',
      facility: 'Multi-facility SNF operator',
      challenge: 'Admissions coordinators spending 72 hours per week on manual documentation and coding, leading to delayed admissions and staff burnout',
      solution: 'AI-powered admissions documentation system that automates coding, generates compliant documentation, and streamlines the entire intake process',
      results: [
        '97% time reduction: 72 hours → 2 hours per week',
        'Same-day admissions documentation completion',
        'Eliminated coding errors and compliance issues',
        'Staff can focus on patient care instead of paperwork',
        'Faster bed turnover and revenue acceleration'
      ],
      timeline: '30-day implementation',
      images: ['/images/case-studies/glide/screenshot.png'],
      videoUrl: '', // Add Loom/YouTube embed URL
      websiteUrl: 'https://www.glideltc.com/'
    },
    {
      icon: '📄',
      title: 'Contract Management System: Financial Clarity at Scale',
      facility: 'Large multi-state senior living operator',
      challenge: 'Over 13,000 vendor contracts scattered across facilities, departments, and filing cabinets with no centralized visibility into terms, pricing, or renewal dates',
      solution: 'Comprehensive contract management platform with AI-powered contract analysis, taxonomy system, centralized repository, and automated alerts for renewals and compliance',
      results: [
        '13,000+ contracts organized and digitized',
        '$2.3M+ in financial clarity and cost savings identified',
        'Automated renewal tracking preventing auto-renewals',
        'Standardized vendor pricing across facilities',
        'Real-time visibility into all contractual obligations',
        'Risk scoring for compliance and liability exposure'
      ],
      timeline: '90-day rollout',
      images: ['/images/case-studies/contract-management/screenshot.png'],
      videoUrl: ''
    },
    {
      icon: '👥',
      title: 'ReadyShift: Direct Staffing Marketplace',
      facility: 'Regional SNF network',
      challenge: 'Spending 30-50% premium on agency staffing fees, lack of control over clinician quality, and unpredictable scheduling leading to budget overruns',
      solution: 'Direct clinician-to-facility staffing marketplace that eliminates agency middlemen, with built-in credentialing, scheduling, and payment processing',
      results: [
        '30-50% reduction in staffing spend (agency fees eliminated)',
        'Direct relationships with credentialed clinicians',
        'Improved shift fill rates and reliability',
        'Better continuity of care with familiar staff',
        'Real-time availability and instant booking',
        'Transparent pricing and quality ratings'
      ],
      timeline: '60-day pilot',
      images: ['/images/case-studies/readyshift/screenshot.png'],
      videoUrl: '',
      websiteUrl: 'https://readyshift.com/'
    },
    {
      icon: '💼',
      title: 'SNFalyze: M&A Deal Intelligence Platform',
      facility: 'Healthcare M&A advisory firm',
      challenge: 'Due diligence on SNF and ALF acquisitions taking days to weeks per deal, with manual extraction of financial data from CIMs, P&Ls, and census reports',
      solution: 'AI-powered deal management hub that automatically extracts 40+ data points from uploaded documents, calculates underwriting metrics, performs contract risk analysis, and manages deal pipeline',
      results: [
        'Days → hours for deal underwriting',
        'Automated extraction of financial metrics (EBITDA, NOI, occupancy, payer mix)',
        'Portfolio-level analytics across multiple properties',
        'Contract due diligence with automated risk scoring',
        'Deal team collaboration and document management',
        'Real-time pipeline tracking and reporting'
      ],
      timeline: '120-day build',
      images: ['/images/case-studies/snfalyze/screenshot.png'],
      videoUrl: ''
    },
    {
      icon: '📢',
      title: 'SNFadvocate: Grassroots Policy Advocacy',
      facility: 'State SNF association',
      challenge: 'Difficulty mobilizing members to contact legislators on critical policy issues, with low engagement rates and manual email tracking',
      solution: 'Grassroots advocacy platform that makes it easy for members to send pre-written (or custom) emails to their legislators, with real-time tracking and reporting',
      results: [
        '300+ advocates mobilized',
        '4,200+ emails sent to legislators',
        'Measurable impact on policy discussions',
        'Automated targeting by district and issue',
        'Real-time campaign analytics and reporting',
        'Built member database for future campaigns'
      ],
      timeline: '30-day rapid deployment',
      images: ['/images/case-studies/snfadvocate/screenshot.png'],
      videoUrl: '',
      websiteUrl: 'https://snfadvocate.com/'
    },
    {
      icon: '📰',
      title: 'PACadvocate: Post-Acute Intelligence Hub',
      facility: 'State post-acute care associations',
      challenge: 'Members overwhelmed by regulatory changes, federal rule updates, and industry news scattered across multiple sources with no easy way to stay informed',
      solution: 'Centralized intelligence hub that aggregates regulatory updates, CMS rules, state policy changes, and industry news with AI-powered summaries and email alerts',
      results: [
        'Single source of truth for post-acute regulations',
        'Daily/weekly email digests with relevant updates',
        'AI-generated plain-language summaries of complex rules',
        'Searchable archive of historical changes',
        'Member engagement and education tool',
        'Reduced compliance risk through timely awareness'
      ],
      timeline: '60-day development',
      images: ['/images/case-studies/pacadvocate/screenshot.png'],
      videoUrl: ''
    },
    {
      icon: '⚙️',
      title: 'PCC Automation: User Provisioning Efficiency',
      facility: 'Large SNF operator using PCC EHR',
      challenge: 'Manual user creation in PCC system taking hours per week, with outsourced support costing $20,000/month and causing delays in onboarding new staff',
      solution: 'Automated user provisioning system that integrates with HR systems and automatically creates PCC user accounts with correct permissions and facility access',
      results: [
        '$20,000/month eliminated (outsourced support costs)',
        '$240,000 annual savings',
        'Instant user provisioning vs. days of delay',
        'Zero human error in permissions setup',
        'Seamless new hire onboarding',
        'Automated offboarding for security compliance'
      ],
      timeline: '45-day implementation',
      images: [],
      videoUrl: ''
    },
    {
      icon: '📊',
      title: 'SNF Pulse: Automated Key Factors Reporting',
      facility: '70-facility SNF network',
      challenge: 'Each facility spending ~2 hours/week manually compiling Key Factors reports (census, admissions, discharges, financial metrics) for corporate leadership, totaling ~140 hours/week across the network',
      solution: 'Automated Key Factors generation system that pulls data from PCC, generates formatted reports, and distributes to leadership with zero manual effort',
      results: [
        '~1 FTE reclaimed across 70 facilities',
        '140 hours/week eliminated (~$250,000/year savings)',
        'Real-time data visibility for leadership',
        'Consistent formatting and accuracy across all facilities',
        'Historical trending and benchmarking',
        'Staff time redirected to resident care'
      ],
      timeline: '60-day rollout',
      images: ['/images/case-studies/snf-pulse/screenshot.png'],
      videoUrl: ''
    },
    {
      icon: '🤖',
      title: 'ALF Reg Chatbot: Survey Prep Assistant',
      facility: 'Assisted living facilities',
      challenge: 'Staff struggling to quickly find specific state regulations during survey prep, leading to hours spent searching through dense regulatory documents',
      solution: 'AI chatbot trained on state ALF regulations that provides instant answers to compliance questions, survey prep guidance, and regulation lookups with exact citations',
      results: [
        'Instant answers vs. hours of manual searching',
        'Improved survey readiness and confidence',
        'Exact regulation citations for documentation',
        'Staff empowerment through easy access to knowledge',
        '24/7 availability for compliance questions',
        'Reduced consultant fees for routine questions'
      ],
      timeline: '30-day build per state',
      images: ['/images/case-studies/alf-chatbot/screenshot.png'],
      videoUrl: ''
    },
    {
      icon: '💬',
      title: 'Medicaid Chatbot: State-Specific Billing Guidance',
      facility: 'SNFs across multiple states',
      challenge: 'Medicaid billing rules varying dramatically by state, with staff confused about eligibility, coverage, and documentation requirements leading to claim denials',
      solution: 'AI chatbot trained on state-specific Medicaid rules providing instant guidance on billing codes, documentation requirements, prior authorizations, and coverage policies',
      results: [
        'Reduced claim denials through accurate guidance',
        'Faster claim submission with correct documentation',
        'Staff training tool for new billing team members',
        'State-specific rule updates and alerts',
        'Improved cash flow from first-pass claim acceptance',
        'Eliminated "wait for the expert" bottlenecks'
      ],
      timeline: '45-day implementation per state',
      images: ['/images/case-studies/medicaid-chatbot/screenshot.png'],
      videoUrl: ''
    }
  ]

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all flex flex-col ${
                expandedIndex === index ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-3xl flex-shrink-0">{study.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {study.title}
                    </h3>
                    <p className="text-sm text-gray-600">{study.facility}</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-600 transform transition-transform ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-4">
                    {/* Image Gallery */}
                    {study.images && study.images.length > 0 && (
                      <div className="mb-6">
                        {study.images.map((image, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="cursor-pointer group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
                            onClick={() => openLightbox(image)}
                          >
                            <img
                              src={image}
                              alt={`${study.title} screenshot ${imgIndex + 1}`}
                              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                              <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Video Embed */}
                    {study.videoUrl && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Demo Video:</h4>
                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                          <iframe
                            src={study.videoUrl}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`${study.title} demo video`}
                          ></iframe>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-700">{study.challenge}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-700">{study.solution}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="text-gray-700">{result}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{study.timeline}</span>
                      </div>

                      {/* Website Link */}
                      {study.websiteUrl && (
                        <a
                          href={study.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <span>Visit Website</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightboxImage}
            alt="Enlarged screenshot"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}

export default CaseStudiesSection
