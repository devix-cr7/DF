import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { tools } from "../../modules/registry";

const SEEN_KEY = "devforge-intro-seen";

// Fixed "galaxy" positions in 3D space — deterministic, tuned by eye.
// dir biases where each icon flies toward on exit (negative x/y = toward sidebar/topbar).
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

export function IntroScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [visible, setVisible] = useState(true);
  const icons = tools.slice(0, SCATTER.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      localStorage.setItem(SEEN_KEY, "1");
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("out"), 1600);
    const t2 = setTimeout(() => setVisible(false), 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        localStorage.setItem(SEEN_KEY, "1");
        onDone();
      }}
    >
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 grid place-items-center bg-forge-bg"
          style={{ perspective: 1400 }}
        >
          <div className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
            {icons.map((tool, i) => {
              const s = SCATTER[i];
              const out = phase === "out";
              return (
                <motion.div
                  key={tool.id}
                  initial={{ x: 0, y: 0, z: -600, opacity: 0, scale: 0.4 }}
                  animate={
                    out
                      ? {
                          x: s.x + s.dx,
                          y: s.y + s.dy,
                          z: s.z - 200,
                          rotate: s.r * 1.4,
                          opacity: 0,
                          scale: 0.7,
                        }
                      : { x: s.x, y: s.y, z: s.z, rotate: s.r, opacity: 0.9, scale: 1 }
                  }
                  transition={
                    out
                      ? { duration: 1.1, delay: i * 0.03, ease: [0.4, 0, 0.2, 1] }
                      : { duration: 1.1, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }
                  }
                  className="absolute -left-4 -top-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="grid h-8 w-8 place-items-center rounded-lg border border-forge-border bg-forge-panel text-ember-400 shadow-panel"
                    style={
                      !out
                        ? {
                            animation: "orbit-float 3.2s ease-in-out infinite",
                            animationDelay: `${i * 0.15}s`,
                          }
                        : undefined
                    }
                  >
                    <tool.icon size={15} />
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: phase === "out" ? 0 : 1,
                scale: phase === "out" ? 1.3 : 1,
              }}
              transition={{ duration: phase === "out" ? 0.9 : 0.6, delay: phase === "out" ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-7 -top-7 grid h-14 w-14 place-items-center rounded-2xl bg-forge-gradient shadow-glow"
            >
              <Flame size={26} className="text-forge-bg" strokeWidth={2.5} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "out" ? 0 : 0.7 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-16 font-display text-sm tracking-[0.3em] text-forge-muted"
          >
            DEVFORGE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function hasSeenIntro() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return true;
  }
}
