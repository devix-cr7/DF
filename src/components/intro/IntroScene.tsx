import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { tools } from "../../modules/registry";
import { useIsMobile } from "../../hooks/useIsMobile";

// Fixed "galaxy" positions in 3D space — deterministic, tuned by eye.
// dir biases where each icon finally flies toward (negative x/y = toward sidebar/topbar).
const SCATTER = [
  { x: -420, y: -180, z: -260, r: -35, dx: -160, dy: -80 },
  { x: 380, y: -220, z: -180, r: 28, dx: 60, dy: -140 },
  { x: -520, y: 60, z: -120, r: 18, dx: -220, dy: 20 },
  { x: 460, y: 120, z: -300, r: -22, dx: 80, dy: -40 },
  { x: -260, y: 260, z: -160, r: 40, dx: -140, dy: -60 },
  { x: 300, y: 280, z: -220, r: -30, dx: 40, dy: -100 },
  { x: -60, y: -320, z: -200, r: 15, dx: -80, dy: -160 },
  { x: 140, y: -300, z: -140, r: -18, dx: 40, dy: -160 },
  { x: -400, y: -60, z: -320, r: 25, dx: -200, dy: -10 },
  { x: 420, y: -40, z: -260, r: -25, dx: 90, dy: -80 },
  { x: -160, y: 320, z: -180, r: -12, dx: -160, dy: -30 },
  { x: 200, y: -160, z: -340, r: 20, dx: 60, dy: -140 },
];

// Rotate a point around the origin — used to make icons swirl around
// the logo like planets before drifting away to their final spot.
function rotate(x: number, y: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: x * Math.cos(rad) - y * Math.sin(rad),
    y: x * Math.sin(rad) + y * Math.cos(rad),
  };
}

const TOTAL_DURATION = 7.2; // seconds — one continuous timeline, no phase cuts

export function IntroScene({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const isMobile = useIsMobile();
  const scale = isMobile ? 0.5 : 1;
  const icons = tools.slice(0, SCATTER.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const t = setTimeout(() => setVisible(false), TOTAL_DURATION * 1000 - 900);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 grid place-items-center bg-forge-bg"
          style={{ perspective: 1400 }}
        >
          <div className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
            {icons.map((tool, i) => {
              const s = SCATTER[i];
              const orbit1 = rotate(s.x, s.y, 55 + i * 2);
              const orbit2 = rotate(s.x, s.y, 130 + i * 2);
              const final = { x: (s.x + s.dx) * scale, y: (s.y + s.dy) * scale };

              return (
                <motion.div
                  key={tool.id}
                  initial={{ x: 0, y: 0, z: -700, opacity: 0, scale: 0.35, rotate: 0 }}
                  animate={{
                    x: [0, s.x * scale, orbit1.x * scale, orbit2.x * scale, final.x],
                    y: [0, s.y * scale, orbit1.y * scale, orbit2.y * scale, final.y],
                    z: [-700, s.z, s.z + 40, s.z, s.z - 220],
                    opacity: [0, 0.9, 0.95, 0.85, 0],
                    scale: [0.35, 1, 1.05, 0.95, 0.6],
                    rotate: [0, s.r, s.r + 90, s.r + 180, s.r + 220],
                  }}
                  transition={{
                    duration: TOTAL_DURATION,
                    times: [0, 0.22, 0.5, 0.74, 1],
                    delay: i * 0.05,
                    ease: [0.45, 0.05, 0.35, 1],
                  }}
                  className="absolute -left-4 -top-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="grid h-8 w-8 place-items-center rounded-lg border border-forge-border bg-forge-panel text-ember-400 shadow-panel"
                    style={{ animation: "orbit-float 4s ease-in-out infinite", animationDelay: `${i * 0.15}s` }}
                  >
                    <tool.icon size={15} />
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1.08, 1.3] }}
              transition={{
                duration: TOTAL_DURATION,
                times: [0, 0.12, 0.8, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -left-7 -top-7 grid h-14 w-14 place-items-center rounded-2xl bg-forge-gradient shadow-glow"
            >
              <Flame size={26} className="text-forge-bg" strokeWidth={2.5} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: TOTAL_DURATION, times: [0, 0.15, 0.75, 1] }}
            className="absolute bottom-16 font-display text-sm tracking-[0.3em] text-forge-muted"
          >
            DEVFORGE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
