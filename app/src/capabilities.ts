/**
 * RIG Design Studio — Product Deconstruction Capability Registry
 */
export const CAPABILITY_REGISTRY = {
  scroll: {
    lenis: { package: 'lenis', installed: true, purpose: 'Smooth scroll foundation' },
    gsap: { package: 'gsap', installed: true, purpose: 'ScrollTrigger, pinned scenes, timelines' },
  },
  canvas: {
    apfel: { repo: 'mkurtic/apfel-sequence', purpose: 'Apple/Sony-style canvas frame sequence' },
    spritesheet: { purpose: 'Single-image frame sequence with CSS translation' },
    diy: { purpose: 'Custom canvas image sequence engine' },
  },
  '3d': {
    r3f: { package: '@react-three/fiber', installed: true, purpose: 'React Three Fiber for custom 3D' },
    drei: { package: '@react-three/drei', installed: true, purpose: 'R3F helpers including ScrollControls' },
    spline: { package: '@splinetool/react-spline', installed: true, purpose: 'Spline scene embedding' },
  },
  overlays: {
    motion: { package: 'motion', installed: true, purpose: 'React UI animation over 3D/canvas' },
  },
  pipeline: {
    ffmpeg: { purpose: 'Frame extraction, video processing' },
    sharp: { package: 'sharp', installed: true, purpose: 'Batch image processing, spritesheets' },
  },
};

export const TIER_STACKS = {
  1: { name: 'Fast Spline Marketing Scene', stack: ['Spline Editor', 'Spline Viewer', 'HTML overlays', 'Motion fade-ins'], buildTime: '2-4 hours', bestFor: 'Landing pages, prototypes' },
  2: { name: 'Spline + React Controlled', stack: ['Spline scene', '@splinetool/react-spline', 'Lenis', 'GSAP ScrollTrigger', 'Motion overlays'], buildTime: '1-2 days', bestFor: 'Interactive product tours' },
  3: { name: 'Custom Real-time 3D', stack: ['GLB model', 'React Three Fiber', 'Drei ScrollControls', 'GSAP ScrollTrigger', 'Motion overlays'], buildTime: '3-5 days', bestFor: 'Exploded views, configurators' },
  4: { name: 'Apple-style Pre-rendered Cinematic', stack: ['Spline/Blender animation', 'FFmpeg frame extraction', 'Canvas Scroll Clip', 'GSAP ScrollTrigger', 'HTML overlay copy'], buildTime: '2-4 days', bestFor: 'Hero deconstruction moments' },
  5: { name: 'Hybrid Adaptive Delivery', stack: ['Desktop: R3F or Spline', 'Mobile: image sequence', 'Slow connection: static fallback'], buildTime: '5-7 days', bestFor: 'Production-grade client work' },
};

export default { CAPABILITY_REGISTRY, TIER_STACKS };
