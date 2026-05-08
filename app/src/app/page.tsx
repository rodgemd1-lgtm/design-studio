"use client";

import { useState, useEffect } from "react";

interface SiteData { url: string; why: string; total: number; techniques: string[]; colors: string[]; fonts: string[]; animation_count: number; gradient_count: number; gsap_count: number; three_count: number; }
interface VideoData { title: string; channel: string; url: string; tools: string[]; category: string; }
interface RepoData { name: string; category: string; colors: string[]; animation_count: number; components: string[]; tokens: number; }

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const base = "";
        const [extractions, youtube, github, forbidden] = await Promise.all([
          fetch(base + "/data/extractions.json").then(r => r.json()).catch(() => ({})),
          fetch(base + "/data/youtube.json").then(r => r.json()).catch(() => null),
          fetch(base + "/data/github.json").then(r => r.json()).catch(() => null),
          fetch(base + "/data/forbidden.json").then(r => r.json()).catch(() => null),
        ]);

        // Parse extractions
        const sites: Record<string, SiteData> = {};
        for (const [siteName, siteData] of Object.entries(extractions as any)) {
          if (siteName === "signals" || siteName === "layers" || siteName === "total_signals") continue;
          const sd = siteData as any;
          if (sd && typeof sd === "object" && sd.url) {
            sites[siteName] = {
              url: sd.url, why: sd.why || "",
              total: (sd.css_animations?.length || 0) + (sd.gradients?.length || 0) + (sd.components?.length || 0) + (sd.techniques?.length || 0),
              techniques: sd.techniques || [],
              colors: sd.colors?.hex?.slice(0, 8) || [],
              fonts: sd.typography?.fonts?.slice(0, 3) || [],
              animation_count: sd.css_animations?.length || 0,
              gradient_count: sd.gradients?.length || 0,
              gsap_count: sd.gsap?.length || 0,
              three_count: sd.threejs?.length || 0,
            };
          }
        }

        setData({ sites, youtube, github, forbidden });
      } catch (e) {
        console.error("Data load error:", e);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"#8a8a9a"}}>Loading Design Studio...</div>;
  if (!data) return <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",color:"#ef4444"}}>Failed to load data</div>;

  const { sites, youtube, github, forbidden } = data;
  const siteCount = Object.keys(sites).length;
  const videoCount = youtube?.new_videos || 0;
  const repoCount = github?.repos_processed || 0;
  const animCount = github?.repos?.reduce((s: number, r: any) => s + (r.animation_patterns?.length || 0), 0) || 0;
  const compCount = github?.repos?.reduce((s: number, r: any) => s + (r.component_patterns?.length || 0), 0) || 0;
  const techCount = new Set(Object.values(sites).flatMap((s: any) => s.techniques)).size;
  const toolCount = youtube?.tools_detected?.length || 0;
  const videos = youtube?.videos?.slice(0, 20) || [];
  const sitesList = Object.entries(sites);
  const repos = github?.repos || [];
  const allTechs = [...new Set(Object.values(sites).flatMap((s: any) => s.techniques))];
  const techCounts = allTechs.map((t: string) => ({
    name: t,
    count: Object.values(sites).filter((s: any) => s.techniques.includes(t)).length,
    desc: ({glassmorphism:"Backdrop blur",neumorphism:"Soft shadows",parallax:"Scroll depth",webgl:"GPU 3D",canvas_animation:"Canvas draw",container_queries:"Container responsive",dark_mode:"Dark theme",micro_interaction:"Hover/tap",sticky_header:"Sticky nav",masonry:"Masonry",horizontal_scroll:"H-scroll"} as Record<string,string>)[t] || "Detected",
  }));

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0a0c",color:"#faf9f7",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"}}>
      <nav style={{width:220,position:"fixed",left:0,top:0,height:"100vh",background:"#141418",borderRight:"1px solid #2a2a32",padding:20,overflowY:"auto",zIndex:10}}>
        <h1 style={{fontSize:18,fontWeight:700,marginBottom:4}}>RIG <span style={{color:"#0d9488"}}>Design Studio</span></h1>
        <p style={{fontSize:10,color:"#8a8a9a",fontFamily:"monospace",marginBottom:24}}>V10 — Live</p>
        {([["◈","Dashboard",null],["◉","Sites","8"],["▶","Videos","2479"],["◫","Repos","20"],["◑","Tokens",null],["◐","Techniques","11"],["⟨/⟩","Snippets",null],["⊞","Studio",null],["?","Provoke","100"],["◈","Score",null],["✕","Forbidden",null]] as const).map(([icon,label,badge],i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:i===0?"#1c1c22":"transparent",color:i===0?"#faf9f7":"#8a8a9a",fontSize:14,marginBottom:2}}>
            <span style={{width:16,textAlign:"center",fontSize:12}}>{icon}</span>
            <span>{label}</span>
            {badge && <span style={{marginLeft:"auto",fontSize:9,fontWeight:700,background:"#0d9488",color:"#0a0a0c",padding:"2px 6px",borderRadius:10}}>{badge}</span>}
          </div>
        ))}
      </nav>

      <main style={{marginLeft:220,padding:32,flex:1,maxWidth:1400}}>
        <h1 style={{fontSize:28,fontWeight:600,marginBottom:4}}>Design Intelligence Dashboard</h1>
        <p style={{fontSize:14,color:"#8a8a9a",marginBottom:32}}>Live data — {siteCount} sites, {videoCount} videos, {repoCount} repos</p>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:32}}>
          {[[videoCount.toLocaleString(),"YouTube Videos",`${youtube?.channels_scanned||0} channels`,"#0d9488"],[String(siteCount),"Sites Extracted",`${animCount+compCount} items`,"#3b82f6"],[String(repoCount),"GitHub Repos",`${animCount} animations`,"#a855f7"],[String(techCount),"Techniques",`${toolCount} tools`,"#d97706"],["161","Susan Chunks","design-studio RAG","#22c55e"]].map(([v,l,s,c],i) => (
            <div key={i} style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
              <div style={{fontSize:24,fontWeight:700,color:c}}>{v}</div>
              <div style={{fontSize:12,color:"#8a8a9a",marginTop:4}}>{l}</div>
              <div style={{fontSize:10,color:"#22c55e",marginTop:2}}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>▶ Recent YouTube Videos</h2>
            {videos.slice(0,6).map((v:VideoData,i:number) => (
              <a key={i} href={v.url} target="_blank" style={{display:"flex",gap:12,padding:10,borderRadius:8,marginBottom:4,textDecoration:"none",color:"inherit"}}>
                <div style={{width:90,height:50,background:"#1c1c22",borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>▶</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</div>
                  <div style={{fontSize:11,color:"#8a8a9a",marginTop:2}}>{v.channel}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>◉ Site Extractions</h2>
            {sitesList.slice(0,5).map((item:any) => { const [name,s] = item; return (
              <div key={name} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid #2a2a32"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div><div style={{fontSize:13,fontWeight:600}}>{name}</div><div style={{fontSize:10,color:"#8a8a9a",fontFamily:"monospace"}}>{s.url}</div></div>
                  <span style={{fontSize:18,fontWeight:700,color:"#0d9488"}}>{s.total}</span>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:6}}>{(s.colors||[]).slice(0,5).map((c:string,i:number) => <div key={i} style={{width:16,height:16,borderRadius:4,background:c}}/>)}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{(s.techniques||[]).map((t:string,i:number) => <span key={i} style={{fontSize:9,padding:"2px 8px",background:"rgba(13,148,136,0.15)",color:"#0d9488",border:"1px solid rgba(13,148,136,0.3)",borderRadius:4}}>{t.replace(/_/g," ")}</span>)}</div>
              </div>
            )})}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>◐ Techniques ({techCount})</h2>
            {techCounts.slice(0,8).map((t,i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid #2a2a32"}}>
                <div><div style={{fontSize:13,fontWeight:500}}>{t.name.replace(/_/g," ")}</div><div style={{fontSize:10,color:"#8a8a9a"}}>{t.desc}</div></div>
                <span style={{fontSize:12,color:"#0d9488",fontWeight:600}}>{t.count}</span>
              </div>
            ))}
          </div>
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>◫ Cloned Repos ({repoCount})</h2>
            {repos.slice(0,6).map((r:RepoData,i:number) => (
              <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #2a2a32"}}>
                <div style={{width:32,height:32,background:"#1c1c22",borderRadius:8,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>◫</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600}}>{r.name}</div>
                  <div style={{fontSize:10,color:"#8a8a9a"}}>{r.category} · {r.animation_count} anim · {r.components?.length||0} comp</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{marginTop:24,background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
          <h2 style={{fontSize:14,fontWeight:600,marginBottom:12}}>🔧 Tools ({toolCount})</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{(youtube?.tools_detected||[]).map((t:string,i:number) => <span key={i} style={{fontSize:12,padding:"6px 12px",background:"#1c1c22",color:"#0d9488",border:"1px solid #2a2a32",borderRadius:20}}>{t}</span>)}</div>
        </div>
      </main>
    </div>
  );
}