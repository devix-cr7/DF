import { useEffect, useState } from "react";
import { Plus, Trash2, Download, Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
}

const STORAGE_KEY = "devforge-api-endpoints";
const METHOD_COLORS: Record<Endpoint["method"], string> = {
  GET: "text-emerald-400 bg-emerald-500/10",
  POST: "text-temper-400 bg-temper-500/10",
  PUT: "text-ember-400 bg-ember-500/10",
  PATCH: "text-ember-400 bg-ember-500/10",
  DELETE: "text-red-400 bg-red-500/10",
};

function load(): Endpoint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : [
          { id: crypto.randomUUID(), method: "GET", path: "/api/tools", description: "List all tools" },
          { id: crypto.randomUUID(), method: "POST", path: "/api/tools", description: "Register a new tool" },
        ];
  } catch {
    return [];
  }
}

export default function ApiDesignerTool() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>(load);
  const { copied, copy } = useCopy();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(endpoints));
  }, [endpoints]);

  function add() {
    setEndpoints((e) => [
      ...e,
      { id: crypto.randomUUID(), method: "GET", path: "/api/new-endpoint", description: "" },
    ]);
  }
  function update(id: string, patch: Partial<Endpoint>) {
    setEndpoints((e) => e.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }
  function remove(id: string) {
    setEndpoints((e) => e.filter((row) => row.id !== id));
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(endpoints, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "api-endpoints.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="API Designer"
      description="Sketch out endpoints for your API before you build it"
      toolbar={
        <>
          <IconButton label="Copy as JSON" onClick={() => copy(JSON.stringify(endpoints, null, 2))}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
          <Button variant="secondary" size="sm" onClick={exportJson}>
            <Download size={13} /> Export
          </Button>
          <Button variant="primary" size="sm" onClick={add}>
            <Plus size={13} /> Endpoint
          </Button>
        </>
      }
    >
      <div className="space-y-2 overflow-y-auto">
        {endpoints.map((ep) => (
          <div
            key={ep.id}
            className="flex flex-col gap-2 rounded-lg border border-forge-border bg-forge-bg/40 p-3 sm:flex-row sm:items-center"
          >
            <select
              value={ep.method}
              onChange={(e) => update(ep.id, { method: e.target.value as Endpoint["method"] })}
              className={`w-24 rounded-lg border border-forge-border px-2 py-1.5 text-xs font-bold ${METHOD_COLORS[ep.method]}`}
            >
              {(["GET", "POST", "PUT", "PATCH", "DELETE"] as const).map((m) => (
                <option key={m} value={m} className="bg-forge-panel text-forge-text">
                  {m}
                </option>
              ))}
            </select>
            <input
              value={ep.path}
              onChange={(e) => update(ep.id, { path: e.target.value })}
              className="w-full flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-2.5 py-1.5 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60 sm:w-auto"
              placeholder="/api/resource/:id"
            />
            <input
              value={ep.description}
              onChange={(e) => update(ep.id, { description: e.target.value })}
              className="w-full flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-2.5 py-1.5 text-[13px] text-forge-text outline-none focus:border-ember-600/60 sm:w-auto"
              placeholder="Description"
            />
            <IconButton label="Delete" onClick={() => remove(ep.id)}>
              <Trash2 size={14} />
            </IconButton>
          </div>
        ))}
        {endpoints.length === 0 && (
          <p className="py-10 text-center text-[13px] text-forge-faint">
            No endpoints yet — click "Endpoint" to add one.
          </p>
        )}
      </div>
    </ToolShell>
  );
}
