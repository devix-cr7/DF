import { useEffect, useRef } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return; // skip on touch devices

    let raf = 0;

    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
    }

    function tick() {
      current.current.x += (pos.current.x - current.current.x) * 0.08;
      current.current.y += (pos.current.y - current.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 300}px, ${current.current.y - 300}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(217,123,43,0.05) 0%, rgba(99,102,241,0.03) 45%, transparent 70%)",
      }}
    />
  );
}
