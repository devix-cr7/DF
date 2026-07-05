import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TunnelScene } from "./TunnelScene";

// Total time the intro stays on screen before it fades into the app.
// Matches the fly-through length inside TunnelScene, plus a short fade.
const FADE_DURATION = 0.9;

export function IntroScene({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [flyDone, setFlyDone] = useState(false);

  const reduce =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) {
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!flyDone) return;
    const t = setTimeout(() => setVisible(false), 50);
    return () => clearTimeout(t);
  }, [flyDone]);

  if (reduce) return null;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-forge-bg"
        >
          <TunnelScene onProgressDone={() => setFlyDone(true)} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            transition={{ duration: 6.5, times: [0, 0.12, 0.8, 1] }}
            className="pointer-events-none absolute bottom-16 left-0 right-0 text-center font-display text-sm tracking-[0.3em] text-forge-muted"
          >
            DEVFORGE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
