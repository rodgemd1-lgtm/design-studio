"use client";

import { useState } from "react";

interface Props {
  data: any;
}

type Section = "dashboard" | "sites" | "videos" | "repos" | "tokens" | "techniques" | "snippets" | "kanban" | "provocations" | "scoring" | "forbidden";

const NAV: { id: Section; label: string; icon: string; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "sites", label: "Site Extractions", icon: "◉", badge: "8" },
  { id: "videos", label: "YouTube Videos", icon: "▶", badge: "2479" },
  { id: "repos", label: "GitHub Repos", icon: "◫", badge: "20" },
  { id: "tokens", label: "Design Tokens", icon: "◑" },
  { id: "techniques", label: "Techniques", icon: "◐", badge: "11" },
  { id: "snippets", label: "Code Snippets", icon: "⟨/⟩" },
  { id: "kanban", label: "Product Studio", icon: "⊞" },
  { id: "provocations", label: "Provocations", icon: "?", badge: "100" },
  { id: "scoring", label: "Score Design", icon: "◈" },
  { id: "forbidden", label: "Forbidden", icon: "✕" },
];

export default function DashboardContent({ data }: Props) {
  const [section, setSection] = useState<Section>("dashboard");
  const [search, setSearch] = useState("");
  const [scoreInput, setScoreInput] = useState("");
  const [scoreResult, setScoreResult] = useState<string | null>(null);

  const siteCount = Object.keys(data.sites || {}).length;
  const videoCount = data.youtube?.total_videos || 0;
  const repoCount = data.github?.repos_processed || 0;
  const animCount = data.github?.repos?.reduce((s: number, r: any) => s + r.animation_count, 0) || 0;
  const compCount = data.github?.repos?.reduce((s: number, r: any) => s + r.components.length, 0) || 0;
  const techCount = new Set(Object.values(data.sites || {}).flatMap((s: any) => s.techniques)).size;
  const toolCount = (data.youtube?.tools || []).length;

  const allVideos = data.youtube?.recent_videos || [];
  const filteredVideos = search
    ? allVideos.filter((v: any) => v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase()))
    : allVideos;

  const allTechniques = [...new Set(Object.values(data.sites || {}).flatMap((s: any) => s.techniques))];
  const techCounts = allTechniques.map(t => ({
    name: t,
    count: Object.values(data.sites || {}).filter((s: any) => s.techniques.includes(t)).length,
    desc: ({ glassmorphism: "Backdrop blur + transparency", neumorphism: "Soft shadows + inset lighting", parallax: "Scroll-driven depth layers", webgl: "GPU-accelerated 3D", canvas_animation: "Programmatic drawing", container_queries: "Component-level responsive", dark_mode: "First-class dark theme", micro_interaction: "Hover/tap/click feedback", sticky_header: "Position sticky navigation", masonry: "Pinterest-style layout", horizontal_scroll: "Sideways scroll sections" } as Record<string, string>)[t] || "Detected via code analysis",
  }));

  const runScore = () => {
    if (!scoreInput.trim()) return;
    const words = scoreInput.split(/\s+/).length;
    const sentences = scoreInput.split(/[.!?]+/).filter((s: string) => s.trim()).length;
    const avgLen = words / Math.max(sentences, 1);
    const forbidden = ["excited to share","game changer","paradigm shift","deep dive","level up","let me know your thoughts","agree?","thoughts?"];
    const hits = forbidden.filter(f => scoreInput.toLowerCase().includes(f));
    const restraint = Math.max(0, 1 - avgLen / 25);
    const craft = Math.min(1, restraint * 1.2);
    const bdf = (craft * 10 - 5) * (hits.length > 0 ? 0.5 : 1);
    setScoreResult(`Words: ${words} | Avg: ${avgLen.toFixed(1)} | Craft: ${(craft*100).toFixed(0)}% | BDF: ${bdf.toFixed(1)} ${bdf >= 8 ? "PASS" : "FAIL"}${hits.length ? " | Forbidden: " + hits.join(",") : ""}`);
  };

  const PROVOCATIONS = [
    { cat: "ORTHODOXY", q: "Why do we still build design systems as component libraries instead of token pipelines?" },
    { cat: "WOUND", q: "Why does every design system migration take 18+ months?" },
    { cat: "VOCABULARY", q: "What if 'design system' is actually 'design bureaucracy'?" },
    { cat: "VILLAIN", q: "Who profits from design system complexity staying high?" },
    { cat: "PROOF GAP", q: "Where's the evidence that design systems reduce development time?" },
    { cat: "FORMAT", q: "Why does every case study follow the same format?" },
    { cat: "ADJACENT", q: "What if we designed like architects — form follows function, always?" },
    { cat: "MOTION", q: "Why do we animate everything instead of only what communicates?" },
    { cat: "TOKENS", q: "Why do we name colors by their value instead of their purpose?" },
    { cat: "PROCESS", q: "Why do we ship without measuring?" },
  ];

  const NODE_COUNT = 93; // shown in sidebar

  return (<>
    {/* Only show nav + dashboard content when on dashboard */}
    {section === "dashboard" && (<>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Design Intelligence Dashboard</h1>
          <p className="text-sm text-[#8a8a9a] mt-1">Live data — {NODE_COUNT} design intelligence nodes</p>
        </div>
        <input type="search" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
          className="bg-[#141418] border border-[#2a2a32] rounded-lg px-4 py-2 text-sm w-[260px] focus:outline-none focus:border-[#0d9488]" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[ [videoCount.toLocaleString(), "YouTube Videos", `${data.youtube?.channels || 0} channels`, "#0d9488"],
          [String(siteCount), "Sites Extracted", `${animCount + compCount} items`, "#3b82f6"],
          [String(repoCount), "GitHub Repos", `${animCount} animations`, "#a855f7"],
          [String(techCount), "Techniques", `${toolCount} tools`, "#d97706"],
          ["161", "Susan Chunks", "design-studio RAG", "#22c55e"],
        ].map(([v,l,s,c], i) => (
          <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
            <div className="text-2xl font-bold" style={{color:c}}>{v}</div>
            <div className="text-xs text-[#8a8a9a] mt-1">{l}</div>
            <div className="text-[10px] text-[#22c55e] mt-0.5">{s}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Videos */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">▶ Recent YouTube Videos</h2>
          {filteredVideos.slice(0, 6).map((v: any, i: number) => (
            <a key={i} href={v.url} target="_blank" className="flex gap-3 p-2.5 rounded-lg hover:bg-[#1c1c22] transition-colors mb-1">
              <div className="w-[90px] h-[50px] bg-[#1c1c22] rounded flex items-center justify-center flex-shrink-0 text-sm">▶</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{v.title}</div>
                <div className="text-xs text-[#8a8a9a] mt-0.5">{v.channel}</div>
                {v.tools?.length > 0 && <div className="flex gap-1 mt-1.5">{v.tools.map((t: string, j: number) => <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[#1c1c22] text-[#0d9488] border border-[#2a2a32]">{t}</span>)}</div>}
              </div>
            </a>
          ))}
        </div>

        {/* Sites */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">◉ Site Extractions</h2>
          {Object.entries(data.sites || {}).slice(0, 5).map(([name, s]: [string, any]) => (
            <div key={name} className="mb-4 pb-4 border-b border-[#2a2a32] last:border-0">
              <div className="flex justify-between items-start mb-1">
                <div><div className="text-sm font-semibold">{name}</div><div className="text-[10px] text-[#8a8a9a] font-mono">{s.url}</div></div>
                <span className="text-lg font-bold text-[#0d9488]">{s.total}</span>
              </div>
              <div className="flex gap-1 mb-1.5">{(s.colors || []).slice(0, 5).map((c: string, i: number) => <div key={i} className="w-4 h-4 rounded" style={{background:c}} title={c} />)}</div>
              <div className="flex gap-1 flex-wrap">{(s.techniques || []).map((t: string, i: number) => <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(13,148,136,0.15)] text-[#0d9488] border border-[rgba(13,148,136,0.3)]">{t.replace(/_/g," ")}</span>)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">◐ Techniques ({techCount})</h2>
          {techCounts.slice(0, 8).map((t, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-[#2a2a32]">
              <div><div className="text-sm font-medium">{t.name.replace(/_/g," ")}</div><div className="text-[10px] text-[#8a8a9a]">{t.desc}</div></div>
              <span className="text-xs text-[#0d9488] font-semibold">{t.count}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h2 className="text-sm font-semibold mb-4">◫ Cloned Repos ({repoCount})</h2>
          {(data.github?.repos || []).slice(0, 6).map((r: any, i: number) => (
            <div key={i} className="flex gap-3 py-2.5 border-b border-[#2a2a32]">
              <div className="w-8 h-8 bg-[#1c1c22] rounded flex items-center justify-center flex-shrink-0 text-xs">◫</div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-[10px] text-[#8a8a9a]">{r.category} · {r.animation_count} anim · {r.components.length} comp</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
        <h2 className="text-sm font-semibold mb-3">🔧 Tools Detected ({toolCount})</h2>
        <div className="flex gap-2 flex-wrap">{(data.youtube?.tools || []).map((t: string, i: number) => <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#1c1c22] text-[#0d9488] border border-[#2a2a32]">{t}</span>)}</div>
      </div>
    </>)}

    {/* SITES */}
    {section === "sites" && (<>
      <h1 className="text-2xl font-semibold mb-6">Site Extractions ({siteCount})</h1>
      {Object.entries(data.sites || {}).map(([name, s]: [string, any]) => (
        <div key={name} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div><div className="text-lg font-semibold">{name}</div><div className="text-xs font-mono text-[#8a8a9a]">{s.url}</div></div>
            <div className="text-right"><div className="text-2xl font-bold text-[#0d9488]">{s.total}</div><div className="text-[10px] text-[#8a8a9a]">items</div></div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-3 text-center">
            <div><div className="text-lg font-bold">{s.animation_count}</div><div className="text-[10px] text-[#8a8a9a]">Animations</div></div>
            <div><div className="text-lg font-bold">{s.gradient_count}</div><div className="text-[10px] text-[#8a8a9a]">Gradients</div></div>
            <div><div className="text-lg font-bold">{s.gsap_count}</div><div className="text-[10px] text-[#8a8a9a]">GSAP</div></div>
            <div><div className="text-lg font-bold">{s.three_count}</div><div className="text-[10px] text-[#8a8a9a]">Three.js</div></div>
          </div>
          <div className="flex gap-1 mb-3">{(s.colors || []).map((c: string, i: number) => <div key={i} className="w-8 h-8 rounded" style={{background:c}} title={c} />)}</div>
          <div className="flex gap-1 flex-wrap">{(s.techniques || []).map((t: string, i: number) => <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[rgba(13,148,136,0.15)] text-[#0d9488]">{t.replace(/_/g," ")}</span>)}</div>
        </div>
      ))}
    </>)}

    {/* VIDEOS */}
    {section === "videos" && (<>
      <h1 className="text-2xl font-semibold mb-6">YouTube Videos ({videoCount})</h1>
      <div className="grid grid-cols-2 gap-4">
        {filteredVideos.map((v: any, i: number) => (
          <a key={i} href={v.url} target="_blank" className="bg-[#141418] border border-[#2a2a32] rounded-lg p-4 hover:border-[#0d9488] transition-colors">
            <div className="flex gap-3">
              <div className="w-[120px] h-[68px] bg-[#1c1c22] rounded flex items-center justify-center flex-shrink-0">▶</div>
              <div><div className="text-sm font-medium">{v.title}</div><div className="text-xs text-[#8a8a9a] mt-1">{v.channel}</div></div>
            </div>
          </a>
        ))}
      </div>
    </>)}

    {/* REPOS */}
    {section === "repos" && (<>
      <h1 className="text-2xl font-semibold mb-6">GitHub Repos ({repoCount})</h1>
      {(data.github?.repos || []).map((r: any, i: number) => (
        <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-4 mb-3 flex gap-4">
          <div className="w-10 h-10 bg-[#1c1c22] rounded-lg flex items-center justify-center flex-shrink-0">◫</div>
          <div className="flex-1">
            <div className="text-sm font-semibold">{r.name}</div>
            <div className="text-xs text-[#8a8a9a] mb-2">{r.category}</div>
            <div className="flex gap-3 text-[10px] text-[#8a8a9a]"><span>{r.animation_count} animations</span><span>{r.components.length} components</span><span>{r.tokens} tokens</span></div>
            {r.colors?.length > 0 && <div className="flex gap-1 mt-2">{r.colors.slice(0, 6).map((c: string, j: number) => <div key={j} className="w-4 h-4 rounded" style={{background:c}} />)}</div>}
          </div>
        </div>
      ))}
    </>)}

    {/* TECHNIQUES */}
    {section === "techniques" && (<>
      <h1 className="text-2xl font-semibold mb-6">Design Techniques ({techCount})</h1>
      {techCounts.map((t, i) => (
        <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-semibold">{t.name.replace(/_/g," ")}</div>
            <span className="text-xs text-[#0d9488]">{t.count} sites</span>
          </div>
          <div className="text-sm text-[#8a8a9a]">{t.desc}</div>
        </div>
      ))}
    </>)}

    {/* TOKENS */}
    {section === "tokens" && (<>
      <h1 className="text-2xl font-semibold mb-6">Design Tokens</h1>
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(data.sites || {}).filter(([, s]: [string, any]) => s.colors?.length > 0).map(([name, s]: [string, any]) => (
          <div key={name} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">{name}</div>
            <div className="flex gap-2 flex-wrap">
              {(s.colors || []).map((c: string, i: number) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-lg mb-1" style={{background:c}} />
                  <div className="text-[9px] font-mono text-[#8a8a9a]">{c}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>)}

    {/* SNIPPETS */}
    {section === "snippets" && (<>
      <h1 className="text-2xl font-semibold mb-6">Code Snippets</h1>
      {[
        { title: "Linear — Grid Dot Animation", code: "@keyframes grid-dot-agent {\n  0% { opacity: 0; transform: scale(0); }\n  50% { opacity: 1; transform: scale(1.2); }\n  100% { opacity: 0.3; transform: scale(1); }\n}" },
        { title: "Raycast — Gradient Mesh", code: ".hero-gradient {\n  background: \n    linear-gradient(138deg, rgba(32,35,91,0.7) 22%, rgba(7,9,33,0.7) 82%),\n    radial-gradient(94% 78% at 50% 30%, rgba(43,94,180,0.7), rgba(13,16,35,0.42));\n}" },
        { title: "Stripe — Sticky Header", code: ".sticky-header {\n  position: sticky; top: 0; z-index: 100;\n  backdrop-filter: blur(20px) saturate(180%);\n  background: rgba(255, 255, 255, 0.85);\n}" },
        { title: "GSAP — Horizontal Scroll", code: "gsap.to('.section', {\n  xPercent: -100 * (sections.length - 1),\n  ease: 'none',\n  scrollTrigger: { trigger: '.container', pin: true, scrub: 1 }\n});" },
      ].map((s, i) => (
        <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5 mb-4">
          <div className="text-sm font-semibold mb-3">{s.title}</div>
          <pre className="bg-[#0a0a0c] border border-[#2a2a32] rounded-lg p-4 text-xs font-mono text-[#8a8a9a] overflow-x-auto whitespace-pre-wrap">{s.code}</pre>
        </div>
      ))}
    </>)}

    {/* KANBAN */}
    {section === "kanban" && (<>
      <h1 className="text-2xl font-semibold mb-6">Product Studio — Kanban</h1>
      <iframe src="http://localhost:7843/kanban" className="w-full h-[600px] rounded-lg border border-[#2a2a32]" title="Kanban" />
    </>)}

    {/* PROVOCATIONS */}
    {section === "provocations" && (<>
      <h1 className="text-2xl font-semibold mb-6">Design Provocations</h1>
      {PROVOCATIONS.map((p, i) => (
        <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-4 mb-3">
          <div className="text-[9px] uppercase tracking-wider text-[#d97706] mb-1">{p.cat}</div>
          <div className="text-sm font-medium">{p.q}</div>
        </div>
      ))}
    </>)}

    {/* SCORING */}
    {section === "scoring" && (<>
      <h1 className="text-2xl font-semibold mb-6">Score a Design</h1>
      <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
        <textarea value={scoreInput} onChange={e => setScoreInput(e.target.value)} placeholder="Paste your design copy..."
          className="w-full h-[200px] bg-[#0a0a0c] border border-[#2a2a32] rounded-lg p-4 text-sm resize-y focus:outline-none focus:border-[#0d9488]" />
        <button onClick={runScore} className="mt-4 bg-[#0d9488] text-[#0a0a0c] px-4 py-2 rounded-lg text-sm font-medium">Score</button>
        {scoreResult && <div className="mt-4 p-4 bg-[#0a0a0c] border border-[#2a2a32] rounded-lg text-sm font-mono">{scoreResult}</div>}
      </div>
    </>)}

    {/* FORBIDDEN */}
    {section === "forbidden" && (<>
      <h1 className="text-2xl font-semibold mb-6">Forbidden List</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">Phrases</h3>
          {(data.forbidden?.phrases || []).map((p: string, i: number) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{p}</div>)}
        </div>
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">Formats</h3>
          {(data.forbidden?.formats || []).map((f: string, i: number) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{f}</div>)}
        </div>
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">CTAs</h3>
          {(data.forbidden?.ctas || []).map((c: string, i: number) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{c}</div>)}
        </div>
      </div>
    </>)}
  </>);
}