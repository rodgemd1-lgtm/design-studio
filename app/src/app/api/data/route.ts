import { NextResponse } from "next/server";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

const VAULT = process.env.DESIGN_STUDIO_DATA || "/Users/mikerodgers/rig-os-design-assets";
const DATE = "2026-05-07";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  try {
    const data: Record<string, any> = {};

    // Sites extractions
    if (type === "all" || type === "sites") {
      const sites: Record<string, any> = {};
      const extractionsDir = join(VAULT, "v10-scoring", "extractions");
      if (existsSync(extractionsDir)) {
        for (const site of readdirSync(extractionsDir)) {
          const siteFile = join(extractionsDir, site, `${DATE}.json`);
          if (existsSync(siteFile)) {
            const d = JSON.parse(readFileSync(siteFile, "utf-8"));
            sites[site] = {
              url: d.url,
              why: d.why,
              total: (d.css_animations?.length || 0) + (d.gradients?.length || 0) + (d.components?.length || 0) + (d.techniques?.length || 0),
              techniques: d.techniques || [],
              colors: d.colors?.hex?.slice(0, 8) || [],
              fonts: d.typography?.fonts?.slice(0, 3) || [],
              animation_count: d.css_animations?.length || 0,
              gradient_count: d.gradients?.length || 0,
              gsap_count: d.gsap?.length || 0,
              three_count: d.threejs?.length || 0,
              motion: d.motion || {},
            };
          }
        }
      }
      data.sites = sites;
    }

    // YouTube
    if (type === "all" || type === "youtube") {
      const ytFile = join(VAULT, "youtube-content", `scan-${DATE}.json`);
      if (existsSync(ytFile)) {
        const yt = JSON.parse(readFileSync(ytFile, "utf-8"));
        data.youtube = {
          total_videos: yt.new_videos || 0,
          channels: yt.channels_scanned || 0,
          tools: yt.tools_detected || [],
          top_channels: Object.fromEntries(
            Object.entries(yt.channel_stats || {})
              .sort((a: any, b: any) => b[1].new_videos - a[1].new_videos)
              .slice(0, 10)
          ),
          recent_videos: (yt.videos || []).slice(0, 20).map((v: any) => ({
            title: v.title,
            channel: v.channel,
            url: v.url,
            tools: v.tools || [],
            category: v.category,
          })),
        };
      }
    }

    // GitHub repos
    if (type === "all" || type === "github") {
      const ghFile = join(VAULT, "v10-scoring", `github-intelligence-${DATE}.json`);
      if (existsSync(ghFile)) {
        const gh = JSON.parse(readFileSync(ghFile, "utf-8"));
        data.github = {
          repos_processed: gh.repos_processed || 0,
          repos: (gh.repos || []).map((r: any) => ({
            name: r.repo,
            category: r.category,
            colors: (r.colors || []).slice(0, 8),
            animation_count: (r.animation_patterns || []).length,
            components: (r.component_patterns || []).slice(0, 15),
            tokens: (r.design_tokens || []).length,
          })),
        };
      }
    }

    // Code library
    if (type === "all" || type === "code-library") {
      const libFile = join(VAULT, "v10-scoring", "repo-code-library", `code-library-${DATE}.json`);
      if (existsSync(libFile)) {
        const lib = JSON.parse(readFileSync(libFile, "utf-8"));
        data.codeLibrary = {
          total_animations: lib.total_animations || 0,
          total_components: lib.total_components || 0,
          repos: (lib.repos || []).map((r: any) => ({
            name: r.repo,
            animations: r.animations?.length || 0,
            components: r.components?.length || 0,
            files_scanned: r.files_scanned || 0,
          })),
        };
      }
    }

    // Forbidden list
    if (type === "all" || type === "forbidden") {
      const forbidFile = join(VAULT, "forbidden", "forbidden-design.json");
      if (existsSync(forbidFile)) {
        data.forbidden = JSON.parse(readFileSync(forbidFile, "utf-8"));
      }
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}