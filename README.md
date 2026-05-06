# RIG Design Studio

Design system control plane for Rodgers Intelligence Group. This is the source of truth for design decisions, component documentation, token definitions, and project scaffolds used across all RIG products.

## Architecture

```
design-studio/                  ← this repo (control plane)
  ├── DESIGN.md                 ← current design system specification
  ├── tokens/                   ← design token JSON files
  ├── components/               ← component documentation
  ├── patterns/                 ← usage patterns and recipes
  ├── projects/                 ← per-project design docs
  ├── scripts/                  ← setup and scaffold scripts
  └── supabase/                 ← database schema and migrations

~/rig-os-design-assets/         ← design asset vault (sibling directory)
  ├── components/               ← cloned repos (shadcn, Magic UI, Aceternity)
  ├── animations/               ← cloned repos (GSAP, Motion, Lottie, etc.)
  ├── 3d/                       ← cloned repos (Three.js, R3F, Babylon, etc.)
  ├── icons/                    ← icon library references
  ├── fonts/                    ← typography notes
  ├── design-systems/           ← cloned indexes (MUI, Ant, Carbon, Polaris)
  ├── inspiration/              ← curated inspiration source references
  ├── paid-options/             ← paid resource evaluations
  ├── figma-notes/              ← Figma community resources
  ├── open-source/              ← open-source catalog
  ├── scrapers/                 ← cloned web scraper repos
  ├── prompts/                  ← conductor prompts
  ├── project-templates/        ← reusable project setup scripts
  ├── RESOURCE_REGISTRY.md      ← full index of all design resources
  └── DESIGN_GATES.md           ← quality gates for all output
```

## Supabase Database

The Design Studio uses a Supabase database for:

- **design_tokens** — color, spacing, typography, shadow tokens per project
- **component_registry** — owned components with code links, props, variants
- **projects** — design project configs with token bindings
- **design_systems** — external design system metadata
- **inspiration_sources** — curated inspiration with notes
- **font_registry** — approved font families with usage rules

### Database Schema

See `supabase/schema.sql` for full DDL.

## Quick Start

```bash
# Clone this repo
git clone https://github.com/rodgemd1-lgtm/design-studio.git
cd design-studio

# Install project dependencies (if any)
npm install

# Set up local Supabase
supabase start
supabase db push

# Open Studio dashboard
supabase studio
```

## Design System Decision Matrix

| Need | Base | Install |
|------|------|---------|
| Custom SaaS / marketing | shadcn/ui + Tailwind | `npx shadcn@latest init` |
| Enterprise dashboard | MUI (`@mui/material`) | `npm i @mui/material @emotion/react` |
| B2B internal tool | Ant Design (`antd`) | `npm i antd` |
| Accessible enterprise | Carbon (`@carbon/react`) | `npm i @carbon/react` |
| Commerce / admin | Polaris (`@shopify/polaris`) | `npm i @shopify/polaris` |

## Motion Decision Matrix

| Need | Library |
|------|---------|
| React layout/gesture animation | Motion |
| Scroll narrative, timeline | GSAP |
| Micro-interactions | Lottie |
| Physical/organic gestures | React Spring |
| Interactive 3D hero | Spline |
| Code-owned 3D | Three.js / R3F |
| State-machine animation | Rive |

## Design Gates

All output must pass these gates before shipping:

1. No unmodified default shadcn/MUI/Ant visuals
2. No decorative 3D (must explain, demo, or convert)
3. Motion must communicate (guide attention, show progress, reinforce brand)
4. WCAG AA contrast (minimum 4.5:1 for text)
5. LCP < 2.5s (target < 1.5s)
6. CLS < 0.1
7. prefers-reduced-motion supported
8. Body text minimum 16px (18px preferred)

See `DESIGN_GATES.md` in the vault for full details.

## Vault Access

The design asset vault lives at `/Users/mikerodgers/rig-os-design-assets/` and contains cloned repositories of all major open-source design libraries.

```bash
# Quick reference
open ~/rig-os-design-assets/
cat ~/rig-os-design-assets/RESOURCE_REGISTRY.md
cat ~/rig-os-design-assets/DESIGN_GATES.md
cat ~/rig-os-design-assets/prompts/HERMES_DESIGN_OS_CONDUCTOR.md
```

## License

MIT — Open source design tooling for the RIG ecosystem.
