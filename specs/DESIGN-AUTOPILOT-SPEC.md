# Design-Autopilot Capability Spec
# Target: Coder Agent (Claude Code / Codex / Aider)
# Priority: P0 (Critical)
# Estimated build time: 4-6 hours

## What It Does
Accepts a brand brief → runs the full Design Studio pipeline → delivers a deployed website.

## Input Contract
```yaml
brand_brief:
  company_name: string
  industry: string
  audience: string
  primary_conversion: string  # "sign up", "book demo", "buy now"
  core_emotion: string         # "trust", "excitement", "calm"
  competitor_urls: list[string]
  color_preferences: list[string]  # optional
  font_preferences: list[string]   # optional
  copy_tone: string                # "professional", "playful", "minimal"
```

## Pipeline

### Phase 1: Competitive Research (1 min)
1. Run `design-scout.py --urls COMPETITOR_URLS` 
2. Extract: color palettes, font stacks, layout patterns, motion usage, tech stack
3. Output: `competitive_analysis.json`

### Phase 2: Inspiration Matching (2 min)
1. Query today's inspiration vault for sites in same industry
2. Query Susan RAG for UX patterns matching primary_conversion
3. Score matches by: industry relevance, design quality, conversion pattern fit
4. Output: top 5 reference URLs with extracted patterns

### Phase 3: Design System Generation (3 min)
1. Generate DESIGN.md from brief + competitive analysis
2. Select component system: shadcn/ui (default), MUI (enterprise), etc.
3. Generate token JSON: OKLCH color palette, typography scale, spacing rhythm
4. Generate motion specs: what animates, when, why
5. Output: `DESIGN.md`, `tokens.json`, `motion-spec.md`

### Phase 4: Component Assembly (10 min)
1. Scaffold Next.js 15 project with `install-design-stack.sh`
2. Generate layout components: Header, Hero, Features, CTA, Footer
3. Apply tokens to all components (no defaults!)
4. Add motion: GSAP scroll triggers, Motion layout animations
5. Output: working `/app` directory with all pages

### Phase 5: Content Generation (5 min)
1. Generate copy for all sections using Claude
2. Match copy_tone from brief
3. Generate OG images using image generation
4. Output: all copy in `content.json`, images in `/public`

### Phase 6: Quality Gates (3 min)
1. Lighthouse audit (target >90 all categories)
2. axe-core accessibility scan
3. Design gates check (no defaults, motion communicates, etc.)
4. Visual regression against inspiration references
5. Output: `quality-report.md`

### Phase 7: Deploy (2 min)
1. Push to GitHub
2. Deploy to Vercel (production)
3. Register in Design Studio projects table
4. Output: live URL

## Files to Create

```
~/.hermes/skills/design-autopilot/
├── SKILL.md                          # Main skill definition
├── scripts/
│   ├── autopilot.py                  # Orchestrator
│   ├── competitive_research.py       # Phase 1
│   ├── inspiration_matcher.py        # Phase 2
│   ├── design_system_generator.py    # Phase 3
│   ├── component_assembler.py        # Phase 4
│   ├── content_generator.py          # Phase 5
│   └── quality_gate_runner.py        # Phase 6
├── templates/
│   ├── DESIGN.md.template
│   ├── tokens.json.template
│   └── motion-spec.md.template
└── references/
    ├── design-gates.yaml
    ├── framework-matrix.yaml
    └── industry-patterns.yaml
```

## API Dependencies
- Susan RAG (for UX pattern matching)
- Supabase Design Studio (for project registry)
- browser-use cloud (for competitive research)
- Claude API (for content generation)
- Vercel API (for deployment)

## Integration Points
- `/design` slash command: routes to design-autopilot when brief is provided
- Design Scout: daily data feeds the inspiration matcher
- Design Gates: reuse existing DESIGN_GATES.md
- Project templates: reuse `install-design-stack.sh`

## Success Criteria
- [ ] Accepts brand brief in natural language
- [ ] Completes full pipeline in <25 minutes
- [ ] Generated site scores >90 on Lighthouse
- [ ] Generated site passes all design gates
- [ ] Generated site is visually distinct (not default shadcn)
- [ ] All intermediate artifacts saved to Design Studio project

## For the Coder
Start with `autopilot.py` as the orchestrator. It calls each phase script in sequence.
Each phase script should:
1. Accept a JSON input file
2. Produce a JSON output file
3. Log progress to stdout
4. Handle errors gracefully (skip phase, log warning, continue)

The SKILL.md should include:
- Trigger conditions ("design a website for...", "build a landing page for...")
- Full step-by-step workflow  
- Tool routing for each phase
- Error recovery paths
- Example usage

Priority order for building:
1. autopilot.py (orchestrator)
2. design_system_generator.py (most value, fastest ROI)
3. component_assembler.py (ties to existing templates)
4. competitive_research.py (ties to existing Scout)
5. quality_gate_runner.py (ties to existing gates)
6. inspiration_matcher.py (needs Susan RAG)
7. content_generator.py (nice to have)
