/**
 * Layer 3 — 3D Integration
 * Spline + React Three Fiber scroll-driven scenes
 */

// ─── Spline Integration ───

export interface SplineEmbedConfig {
  scene: string;
  container: HTMLElement | string; // selector or element
  onLoad?: () => void;
}

/**
 * Load a Spline scene into a container element
 */
export async function loadSplineScene(config: SplineEmbedConfig) {
  const { Application } = await import('@splinetool/runtime');
  const container =
    typeof config.container === 'string'
      ? document.querySelector(config.container)!
      : config.container;

  const app = new Application(container as any);
  await app.load(config.scene);

  if (config.onLoad) config.onLoad();

  return {
    app,
    findObject: (name: string) => (app as any).findObjectByName(name),
    setVariable: (name: string, value: any) => (app as any).setVariable(name, value),
    emitEvent: (event: string, name?: string) => (app as any).emitEvent(event, name),
    destroy: () => app.dispose?.(),
  };
}

/**
 * Spline Viewer web component embed (lowest complexity)
 * Just drop this HTML into any page:
 *
 * <spline-viewer url="https://prod.spline.design/YOUR-SCENE/scene.splinecode"></spline-viewer>
 *
 * Add this script to your page head:
 * <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js"></script>
 */
export function getSplineViewerHTML(sceneUrl: string): string {
  return `
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js"></script>
<spline-viewer url="${sceneUrl}"></spline-viewer>`;
}

/**
 * Generate a scroll-synced Spline scene wrapper
 */
export function generateSplineScrollWrapper(config: {
  sceneUrl: string;
  height?: string;
  objectMappings?: {
    objectName: string;
    property: string;
    from: number;
    to: number;
  }[];
}): string {
  const { sceneUrl, height = '600vh', objectMappings = [] } = config;

  return `
<div class="spline-scroll-section" style="height: ${height}; position: relative;">
  <div class="spline-container" style="position: sticky; top: 0; height: 100vh; width: 100%;">
    <canvas id="spline-canvas"></canvas>
  </div>
  <div class="scroll-content" style="position: relative; z-index: 2; pointer-events: none;">
    <!-- Text callouts go here -->
  </div>
</div>

<script type="module">
import { Application } from 'https://unpkg.com/@splinetool/runtime@1.9.28/build/runtime.js';

const canvas = document.getElementById('spline-canvas');
const container = canvas.parentElement;
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

const app = new Application(canvas);

await app.load('${sceneUrl}');

// Sync to scroll
${objectMappings
  .map(
    (m) => `
app.on('mouseDown', (e) => {
  if (e.target?.name === '${m.objectName}') {
    // Handle interaction
  }
});
`
  )
  .join('\n')}

// Scroll sync
let scrollProgress = 0;
window.addEventListener('scroll', () => {
  const rect = container.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - viewportHeight)));
  ${objectMappings
    .map(
      (m) => `
  const ${m.objectName} = app.findObjectByName('${m.objectName}');
  if (${m.objectName}) {
    ${m.objectName}.${m.property} = ${m.from} + (${m.to} - ${m.from}) * scrollProgress;
  }`
    )
    .join('\n')}
}, { passive: true });
</script>
`;
}

// ─── R3F Code Generator ───

export interface ExplodedViewConfig {
  glbPath: string;
  parts: {
    name: string;
    label: string;
    explodeDirection: [number, number, number];
    explodeDistance: number;
  }[];
}

/**
 * Generate a complete R3F exploded view component
 */
export function generateR3FExplodedView(config: ExplodedViewConfig): string {
  return `
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

const PARTS = ${JSON.stringify(config.parts, null, 2)};

export function ExplodedProduct({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { nodes } = useGLTF('${config.glbPath}');

  // Breathing animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Environment preset="studio" />
      {PARTS.map((part) => {
        const explodeAmount = progress * part.explodeDistance;
        return (
          <group
            key={part.name}
            position={[
              part.explodeDirection[0] * explodeAmount,
              part.explodeDirection[1] * explodeAmount,
              part.explodeDirection[2] * explodeAmount,
            ]}
          >
            {(nodes as any)[part.name] && primitiveFromNode((nodes as any)[part.name])}
            {progress > 0.1 && (
              <Html distanceFactor={8} style={{ pointerEvents: 'none' }}>
                <div style={{
                  background: 'rgba(13,148,136,0.9)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                }}>
                  {part.label}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function primitiveFromNode(node: THREE.Object3D) {
  if (node instanceof THREE.Mesh) {
    return (
      <mesh
        geometry={node.geometry}
        material={node.material}
        castShadow
        receiveShadow
      />
    );
  }
  return (
    <group>
      {node.children.map((child, i) => (
        <primitive key={i} object={child} />
      ))}
    </group>
  );
}

useGLTF.preload('${config.glbPath}');
`;
}
