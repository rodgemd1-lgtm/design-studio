# DESIGN.md — RIG Design Studio

## Product
**Name:** RIG Design Studio
**Audience:** Internal RIG design/build team (Jake + Mike)
**Primary conversion:** Rapid, consistent, high-quality design system application
**Core emotion:** Confidence — knowing every output passes verified quality gates
**Main buyer doubt:** N/A (internal tool)
**Proof mechanism:** Gallery of shipped projects using the system

## Visual Thesis
This interface should feel like: A professional design operations command center — clean, structured, authoritative.
This interface must NOT feel like: A generic admin panel or blog template.

## Design System Base
Primary: custom tokens (no base framework override needed for docs)
Reason: This is documentation, not a web app. Design tokens + Tailwind + typography are sufficient.

## Tokens

**Colors:**
- Background: #0a0a0a (near-black)
- Foreground: #fafafa (near-white)
- Accent: #6366f1 (indigo-500) — primary action color
- Accent-secondary: #a78bfa (violet-400)
- Danger: #ef4444
- Success: #22c55e
- Warning: #f59e0b
- Muted: #737373 (neutral-500)
- Surface: #171717 (neutral-900)
- Border: #262626 (neutral-800)

**Typography:**
- Display: Inter (variable, 700 weight)
- Body: Inter (variable, 400 weight)
- Mono: JetBrains Mono (variable, 400-600 weight)
- Reading target: 65-75 characters per line
- Minimum body size: 16px

**Spacing:**
- Base unit: 4px
- Section rhythm: 24px (6 units)
- Card radius: 8px (rounded-lg)
- Border style: solid, 1px

**Motion:**
- Motion library: Motion (for any interactive elements)
- Easing personality: anticipate-overshoot for reveals, smooth ease for transitions
- Reduced motion fallback: Respect prefers-reduced-motion
- Motion must explain: navigation changes, state transitions, content reveals

**3D:**
- No 3D on this project (documentation)

**Accessibility:**
- WCAG target: AA
- Contrast target: 4.5:1 minimum for text
- Keyboard navigation: All interactive elements focusable
- Screen reader notes: Semantic HTML, ARIA labels where needed

## Anti-Generic Gates
- No decorative-only visual flourishes
- No stock imagery
- No motion without purpose
- Documentation-first design
