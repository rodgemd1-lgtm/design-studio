"use client";

import { useState } from "react";

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

export default function PageContents({ section }: { section: string }) {
  const [scoreInput, setScoreInput] = useState("");
  const [scoreResult, setScoreResult] = useState<string | null>(null);

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

  switch (section) {
    case "sites":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Site Extractions</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Reverse-engineered design intelligence</p>
        <div className="bg-[#1c1c22] rounded-lg p-8 text-center">
          <p className="text-[#8a8a9a]">Live data loads on the Dashboard. Navigate back to see all extracted sites.</p>
        </div>
      </>);

    case "videos":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">YouTube Design Videos</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">2,479 videos from 33 channels</p>
        <div className="bg-[#1c1c22] rounded-lg p-8 text-center">
          <p className="text-[#8a8a9a]">Full video browser with search and filters. See Dashboard for recent videos.</p>
        </div>
      </>);

    case "repos":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">GitHub Repos</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">20 repos cloned — 1,017 animations extracted</p>
        <div className="bg-[#1c1c22] rounded-lg p-8 text-center">
          <p className="text-[#8a8a9a]">Full repo browser with code extraction. See Dashboard for top repos.</p>
        </div>
      </>);

    case "tokens":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Design Tokens</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Colors extracted from top sites</p>
        <div className="bg-[#1c1c22] rounded-lg p-8 text-center">
          <p className="text-[#8a8a9a]">Color swatches and typography tokens. See Dashboard for extracted tokens.</p>
        </div>
      </>);

    case "techniques":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Design Techniques</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">11 advanced techniques detected</p>
        <div className="bg-[#1c1c22] rounded-lg p-8 text-center">
          <p className="text-[#8a8a9a]">Glassmorphism, neumorphism, parallax, WebGL, container queries, and more. See Dashboard.</p>
        </div>
      </>);

    case "snippets":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Code Snippets</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Copyable code from top sites and repos</p>
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
      </>);

    case "kanban":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Product Studio — Kanban</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Live agent task board</p>
        <iframe src="http://localhost:7843/kanban" className="w-full h-[600px] rounded-lg border border-[#2a2a32]" title="Kanban" />
      </>);

    case "provocations":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Design Provocations</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Questions the design studio is not asking</p>
        {PROVOCATIONS.map((p, i) => (
          <div key={i} className="bg-[#141418] border border-[#2a2a32] rounded-lg p-4 mb-3">
            <div className="text-[9px] uppercase tracking-wider text-[#d97706] mb-1">{p.cat}</div>
            <div className="text-sm font-medium">{p.q}</div>
          </div>
        ))}
      </>);

    case "scoring":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Score a Design</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">BDF, Craft, AntiGeneric, Reactance</p>
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <textarea value={scoreInput} onChange={e => setScoreInput(e.target.value)} placeholder="Paste your design copy..."
            className="w-full h-[200px] bg-[#0a0a0c] border border-[#2a2a32] rounded-lg p-4 text-sm resize-y focus:outline-none focus:border-[#0d9488]" />
          <button onClick={runScore} className="mt-4 bg-[#0d9488] text-[#0a0a0c] px-4 py-2 rounded-lg text-sm font-medium">Score</button>
          {scoreResult && <div className="mt-4 p-4 bg-[#0a0a0c] border border-[#2a2a32] rounded-lg text-sm font-mono">{scoreResult}</div>}
        </div>
      </>);

    case "forbidden":
      return (<>
        <h1 className="text-2xl font-semibold mb-2">Forbidden List</h1>
        <p className="text-sm text-[#8a8a9a] mb-6">Phrases, formats, CTAs that fail the median test</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">Phrases</h3>
            {["excited to share","game changer","paradigm shift","deep dive","level up","let me know your thoughts","agree?","happy to help"].map((p, i) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{p}</div>)}
          </div>
          <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">Formats</h3>
            {["10 best design tools","design trends 2026","figma tips","design system checklist","component comparison"].map((f, i) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{f}</div>)}
          </div>
          <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3 text-[#ef4444]">CTAs</h3>
            {["let me know your thoughts","what do you think?","drop a comment","follow for more","repost if you agree"].map((c, i) => <div key={i} className="py-1.5 border-b border-[#2a2a32] text-sm text-[#8a8a9a]">{c}</div>)}
          </div>
        </div>
      </>);

    default:
      return <div className="text-[#8a8a9a]}">Page not found</div>;
  }
}