"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  totalVideos: number;
  channelsScanned: number;
  sitesExtracted: number;
  reposCloned: number;
  techniquesDetected: number;
  susanChunks: number;
  totalAnimations: number;
  totalComponents: number;
  totalTokens: number;
  topSites: Array<{ name: string; url: string; items: number; techniques: string[]; colors: string[] }>;
  topVideos: Array<{ title: string; channel: string; url: string; tools: string[] }>;
  topRepos: Array<{ name: string; cat: string; animations: number; components: number }>;
  techniques: Array<{ name: string; count: number; desc: string }>;
  toolsDetected: string[];
}

function loadData(): DashboardData {
  // This would normally fetch from API routes
  // For now, return the data we know exists
  return {
    totalVideos: 2479,
    channelsScanned: 33,
    sitesExtracted: 8,
    reposCloned: 20,
    techniquesDetected: 11,
    susanChunks: 161,
    totalAnimations: 1017,
    totalComponents: 165,
    totalTokens: 144,
    topSites: [
      { name: "Linear", url: "linear.app", items: 195, techniques: [], colors: ["#08090a","#1a1a1a"] },
      { name: "Stripe", url: "stripe.com", items: 31, techniques: ["sticky_header","micro_interaction"], colors: ["#031323","#4285f4","#34a853"] },
      { name: "Raycast", url: "raycast.com", items: 39, techniques: ["glassmorphism","neumorphism","parallax"], colors: ["#20235b","#070921"] },
      { name: "Vercel", url: "vercel.com", items: 24, techniques: ["container_queries","dark_mode","webgl"], colors: ["#000000","#ffffff"] },
      { name: "Obys Agency", url: "obys.agency", items: 9, techniques: ["horizontal_scroll"], colors: ["#0a0a0a"] },
    ],
    topVideos: [
      { title: "These are the TOP UI/UX Animations of April 2026", channel: "Orizon Design", url: "https://www.youtube.com/watch?v=c95q-FTvgcA", tools: [] },
      { title: "HTML in Canvas is Futuristic AF - Tutorial", channel: "DesignCourse", url: "https://www.youtube.com/watch?v=XYdDiZa_O3k", tools: ["canvas"] },
      { title: "SVG Filters are Sick! Image Turbulence & Displacement", channel: "DesignCourse", url: "https://www.youtube.com/watch?v=XYdDiZa_O3k", tools: ["svg"] },
      { title: "13 Mistakes Beginner UI Designers Make", channel: "DesignCourse", url: "https://www.youtube.com/watch?v=B7UQS5My4D0", tools: [] },
      { title: "CSS Color Game is way harder than expected", channel: "Kevin Powell", url: "https://www.youtube.com/watch?v=Is8HC7hbA3Q", tools: [] },
    ],
    topRepos: [
      { name: "shadcn/ui", cat: "design-system", animations: 102, components: 279 },
      { name: "Drei", cat: "3d", animations: 739, components: 9 },
      { name: "NextUI", cat: "design-system", animations: 248, components: 17 },
      { name: "Tailwind CSS", cat: "css", animations: 671, components: 0 },
      { name: "Three.js", cat: "3d", animations: 466, components: 3 },
    ],
    techniques: [
      { name: "glassmorphism", count: 3, desc: "Backdrop blur + transparency" },
      { name: "neumorphism", count: 2, desc: "Soft shadows + inset lighting" },
      { name: "parallax", count: 4, desc: "Scroll-driven depth layers" },
      { name: "WebGL", count: 2, desc: "GPU-accelerated 3D" },
      { name: "container queries", count: 2, desc: "Component-level responsive" },
      { name: "dark mode", count: 5, desc: "First-class dark theme" },
      { name: "micro-interaction", count: 4, desc: "Hover/tap/click feedback" },
      { name: "sticky header", count: 3, desc: "Position sticky navigation" },
      { name: "masonry", count: 2, desc: "Pinterest-style layout" },
      { name: "horizontal scroll", count: 2, desc: "Sideways scroll sections" },
      { name: "canvas animation", count: 3, desc: "Programmatic drawing" },
    ],
    toolsDetected: ["svg","blender","three.js","figma","gsap","tailwind","framer","css animation","sketch","after effects","webgl","framer motion"],
  };
}

function StatCard({ value, label, change }: { value: string | number; label: string; change?: string }) {
  return (
    <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
      <div className="text-2xl font-bold text-[#faf9f7]">{value}</div>
      <div className="text-xs text-[#8a8a9a] mt-1">{label}</div>
      {change && <div className="text-[10px] text-[#22c55e] mt-1">{change}</div>}
    </div>
  );
}

function SiteCard({ site }: { site: DashboardData["topSites"][0] }) {
  return (
    <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-4 mb-3">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-semibold text-sm">{site.name}</div>
          <div className="text-xs text-[#8a8a9a] font-mono">{site.url}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#0d9488]">{site.items}</div>
          <div className="text-[10px] text-[#8a8a9a]">items</div>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        {site.colors.slice(0, 5).map((c, i) => (
          <div key={i} className="w-5 h-5 rounded" style={{ background: c }} title={c} />
        ))}
      </div>
      <div className="flex gap-1 flex-wrap">
        {site.techniques.map((t, i) => (
          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[rgba(13,148,136,0.15)] text-[#0d9488] border border-[rgba(13,148,136,0.3)]">
            {t.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: DashboardData["topVideos"][0] }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 p-3 rounded-lg hover:bg-[#1c1c22] transition-colors mb-1"
    >
      <div className="w-[100px] h-[56px] bg-[#1c1c22] rounded flex items-center justify-center flex-shrink-0 text-lg">
        ▶
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{video.title}</div>
        <div className="text-xs text-[#8a8a9a] mt-1">{video.channel}</div>
        {video.tools.length > 0 && (
          <div className="flex gap-1 mt-2">
            {video.tools.map((t, i) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c1c22] text-[#0d9488] border border-[#2a2a32]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

function RepoCard({ repo }: { repo: DashboardData["topRepos"][0] }) {
  return (
    <div className="flex gap-3 p-3 border-b border-[#2a2a32]">
      <div className="w-10 h-10 bg-[#1c1c22] rounded-lg flex items-center justify-center flex-shrink-0">
        ◫
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">{repo.name}</div>
        <div className="text-xs text-[#8a8a9a]">{repo.cat}</div>
        <div className="flex gap-3 mt-1 text-[10px] text-[#8a8a9a]">
          <span>{repo.animations} animations</span>
          <span>{repo.components} components</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    setData(loadData());
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#8a8a9a]">Loading Design Studio...</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Design Intelligence Dashboard</h1>
          <p className="text-sm text-[#8a8a9a] mt-1">
            Reverse-engineered design from top sites, YouTube, and GitHub
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="search"
            placeholder="Search videos, sites, repos..."
            className="bg-[#141418] border border-[#2a2a32] rounded-lg px-4 py-2 text-sm w-[280px] focus:outline-none focus:border-[#0d9488]"
          />
          <button className="bg-[#0d9488] text-[#0a0a0c] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f766e] transition-colors">
            ⟳ Run Full Scan
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <StatCard value={data.totalVideos.toLocaleString()} label="YouTube Videos" change={`${data.channelsScanned} channels · 30 days`} />
        <StatCard value={data.sitesExtracted} label="Sites Extracted" change={`${data.totalAnimations + data.totalComponents} intelligence items`} />
        <StatCard value={data.reposCloned} label="GitHub Repos" change={`${data.totalAnimations} animations extracted`} />
        <StatCard value={data.techniquesDetected} label="Techniques" change="glassmorphism, WebGL..." />
        <StatCard value={data.susanChunks} label="Susan Chunks" change="design-studio RAG" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Top Videos */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold">▶ Top YouTube Videos</h2>
            <a href="/videos" className="text-xs text-[#0d9488] hover:underline">View all →</a>
          </div>
          {data.topVideos.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>

        {/* Top Sites */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold">◉ Top Site Extractions</h2>
            <a href="/sites" className="text-xs text-[#0d9488] hover:underline">View all →</a>
          </div>
          {data.topSites.map((s, i) => (
            <SiteCard key={i} site={s} />
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Techniques */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold">◐ Techniques Detected</h2>
            <a href="/techniques" className="text-xs text-[#0d9488] hover:underline">View all →</a>
          </div>
          <div className="space-y-2">
            {data.techniques.slice(0, 8).map((t, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#2a2a32]">
                <div>
                  <div className="text-sm font-medium">{t.name.replace(/_/g, " ")}</div>
                  <div className="text-[10px] text-[#8a8a9a]">{t.desc}</div>
                </div>
                <span className="text-xs text-[#0d9488] font-semibold">{t.count} sites</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Repos */}
        <div className="bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold">◫ Cloned Repos</h2>
            <a href="/repos" className="text-xs text-[#0d9488] hover:underline">View all →</a>
          </div>
          {data.topRepos.map((r, i) => (
            <RepoCard key={i} repo={r} />
          ))}
        </div>
      </div>

      {/* Tools Detected */}
      <div className="mt-6 bg-[#141418] border border-[#2a2a32] rounded-lg p-5">
        <h2 className="text-sm font-semibold mb-3">🔧 Tools Detected Across All Sources</h2>
        <div className="flex gap-2 flex-wrap">
          {data.toolsDetected.map((t, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#1c1c22] text-[#0d9488] border border-[#2a2a32]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}