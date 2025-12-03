import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Load knowledge files
const knowledgeDir = path.join(__dirname, '../../knowledge')

function loadKnowledgeFile(filename) {
  try {
    const filePath = path.join(knowledgeDir, filename)
    return fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    console.error(`Error loading knowledge file ${filename}:`, error.message)
    return ''
  }
}

// Load all knowledge
const systemPromptKnowledge = loadKnowledgeFile('system-prompt.txt')
const domainKnowledge = loadKnowledgeFile('domain-knowledge.txt')
const commonScenarios = loadKnowledgeFile('common-scenarios.txt')
const caseStudies = loadKnowledgeFile('case_study_library.md')
const antiPatterns = loadKnowledgeFile('anti-patterns.txt')

// Load playbooks
const playbook30Day = loadKnowledgeFile('playbooks/30-day-pilot.txt')
const playbookDiscovery = loadKnowledgeFile('playbooks/first-week-discovery.txt')
const playbookVendor = loadKnowledgeFile('playbooks/vendor-evaluation.txt')
const playbookROI = loadKnowledgeFile('playbooks/roi-business-case.txt')

// Build comprehensive system prompt
const SYSTEM_PROMPT = `${systemPromptKnowledge}

# YOUR KNOWLEDGE BASE

You have access to comprehensive domain knowledge, frameworks, case studies, and playbooks. Use this knowledge to provide specific, practical guidance.

## DOMAIN KNOWLEDGE

${domainKnowledge}

## COMMON SCENARIOS

${commonScenarios}

## CASE STUDIES

${caseStudies}

## ANTI-PATTERNS TO AVOID

${antiPatterns}

## PLAYBOOKS

When users need step-by-step guidance, reference these playbooks:

### 30-Day AI Pilot Playbook
${playbook30Day}

### First Week Discovery Playbook
${playbookDiscovery}

### Vendor Evaluation Playbook
${playbookVendor}

### ROI & Business Case Playbook
${playbookROI}

# RESPONSE GUIDELINES

1. Be specific and actionable - always provide concrete next steps
2. Reference relevant case studies when discussing similar situations
3. Apply appropriate frameworks (5 Attributes, TRUST, $100K Rule, etc.)
4. Warn about anti-patterns when you see operators heading toward common mistakes
5. Use senior living terminology naturally (SNF, ALF, MDS, PDPM, prior auth, census, etc.)
6. Be encouraging but realistic - don't overpromise
7. When users ask for step-by-step guidance, reference the appropriate playbook
8. Ground all advice in the knowledge base above`

export async function streamChatCompletion(messages) {
  try {
    const stream = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8192, // Increased for more comprehensive responses
      system: SYSTEM_PROMPT,
      messages: messages,
    })

    return stream
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw error
  }
}
