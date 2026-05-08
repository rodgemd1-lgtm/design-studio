/**
 * Layer 5 — UI Overlay Choreography
 * Motion/Framer Motion + GSAP for text callouts synchronized with 3D/canvas
 * 
 * This generates the HTML/CSS/JS for scroll-synced text overlays
 * that fade in and out over product visuals.
 */

export interface CalloutConfig {
  id: string;
  title: string;
  body: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  progressRange: [number, number]; // 0-1 scroll progress range
  accentColor?: string;
}

export interface OverlayChoreographyConfig {
  callouts: CalloutConfig[];
  container: string; // CSS selector
  animationStyle: 'fade' | 'slide' | 'scale' | 'blur';
  staggerDelay?: number;
}

/**
 * Generate the HTML structure for product deconstruction overlays
 */
export function generateOverlayHTML(config: OverlayChoreographyConfig): string {
  const positions: Record<string, string> = {
    'top-left': 'top: 10%; left: 5%;',
    'top-right': 'top: 10%; right: 5%;',
    'bottom-left': 'bottom: 15%; left: 5%;',
    'bottom-right': 'bottom: 15%; right: 5%;',
    'center-left': 'top: 45%; left: 5%;',
    'center-right': 'top: 45%; right: 5%;',
  };

  const calloutHTML = config.callouts
    .map(
      (c) => `
    <div
      class="product-callout"
      data-callout="${c.id}"
      data-progress-start="${c.progressRange[0]}"
      data-progress-end="${c.progressRange[1]}"
      style="${positions[c.position]}; --accent: ${c.accentColor || '#0d9488'};"
    >
      <div class="callout-line"></div>
      <div class="callout-content">
        <h3 class="callout-title">${c.title}</h3>
        <p class="callout-body">${c.body}</p>
      </div>
    </div>`
    )
    .join('\n');

  return `
<div class="overlay-container" style="position: absolute; inset: 0; pointer-events: none; z-index: 10;">
  ${calloutHTML}
</div>

<style>
.product-callout {
  position: absolute;
  max-width: 320px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
}
.product-callout.active {
  opacity: 1;
  transform: translateY(0);
}
.product-callout.exit {
  opacity: 0;
  transform: translateY(-10px);
}
.callout-line {
  width: 2px;
  height: 40px;
  background: var(--accent);
  margin-bottom: 12px;
  border-radius: 1px;
}
.callout-content {
  background: rgba(10, 10, 12, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px 20px;
}
.callout-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  margin: 0 0 4px 0;
}
.callout-body {
  font-size: 13px;
  color: #8a8a9a;
  margin: 0;
  line-height: 1.5;
}
</style>

<script>
(function() {
  const callouts = document.querySelectorAll('.product-callout');
  let currentCallout = null;

  function updateOverlays(progress) {
    callouts.forEach(callout => {
      const start = parseFloat(callout.dataset.progressStart);
      const end = parseFloat(callout.dataset.progressEnd);

      if (progress >= start && progress < end) {
        callout.classList.add('active');
        callout.classList.remove('exit');
        currentCallout = callout;
      } else {
        if (callout.classList.contains('active')) {
          callout.classList.add('exit');
          setTimeout(() => callout.classList.remove('active', 'exit'), 600);
        }
      }
    });
  }

  // Connect to scroll
  window.addEventListener('scroll', () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    updateOverlays(progress);
  }, { passive: true });

  // Also support GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray('.overlay-container').forEach(container => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => updateOverlays(self.progress),
      });
    });
  }
})();
</style>
`;
}

/**
 * Generate the complete Ideawake prism deconstruction page
 */
export function generateIdeawakeDeconstructionPage(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ideawake — Product Deconstruction</title>
<style>
:root{--bg:#0a0a0c;--surface:#141418;--border:#2a2a32;--text:#faf9f7;--muted:#8a8a9a;--accent:#0d9488}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,sans-serif;overflow-x:hidden}
.hero{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px}
.hero h1{font-size:clamp(36px,6vw,72px);font-weight:700;margin-bottom:16px}
.hero h1 span{color:var(--accent)}
.hero p{font-size:18px;color:var(--muted);max-width:600px;margin:0 auto}
.deconstruction{height:600vh;position:relative}
.deconstruction-inner{position:sticky;top:0;height:100vh;overflow:hidden}
.visual-layer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
.visual-layer canvas{width:100%;height:100%;object-fit:contain}
.overlay-layer{position:absolute;inset:0;z-index:10;pointer-events:none}
.callout{position:absolute;max-width:320px;opacity:0;transform:translateY(20px);transition:opacity .6s,transform .6s;pointer-events:auto}
.callout.active{opacity:1;transform:translateY(0)}
.callout-line{width:2px;height:40px;background:var(--accent);margin-bottom:12px;border-radius:1px}
.callout-box{background:rgba(10,10,12,.85);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:16px 20px}
.callout-box h3{font-size:14px;font-weight:600;color:var(--accent);margin:0 0 4px}
.callout-box p{font-size:13px;color:var(--muted);margin:0;line-height:1.5}
.callout-1{top:15%;left:5%}
.callout-2{top:15%;right:5%}
.callout-3{top:45%;left:5%}
.callout-4{top:45%;right:5%}
.callout-5{top:70%;left:5%}
.callout-6{top:70%;right:5%}
.cta-section{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:40px;background:var(--surface)}
.cta-section h2{font-size:clamp(28px,4vw,48px);font-weight:700;margin-bottom:16px}
.cta-section p{font-size:16px;color:var(--muted);margin-bottom:32px}
.cta-btn{display:inline-block;padding:16px 32px;background:var(--accent);color:var(--bg);font-size:16px;font-weight:600;border-radius:8px;text-decoration:none;transition:background .2s}
.cta-btn:hover{background:#0f766e}
.progress-bar{position:fixed;top:0;left:0;height:2px;background:var(--accent);z-index:100;transition:width .1s}
</style>
</head>
<body>

<div class="hero">
  <div>
    <h1>Ideawake <span>Deconstruction</span></h1>
    <p>Scroll to explore the six pillars of the Ideawake innovation engine. Each component revealed in sequence.</p>
  </div>
</div>

<div class="deconstruction">
  <div class="deconstruction-inner">
    <div class="visual-layer">
      <canvas id="decon-canvas"></canvas>
    </div>
    <div class="overlay-layer">
      <div class="callout callout-1" data-start="0.05" data-end="0.18">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Spark Capture</h3><p>AI-powered signal detection across 33 design channels. Identifies emerging patterns before they become consensus.</p></div>
      </div>
      <div class="callout callout-2" data-start="0.18" data-end="0.32">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Lens Map</h3><p>Orthographic projection of design intelligence. Maps relationships between signals, techniques, and tools.</p></div>
      </div>
      <div class="callout callout-3" data-start="0.32" data-end="0.46">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Pressure Test</h3><p>Adversarial stress testing of design decisions. BDF scoring, AntiGeneric gates, Reactance analysis.</p></div>
      </div>
      <div class="callout callout-4" data-start="0.46" data-end="0.60">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Deviation Engine</h3><p>Calculates distance from median. Ensures every output is +8σ from generic. No exceptions.</p></div>
      </div>
      <div class="callout callout-5" data-start="0.60" data-end="0.74">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Strike Point</h3><p>Precision targeting of the weakest orthodoxy. Named villain classes. Falsifiable bets. Proof density.</p></div>
      </div>
      <div class="callout callout-6" data-start="0.74" data-end="0.88">
        <div class="callout-line"></div>
        <div class="callout-box"><h3>Launch Forge</h3><p>Production pipeline. From signal to shipped product. Multi-platform emitters. Automated deployment.</p></div>
      </div>
    </div>
  </div>
</div>

<div class="cta-section">
  <div>
    <h2>Ready to build?</h2>
    <p>The Ideawake innovation engine is available for your next product launch.</p>
    <a href="#" class="cta-btn">Start Building →</a>
  </div>
</div>

<div class="progress-bar" id="progress"></div>

<script>
// Scroll-driven deconstruction
const callouts = document.querySelectorAll('.callout');
const progressBar = document.getElementById('progress');
const canvas = document.getElementById('decon-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Draw hexagonal prism (simplified representation)
function drawPrism(progress) {
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  
  const cx = w / 2, cy = h / 2;
  const size = Math.min(w, h) * 0.25;
  const explosion = progress * size * 0.8;
  
  // Draw 6 hexagonal layers
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const offset = explosion * (progress > 0.1 ? Math.sin(angle + progress * Math.PI) : 0);
    const layerX = cx + Math.cos(angle) * offset * 0.3;
    const layerY = cy + Math.sin(angle) * offset * 0.3;
    const layerSize = size * (1 - i * 0.1);
    const alpha = 0.3 + (1 - progress) * 0.5;
    
    ctx.beginPath();
    for (let j = 0; j < 6; j++) {
      const a = (j / 6) * Math.PI * 2 - Math.PI / 2;
      const px = layerX + Math.cos(a) * layerSize;
      const py = layerY + Math.sin(a) * layerSize;
      j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = \`rgba(13, 148, 136, \${alpha})\`;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Highlight active component
    if (progress > 0.05 + i * 0.13 && progress < 0.18 + i * 0.13) {
      ctx.fillStyle = \`rgba(13, 148, 136, \${0.1 + (1 - Math.abs(progress - (0.115 + i * 0.13)) * 10) * 0.2})\`;
      ctx.fill();
    }
  }
  
  // Center dot
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#0d9488';
  ctx.fill();
}

// Scroll handler
let scrollProgress = 0;
window.addEventListener('scroll', () => {
  const decon = document.querySelector('.deconstruction');
  const rect = decon.getBoundingClientRect();
  const viewportH = window.innerHeight;
  const deconH = decon.offsetHeight;
  scrollProgress = Math.max(0, Math.min(1, -rect.top / (deconH - viewportH)));
  
  // Update progress bar
  progressBar.style.width = (scrollProgress * 100) + '%';
  
  // Update callouts
  callouts.forEach(c => {
    const start = parseFloat(c.dataset.start);
    const end = parseFloat(c.dataset.end);
    if (scrollProgress >= start && scrollProgress < end) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });
  
  // Draw prism
  drawPrism(scrollProgress);
}, { passive: true });

// Initial draw
drawPrism(0);
</script>
</body>
</html>
`;
}
