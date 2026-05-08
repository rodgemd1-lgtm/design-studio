"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV: { href: string; label: string; icon: string; badge?: string }[] = [
  { href: "/", label: "Dashboard", icon: "◈" },
  { href: "/sites", label: "Sites", icon: "◉", badge: "8" },
  { href: "/videos", label: "Videos", icon: "▶", badge: "2479" },
  { href: "/repos", label: "Repos", icon: "◫", badge: "20" },
  { href: "/tokens", label: "Tokens", icon: "◑" },
  { href: "/techniques", label: "Techniques", icon: "◐", badge: "11" },
  { href: "/snippets", label: "Snippets", icon: "⟨/⟩" },
  { href: "/kanban", label: "Studio", icon: "⊞" },
  { href: "/provocations", label: "Provoke", icon: "?", badge: "100" },
  { href: "/scoring", label: "Score", icon: "◈" },
  { href: "/forbidden", label: "Forbidden", icon: "✕" },
];

const pageTitles: Record<string, string> = {
  "/": "dashboard", "/sites": "sites", "/videos": "videos", "/repos": "repos",
  "/tokens": "tokens", "/techniques": "techniques", "/snippets": "snippets",
  "/kanban": "kanban", "/provocations": "provocations", "/scoring": "scoring", "/forbidden": "forbidden",
};

export default function Sidebar() {
  const pathname = usePathname();
  const currentSection = pageTitles[pathname] || "dashboard";

  return (
    <aside className="fixed left-0 top-0 w-[220px] h-screen bg-[#141418] border-r border-[#2a2a32] p-5 overflow-y-auto z-10">
      <h1 className="text-lg font-bold mb-1">RIG <span className="text-[#0d9488]">Design Studio</span></h1>
      <p className="text-[10px] text-[#8a8a9a] font-mono mb-6">V10 — Live</p>
      <nav className="space-y-0.5">
        {NAV.map(n => {
          const isActive = currentSection === pageTitles[n.href];
          return (
            <Link key={n.href} href={n.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? "bg-[#1c1c22] text-[#faf9f7]" : "text-[#8a8a9a] hover:bg-[#1c1c22] hover:text-[#faf9f7]"
              }`}>
              <span className="w-4 text-center text-xs">{n.icon}</span>
              <span>{n.label}</span>
              {n.badge && <span className="ml-auto text-[9px] font-semibold bg-[#0d9488] text-[#0a0a0c] px-1.5 py-0.5 rounded-full">{n.badge}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}