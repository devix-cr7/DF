import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { motion, AnimatePresence } from "framer-motion";

export default function UuidTool() {
  const [count, setCount] = useState(8);
  const [ids, setIds] = useState<string[]>(() =>
    Array.from({ length: 8 }, () => crypto.randomUUID())
  );
  const { copied, copy } = useCopy();

  const regenerate = () => setIds(Array.from({ length: count }, () => crypto.randomUUID()));

  return (
    <ToolShell
      title="UUID Generator"
      description="Generate RFC 4122 v4 unique identifiers"
      toolbar={
        <>
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value))))}
            className="w-16 rounded-lg border border-forge-border bg-forge-panel2 px-2.5 py-1.5 text-xs text-forge-text outline-none"
          />
          <Button variant="primary" size="sm" onClick={regenerate}>
            <RefreshCw size={13} /> Generate
          </Button>
        </>
      }
    >
      <div className="h-full overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40">
        <AnimatePresence initial={false}>
          {ids.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className="group flex items-center justify-between border-b border-forge-border/60 px-4 py-2.5 last:border-0"
            >
              <span className="font-mono text-[13px] text-forge-text">{id}</span>
              <IconButton
                label="Copy"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => copy(id)}
              >
                {copied ? <Check size={14} className="text-ember-400" /> : <Copy size={14} />}
              </IconButton>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToolShell>
  );
}
