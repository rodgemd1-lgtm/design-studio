/**
 * Layer 2 — Apple-style Canvas Image Sequence Engine
 * 
 * High-performance frame-by-frame scroll animation.
 * Never draws inside scroll event — only updates a number.
 * requestAnimationFrame handles drawing.
 * 
 * Usage:
 *   import { ImageSequence } from '@/canvas/apfel';
 * 
 *   const seq = new ImageSequence({
 *     canvas: document.getElementById('sequence-canvas'),
 *     frames: framesArray, // preloaded Image objects
 *     trigger: '.product-hero',
 *     scrub: 1,
 *   });
 * 
 *   seq.init();
 */

export interface ImageSequenceConfig {
  canvas: HTMLCanvasElement;
  frames: HTMLImageElement[];
  trigger?: string;
  scrub?: number;
  fps?: number;
  loop?: boolean;
  fillStyle?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  onFrame?: (frame: number, total: number) => void;
  onProgress?: (progress: number) => void;
}

export class ImageSequence {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frames: HTMLImageElement[];
  private scrollPos = 0;
  private lastFrame = -1;
  private rafId: number | null = null;
  private scrollTrigger: any = null;
  private config: ImageSequenceConfig;

  constructor(config: ImageSequenceConfig) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext('2d')!;
    this.frames = config.frames;
    this.config = config;
  }

  async init() {
    // Set canvas size to match first frame
    if (this.frames[0]) {
      this.canvas.width = this.frames[0].naturalWidth || this.frames[0].width;
      this.canvas.height = this.frames[0].naturalHeight || this.frames[0].height;
    }

    // Set up scroll listener (passive — only updates number)
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // Set up GSAP ScrollTrigger if trigger specified
    if (this.config.trigger && typeof window !== 'undefined') {
      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const { gsap } = await import('gsap');
        gsap.registerPlugin(ScrollTrigger);

        this.scrollTrigger = ScrollTrigger.create({
          trigger: this.config.trigger,
          start: 'top top',
          end: 'bottom bottom',
          scrub: this.config.scrub ?? 1,
          onUpdate: (self: { progress: number }) => {
            this.scrollPos = self.progress;
            if (this.config.onProgress) this.config.onProgress(self.progress);
          },
        });
      } catch {
        // GSAP not available, fall back to native scroll
      }
    }

    // Start render loop
    this.render();
  }

  private onScroll = () => {
    if (!this.config.trigger) {
      // Native scroll mode
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      this.scrollPos = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }
  };

  private render = () => {
    if (this.frames.length === 0) {
      this.rafId = requestAnimationFrame(this.render);
      return;
    }

    const progress = Math.max(0, Math.min(1, this.scrollPos));
    const frameIndex = Math.floor(progress * (this.frames.length - 1));

    if (frameIndex !== this.lastFrame && this.frames[frameIndex]) {
      const frame = this.frames[frameIndex];
      const { canvas, ctx, config } = this;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (config.objectFit === 'cover') {
        const scale = Math.max(canvas.width / frame.width, canvas.height / frame.height);
        const w = frame.width * scale;
        const h = frame.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(frame, x, y, w, h);
      } else if (config.objectFit === 'contain') {
        const scale = Math.min(canvas.width / frame.width, canvas.height / frame.height);
        const w = frame.width * scale;
        const h = frame.height * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.drawImage(frame, x, y, w, h);
      } else {
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
      }

      this.lastFrame = frameIndex;

      if (config.onFrame) config.onFrame(frameIndex, this.frames.length);
    }

    this.rafId = requestAnimationFrame(this.render);
  };

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.scrollTrigger) this.scrollTrigger.kill();
  }

  getProgress() {
    return this.scrollPos;
  }

  getFrameIndex() {
    return this.lastFrame;
  }
}

/**
 * Preload an array of image URLs into Image objects
 */
export function preloadFrames(urls: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
        })
    )
  );
}

/**
 * Generate frame URLs from a pattern
 * e.g., generateFrameUrls('/frames/frame_{frame}.webp', 240, 4)
 * → ['/frames/frame_0001.webp', '/frames/frame_0002.webp', ...]
 */
export function generateFrameUrls(
  pattern: string,
  totalFrames: number,
  padLength: number = 4
): string[] {
  return Array.from({ length: totalFrames }, (_, i) =>
    pattern.replace('{frame}', String(i + 1).padStart(padLength, '0'))
  );
}

/**
 * Spritesheet-based image sequence
 * Packs all frames into one image, translates based on progress
 */
export class SpritesheetSequence {
  private element: HTMLElement;
  private image: HTMLImageElement;
  private cols: number;
  private rows: number;
  private totalFrames: number;
  private frameWidth: number;
  private frameHeight: number;
  private lastFrame = -1;

  constructor(config: {
    element: HTMLElement;
    src: string;
    cols: number;
    rows: number;
    totalFrames: number;
  }) {
    this.element = config.element;
    this.cols = config.cols;
    this.rows = config.rows;
    this.totalFrames = config.totalFrames;
    this.image = new Image();
    this.image.src = config.src;
    this.frameWidth = 0;
    this.frameHeight = 0;
  }

  async init() {
    await new Promise<void>((resolve) => {
      this.image.onload = () => {
        this.frameWidth = this.image.width / this.cols;
        this.frameHeight = this.image.height / this.rows;
        this.element.style.width = `${this.frameWidth}px`;
        this.element.style.height = `${this.frameHeight}px`;
        this.element.style.backgroundImage = `url(${this.image.src})`;
        this.element.style.backgroundSize = `${this.image.width}px ${this.image.height}px`;
        resolve();
      };
    });

    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private onScroll = () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const frame = Math.floor(progress * (this.totalFrames - 1));

    if (frame !== this.lastFrame) {
      const col = frame % this.cols;
      const row = Math.floor(frame / this.cols);
      this.element.style.backgroundPosition = `-${col * this.frameWidth}px -${row * this.frameHeight}px`;
      this.lastFrame = frame;
    }
  };

  destroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
