#!/usr/bin/env python3
"""
Susan RAG Ingestion — UX Knowledge Base
Ingests the UX design scraper knowledge into Susan's RAG.
Run once Susan MCP is configured with proper supabase_url.

Usage:
  cd ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend
  ./.venv/bin/python scripts/susan_cli.py scrape url \
    --file ~/design-studio/mining/ux-design-scraper/src/shared/ux-knowledge-base.ts \
    --company design-studio \
    --data-type ux_research

Or ingest all at once:
  for f in \
    ~/design-studio/mining/ux-design-scraper/src/shared/ux-knowledge-base.ts \
    ~/design-studio/mining/ux-design-scraper/src/shared/workflow-types.ts \
    ~/design-studio/mining/ux-design-scraper/src/shared/workflow-constants.ts \
    ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_UI_DESIGN_RESOURCES.md \
    ~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_INTERACTION_DESIGN_PRINCIPLES.md \
    ~/Desktop/Startup-Intelligence-OS/docs/research/world-class-dashboard-ui-research.md \
    ~/Desktop/Startup-Intelligence-OS/design-systems/RIG-DESIGN.md; do
    echo "Ingesting: $f"
    ./.venv/bin/python scripts/susan_cli.py scrape url --file "$f" --company design-studio --data-type ux_research
  done
"""

print("Susan ingestion script ready.")
print("Run the commands in ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/")
