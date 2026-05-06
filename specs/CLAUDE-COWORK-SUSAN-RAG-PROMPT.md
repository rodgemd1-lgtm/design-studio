You are configuring the Susan RAG environment for Mike Rodgers' Design Studio ingestion pipeline.

CONTEXT:
Mike has a Design Studio system that scrapes design inspiration, 3D scenes, UX flows, and competitor patterns daily. The UX Design Scraper Chrome extension and daily pipelines generate data that needs to be ingested into Susan's RAG (94K+ chunks in Supabase pgvector) so AI agents can query design patterns.

WHAT NEEDS TO HAPPEN:
The ingestion script is built at ~/design-studio/scripts/ingest-ux-knowledge.sh but Susan MCP tools return "supabase_url is required" errors. Susan needs proper environment configuration.

FILES TO INGEST (once Susan is configured):
1. ~/design-studio/mining/ux-design-scraper/src/shared/ux-knowledge-base.ts (206KB UX knowledge base)
2. ~/design-studio/mining/ux-design-scraper/src/shared/workflow-types.ts (7-phase workflow definitions)
3. ~/design-studio/mining/ux-design-scraper/src/shared/workflow-constants.ts (design constants)
4. ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_UI_DESIGN_RESOURCES.md (33KB design resources)
5. ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_INTERACTION_DESIGN_PRINCIPLES.md (41KB design principles)
6. ~/Desktop/Startup-Intelligence-OS/docs/research/world-class-dashboard-ui-research.md (40KB dashboard research)
7. ~/Desktop/Startup-Intelligence-OS/design-systems/RIG-DESIGN.md (RIG brand tokens)
8. ~/design-studio/MINED_METHODOLOGIES.md (compiled methodology report)

SUSAN LOCATION:
~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/

WHAT TO FIX:
1. Find where Susan's environment variables are configured (.env, config.yaml, etc.)
2. Ensure supabase_url, supabase_key (service_role), and any other required vars are set
3. Verify Susan can connect by running: cd susan-team-architect/backend && ./.venv/bin/python scripts/susan_cli.py status
4. Test ingestion with one file first: ./.venv/bin/python scripts/susan_cli.py scrape url --file [one_markdown_file] --company design-studio --data-type ux_research
5. If scrape url doesn't support local files, use the MCP scrape_url tool or write a Python script that reads the file and pushes chunks to Susan's pgvector table directly

SUPABASE DETAILS:
- Design Studio project ref: oxzxjrbeauekwgojnvwo
- DB Host: db.oxzxjrbeauekwgojnvwo.supabase.co
- DB Password: 97i75Cn0LqnA1Y1U
- Connection: postgresql://postgres.oxzxjrbeauekwgojnvwo:97i75Cn0LqnA1Y1U@aws-1-us-west-2.pooler.supabase.com:6543/postgres
- Susan uses its own Supabase project (not this one) — find which one and verify connectivity

DESIGN STUDIO DASHBOARD:
Live at https://design-studio-dashboard.vercel.app
Refreshes daily at 8:15 AM MT

OUTCOME:
After this is done, the Design Studio slash commands (/design, /review, /ux-test) should be able to query Susan RAG for relevant UX patterns when Mike asks about building websites or apps. The daily ingestion should be added as a cron job that runs after the 5 daily scrapers complete.
