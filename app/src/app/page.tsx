import { readFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";

const VAULT = "/Users/mikerodgers/rig-os-design-assets";
const DATE = "2026-05-07";

function loadData() {
  const data: Record<string, any> = { sites: {}, youtube: null, github: null, forbidden: null, codeLibrary: null };

  try {
    const extractionsDir = join(VAULT, "v10-scoring", "extractions");
    if (existsSync(extractionsDir)) {
      for (const site of readdirSync(extractionsDir)) {
        const f = join(extractionsDir, site, `${DATE}.json`);
        if (existsSync(f)) {
          const d = JSON.parse(readFileSync(f, "utf-8"));
          data.sites[site] = {
            url: d.url, why: d.why,
            total: (d.css_animations?.length || 0) + (d.gradients?.length || 0) + (d.components?.length || 0) + (d.techniques?.length || 0),
            techniques: d.techniques || [],
            colors: d.colors?.hex?.slice(0, 8) || [],
            fonts: d.typography?.fonts?.slice(0, 3) || [],
            animation_count: d.css_animations?.length || 0,
            gradient_count: d.gradients?.length || 0,
            gsap_count: d.gsap?.length || 0,
            three_count: d.threejs?.length || 0,
          };
        }
      }
    }
  } catch (e) { console.error("Sites error:", e); }

  try {
    const ytFile = join(VAULT, "youtube-content", `scan-${DATE}.json`);
    if (existsSync(ytFile)) {
      const yt = JSON.parse(readFileSync(ytFile, "utf-8"));
      data.youtube = {
        total_videos: yt.new_videos || 0,
        channels: yt.channels_scanned || 0,
        tools: yt.tools_detected || [],
        recent_videos: (yt.videos || []).slice(0, 20).map((v: any) => ({
          title: v.title, channel: v.channel, url: v.url, tools: v.tools || [], category: v.category,
        })),
      };
    }
  } catch (e) { console.error("YouTube error:", e); }

  try {
    const ghFile = join(VAULT, "v10-scoring", `github-intelligence-${DATE}.json`);
    if (existsSync(ghFile)) {
      const gh = JSON.parse(readFileSync(ghFile, "utf-8"));
      data.github = { repos_processed: gh.repos_processed || 0, repos: gh.repos || [] };
    }
  } catch (e) { console.error("GitHub error:", e); }

  try {
    const libFile = join(VAULT, "v10-scoring", "repo-code-library", `code-library-${DATE}.json`);
    if (existsSync(libFile)) {
      const lib = JSON.parse(readFileSync(libFile, "utf-8"));
      data.codeLibrary = { total_animations: lib.total_animations || 0, total_components: lib.total_components || 0 };
    }
  } catch (e) { console.error("Code lib error:", e); }

  try {
    const forbidFile = join(VAULT, "forbidden", "forbidden-design.json");
    if (existsSync(forbidFile)) data.forbidden = JSON.parse(readFileSync(forbidFile, "utf-8"));
  } catch (e) { console.error("Forbidden error:", e); }

  return data;
}

export default function Home() {
  let data;
  try {
    data = loadData();
  } catch (e) {
    console.error("Failed to load data:", e);
    data = { sites: {}, youtube: null, github: null, forbidden: null, codeLibrary: null };
  }

  const siteCount = Object.keys(data.sites).length;
  const videoCount = data.youtube?.total_videos || 0;
  const repoCount = data.github?.repos_processed || 0;
  const animCount = data.codeLibrary?.total_animations || 0;
  const compCount = data.codeLibrary?.total_components || 0;
  const techCount = new Set(Object.values(data.sites).flatMap((s: any) => s.techniques)).size;
  const toolCount = (data.youtube?.tools || []).length;
  const videos = data.youtube?.recent_videos || [];
  const sites = Object.entries(data.sites);
  const repos = data.github?.repos || [];
  const allTechs = [...new Set(Object.values(data.sites).flatMap((s: any) => s.techniques))];
  const techCounts = allTechs.map(t => ({
    name: t,
    count: Object.values(data.sites).filter((s: any) => s.techniques.includes(t)).length,
    desc: ({glassmorphism:"Backdrop blur",neumorphism:"Soft shadows",parallax:"Scroll depth",webgl:"GPU 3D",canvas_animation:"Canvas draw",container_queries:"Container responsive",dark_mode:"Dark theme",micro_interaction:"Hover/tap",sticky_header:"Sticky nav",masonry:"Masonry grid",horizontal_scroll:"Horizontal scroll"} as Record<string,string>)[t] || "Detected",
  }));

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0a0c",color:"#faf9f7",fontFamily:"-apple-system,BlinkMacSystemFont,sans-serif"}}>
      {/* Sidebar */}
      <nav style={{width:220,position:"fixed",left:0,top:0,height:"100vh",background:"#141418",borderRight:"1px solid #2a2a32",padding:20,overflowY:"auto"}}>
        <h1 style={{fontSize:18,fontWeight:700,marginBottom:4}}>RIG <span style={{color:"#0d9488"}}>Design Studio</span></h1>
        <p style={{fontSize:10,color:"#8a8a9a",fontFamily:"monospace",marginBottom:24}}>V10 — Live</p>
        {[
          ["◈","Dashboard"],["◉","Sites","8"],["▶","Videos","2479"],["◫","Repos","20"],
          ["◑","Tokens"],["◐","Techniques","11"],["⟨/⟩","Snippets"],["⊞","Studio"],
          ["?","Provoke","100"],["◈","Score"],["✕","Forbidden"],
        ].map(([icon,label,badge],i) => (
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:i===0?"#1c1c22":"transparent",color:i===0?"#faf9f7":"#8a8a9a",fontSize:14,cursor:"pointer",marginBottom:2}}>
            <span style={{width:16,textAlign:"center",fontSize:12}}>{icon}</span>
            <span>{label}</span>
            {badge && <span style={{marginLeft:"auto",fontSize:9,fontWeight:700,background:"#0d9488",color:"#0a0a0c",padding:"2px 6px",borderRadius:10}}>{badge}</span>}
          </div>
        ))}
      </nav>

      {/* Main */}
      <main style={{marginLeft:220,padding:32,flex:1,maxWidth:1400}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:32}}>
          <div>
            <h1 style={{fontSize:28,fontWeight:600,marginBottom:4}}>Design Intelligence Dashboard</h1>
            <p style={{fontSize:14,color:"#8a8a9a"}}>Live data from extraction pipeline</p>
          </div>
          <input placeholder="Search..." style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:"8px 16px",fontSize:14,width:260,color:"#faf9f7"}} />
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:16,marginBottom:32}}>
          {[
            [videoCount.toLocaleString(),"YouTube Videos",`${data.youtube?.channels||0} channels`,"#0d9488"],
            [String(siteCount),"Sites Extracted",`${animCount+compCount} items`,"#3b82f6"],
            [String(repoCount),"GitHub Repos",`${animCount} animations`,"#a855f7"],
            [String(techCount),"Techniques",`${toolCount} tools`,"#d97706"],
            ["161","Susan Chunks","design-studio RAG","#22c55e"],
          ].map(([v,l,s,c],i) => (
            <div key={i} style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
              <div style={{fontSize:24,fontWeight:700,color:c}}>{v}</div>
              <div style={{fontSize:12,color:"#8a8a9a",marginTop:4}}>{l}</div>
              <div style={{fontSize:10,color:"#22c55e",marginTop:2}}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24}}>
          {/* Videos */}
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>▶ Recent YouTube Videos</h2>
            {videos.slice(0,6).map((v:any,i:number) => (
              <a key={i} href={v.url} target="_blank" style={{display:"flex",gap:12,padding:10,borderRadius:8,marginBottom:4,textDecoration:"none",color:"inherit"}}>
                <div style={{width:90,height:50,background:"#1c1c22",borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>▶</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v.title}</div>
                  <div style={{fontSize:11,color:"#8a8a9a",marginTop:2}}>{v.channel}</div>
                  {v.tools?.length>0 && <div style={{display:"flex",gap:4,marginTop:6}}>{v.tools.map((t:string,j:number) => <span key={j} style={{fontSize:9,padding:"2px 6px",background:"#1c1c22",color:"#0d9488",border:"1px solid #2a2a32",borderRadius:4}}>{t}</span>)}</div>}
                </div>
              </a>
            ))}
          </div>

          {/* Sites */}
          <div style={{background:"#141418",border:"1px solid #2a2a32",borderRadius:8,padding:20}}>
            <h2 style={{fontSize:14,fontWeight:600,marginBottom:16}}>◉ Site Extractions</h2>
            {sites.slice(0,5).map(([name,s]:[string,any]) => (
              <div key={name} style={{marginBottom:16,paddingBottom:16,borderBottom:"1px solid #2a2a32"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
                  <div><div style={{fontSize:13,fontWeight:600}}>{name}</div><div style={{fontSize:10,color:"#8a8a9a",fontFamily:"monospace"}}>{s.url}</div></div>
                  <span style={{fontSize:18,fontWeight:700,color:"#0d9488"}}>{s.total}</span>
                </div>
                <div style={{display:"flex",gap:4,marginBottom:6}}>{(s.colors||[]).slice(0,5).map((c:string,i:number) => <div key={i} style={{width:16,height:16,borderRadius:4,background:c}}/>)}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{(s.techniques||[]).map((t:string,i:number) => <span key={i} style={{fontSize:9,padding:"2px 8px",background:"rgba(13,148,136,0.15)",color:"#0d9488",border:"1px solid rgba(13,148,136,0.3)",borderRadius:4}}>{t.replace(/_/g," ")}</span>)}</div>
              </div>
            ))}
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
            {repos.slice(0,6).map((r:any,i:number) => (
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
          <h2 style={{fontSize:14,fontWeight:600,marginBottom:12}}>🔧 Tools Detected ({toolCount})</h2>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{(data.youtube?.tools||[]).map((t:string,i:number) => <span key={i} style={{fontSize:12,padding:"6px 12px",background:"#1c1c22",color:"#0d9488",border:"1px solid #2a2a32",borderRadius:20}}>{t}</span>)}</div>
        </div>
      </main>
    </div>
  );
}