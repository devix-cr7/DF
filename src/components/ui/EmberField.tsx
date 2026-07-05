import { useEffect, useRef } from "react";

interface Ember {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  life: number;
  maxLife: number;
}

export function EmberField({ count = 26 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let embers: Ember[] = [];
    let raf = 0;

    function spawn(): Ember {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 40,
        r: 1 + Math.random() * 2,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 600 + Math.random() * 600,
      };
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      embers = Array.from({ length: count }, spawn);
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      for (const e of embers) {
        e.y -= e.speed;
        e.x += e.drift;
        e.life++;
        const fade = Math.min(1, (e.maxLife - e.life) / 120);
        const alpha = Math.max(0, fade) * 0.55;

        const grad = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 5);
        grad.addColorStop(0, `rgba(232, 150, 63, ${alpha})`);
        grad.addColorStop(1, "rgba(232, 150, 63, 0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r * 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(243, 192, 138, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx!.fill();

        if (e.life > e.maxLife || e.y < -20) Object.assign(e, spawn(), { y: height + 10 });
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
