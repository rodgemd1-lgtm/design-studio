-- RIG Design Studio — Supabase Schema
-- This database stores design system metadata, component registries,
-- token definitions, and project configurations.

-- ============================================================
-- PROJECTS
-- Each design project (RIG site, TransformFit, Ideawake, etc.)
-- gets a row here with its design system binding.
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  design_system_base TEXT NOT NULL DEFAULT 'shadcn',
  -- e.g. 'shadcn', 'mui', 'ant', 'carbon', 'polaris'
  framework TEXT NOT NULL DEFAULT 'nextjs',
  -- e.g. 'nextjs', 'vite', 'remix'
  repo_url TEXT,
  deploy_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  -- 'active', 'archived', 'planned'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DESIGN SYSTEMS
-- Registry of external design systems we reference.
-- ============================================================
CREATE TABLE IF NOT EXISTS design_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  version TEXT,
  license TEXT,
  url TEXT,
  npm_package TEXT,
  install_cmd TEXT,
  -- e.g. 'npm install @mui/material @emotion/react'
  tokens_json JSONB,
  -- Full token set as JSON (colors, spacing, typography, shadows)
  component_count INTEGER,
  accessibility_rating TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DESIGN TOKENS
-- Per-project design tokens. Tokens override the base design system.
-- ============================================================
CREATE TABLE IF NOT EXISTS design_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  token_group TEXT NOT NULL,
  -- 'color', 'spacing', 'typography', 'shadow', 'radius', 'breakpoint'
  token_name TEXT NOT NULL,
  token_value TEXT NOT NULL,
  -- CSS value: hex, rem, px, CSS custom property reference, etc.
  css_variable TEXT,
  -- e.g. '--color-bg-primary'
  description TEXT,
  token_category TEXT,
  -- Within group: e.g. 'primary', 'neutral', 'danger' for colors
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, token_group, token_name)
);

-- ============================================================
-- COMPONENT REGISTRY
-- Owned components — one row per component variant.
-- Links to source code file.
-- ============================================================
CREATE TABLE IF NOT EXISTS component_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  component_name TEXT NOT NULL,
  component_type TEXT NOT NULL DEFAULT 'ui',
  -- 'ui', 'layout', 'form', 'navigation', 'overlay', 'data'
  source_path TEXT,
  -- relative path in the project: 'src/components/ui/button.tsx'
  props_json JSONB,
  -- props interface as JSON
  variants JSONB,
  -- variant definitions: [{name:'primary', tokens:{}}]
  dependencies TEXT[],
  -- npm packages this component depends on
  accessibility_notes TEXT,
  has_tests BOOLEAN DEFAULT FALSE,
  has_stories BOOLEAN DEFAULT FALSE,
  is_primitive BOOLEAN DEFAULT FALSE,
  -- true if this is a Radix / shadcn base component
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INSPIRATION SOURCES
-- Curated list of design references with notes on what to learn.
-- ============================================================
CREATE TABLE IF NOT EXISTS inspiration_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  -- 'landing_page', 'app_ux', 'animation', 'component', 'font', 'color'
  tags TEXT[],
  notes TEXT,
  what_to_learn TEXT,
  pricing TEXT,
  -- 'free', 'freemium', 'paid'
  priority INTEGER DEFAULT 3,
  -- 1-5, 5 = highest priority reference
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- FONT REGISTRY
-- Approved font families with usage rules per context.
-- ============================================================
CREATE TABLE IF NOT EXISTS font_registry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  -- 'sans', 'serif', 'mono', 'display', 'handwriting'
  license TEXT,
  weights_available TEXT[],
  is_variable BOOLEAN DEFAULT FALSE,
  npm_package TEXT,
  -- '@fontsource/inter'
  css_import TEXT,
  -- Google Fonts URL
  recommended_usage TEXT,
  -- 'body', 'headline', 'code', 'accent'
  pairing_suggestions TEXT[],
  -- font names that pair well
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes (performance)
-- ============================================================
CREATE INDEX idx_tokens_project ON design_tokens(project_id);
CREATE INDEX idx_tokens_group ON design_tokens(project_id, token_group);
CREATE INDEX idx_components_project ON component_registry(project_id);
CREATE INDEX idx_inspiration_category ON inspiration_sources(category);
CREATE INDEX idx_inspiration_priority ON inspiration_sources(priority DESC);
CREATE INDEX idx_fonts_category ON font_registry(category);
CREATE INDEX idx_fonts_usage ON font_registry(recommended_usage);

-- ============================================================
-- Updated-at trigger helper
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER components_updated_at
  BEFORE UPDATE ON component_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
