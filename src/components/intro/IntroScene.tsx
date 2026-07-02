import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { tools } from "../../modules/registry";

const SEEN_KEY = "devforge-intro-seen";

// Fixed scatter positions (3D space) — deterministic, tuned by eye.
const SCATTER = [
  { x: -420, y: -180, z: -260, r: -35 },
  { x: 380, y: -220, z: -180, r: 28 },
  { x: -520, y: 60, z: -120, r: 18 },
  { x: 460, y: 120, z: -300, r: -22 },
  { x: -260, y: 260, z: -160, r: 40 },
  { x: 300, y: 280, z: -220, r: -30 },
  { x: -60, y: -320, z: -200, r: 15 },
  { x: 140, y: -300, z: -140, r: -18 },
  { x: -400, y: -60, z: -320, r: 25 },
  { x: 420, y: -40, z: -260, r: -25 },
  { x: -160, y: 320, z: -180, r: -12 },
  { x: 200, y: -160, z: -340, r: 20 },
];

export function IntroScene({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"scatter" | "converge" | "flash" | "gone">("scatter");
  const icons = tools.slice(0, SCATTER.length);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      return;
    }
    const t1 = setTimeout(() => setPhase("converge"), 550);
    const t2 = setTimeout(() => setPhase("flash"), 1750);
    const t3 = setTimeout(() => finish(), 2150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    localStorage.setItem(SEEN_KEY, "1");
    setPhase("gone");
    setTimeout(onDone, 400);
  }

  if (phase === "gone") return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 grid place-items-center bg-forge-bg"
        style={{ perspective: 1400 }}
      >
        <div className="relative h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
          {icons.map((tool, i) => {
            const s = SCATTER[i];
            const converged = phase !== "scatter";
            return (
              <motion.div
                key={tool.id}
                initial={{
                  x: s.x,
                  y: s.y,
                  z: s.z,
                  rotate: s.r,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={
                  converged
                    ? { x: 0, y: 0, z: 0, rotate: 0, opacity: 0, scale: 0.3 }
                    : { x: s.x, y: s.y, z: s.z, rotate: s.r, opacity: 0.9, scale: 1 }
                }
                transition={{
                  duration: converged ? 1.1 : 0.7,
                  delay: converged ? i * 0.035 : i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute -left-4 -top-4 grid h-8 w-8 place-items-center rounded-lg border border-forge-border bg-forge-panel text-ember-400 shadow-panel"
                style={{ transformStyle: "preserve-3d" }}
              >
                <tool.icon size={15} />
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: phase === "flash" ? 1.15 : 1,
            }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-7 -top-7 grid h-14 w-14 place-items-center rounded-2xl bg-forge-gradient shadow-glow"
          >
            <Flame size={26} className="text-forge-bg" strokeWidth={2.5} />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "flash" ? 0 : 0.7 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-16 font-display text-sm tracking-[0.3em] text-forge-muted"
        >
          DEVFORGE
        </motion.p>
      </motion.div>
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
