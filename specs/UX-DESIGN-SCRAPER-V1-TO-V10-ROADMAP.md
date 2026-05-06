# UX Design Scraper — v1 → v10 Roadmap
# Generated: 2026-05-06 by Jake
# Source analysis: design-extract (2.2k★), brandmd, figma-extractor, mcp-design-system-extractor

---

## Reference Repo Audit

| Repo | Stars | Key Innovation | What We're Missing |
|------|-------|---------------|-------------------|
| **design-extract** | 2,200 | DTCG tokens, multi-platform emitters, 5 Claude slash commands, v12.5 maturity | Industry-standard token format, platform emitters, slash commands, semantic section detection, battle cards, remix vocabulary |
| **brandmd** | 14 | Real DOM extraction → DESIGN.md, component style analysis, do's/don'ts | DESIGN.md auto-generation from live DOM, not just scraped HTML |
| **figma-extractor** | 16 | Direct Figma API → markdown tokens, component tree, AI-friendly output | Figma API integration (we have token gen but no API pipe) |
| **mcp-design-system-extractor** | 63 | Storybook MCP server, component search by purpose, Claude plugin | Storybook integration, purpose-based component search |

---

## Version Roadmap

### v1.0 — CURRENT (Baseline)
**What we have:** Chrome extension, 7-phase workflow, Firecrawl/Brave/Exa, Claude chat, motion capture, screenshots, heatmaps, personas, token JSON gen, Figma token gen, Supabase

**Score:** The foundation. Works but is siloed — no MCP, no slash commands, no DTCG.

---

### v2.0 — THE MCP LAYER (2-3 days)
Add MCP server so any AI agent can call the scraper. This is what design-extract and mcp-design-system-extractor both did — and it's the unlock.

**New capabilities:**
- MCP server exposing all 7 phases as tools
- `/extract <url>` — full extraction from Claude Code / Hermes
- `/grade <url>` — Lighthouse + a11y + design gate scorecard
- `/battle <urlA> <urlB>` — head-to-head competitive comparison
- Supabase-backed session persistence across MCP calls

**Files to create:**
```
src/mcp-server/
├── server.ts           # MCP stdio server
├── tools/
│   ├── extract.ts      # Full site extraction
│   ├── grade.ts        # Quality scorecard
│   ├── battle.ts       # Competitive comparison
│   ├── tokens.ts       # Token extraction only
│   └── capture.ts      # Screenshot + motion capture
└── transport.ts        # HTTP + stdio transports
```

**Why v2 first:** design-extract already proved MCP is the unlock. v12.5 has 357 tests passing with MCP. We skip the slow path.

---

### v3.0 — DTCG TOKEN STANDARD (2-3 days)
Adopt the DTCG (Design Tokens Community Group) format. This makes our tokens portable to Figma, Style Dictionary, and every design tool.

**New capabilities:**
- DTCG-compliant token JSON output
- Semantic + primitive + composite token layers
- Token aliasing (e.g., `color.accent` references `palette.blue.500`)
- Figma variables export (`.tokens.json` → Figma plugin import)
- Tailwind v4 CSS variable mapping

**Files to create:**
```
src/tokens/
├── dtcg-formatter.ts    # DTCG spec formatter
├── semantic-layer.ts    # Semantic token inference
├── composers/
│   ├── tailwind-v4.ts   # Tailwind v4 CSS variable export
│   ├── figma-vars.ts    # Figma Variables JSON
│   └── style-dictionary.ts  # Amazon Style Dictionary
└── validator.ts         # DTCG spec compliance checker
```

**Why v3 second:** design-extract has this. brandmd does DESIGN.md. The token standard is the bridge between extraction and implementation.

---

### v4.0 — LIVE DESIGN SYSTEM EXTRACTION (3-4 days)
Upgrade from scraping HTML to extracting a living design system. This is brandmd's whole thesis — DOM-based extraction of real styles.

**New capabilities:**
- Real button/card/input style extraction from computed DOM
- Line-height, letter-spacing, font-weight per text element
- Color usage frequency analysis (which colors are ACTUALLY used)
- Spacing rhythm detection (margin/padding pattern analysis)
- Border radius usage patterns
- Shadow/ elevation system extraction
- Animation timing function extraction

**Files to create:**
```
src/extractors/
├── component-styles.ts    # Real component style extraction
├── typography-system.ts   # Full typography scale
├── color-usage.ts         # Color frequency + semantic mapping
├── spacing-rhythm.ts      # Spacing scale detection
├── elevation-system.ts    # Shadow + border analysis
└── animation-system.ts    # Timing + easing extraction
```

---

### v5.0 — SEMANTIC INTENT LAYER (3-4 days)
This is design-extract v10's "Intent Release" — understanding WHAT a page is, not just HOW it looks.

**New capabilities:**
- Page intent detection (landing/pricing/docs/blog/product/about/dashboard/auth)
- Section role classification (hero/features/testimonials/pricing/faq/cta/footer)
- Reading order extraction
- Content hierarchy mapping
- CTA identification + copy extraction
- Multi-page crawl with cross-page consistency
- "Rebuild this site" prompt pack for v0/Lovable/Cursor

**Files to create:**
```
src/semantic/
├── page-intent.ts         # Page type classifier
├── section-roles.ts       # Section role detector
├── content-hierarchy.ts   # Heading + reading order
├── cta-detector.ts        # CTA identification
├── multi-page-crawler.ts  # Cross-page orchestration
└── prompt-pack.ts         # AI agent prompt generator
```

---

### v6.0 — MULTI-PLATFORM EMITTERS (3-4 days)
design-extract's killer feature — the same extraction can output to 5+ platforms.

**New capabilities:**
- iOS SwiftUI code generation from extracted tokens
- Android Jetpack Compose generation
- Flutter widget generation
- WordPress theme generation (style.css + functions.php)
- shadcn/ui theme.json generation
- React Native StyleSheet generation

**Files to create:**
```
src/emitters/
├── swiftui.ts             # iOS SwiftUI
├── compose.ts             # Android Compose
├── flutter.ts             # Flutter widgets
├── wordpress.ts           # WP theme
├── shadcn-theme.ts        # shadcn/ui theme.json
├── react-native.ts        # RN StyleSheet
└── css-variables.ts       # Plain CSS vars (always available)
```

---

### v7.0 — CSS HEALTH AUDIT + REMEDIATION (2-3 days)
design-extract has CSS health audit + WCAG remediation. We have detection but not auto-fix.

**New capabilities:**
- CSS specificity analysis (identify bloated selectors)
- Unused CSS detection
- Duplicate style identification
- WCAG auto-remediation (suggest exact fixes for color contrast, focus states, etc.)
- Performance impact scoring of CSS
- CSS variable consolidation recommendations

**Files to create:**
```
src/health/
├── specificity-analyzer.ts
├── unused-css-detector.ts
├── duplicate-detector.ts
├── wcag-remediator.ts
├── performance-scorer.ts
└── css-consolidator.ts
```

---

### v8.0 — BATTLE CARDS + REMIX VOCABULARY (2-3 days)
design-extract's competitive features — battle cards and remix vocabulary.

**New capabilities:**
- `/battle A B` → side-by-side design comparison with scores
- `/remix <url> --as <vocab>` → restyle extracted design in 6 vocabularies:
  - "stripe" → Stripe's design language
  - "linear" → Linear's minimal aesthetic
  - "apple" → Apple HIG compliance
  - "brutalist" → brutalist web aesthetic
  - "glassmorphic" → glass + blur treatment
  - "dark-minimal" → dark mode minimal
- Visual diff generation (pixel-level comparison)
- Competitive advantage scoring

**Files to create:**
```
src/battle/
├── compare.ts             # Side-by-side comparison engine
├── scorecard.ts           # Multi-axis scoring
├── visual-diff.ts         # Pixel comparison
└── advantage-detector.ts  # Competitive advantage finder

src/remix/
├── vocab-registry.ts      # 6+ design vocabularies
├── token-mapper.ts        # Map tokens between systems
├── style-transfer.ts      # Apply vocabulary to extraction
└── vocab-builder.ts       # Create custom vocabularies
```

---

### v9.0 — STORYBOOK + COMPONENT LIBRARY INTEGRATION (2-3 days)
mcp-design-system-extractor's thesis — connect to existing component libraries.

**New capabilities:**
- Storybook integration (connect to any Storybook URL)
- Component HTML extraction from Storybook
- Component search by purpose ("I need a data table with sorting")
- Design system adoption scoring (how much of the DS is actually used?)
- Component coverage analysis (which patterns are missing?)
- Auto-generate missing components from design tokens

**Files to create:**
```
src/storybook/
├── connector.ts           # Storybook API client
├── component-extractor.ts # HTML + props extraction
├── search-by-purpose.ts   # Semantic component search
├── adoption-analyzer.ts   # Usage analysis
├── coverage-analyzer.ts   # Gap detection
└── component-generator.ts # Auto-generate missing components
```

---

### v10.0 — THE AUTONOMOUS DESIGN AGENT (4-5 days)
The final form. A fully autonomous design intelligence that watches, learns, and builds.

**New capabilities:**
- **Design Radar:** Continuously monitors competitor sites, detects changes, alerts
- **Trend Engine:** Aggregates patterns across all scraped sites, detects emerging trends
- **Auto-Brand:** Given a company name + industry, generates complete brand system
- **Design Autopilot:** Full pipeline from brief → live site (ties to DESIGN-AUTOPILOT-SPEC.md)
- **Feedback Loop:** Tracks which generated designs convert best, reinforces patterns
- **Design Genome:** Every site's design stored as searchable "DNA" — "show me sites with DNA similar to Stripe"
- **Collaborative Design:** Multiple agents critique and improve designs in parallel
- **Live Dashboard:** All operations visible at https://design-studio-dashboard.vercel.app

**Files to create:**
```
src/autonomous/
├── radar.ts               # Continuous competitor monitoring
├── trend-engine.ts         # Pattern aggregation + trend detection
├── auto-brand.ts           # Brand system generation
├── autopilot.ts            # Brief → live site pipeline
├── feedback-loop.ts        # Conversion-based reinforcement
├── genome.ts               # Design DNA encoding + search
├── collaborative.ts        # Multi-agent design review
└── dashboard-api.ts        # Live dashboard data
```

---

## Capability Gap Matrix

| Capability | Us v1 | design-extract v12.5 | brandmd | figma-extractor | mcp-DS-extractor | Target v |
|-----------|-------|---------------------|---------|-----------------|------------------|----------|
| DTCG tokens | ❌ | ✅ | ❌ | ❌ | ❌ | v3 |
| MCP server | ❌ | ✅ | ❌ | ❌ | ✅ | v2 |
| Claude slash commands | ❌ | ✅ (5) | ❌ | ❌ | ✅ | v2 |
| Multi-platform emit | ❌ | ✅ (5 targets) | ❌ | ❌ | ❌ | v6 |
| Live DOM extraction | ❌ | ✅ | ✅ | ❌ | ✅ | v4 |
| DESIGN.md auto-gen | ❌ | ✅ | ✅ | ❌ | ❌ | v4 |
| Semantic intent | ❌ | ✅ (v10) | ❌ | ❌ | ❌ | v5 |
| CSS health audit | ❌ | ✅ | ❌ | ❌ | ❌ | v7 |
| WCAG remediation | ❌ | ✅ | ❌ | ❌ | ❌ | v7 |
| Battle cards | ❌ | ✅ | ❌ | ❌ | ❌ | v8 |
| Remix vocabulary | ❌ | ✅ | ❌ | ❌ | ❌ | v8 |
| Figma API direct | ❌ | ✅ | ❌ | ✅ | ❌ | v3 |
| Storybook integration | ❌ | ❌ | ❌ | ❌ | ✅ | v9 |
| Component search by purpose | ❌ | ❌ | ❌ | ❌ | ✅ | v9 |
| Autonomous monitoring | ❌ | ❌ | ❌ | ❌ | ❌ | v10 |
| Design genome/DNA search | ❌ | ❌ | ❌ | ❌ | ❌ | v10 |
| Design autopilot (brief→live) | ❌ | ❌ | ❌ | ❌ | ❌ | v10 |

---

## Build Order Rationale

```
v1 (current) → v2 (MCP) → v3 (DTCG) → v4 (Live DOM) → v5 (Semantic)
     ↓
v6 (Multi-platform) → v7 (Health audit) → v8 (Battle+Remix) → v9 (Storybook) → v10 (Autonomous)
```

**Why this order:**
1. **v2 MCP** unlocks everything — every AI agent can call us
2. **v3 DTCG** makes output portable — the industry standard
3. **v4 Live DOM** improves quality — real styles, not guesses
4. **v5 Semantic** adds intelligence — understands what it's looking at
5. **v6-v9** are feature layers — each adds a new surface
6. **v10 Autonomous** is the endgame — the system runs itself

## What to Build First (This Week)

1. **v2 MCP server** — biggest unlock, design-extract proved the model
2. **v4 Live DOM extraction** — brandmd proved the value, immediate quality improvement
3. **v3 DTCG token standard** — makes everything portable

These three make us competitive with design-extract on core quality.
The rest (v5-v10) are differentiation layers.
