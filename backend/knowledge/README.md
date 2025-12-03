# Knowledge Base

This directory contains all the domain knowledge, frameworks, playbooks, and case studies that power The Healthcare Entrepreneur AI chatbot.

## Structure

```
knowledge/
├── system-prompt.txt           # Core AI consultant persona and frameworks
├── domain-knowledge.txt        # Senior living industry expertise
├── common-scenarios.txt        # 20 common operator scenarios with responses
├── case_study_library.md       # Real implementation examples
├── anti-patterns.txt           # Common mistakes to avoid
└── playbooks/
    ├── 30-day-pilot.txt       # Step-by-step pilot execution
    ├── first-week-discovery.txt   # 4-touch discovery method
    ├── vendor-evaluation.txt      # BS detector for AI vendors
    └── roi-business-case.txt      # ROI calculation templates
```

## Files

### Core Knowledge

**system-prompt.txt**
- AI consultant persona definition
- Core frameworks (Assistant vs Agent, TRUST, 5 Attributes)
- Communication style guidelines
- Key principles ($100K Rule, 5 Silent Killers)

**domain-knowledge.txt**
- Senior living industry context
- Regulatory environment (SNF, ALF, survey process)
- Common workflows and pain points
- Staffing challenges and demographic trends
- Financial pressures and reimbursement models

**common-scenarios.txt**
- 20 real operator scenarios
- Situation analysis for each
- Framework-based response templates
- Follow-up paths and objection handling
- Lead generation opportunities

**case_study_library.md**
- Real implementation examples with metrics
- ROI calculations from actual projects
- Before/after comparisons
- Lessons learned from successful deployments

**anti-patterns.txt**
- 7 major anti-patterns that cause AI failures
- Why each fails (root causes)
- Real-world failure examples
- What to do instead
- Warning signs to watch for

### Playbooks

**playbooks/30-day-pilot.txt**
- Week-by-week pilot execution guide
- Workflow documentation methodology
- Success metrics definition
- Kill/Pivot/Scale decision framework
- ROI calculation templates

**playbooks/first-week-discovery.txt**
- 4-Touch Discovery Method
- Pain Point Inventory email template
- Spreadsheet Hero identification
- Friday Afternoon Audit process
- Prioritization scoring system

**playbooks/vendor-evaluation.txt**
- Pre-demo screening questions
- Red flags vs green flags
- Demo evaluation scorecard
- Reference check questions
- Contract negotiation guidance

**playbooks/roi-business-case.txt**
- Current state cost calculation
- Future state projection formulas
- Implementation cost accounting
- Executive summary templates
- Objection response scripts

## Usage

The chatbot loads all knowledge files at startup and includes them in the system prompt. This allows Claude to:

1. **Reference specific frameworks** - Apply 5 Attributes, TRUST, $100K Rule precisely
2. **Cite case studies** - Give real examples with numbers
3. **Detect anti-patterns** - Warn operators heading toward known failures
4. **Provide playbooks** - Offer step-by-step guidance when needed
5. **Handle scenarios** - Respond to 20 common situations with proven approaches

## Updating Knowledge

To update the knowledge base:

1. Edit the relevant `.txt` or `.md` file in this directory
2. Restart the backend server (`npm run dev`)
3. The new knowledge will be loaded automatically

No code changes needed - the service loads files dynamically on startup.

## Knowledge Size

Total knowledge base: ~150KB of text
- Fits well within Claude's context window
- Loaded once at startup (efficient)
- Available for every conversation

## Best Practices

When editing knowledge files:

- **Be specific**: Use real numbers, workflows, and examples
- **Stay practical**: Focus on actionable advice, not theory
- **Use terminology**: SNF, ALF, MDS, PDPM, prior auth, census, etc.
- **Include metrics**: Time saved, cost reduced, ROI achieved
- **Cite sources**: Reference case studies and real implementations
- **Update regularly**: Add new case studies and lessons learned

## Contributing

To add new knowledge:

1. **Case studies**: Add to `case_study_library.md` with metrics
2. **Scenarios**: Add to `common-scenarios.txt` following the template
3. **Anti-patterns**: Document failure patterns in `anti-patterns.txt`
4. **Playbooks**: Create new `.txt` files in `playbooks/` directory
5. **Update service**: Add new files to `claudeService.js` if needed

---

This knowledge base transforms The Healthcare Entrepreneur from a generic AI chatbot into a specialized consultant with deep domain expertise.
