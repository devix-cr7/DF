import { useEffect, useRef } from "react";

/**
 * Warped, glowing perspective grid — the "funnel of light" effect.
 * Renders behind hero content as a subtle animated backdrop.
 */
export function MeshGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;

    const COLS = 22;
    const ROWS = 14;

    function setup() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Maps a grid cell (col 0..COLS, row 0..ROWS) to screen space,
    // narrow at the top (vanishing point) and wide at the bottom —
    // the "funnel" shape from the reference clip.
    function project(c: number, r: number) {
      const u = c / COLS; // 0..1 across
      const v = r / ROWS; // 0..1 down
      const spread = 0.12 + v * 0.68; // narrow top, wide bottom
      const cx = width * 0.5 + (u - 0.5) * width * spread;
      const cy = height * 0.06 + v * height * 0.62;
      const wobble = reduce
        ? 0
        : Math.sin(t * 0.6 + u * 6 + v * 2) * 6 * v +
          Math.cos(t * 0.4 + v * 4) * 4 * v;
      return { x: cx + wobble, y: cy };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.lineWidth = 1;

      // Horizontal (ring) lines
      for (let r = 0; r <= ROWS; r++) {
        ctx!.beginPath();
        for (let c = 0; c <= COLS; c++) {
          const p = project(c, r);
          if (c === 0) ctx!.moveTo(p.x, p.y);
          else ctx!.lineTo(p.x, p.y);
        }
        const alpha = 0.05 + (r / ROWS) * 0.16;
        const mix = r / ROWS;
        ctx!.strokeStyle = `rgba(${lerpColor(mix)}, ${alpha})`;
        ctx!.stroke();
      }

      // Vertical (radial) lines
      for (let c = 0; c <= COLS; c++) {
        ctx!.beginPath();
        for (let r = 0; r <= ROWS; r++) {
          const p = project(c, r);
          if (r === 0) ctx!.moveTo(p.x, p.y);
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.strokeStyle = `rgba(${lerpColor(0.5)}, 0.07)`;
        ctx!.stroke();
      }
    }

    // Blends from cool temper-blue (top, distant) into warm ember (bottom, near)
    function lerpColor(mix: number) {
      const a = [91, 147, 184]; // temper-400
      const b = [232, 150, 63]; // ember-400
      const r = Math.round(a[0] + (b[0] - a[0]) * mix);
      const g = Math.round(a[1] + (b[1] - a[1]) * mix);
      const bl = Math.round(a[2] + (b[2] - a[2]) * mix);
      return `${r}, ${g}, ${bl}`;
    }

    function tick() {
      t += 0.012;
      draw();
      if (!reduce) raf = requestAnimationFrame(tick);
    }

    setup();
    tick();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
