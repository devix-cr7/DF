import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

const ALGOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;

async function digest(algo: string, text: string) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashTool() {
  const [input, setInput] = useState("DevForge");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const { copied, copy } = useCopy();
  const [copiedAlgo, setCopiedAlgo] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all(ALGOS.map((a) => digest(a, input))).then((results) => {
      if (cancelled) return;
      const next: Record<string, string> = {};
      ALGOS.forEach((a, i) => (next[a] = results[i]));
      setHashes(next);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <ToolShell title="Hash Generator" description="SHA-1 / SHA-256 / SHA-384 / SHA-512 digests">
      <div className="flex h-full flex-col gap-4">
        <CodeArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-24 flex-none"
          placeholder="Text to hash…"
        />
        <div className="flex-1 space-y-2 overflow-y-auto">
          {ALGOS.map((algo) => (
            <div
              key={algo}
              className="rounded-lg border border-forge-border bg-forge-bg/40 p-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-ember-400">{algo}</span>
                <IconButton
                  label="Copy"
                  onClick={() => {
                    copy(hashes[algo] ?? "");
                    setCopiedAlgo(algo);
                  }}
                >
                  {copied && copiedAlgo === algo ? (
                    <Check size={14} className="text-ember-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </IconButton>
              </div>
              <p className="break-all font-mono text-[12.5px] text-forge-text">
                {hashes[algo] ?? "…"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
