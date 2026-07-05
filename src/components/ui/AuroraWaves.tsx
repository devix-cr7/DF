import { useEffect, useRef } from "react";

/**
 * Layered flowing light-ribbons drifting across the bottom of a hero
 * section — the "aurora wave" effect. Cool temper-blue blending into
 * warm ember-orange, matching the app's existing duotone palette.
 */
export function AuroraWaves({ className = "" }: { className?: string }) {
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

    const WAVES = [
      { amp: 26, freq: 1.6, speed: 0.35, yBase: 0.62, width: 2.4, glow: 18, alpha: 0.55 },
      { amp: 18, freq: 2.2, speed: 0.5, yBase: 0.7, width: 1.6, glow: 12, alpha: 0.4 },
      { amp: 34, freq: 1.1, speed: 0.22, yBase: 0.55, width: 3, glow: 24, alpha: 0.32 },
    ];

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

    function drawWave(w: (typeof WAVES)[number], phase: number) {
      const grad = ctx!.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "rgba(91, 147, 184, 0)"); // temper-400, fades in
      grad.addColorStop(0.25, "rgba(91, 147, 184, 0.9)");
      grad.addColorStop(0.55, "rgba(139, 92, 246, 0.85)"); // violet bridge
      grad.addColorStop(0.8, "rgba(232, 150, 63, 0.9)"); // ember-400
      grad.addColorStop(1, "rgba(232, 150, 63, 0)");

      ctx!.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const nx = i / steps;
        const y =
          height * w.yBase +
          Math.sin(nx * Math.PI * 2 * w.freq + phase) * w.amp * Math.sin(nx * Math.PI); // taper ends
        if (i === 0) ctx!.moveTo(x, y);
        else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = w.width;
      ctx!.globalAlpha = w.alpha;
      ctx!.shadowColor = "rgba(139, 92, 246, 0.6)";
      ctx!.shadowBlur = w.glow;
      ctx!.stroke();
      ctx!.shadowBlur = 0;
      ctx!.globalAlpha = 1;
    }

    function tick() {
      t += 0.01;
      ctx!.clearRect(0, 0, width, height);
      for (const w of WAVES) {
        drawWave(w, t * w.speed * 4);
      }
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
