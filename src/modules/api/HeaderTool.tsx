import { useMemo, useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

const PRESETS = [
  "Content-Type", "Authorization", "Accept", "User-Agent", "Cache-Control",
  "Accept-Language", "Origin", "Referer", "X-Requested-With", "X-API-Key",
];

interface Header {
  id: string;
  key: string;
  value: string;
}

export default function HeaderTool() {
  const [headers, setHeaders] = useState<Header[]>([
    { id: crypto.randomUUID(), key: "Content-Type", value: "application/json" },
    { id: crypto.randomUUID(), key: "Authorization", value: "Bearer <token>" },
  ]);
  const [output, setOutput] = useState<"curl" | "fetch" | "raw">("curl");
  const { copied, copy } = useCopy();

  function update(id: string, field: "key" | "value", v: string) {
    setHeaders((h) => h.map((row) => (row.id === id ? { ...row, [field]: v } : row)));
  }
  function add() {
    setHeaders((h) => [...h, { id: crypto.randomUUID(), key: "", value: "" }]);
  }
  function remove(id: string) {
    setHeaders((h) => h.filter((row) => row.id !== id));
  }

  const active = headers.filter((h) => h.key.trim());

  const code = useMemo(() => {
    if (output === "raw") {
      return active.map((h) => `${h.key}: ${h.value}`).join("\n");
    }
    if (output === "fetch") {
      const obj = active.reduce<Record<string, string>>((acc, h) => {
        acc[h.key] = h.value;
        return acc;
      }, {});
      return `fetch(url, {\n  headers: ${JSON.stringify(obj, null, 2).replace(/\n/g, "\n  ")}\n});`;
    }
    return ["curl https://api.example.com", ...active.map((h) => `  -H "${h.key}: ${h.value}"`)].join(" \\\n");
  }, [active, output]);

  return (
    <ToolShell title="Header Builder" description="Compose HTTP headers and export as curl, fetch, or raw">
      <div className="flex h-full flex-col gap-4">
        <div className="space-y-2">
          {headers.map((h) => (
            <div key={h.id} className="flex gap-2">
              <input
                list="header-presets"
                value={h.key}
                onChange={(e) => update(h.id, "key", e.target.value)}
                placeholder="Header name"
                className="w-40 rounded-lg border border-forge-border bg-forge-bg/60 px-2.5 py-1.5 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60 sm:w-52"
              />
              <input
                value={h.value}
                onChange={(e) => update(h.id, "value", e.target.value)}
                placeholder="Value"
                className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-2.5 py-1.5 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
              />
              <IconButton label="Remove" onClick={() => remove(h.id)}>
                <Trash2 size={14} />
              </IconButton>
            </div>
          ))}
          <datalist id="header-presets">
            {PRESETS.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
          <button
            onClick={add}
            className="flex items-center gap-1.5 text-xs text-ember-400 hover:text-ember-300"
          >
            <Plus size={13} /> Add header
          </button>
        </div>

        <div className="flex gap-1">
          {(["curl", "fetch", "raw"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setOutput(m)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                output === m ? "bg-ember-600/20 text-ember-400" : "text-forge-muted hover:bg-forge-panel2"
              }`}
            >
              {m}
            </button>
          ))}
          <div className="flex-1" />
          <IconButton label="Copy" onClick={() => copy(code)}>
            {copied ? <Check size={14} className="text-ember-400" /> : <Copy size={14} />}
          </IconButton>
        </div>

        <CodeArea value={code} readOnly className="min-h-[160px] flex-1" />
      </div>
    </ToolShell>
  );
}
