#!/usr/bin/env python3
"""
Design Studio Dashboard Generator
Generates a daily HTML dashboard from all pipeline outputs.
Run after the 5 daily cron jobs complete. Outputs to ~/design-studio/dashboard/.
"""

import os, json, glob, time
from datetime import datetime, timedelta

DS = os.path.expanduser("~/design-studio")
DASHBOARD_DIR = os.path.join(DS, "dashboard")
os.makedirs(DASHBOARD_DIR, exist_ok=True)

VAULT = os.path.expanduser("~/rig-os-design-assets")
INSPO_DIR = os.path.join(VAULT, "inspiration")
TODAY = datetime.now().strftime("%Y-%m-%d")
TODAY_STR = datetime.now().strftime("%A, %B %d, %Y")

# ── Data collectors ──

def get_inspiration():
    f = os.path.join(INSPO_DIR, "daily-hunt", f"{TODAY}.md")
    if not os.path.exists(f): return {"count": 0, "sources": []}
    sources = {}
    current = None
    for line in open(f):
        line = line.strip()
        if line.startswith("## "):
            current = line[3:]
            sources[current] = []
        elif line.startswith("- [") and current:
            sources[current].append(line)
    count = sum(len(v) for v in sources.values())
    return {"count": count, "sources": sources, "file": f}

def get_spline():
    f = os.path.join(INSPO_DIR, "daily-hunt", f"spline-{TODAY}.md")
    if not os.path.exists(f): return {"count": 0}
    cnt = 0
    for line in open(f):
        if line.startswith("- [3d_scene]"):
            cnt += 1
    return {"count": cnt, "file": f}

def get_mobbin():
    f = os.path.join(INSPO_DIR, "daily-hunt", f"mobbin-{TODAY}.md")
    if not os.path.exists(f): return {"count": 0}
    cnt = 0
    for line in open(f):
        if line.startswith("- ["):
            cnt += 1
    return {"count": cnt, "file": f}

def get_oss():
    today_files = glob.glob(os.path.join(VAULT, "open-source", "daily-hunt", f"{TODAY}*"))
    if not today_files: return {"count": 0, "categories": {}}
    f = today_files[0]
    cats = {}
    current = None
    for line in open(f):
        line = line.strip()
        if line.startswith("### "):
            current = line[4:]
            cats[current] = 0
        elif line.startswith("- [") and current:
            cats[current] += 1
    total = sum(cats.values())
    return {"count": total, "categories": cats, "file": f}

def get_scout():
    f = os.path.join(INSPO_DIR, "design-scout", f"{TODAY}.md")
    if not os.path.exists(f): return {"competitors": 0, "patterns": []}
    comp_count = 0
    patterns = []
    in_table = False
    for line in open(f):
        line = line.strip()
        if "Competitor Design Signals" in line:
            in_table = True
            continue
        if in_table and line.startswith("|") and "Company" not in line and "---" not in line:
            parts = [p.strip() for p in line.split("|")[1:-1]]
            if len(parts) >= 3:
                comp_count += 1
        if line.startswith("- live:") or line.startswith("- offline:"):
            patterns.append(line)
    return {"competitors": comp_count, "patterns": patterns, "file": f}

def get_process_upgrades():
    """Track process upgrades from mined methodologies and new capabilities."""
    upgrades = []
    if os.path.exists(os.path.join(DS, "MINED_METHODOLOGIES.md")):
        upgrades.append({
            "date": "2026-05-06",
            "name": "3-Repo Methodology Mining",
            "description": "Extracted processes from SIO, RIG Business Studio, UX Design Scraper",
            "impact": "High",
            "status": "deployed"
        })
    for script in ["spline-scraper.py", "mobbin-scraper.py", "design-scout.py", "godly-scraper.py"]:
        if os.path.exists(os.path.expanduser(f"~/.hermes/scripts/{script}")):
            upgrades.append({
                "date": "2026-05-06",
                "name": f"{script.replace('.py','').replace('-',' ').title()}",
                "description": "Autonomous daily scraping pipeline",
                "impact": "High",
                "status": "deployed"
            })
    if os.path.exists(os.path.join(DS, "extensions", "ux-design-scraper", "manifest.json")):
        upgrades.append({
            "date": "2026-05-06",
            "name": "UX Design Scraper Extension",
            "description": "Chrome extension with 7-phase design workflow, Claude integration",
            "impact": "Critical",
            "status": "built (load manually)"
        })
    return upgrades

# ── Dashboard HTML ──

def build_dashboard():
    inspo = get_inspiration()
    spline = get_spline()
    mobbin = get_mobbin()
    oss = get_oss()
    scout = get_scout()
    upgrades = get_process_upgrades()
    
    # Calculate total signals
    total_signals = inspo["count"] + spline["count"] + mobbin["count"] + oss["count"] + scout["competitors"]
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Design Studio — Daily Dashboard</title>
<style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ background:#0a0a0f; color:#e0e0e0; font-family:'Inter',-apple-system,sans-serif; line-height:1.5; }}
.header {{ background:linear-gradient(135deg,#1a1a2e,#0f0f23); padding:2rem; border-bottom:1px solid #2a2a3e; }}
.header h1 {{ font-size:2rem; font-weight:700; color:#fff; }}
.header .date {{ color:#888; margin-top:0.25rem; }}
.metrics {{ display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:1rem; padding:1.5rem 2rem; background:#111118; border-bottom:1px solid #1a1a2e; }}
.metric {{ background:#181825; border-radius:10px; padding:1.25rem; text-align:center; border:1px solid #2a2a3e; }}
.metric .value {{ font-size:2.5rem; font-weight:800; color:#6366f1; }}
.metric .label {{ font-size:0.8rem; color:#888; text-transform:uppercase; letter-spacing:1px; margin-top:0.25rem; }}
.grid {{ display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; padding:1.5rem 2rem; }}
@media(max-width:900px){{ .grid {{ grid-template-columns:1fr; }} }}
.card {{ background:#111118; border-radius:12px; border:1px solid #2a2a3e; overflow:hidden; }}
.card-header {{ background:#181825; padding:1rem 1.25rem; border-bottom:1px solid #2a2a3e; font-weight:600; color:#fff; font-size:0.95rem; }}
.card-body {{ padding:1.25rem; }}
.source-row {{ display:flex; justify-content:space-between; padding:0.4rem 0; border-bottom:1px solid #1a1a2e; font-size:0.9rem; }}
.source-row:last-child {{ border-bottom:none; }}
.source-name {{ color:#ccc; }}
.source-count {{ color:#6366f1; font-weight:600; }}
.url-list {{ font-size:0.8rem; color:#aaa; max-height:300px; overflow-y:auto; }}
.url-list div {{ padding:0.3rem 0; border-bottom:1px solid #16161e; word-break:break-all; }}
.upgrade {{ display:flex; align-items:center; gap:0.75rem; padding:0.6rem 0; border-bottom:1px solid #1a1a2e; font-size:0.85rem; }}
.upgrade:last-child {{ border-bottom:none; }}
.badge {{ padding:2px 8px; border-radius:4px; font-size:0.7rem; font-weight:600; }}
.badge-critical {{ background:#7c3aed; color:#fff; }}
.badge-high {{ background:#059669; color:#fff; }}
.badge-deploy {{ background:#2563eb; color:#fff; }}
.badge-built {{ background:#d97706; color:#fff; }}
.competitor {{ padding:0.35rem 0; font-size:0.85rem; border-bottom:1px solid #1a1a2e; color:#bbb; }}
.footer {{ text-align:center; padding:2rem; color:#555; font-size:0.8rem; }}
.refresh {{ color:#6366f1; }}
</style>
</head>
<body>

<div class="header">
  <h1>Design Studio Dashboard</h1>
  <div class="date">{TODAY_STR} · {datetime.now().strftime('%H:%M %Z')}</div>
</div>

<div class="metrics">
  <div class="metric">
    <div class="value">{total_signals}</div>
    <div class="label">Total Signals</div>
  </div>
  <div class="metric">
    <div class="value">{inspo['count']}</div>
    <div class="label">Design Inspiration</div>
  </div>
  <div class="metric">
    <div class="value">{spline['count']}</div>
    <div class="label">3D Scenes</div>
  </div>
  <div class="metric">
    <div class="value">{oss['count']}</div>
    <div class="label">OSS Repos</div>
  </div>
  <div class="metric">
    <div class="value">{scout['competitors']}</div>
    <div class="label">Competitors Tracked</div>
  </div>
  <div class="metric">
    <div class="value">{mobbin['count']}</div>
    <div class="label">UX Flows</div>
  </div>
</div>

<div class="grid">
  <!-- Inspiration Sources -->
  <div class="card">
    <div class="card-header">Design Inspiration Sources</div>
    <div class="card-body">"""
    
    for source, items in sorted(inspo.get("sources", {}).items()):
        count = len(items)
        html += f'<div class="source-row"><span class="source-name">{source}</span><span class="source-count">{count}</span></div>'
    
    if not inspo.get("sources"):
        html += '<div style="color:#666;">No inspiration data yet — fires at 8 AM MT</div>'
    
    html += """</div></div>

  <!-- OSS Categories -->
  <div class="card">
    <div class="card-header">Open Source Discoveries</div>
    <div class="card-body">"""
    
    for cat, count in sorted(oss.get("categories", {}).items()):
        html += f'<div class="source-row"><span class="source-name">{cat}</span><span class="source-count">{count}</span></div>'
    
    if not oss.get("categories"):
        html += '<div style="color:#666;">No OSS data</div>'
    
    html += """</div></div>

  <!-- Competitor Signals -->
  <div class="card">
    <div class="card-header">Competitor Design Landscape</div>
    <div class="card-body">"""
    
    if scout.get("patterns"):
        for p in scout["patterns"][:6]:
            html += f'<div class="competitor">{p}</div>'
    
    # Add competitor tech signal summary
    competitor_signals = {
        "Figma": "Next.js, Tailwind, React, FM, 3D",
        "Linear": "Next.js, React, 3D, CSS Vars",
        "Stripe": "Next.js, React, 3D, CSS Vars",
        "Vercel": "Next.js, Tailwind, React",
        "Notion": "Next.js, React, 3D",
        "Raycast": "Next.js, Tailwind, React, FM",
        "Arc": "Next.js, CSS Vars",
        "Replit": "Next.js, React",
    }
    for comp, tech in competitor_signals.items():
        html += f'<div class="source-row"><span class="source-name">{comp}</span><span style="color:#888;font-size:0.8rem;">{tech}</span></div>'
    
    html += """</div></div>

  <!-- Process Upgrades Tracker -->
  <div class="card">
    <div class="card-header">Process Upgrades</div>
    <div class="card-body">"""
    
    for u in upgrades:
        badge_class = "badge-" + ("critical" if u["impact"] == "Critical" else "high")
        status_class = "badge-" + ("deploy" if u["status"] == "deployed" else "built")
        html += f'''<div class="upgrade">
          <span class="badge {badge_class}">{u["impact"]}</span>
          <span class="badge {status_class}">{u["status"]}</span>
          <div>
            <strong>{u["name"]}</strong>
            <div style="color:#888;font-size:0.75rem;">{u["description"]}</div>
          </div>
        </div>'''
    
    html += """</div></div>

  <!-- Today's URLs -->
  <div class="card">
    <div class="card-header">Today's Discovered URLs</div>
    <div class="card-body url-list">"""
    
    for source, items in sorted(inspo.get("sources", {}).items()):
        for item in items[:5]:
            url = item.split("] ")[1] if "] " in item else item
            html += f'<div><span style="color:#6366f1;">[{source}]</span> {url}</div>'
    
    for entry in []:  # spline entries - skip for now since URLs are broken
        pass
    
    if not inspo.get("sources"):
        html += '<div style="color:#666;">No URLs yet</div>'
    
    html += f"""</div></div>

  <!-- Quick Actions -->
  <div class="card">
    <div class="card-header">Actions &amp; Next Steps</div>
    <div class="card-body">
      <div class="upgrade">
        <span class="badge badge-critical">TODO</span>
        <div>
          <strong>Load Chrome Extension</strong>
          <div style="color:#888;">chrome://extensions → Developer → Load unpacked → ~/design-studio/extensions/ux-design-scraper</div>
        </div>
      </div>
      <div class="upgrade">
        <span class="badge badge-high">TODO</span>
        <div>
          <strong>Ingest UX Knowledge into Susan RAG</strong>
          <div style="color:#888;">Run: ~/design-studio/scripts/ingest-ux-knowledge.sh</div>
        </div>
      </div>
      <div class="upgrade">
        <span class="badge badge-high">FIX</span>
        <div>
          <strong>Spline URL Extraction</strong>
          <div style="color:#888;">Browser returns markdown with escaped newlines — need parser fix</div>
        </div>
      </div>
      <div class="upgrade">
        <span class="badge badge-high">FIX</span>
        <div>
          <strong>Mobbin Login Wall</strong>
          <div style="color:#888;">Google OAuth failing in headless — try cookie-based auth</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="footer">
  <span class="refresh">↻ Next refresh: Tomorrow 8:00 AM MT</span><br>
  Design Studio · Jake-powered · v1.0 · {TODAY}
</div>

</body>
</html>"""
    
    output = os.path.join(DASHBOARD_DIR, "index.html")
    with open(output, "w") as f:
        f.write(html)
    
    # Also save today's snapshot
    snapshot = os.path.join(DASHBOARD_DIR, f"{TODAY}.html")
    with open(snapshot, "w") as f:
        f.write(html)
    
    print(f"Dashboard: {output}")
    print(f"Signals: {total_signals} (Inspo:{inspo['count']} Spline:{spline['count']} Mobbin:{mobbin['count']} OSS:{oss['count']} Scout:{scout['competitors']})")
    return output

if __name__ == "__main__":
    build_dashboard()
