import { NextResponse } from "next/server";

// In-memory kanban board storage
interface Task {
  id: string;
  title: string;
  description: string;
  status: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority: "P0" | "P1" | "P2" | "P3";
  agent: string | null;
  signals: string[];
  created: string;
  updated: string;
}

interface Board {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  project_type: "website" | "design-system" | "animation" | "app" | "component" | "other";
}

// Boards by project
const boards: Record<string, Board> = {
  "rig-design-studio": {
    id: "rig-design-studio",
    name: "RIG Design Studio",
    description: "Design intelligence platform — reverse-engineered design from top sites",
    project_type: "app",
    tasks: [
      { id: "ds-1", title: "Connect live extraction data to dashboard API", description: "Replace hardcoded data with API calls to /api/data", status: "done", priority: "P0", agent: "jake", signals: [], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-2", title: "Build site extraction viewer with color swatches", description: "Show extracted design tokens in visual cards", status: "done", priority: "P1", agent: "jake", signals: ["S1", "S7"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-3", title: "Add YouTube video browser with search/filter", description: "Browse 2,479 videos by category, channel, tool", status: "in_progress", priority: "P1", agent: "jake", signals: ["S6"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-4", title: "Implement code snippet copy-to-clipboard", description: "One-click copy for extracted CSS animations and GSAP patterns", status: "in_progress", priority: "P2", agent: "jake", signals: [], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-5", title: "Build kanban product builder board", description: "Create/assign tasks from design signals, track through review", status: "in_progress", priority: "P0", agent: "jake", signals: ["S2"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-6", title: "Add design technique comparison view", description: "Side-by-side comparison of techniques across 8 sites", status: "todo", priority: "P1", agent: "jake", signals: ["S7"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-7", title: "Build live extraction runner (browser triggers)", description: "Buttons to run design-intelligence-extractor.py from the app", status: "todo", priority: "P2", agent: "jake", signals: [], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ds-8", title: "Add auto-refresh every 5 minutes", description: "Dashboard auto-polls /api/data for new signals", status: "backlog", priority: "P2", agent: null, signals: [], created: "2026-05-07", updated: "2026-05-07" },
    ],
  },
  "ideawake-v5": {
    id: "ideawake-v5",
    name: "Ideawake V5 — Agency Landing Page",
    description: "Innovation agency site with 3D diamond deconstruction, scroll-synced animation",
    project_type: "website",
    tasks: [
      { id: "iw-1", title: "Extract design tokens from top agency sites", description: "Run design-intelligence-extractor on obys.agency, shader.studio", status: "done", priority: "P0", agent: "jake", signals: ["S4", "S7"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "iw-2", title: "Build 3D diamond deconstruction scene", description: "Teal diamond crystal that deconstructs into 6 stages on scroll", status: "in_progress", priority: "P0", agent: null, signals: ["S7"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "iw-3", title: "Integrate Higgsfield video frames for scroll-synced canvas", description: "241 JPG frames driven by scroll position", status: "todo", priority: "P1", agent: null, signals: [], created: "2026-05-06", updated: "2026-05-07" },
      { id: "iw-4", title: "Add Interact AI chatbot per section", description: "Context-aware AI chatbot that discusses each stage", status: "todo", priority: "P2", agent: null, signals: [], created: "2026-05-06", updated: "2026-05-07" },
      { id: "iw-5", title: "Apply Raycast gradient mesh technique", description: "Steal the radial gradient layering from Raycast for hero section", status: "todo", priority: "P1", agent: "jake", signals: ["S3"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "iw-6", title: "Reduce inner core glow (Mike feedback)", description: "Inner core glow should be reduced per explicit design feedback", status: "todo", priority: "P1", agent: null, signals: [], created: "2026-05-07", updated: "2026-05-07" },
    ],
  },
  "transformfit-ai-coach": {
    id: "transformfit-ai-coach",
    name: "TransformFit — AI Coaching Feature",
    description: "Context-aware AI coaching for fitness app with behavioral economics",
    project_type: "app",
    tasks: [
      { id: "tf-1", title: "Susan RAG knowledge base for exercise science", description: "Scrape exercise_science data into Susan for coaching context", status: "done", priority: "P0", agent: "jake", signals: ["S2"], created: "2026-05-05", updated: "2026-05-07" },
      { id: "tf-2", title: "Build competitive analysis from 20 repos", description: "Extract component patterns from FitnessAI repos", status: "done", priority: "P1", agent: "jake", signals: ["S1", "S4"], created: "2026-05-05", updated: "2026-05-07" },
      { id: "tf-3", title: "Design AI coaching interface with motion", description: "Framer Motion micro-interactions for coaching messages", status: "todo", priority: "P1", agent: null, signals: ["S6"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "tf-4", title: "Glassmorphism overlay for coaching UI", description: "Apply Raycast glassmorphism pattern to coaching cards", status: "todo", priority: "P2", agent: null, signals: ["S3"], created: "2026-05-07", updated: "2026-05-07" },
    ],
  },
  "competitor-tracking": {
    id: "competitor-tracking",
    name: "Competitor Design Tracking",
    description: "Weekly screenshot diffs, technique gap analysis, trend detection",
    project_type: "app",
    tasks: [
      { id: "ct-1", title: "Weekly screenshot diff of 10 competitors", description: "Playwright screenshots with pixel comparison", status: "done", priority: "P0", agent: "jake", signals: ["S1", "S4"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "ct-2", title: "Technique gap report builder", description: "What competitors use that we don't (glassmorphism, container queries, etc.)", status: "todo", priority: "P1", agent: "jake", signals: ["S3", "S7"], created: "2026-05-07", updated: "2026-05-07" },
      { id: "ct-3", title: "Visual regression for our own sites", description: "Track Ideawake, RIG, Design Studio visual changes over time", status: "done", priority: "P2", agent: "jake", signals: [], created: "2026-05-06", updated: "2026-05-07" },
    ],
  },
  "v10-signal-pipeline": {
    id: "v10-signal-pipeline",
    name: "V10 Signal Detection Pipeline",
    description: "7-layer signal scanner + scoring engine + feedback loop",
    project_type: "other",
    tasks: [
      { id: "v10-1", title: "Deploy signal scanner cron (1PM MT)", description: "Brave + Exa search for 7 signal layers", status: "done", priority: "P0", agent: "jake", signals: ["S1"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "v10-2", title: "Deploy scoring engine cron (1:30PM MT)", description: "IDP, BDF, Craft, Catchphrase, AntiGeneric scoring", status: "done", priority: "P0", agent: "jake", signals: ["S5"], created: "2026-05-06", updated: "2026-05-07" },
      { id: "v10-3", title: "Deploy feedback loop cron (weekly)", description: "Update forbidden list, catchphrase lib, Brier calibration", status: "done", priority: "P1", agent: "jake", signals: [], created: "2026-05-06", updated: "2026-05-07" },
      { id: "v10-4", title: "Add more YouTube channels to watch list", description: "Currently 33 channels, target 50+", status: "todo", priority: "P2", agent: null, signals: ["S6"], created: "2026-05-07", updated: "2026-05-07" },
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const board_id = searchParams.get("board");
  const action = searchParams.get("action") || "list";

  if (action === "list") {
    // Return all boards with summaries
    const summary = Object.entries(boards).map(([id, board]) => ({
      id,
      name: board.name,
      description: board.description,
      project_type: board.project_type,
      task_counts: {
        total: board.tasks.length,
        backlog: board.tasks.filter(t => t.status === "backlog").length,
        todo: board.tasks.filter(t => t.status === "todo").length,
        in_progress: board.tasks.filter(t => t.status === "in_progress").length,
        review: board.tasks.filter(t => t.status === "review").length,
        done: board.tasks.filter(t => t.status === "done").length,
      },
    }));
    return NextResponse.json({ success: true, boards: summary });
  }

  if (action === "board" && board_id && boards[board_id]) {
    return NextResponse.json({ success: true, board: boards[board_id] });
  }

  return NextResponse.json({ success: true, boards: Object.keys(boards) });
}