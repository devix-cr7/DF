import { useEffect, useState } from "react";
import { Copy, Check, Plus, Trash2, Clipboard as ClipboardIcon } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { motion, AnimatePresence } from "framer-motion";

interface Slot {
  id: string;
  text: string;
  savedAt: number;
}

const STORAGE_KEY = "devforge-clipboard-slots";

function load(): Slot[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function ClipboardTool() {
  const [slots, setSlots] = useState<Slot[]>(load);
  const [draft, setDraft] = useState("");
  const { copied, copy } = useCopy();
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
  }, [slots]);

  function save() {
    if (!draft.trim()) return;
    setSlots((s) => [{ id: crypto.randomUUID(), text: draft, savedAt: Date.now() }, ...s].slice(0, 30));
    setDraft("");
  }

  function remove(id: string) {
    setSlots((s) => s.filter((x) => x.id !== id));
  }

  async function pasteFromSystem() {
    try {
      const text = await navigator.clipboard.readText();
      setDraft(text);
    } catch {
      /* clipboard read denied — user can paste manually */
    }
  }

  return (
    <ToolShell
      title="Clipboard Board"
      description="Save multiple snippets locally and reuse them anytime"
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type or paste something to save…"
            rows={2}
            className="flex-1 resize-none rounded-lg border border-forge-border bg-forge-bg/60 p-3 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <div className="flex flex-col gap-2">
            <Button variant="secondary" size="sm" onClick={pasteFromSystem} title="Paste from clipboard">
              <ClipboardIcon size={13} />
            </Button>
            <Button variant="primary" size="sm" onClick={save}>
              <Plus size={13} />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          <AnimatePresence initial={false}>
            {slots.length === 0 && (
              <p className="py-8 text-center text-[13px] text-forge-faint">
                No saved snippets yet — add one above.
              </p>
            )}
            {slots.map((slot) => (
              <motion.div
                key={slot.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="group flex items-start justify-between gap-3 rounded-lg border border-forge-border bg-forge-bg/40 p-3"
              >
                <p className="min-w-0 flex-1 break-all font-mono text-[12.5px] text-forge-text">
                  {slot.text}
                </p>
                <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <IconButton
                    label="Copy"
                    onClick={() => {
                      copy(slot.text);
                      setCopiedId(slot.id);
                    }}
                  >
                    {copied && copiedId === slot.id ? (
                      <Check size={14} className="text-ember-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </IconButton>
                  <IconButton label="Delete" onClick={() => remove(slot.id)}>
                    <Trash2 size={14} />
                  </IconButton>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToolShell>
  );
}
