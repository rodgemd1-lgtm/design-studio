# Design Studio — Mined Methodologies & Processes

Compiled from Startup-Intelligence-OS, RIG Business Studio, and UX Design Scraper.
Generated: 2026-05-06 by Jake

---

## 1. UX Design Scraper — Chrome Extension Architecture

Source: `ux-design-scraper` repo

### 7-Phase Design Workflow
```
DISCOVER → DEFINE → DIVERGE → DEVELOP → DELIVER → GATE → MEASURE
```

Each phase has:
- Dedicated prompt templates (`src/shared/prompt-templates/`)
- Browser scraping integration (Firecrawl, Brave Search, Exa)
- Claude chat hooks for real-time AI critique
- Design critique engine with WCAG and performance gates

### Scraper Capabilities
- Motion capture (CSS animations, GSAP, Lottie detection)
- Screenshot capture with heatmap extraction (FullStory, Hotjar)
- Persona generation from UX flows
- Knowledge enrichment via Brave Search + consensus
- Supabase-backed project persistence

### Key Files to Integrate
| File | Purpose |
|------|---------|
| `src/shared/workflow-constants.ts` | 7-phase workflow definitions |
| `src/shared/ux-knowledge-base.ts` | 206KB UX knowledge base (patterns, heuristics, anti-patterns) |
| `src/generators/` | Figma token, Claude.md, competitive intel, prompt generators |
| `src/background/ci-intelligence-hub/` | Competitive intelligence pipeline |
| `src/background/phases/` | Per-phase scrapers and orchestrators |

---

## 2. RIG Business Studio — Scout & GBrain System

Source: `rig-business-studio` repo

### Scout Agent System
Daily autonomous intelligence gathering across topics:
- Sources: Brave, Exa, Consensus, MirrorMind, Firecrawl, Recall
- Topics: RIG Consulting, Job Studio, TransformFit, James OS, Viral Architect, etc.
- Output: Daily HTML dashboards at `public/scout/YYYY-MM-DD.html`

### GBrain — Knowledge Graph
- Cloud + local store (`rig/gbrain/`)
- Semantic scoring and entity extraction
- CLI interface for querying

### Capability Builder
- Autopilot mode for autonomous agent task execution
- Queue-based task distribution
- Templates for common agent workflows

### Key Files to Integrate
| File | Purpose |
|------|---------|
| `rig/scout/scrapers.py` | Multi-source scraper orchestration |
| `rig/scout/sources/` | Individual source connectors |
| `rig/capability/builder.py` | Agent capability factory |
| `rig/gbrain/scorer.py` | Knowledge scoring and ranking |
| `docs/plans/2026-05-02-rig-os-master-plan.md` | Full RIG OS architecture plan |

---

## 3. Startup Intelligence OS — Process & Methodology Goldmine

Source: `Startup-Intelligence-OS` (active at `~/Desktop/Startup-Intelligence-OS`)

### RIG MASTER PROCESS
Full system map of every file, URL, skill, and brand asset.
- RIG DESIGN.md brand tokens
- 23+ core rig skills in `~/.hermes/skills/rig/`
- 50-point quality criteria
- Full engagement protocol (rig-engage)

### Strategic Doctrines
| Doctrine | File | Key Concept |
|----------|------|-------------|
| FORESIGHT Absolute Deviation | `docs/doctrines/FORESIGHT-ABSOLUTE-DEVIATION-STANDARD.md` | −10σ to +10σ across 14 criteria |
| STRATEGOS 6-Lens Collision | `docs/doctrines/STRATEGOS-6-LENS-COLLISION.md` | 6 simultaneous analytical lenses |
| INNOVATION Future-Back | `docs/doctrines/INNOVATION-FUTURE-BACK.md` | Start from future state, work backward |
| FORESIGHT Engine | `docs/doctrines/FORESIGHT-ENGINE.md` | V4 prediction engine |

### SOP Library (30+ SOPs)
Top 5 most relevant to Design Studio:
1. **SOP-27**: Intelligence Cycle (8-step) — 118KB comprehensive intel methodology
2. **SOP-34**: Competitive Landscape Simulation & War Gaming — 48KB
3. **SOP-33**: Go-to-Market Launch Planning
4. **SOP-22**: Ellen OS Package Distribution
5. **SOP-19**: Executive Writing Pipeline

### UX/UI Design Resources
- Full component library comparison (shadcn, Radix, MUI, Ant, Chakra, Headless UI, Mantine, Next UI, Tremor)
- AI design tools directory (v0, Galileo, Uizard, Figma AI, Relume, Locofy, Bolt, Lovable)
- Design-to-code pipeline (7 tools, full comparison matrix)
- Accessibility resources (WCAG 2.2, axe, Lighthouse, pa11y)
- 687-line UX Interaction Design Principles document

### Recruitment Studio (Job Search OS)
Full autonomous job search system:
- 5 specialist agents (Ferrazzi, Goldsmith, Mattone, Mostyn, Doody)
- Airtable-backed pipeline with n8n workflows
- Daily scout and dashboard generation
- Automated follow-up and nurture sequences

### Startup OS Core (Control Plane)
- Workspace YAML for multi-company management
- Decision and Capability OS architecture
- Maturity gap closure wave system
- Department studios (job, talent, data science, engineering, trust)

---

## 4. Scraper Infrastructure — Newly Built

### Godly/Minimal Gallery Scraper (Lightpanda)
- File: `~/.hermes/scripts/godly-scraper.py`
- Engine: Lightpanda (Go binary, JS-rendering)
- Status: Working — Godly.agency is dead (NXDOMAIN), switched to minimal.gallery

### Spline Scraper (Browser-Use Cloud)
- File: `~/.hermes/scripts/spline-scraper.py`
- Engine: browser-use-sdk cloud API
- Status: Working — 20 3D scenes scraped with auth

### Mobbin Scraper (Browser-Use Cloud)
- File: `~/.hermes/scripts/mobbin-scraper.py`
- Engine: browser-use-sdk cloud API
- Status: Working — limited results due to login wall, public fallback enabled

---

## 5. Design Studio Integration Plan

### Phase 1: Knowledge Absorption (Now)
- [x] Clone and inventory all 3 repos
- [x] Extract key process files
- [x] Build Lightpanda Godly scraper
- [x] Build Spline Pro scraper
- [x] Build Mobbin Pro scraper

### Phase 2: Pipeline Integration (Next)
- [ ] Add Spline + Mobbin + Minimal Gallery to daily-inspiration-hunter cron
- [ ] Ingest UX Design Scraper's knowledge base into Susan RAG
- [ ] Wire Scout sources into Design Studio data pipeline
- [ ] Create Design Studio SOP from extracted methodologies

### Phase 3: Autonomous Studio (Future)
- [ ] Deploy UX Design Scraper Chrome extension for live site capture
- [ ] Build GBrain integration for design knowledge graph
- [ ] Create auto-design-critique pipeline using Claude + gates
