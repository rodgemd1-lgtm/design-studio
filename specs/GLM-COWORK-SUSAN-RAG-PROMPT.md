You are configuring Susan RAG for Mike Rodgers' Design Studio. Use Ollama Cloud GLM 5.1.

PROBLEM:
Susan MCP tools return "supabase_url is required" when called. The ingestion script at ~/design-studio/scripts/ingest-ux-knowledge.sh is ready but Susan's environment isn't configured.

WHERE SUSAN LIVES:
~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/

YOUR JOB — DO THESE IN ORDER:

1. FIND AND FIX SUSAN'S ENV CONFIG
Look for: .env, config.yaml, or environment variables in ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/
Find where supabase_url and supabase_key should be set
Set them to whatever project Susan uses (it's NOT the design-studio project — Susan has its own Supabase)
Find the right project ref by checking: supabase projects list

2. VERIFY SUSAN WORKS
Run: cd ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend && ./.venv/bin/python scripts/susan_cli.py status
If it fails, fix the config and retry

3. INGEST THESE 8 FILES INTO SUSAN RAG
Company: design-studio
Data type: ux_research

Files to ingest (in priority order):
  ~/design-studio/mining/ux-design-scraper/src/shared/ux-knowledge-base.ts
  ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_UI_DESIGN_RESOURCES.md
  ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_INTERACTION_DESIGN_PRINCIPLES.md
  ~/Desktop/Startup-Intelligence-OS/docs/research/world-class-dashboard-ui-research.md
  ~/Desktop/Startup-Intelligence-OS/design-systems/RIG-DESIGN.md
  ~/design-studio/MINED_METHODOLOGIES.md
  ~/design-studio/mining/ux-design-scraper/src/shared/workflow-types.ts
  ~/design-studio/mining/ux-design-scraper/src/shared/workflow-constants.ts

For each file, first chunk it (500-1000 char chunks with overlap), then push to Susan's pgvector table.

4. CREATE DAILY INGESTION CRON
After the 8 AM MT scrapers finish, auto-ingest new daily hunt files into Susan RAG.
Add this as a cron job scheduled at 0 15 * * * (8:15 AM MT, after all 5 scrapers + dashboard refresh)

5. DOCUMENT EVERYTHING
Write exactly what you did to: ~/design-studio/specs/SUSAN-RAG-SETUP.md
Include: which Supabase project Susan uses, how env was configured, what worked, what failed

DESIGN STUDIO CONTEXT:
- Dashboard: https://design-studio-dashboard.vercel.app
- 7 daily cron jobs run at 8 AM MT
- UX Design Scraper v4.0.0 Chrome extension at ~/design-studio/extensions/ux-design-scraper/
- Design Studio Supabase: ref oxzxjrbeauekwgojnvwo, password 97i75Cn0LqnA1Y1U (this is NOT Susan's project)
