import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  layer: number;
}

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  hue: "blue" | "purple" | "indigo";
  driftX: number;
  driftY: number;
}

const NEBULA_COLORS = {
  blue: "59,130,246",
  purple: "139,92,246",
  indigo: "99,102,241",
};

export function ConstellationField({ count = 34 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const parallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let nodes: Node[] = [];
    let nebulae: Nebula[] = [];
    let raf = 0;
    let t = 0;

    function spawnNode(): Node {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18 - 0.05,
        r: 1 + Math.random() * 1.6,
      };
    }

    function spawnStar(): Star {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.1,
        baseAlpha: 0.15 + Math.random() * 0.55,
        twinkleSpeed: 0.3 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        layer: Math.random() > 0.6 ? 1 : 0,
      };
    }

    function spawnDust(): Dust {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: -0.02 - Math.random() * 0.05,
        r: 0.6 + Math.random() * 1.2,
      };
    }

    function setup() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = Array.from({ length: count }, spawnNode);
      stars = Array.from({ length: 140 }, spawnStar);
      dust = Array.from({ length: 26 }, spawnDust);
      nebulae = [
        { x: 0.18, y: 0.22, r: 0.55, hue: "blue", driftX: 0.00012, driftY: 0.00008 },
        { x: 0.82, y: 0.3, r: 0.5, hue: "purple", driftX: -0.0001, driftY: 0.00006 },
        { x: 0.5, y: 0.85, r: 0.6, hue: "indigo", driftX: 0.00008, driftY: -0.0001 },
      ];
    }

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      parallax.current = {
        x: (mouse.current.x / width - 0.5) * 2,
        y: (mouse.current.y / height - 0.5) * 2,
      };
    }
    function onLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    const LINK_DIST = 130;
    const MOUSE_DIST = 140;

    function drawNebulae() {
      for (const n of nebulae) {
        n.x += n.driftX;
        n.y += n.driftY;
        const cx = n.x * width + parallax.current.x * 6;
        const cy = n.y * height + parallax.current.y * 6;
        const radius = n.r * Math.min(width, height);
        const rgb = NEBULA_COLORS[n.hue];
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${rgb}, 0.10)`);
        grad.addColorStop(0.5, `rgba(${rgb}, 0.045)`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, width, height);
      }
    }

    function drawStars() {
      for (const s of stars) {
        const flicker = reduce ? 0 : Math.sin(t * s.twinkleSpeed + s.phase) * 0.25;
        const alpha = Math.max(0, Math.min(1, s.baseAlpha + flicker));
        const px = s.layer === 1 ? parallax.current.x * 4 : parallax.current.x * 1.2;
        const py = s.layer === 1 ? parallax.current.y * 4 : parallax.current.y * 1.2;
        ctx!.fillStyle = `rgba(237, 235, 231, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(s.x + px, s.y + py, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawDust() {
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.y < -10) Object.assign(d, spawnDust(), { y: height + 10 });
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;
        ctx!.fillStyle = "rgba(200, 205, 215, 0.18)";
        ctx!.beginPath();
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawConstellation() {
      for (const n of nodes) {
        const dxm = n.x - mouse.current.x;
        const dym = n.y - mouse.current.y;
        const distM = Math.hypot(dxm, dym);
        if (distM < MOUSE_DIST) {
          const force = (1 - distM / MOUSE_DIST) * 0.04;
          n.vx += (dxm / (distM || 1)) * force;
          n.vy += (dym / (distM || 1)) * force;
        }
        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.98;
        n.vy *= 0.98;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx!.strokeStyle = `rgba(217, 123, 43, ${0.13 * (1 - d / LINK_DIST)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = "rgba(243, 192, 138, 0.5)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function tick() {
      t += 0.016;
      ctx!.clearRect(0, 0, width, height);
      drawNebulae();
      drawStars();
      drawDust();
      drawConstellation();
      raf = requestAnimationFrame(tick);
    }

    setup();
    tick();
    window.addEventListener("resize", setup);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("resize", setup);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
