/**
 * Layer 1 — Scroll Foundation
 * Lenis + GSAP ScrollTrigger integration
 * 
 * Usage:
 *   import { initScroll } from '@/scroll/lenis';
 *   import { createScrollChoreography } from '@/scroll/gsap';
 * 
 *   // Initialize smooth scroll
 *   const lenis = initScroll();
 * 
 *   // Create pinned product deconstruction
 *   createScrollChoreography({
 *     trigger: '.product-deconstruction',
 *     scenes: [
 *       { progress: [0, 0.1], label: 'Hero assembled' },
 *       { progress: [0.1, 0.22], label: 'Component 1' },
 *       { progress: [0.22, 0.34], label: 'Component 2' },
 *       // ...
 *     ]
 *   });
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollConfig {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal' | 'both';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

const defaultConfig: ScrollConfig = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

export function initScroll(config: ScrollConfig = {}) {
  const lenis = new Lenis({ ...defaultConfig, ...config });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export interface ScenePhase {
  progress: [number, number]; // 0-1 range
  label: string;
  element?: string; // CSS selector for the callout
  onEnter?: () => void;
  onLeave?: () => void;
}

export interface ChoreographyConfig {
  trigger: string;
  start?: string;
  end?: string;
  pin?: boolean;
  scrub?: boolean | number;
  snap?: number | number[];
  scenes: ScenePhase[];
  onUpdate?: (progress: number) => void;
}

export function createScrollChoreography(config: ChoreographyConfig) {
  const {
    trigger,
    start = 'top top',
    end = 'bottom bottom',
    pin = true,
    scrub = 1,
    scenes,
    onUpdate,
  } = config;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      end,
      pin,
      scrub,
      onUpdate: (self) => {
        const progress = self.progress;

        // Fire scene callbacks
        scenes.forEach((scene) => {
          if (progress >= scene.progress[0] && progress < scene.progress[1]) {
            if (scene.onEnter) scene.onEnter();
          } else {
            if (scene.onLeave) scene.onLeave();
          }
        });

        if (onUpdate) onUpdate(progress);
      },
    },
  });

  return tl;
}

export function createPinnedScene(
  trigger: string,
  duration: string = '100%',
  callbacks?: { onEnter?: () => void; onLeave?: () => void; onUpdate?: (p: number) => void }
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: `+=${duration}`,
    pin: true,
    onEnter: callbacks?.onEnter,
    onLeave: callbacks?.onLeave,
    onUpdate: callbacks?.onUpdate ? (self) => callbacks.onUpdate!(self.progress) : undefined,
  });
}

export function createSnapSections(selectors: string[]) {
  return ScrollTrigger.create({
    snap: {
      snapTo: selectors.map((_, i) => (i + 1) / selectors.length),
      duration: { min: 0.2, max: 0.6 },
      ease: 'power1.inOut',
    },
  });
}

export { Lenis as default };
