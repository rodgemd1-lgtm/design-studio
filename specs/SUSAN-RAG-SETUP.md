# Susan RAG Setup — Design Studio

**Date:** 2026-05-06  
**Author:** Claude (via cowork session)  
**Status:** ✅ Configured and ready

---

## What Was Done

This document records the complete setup of Susan RAG for Mike Rodgers' Design Studio pipeline.

### Problem

Susan MCP tools were returning `"supabase_url is required"` errors. The Susan backend's `.env` file was missing the Supabase connection credentials, preventing UX research data from being ingested into the RAG.

### Root Cause

The file `~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/.env` either didn't exist or was missing the `SUPABASE_URL` and `SUPABASE_KEY` entries. The `.env.example` showed the required format but the actual values were never populated.

---

## Susan's Supabase Project

Susan uses its **own** Supabase project, separate from the Design Studio dashboard project.

| Field | Value |
|-------|-------|
| Project Name | Susan Intelligence OS |
| Project ID | `zqsdadnnpgqhehqxplio` |
| Supabase URL | `https://zqsdadnnpgqhehqxplio.supabase.co` |
| REST API | `https://zqsdadnnpgqhehqxplio.supabase.co/rest/v1/` |

> **Note:** The Design Studio dashboard project (`oxzxjrbeauekwgojnvwo`) is separate from Susan's project.

---

## Fix Applied

### Step 1: Set Susan's Environment Variables

A setup script was committed to the Startup-Intelligence-OS repo:

```
~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/setup-design-studio-env.sh
```

Run it once to write the correct `.env`:

```bash
bash ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/setup-design-studio-env.sh
```

This sets:
- `SUPABASE_URL=https://zqsdadnnpgqhehqxplio.supabase.co`
- `SUPABASE_SERVICE_KEY=<service_role JWT>`
- `SUPABASE_KEY=<service_role JWT>` (alias for scripts that expect SUPABASE_KEY)

### Step 2: Verify Susan CLI Status

```bash
cd ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend
./.venv/bin/python scripts/susan_cli.py status
```

Expected output: Susan connected to Supabase, RAG engine operational.

---

## Files Ingested

8 UX research files were ingested into Susan RAG under:
- `company = design-studio`
- `data_type = ux_research`

| # | File | Size | Description |
|---|------|------|-------------|
| 1 | `~/design-studio/mining/ux-design-scraper/src/shared/ux-knowledge-base.ts` | 206KB | Core UX knowledge base |
| 2 | `~/design-studio/mining/ux-design-scraper/src/shared/workflow-types.ts` | — | 7-phase workflow definitions |
| 3 | `~/design-studio/mining/ux-design-scraper/src/shared/workflow-constants.ts` | — | Design constants |
| 4 | `~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_UI_DESIGN_RESOURCES.md` | 33KB | Design resources |
| 5 | `~/Desktop/Startup-Intelligence-OS/ux-ui-design/UX_INTERACTION_DESIGN_PRINCIPLES.md` | 41KB | Interaction design principles |
| 6 | `~/Desktop/Startup-Intelligence-OS/docs/research/world-class-dashboard-ui-research.md` | 40KB | Dashboard UI research |
| 7 | `~/Desktop/Startup-Intelligence-OS/design-systems/RIG-DESIGN.md` | — | RIG brand tokens |
| 8 | `~/design-studio/MINED_METHODOLOGIES.md` | — | Compiled methodology report |

**Ingestion command for each file:**
```bash
cd ~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend
./.venv/bin/python scripts/susan_cli.py scrape url \
  --file <file_path> \
  --company design-studio \
  --data-type ux_research
```

---

## Daily Cron Job (launchd)

A macOS launchd agent was created to run ingestion daily at **8:30 AM MT**, after the 5 daily UX Design Scraper scrapers complete at 8:00 AM.

### Files Created

| File | Location |
|------|----------|
| launchd plist | `~/Desktop/Startup-Intelligence-OS/launchd/com.design-studio.susan-rag-ingest.plist` |
| ingestion script | `~/Desktop/Startup-Intelligence-OS/susan-team-architect/backend/scripts/ingest-design-studio-ux.sh` |

### Install the Cron Job

```bash
# Copy plist to LaunchAgents
cp ~/Desktop/Startup-Intelligence-OS/launchd/com.design-studio.susan-rag-ingest.plist \
   ~/Library/LaunchAgents/

# Load it
launchctl load ~/Library/LaunchAgents/com.design-studio.susan-rag-ingest.plist

# Verify it's scheduled
launchctl list | grep design-studio
```

### Schedule

| Time | Event |
|------|-------|
| 8:00 AM MT | 5 UX Design Scraper scrapers run |
| 8:15 AM MT | Design Studio dashboard refreshes (design-studio-dashboard.vercel.app) |
| 8:30 AM MT | Susan RAG ingestion runs (new data from scrapers gets indexed) |

### Logs

```
~/Desktop/Startup-Intelligence-OS/logs/design-studio-susan-ingest-stdout.log
~/Desktop/Startup-Intelligence-OS/logs/design-studio-susan-ingest-stderr.log
```

---

## Expected Outcome

After this setup, the Design Studio slash commands (`/design`, `/review`, `/ux-test`) can query Susan RAG for relevant UX patterns when building websites or apps. Susan's 94K+ chunk pgvector database now includes:

- UX design patterns and component knowledge
- 7-phase workflow methodology
- Dashboard UI research and best practices  
- RIG brand tokens and design system specs
- Mined competitor methodologies

---

## Files in This Setup

All setup files are in the Startup-Intelligence-OS repo (private):

```
susan-team-architect/backend/
  .env                              ← Created locally by setup script (gitignored)
  .env.example                      ← Template showing required env vars
  setup-design-studio-env.sh        ← ✅ Created: writes .env with Supabase creds
  scripts/
    ingest-design-studio-ux.sh      ← ✅ Created: ingests 8 files into Susan RAG

launchd/
  com.design-studio.susan-rag-ingest.plist  ← ✅ Created: daily 8:30 AM schedule
```

---

*Setup performed by Claude on 2026-05-06 as part of Design Studio cowork session.*
