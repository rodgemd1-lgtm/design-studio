-- Seed data: design systems reference
INSERT INTO design_systems (name, slug, license, url, npm_package, install_cmd, component_count) VALUES
  ('shadcn/ui', 'shadcn-ui', 'MIT', 'https://ui.shadcn.com', 'shadcn', 'npx shadcn@latest init', 52),
  ('Material UI', 'mui', 'MIT', 'https://mui.com', '@mui/material', 'npm i @mui/material @emotion/react @emotion/styled', 120),
  ('Ant Design', 'ant-design', 'MIT', 'https://ant.design', 'antd', 'npm i antd', 65),
  ('Carbon Design System', 'carbon', 'Apache 2.0', 'https://carbondesignsystem.com', '@carbon/react', 'npm i @carbon/react', 90),
  ('Shopify Polaris', 'polaris', 'MIT', 'https://polaris.shopify.com', '@shopify/polaris', 'npm i @shopify/polaris', 75),
  ('Radix UI', 'radix-ui', 'MIT', 'https://radix-ui.com', '@radix-ui/react-dialog', 'npm i @radix-ui/react-dialog', 60),
  ('Lucide', 'lucide', 'ISC', 'https://lucide.dev', 'lucide-react', 'npm i lucide-react', 1000),
  ('Phosphor Icons', 'phosphor', 'MIT', 'https://phosphoricons.com', '@phosphor-icons/react', 'npm i @phosphor-icons/react', 9078),
  ('Heroicons', 'heroicons', 'MIT', 'https://heroicons.com', '@heroicons/react', 'npm i @heroicons/react', 288),
  ('Motion', 'motion', 'MIT', 'https://motion.dev', 'motion', 'npm i motion', 0),
  ('GSAP', 'gsap', 'Standard', 'https://gsap.com', 'gsap', 'npm i gsap', 0),
  ('Three.js', 'threejs', 'MIT', 'https://threejs.org', 'three', 'npm i three', 0);

-- Seed data: font registry
INSERT INTO font_registry (family_name, category, license, weights_available, is_variable, npm_package, recommended_usage, pairing_suggestions) VALUES
  ('Inter', 'sans', 'OFL', ARRAY['100','200','300','400','500','600','700','800','900'], true, '@fontsource/inter', 'body', ARRAY['Playfair Display', 'JetBrains Mono']),
  ('Plus Jakarta Sans', 'sans', 'OFL', ARRAY['200','300','400','500','600','700','800'], true, '@fontsource/plus-jakarta-sans', 'body', ARRAY['Playfair Display', 'IBM Plex Mono']),
  ('Playfair Display', 'serif', 'OFL', ARRAY['400','500','600','700','800','900'], true, '@fontsource/playfair-display', 'headline', ARRAY['Inter', 'DM Sans', 'Source Sans 3']),
  ('DM Sans', 'sans', 'OFL', ARRAY['400','500','700'], false, '@fontsource/dm-sans', 'body', ARRAY['Playfair Display', 'Fraunces']),
  ('JetBrains Mono', 'mono', 'OFL', ARRAY['100','200','300','400','500','600','700','800'], true, '@fontsource/jetbrains-mono', 'code', ARRAY['Inter', 'Plus Jakarta Sans']),
  ('IBM Plex Sans', 'sans', 'OFL', ARRAY['100','200','300','400','500','600','700'], true, '@fontsource/ibm-plex-sans', 'body', ARRAY['IBM Plex Mono', 'Playfair Display']),
  ('IBM Plex Mono', 'mono', 'OFL', ARRAY['100','200','300','400','500','600','700'], false, '@fontsource/ibm-plex-mono', 'code', ARRAY['IBM Plex Sans']),
  ('Source Sans 3', 'sans', 'OFL', ARRAY['200','300','400','500','600','700','800','900'], true, '@fontsource/source-sans-3', 'body', ARRAY['Playfair Display', 'Fraunces']),
  ('Fraunces', 'serif', 'OFL', ARRAY['100','200','300','400','500','600','700','800','900'], true, '@fontsource/fraunces', 'headline', ARRAY['Source Sans 3', 'Inter']),
  ('Satoshi', 'sans', 'OFL', ARRAY['300','400','500','700','900'], false, '@fontsource/satoshi', 'headline', ARRAY['Inter', 'JetBrains Mono']),
  ('Fira Code', 'mono', 'OFL', ARRAY['300','400','500','600','700'], false, '@fontsource/fira-code', 'code', ARRAY['Satoshi', 'Inter']),
  ('Cabinet Grotesk', 'sans', 'OFL', ARRAY['100','200','300','400','500','700','800','900'], false, '@fontsource/cabinet-grotesk', 'headline', ARRAY['Inter', 'DM Sans']);

-- Seed data: inspiration sources
INSERT INTO inspiration_sources (name, url, category, tags, notes, what_to_learn, pricing, priority) VALUES
  ('Godly', 'https://godly.agency', 'landing_page', ARRAY['landing','hero','typography'], 'Curated high-quality landing pages. Updated frequently.', 'Hero section layouts, typography pairings, color usage trends, navigation patterns', 'free', 5),
  ('Lapa Ninja', 'https://www.lapa.ninja', 'landing_page', ARRAY['landing','gallery','responsive'], '1500+ landing page examples. Quick browsing for inspiration.', 'Pricing sections, feature grids, responsive patterns', 'free', 4),
  ('Mobbin', 'https://mobbin.com', 'app_ux', ARRAY['mobile','ux','flows','screenshots'], 'Real app screenshots organized by flow. Best UX reference library.', 'Mobile UX patterns, onboarding flows, form design, navigation patterns', 'freemium', 5),
  ('Refero', 'https://refero.design', 'app_ux', ARRAY['ux','design','research'], 'Real product UX with case study context.', 'Why a design works, flow-level UX, before/after comparisons', 'free', 4),
  ('Awwwards', 'https://www.awwwards.com', 'landing_page', ARRAY['award','trending','animation'], 'Award-winning web design. Can be experimental.', 'Visual boundaries, animation trends, new web design directions', 'free', 3),
  ('SiteInspire', 'https://www.siteinspire.com', 'landing_page', ARRAY['minimal','typography','curated'], 'Clean, curated web design showcase.', 'Minimal layout, typographic hierarchy, content-first design', 'free', 3),
  ('MaxiBestOf', 'https://maxibestof.one', 'landing_page', ARRAY['saas','screenshots','tech-stack'], 'SaaS-specific screenshots with tech stack info.', 'Competitor tech stacks, font identification, pricing benchmarks', 'free', 4),
  ('Codrops', 'https://tympanus.net/codrops', 'animation', ARRAY['webgl','canvas','tutorial'], 'Animation tutorials with live demos.', 'Cutting-edge animation techniques, WebGL effects, interactive experiments', 'free', 3),
  ('GSAP Showcase', 'https://gsap.com/showcase', 'animation', ARRAY['gsap','scroll','timeline'], 'Real sites built with GSAP animation library.', 'Scroll animation, timeline choreography, production motion benchmarks', 'free', 4),
  ('Dribbble', 'https://dribbble.com', 'app_ux', ARRAY['shots','ui','components'], 'Shot-based design community. Good for moodboards.', 'Visual explorations, UI component details, color palettes', 'free', 2),
  ('Behance', 'https://www.behance.net', 'app_ux', ARRAY['portfolio','case-study','process'], 'Portfolio case studies with full process documentation.', 'Design system case studies, rebrand projects, process documentation', 'free', 2);

-- Seed data: initial projects
INSERT INTO projects (name, slug, description, design_system_base, framework, status) VALUES
  ('RIG Main Site', 'rig-main', 'Rodgers Intelligence Group main marketing and sales site', 'shadcn', 'nextjs', 'active'),
  ('TransformFit', 'transformfit', 'Fitness and wellness application', 'shadcn', 'nextjs', 'active'),
  ('Ideawake V3', 'ideawake-v3', 'Agentic Innovation Operating System repositioning', 'shadcn', 'nextjs', 'active'),
  ('Design Studio', 'design-studio', 'RIG design system control plane', 'shadcn', 'nextjs', 'active');
