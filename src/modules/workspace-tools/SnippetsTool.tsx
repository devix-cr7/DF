import { useEffect, useState } from "react";
import { Plus, Trash2, Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

interface Snippet {
  id: string;
  title: string;
  lang: string;
  code: string;
}

const STORAGE_KEY = "devforge-snippets";
const LANGS = ["JavaScript", "TypeScript", "Python", "Bash", "CSS", "HTML", "JSON", "SQL", "Other"];

function load(): Snippet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: crypto.randomUUID(),
            title: "Debounce function",
            lang: "JavaScript",
            code: "function debounce(fn, delay) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), delay);\n  };\n}",
          },
        ];
  } catch {
    return [];
  }
}

export default function SnippetsTool() {
  const [snippets, setSnippets] = useState<Snippet[]>(load);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { copied, copy } = useCopy();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  }, [snippets]);

  const active = snippets.find((s) => s.id === activeId) ?? snippets[0] ?? null;

  function create() {
    const s: Snippet = { id: crypto.randomUUID(), title: "New snippet", lang: "JavaScript", code: "" };
    setSnippets((list) => [s, ...list]);
    setActiveId(s.id);
  }
  function update(id: string, patch: Partial<Snippet>) {
    setSnippets((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }
  function remove(id: string) {
    setSnippets((list) => list.filter((s) => s.id !== id));
    if (activeId === id) setActiveId(null);
  }

  return (
    <ToolShell title="Snippets" description="A personal library of reusable code, saved locally">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col gap-2">
          <button
            onClick={create}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-forge-border py-2 text-xs text-forge-muted hover:border-ember-600/50 hover:text-forge-text"
          >
            <Plus size={13} /> New snippet
          </button>
          <div className="min-h-[120px] flex-1 space-y-1 overflow-y-auto md:min-h-0">
            {snippets.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`block w-full truncate rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                  active?.id === s.id ? "bg-forge-panel2 text-forge-text" : "text-forge-muted hover:bg-forge-panel2/60"
                }`}
              >
                {s.title || "Untitled"}
                <span className="ml-2 text-[10px] text-forge-faint">{s.lang}</span>
              </button>
            ))}
            {snippets.length === 0 && (
              <p className="px-2 py-6 text-center text-[12px] text-forge-faint">No snippets yet</p>
            )}
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2">
          {active ? (
            <>
              <div className="flex gap-2">
                <input
                  value={active.title}
                  onChange={(e) => update(active.id, { title: e.target.value })}
                  className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
                  placeholder="Title"
                />
                <select
                  value={active.lang}
                  onChange={(e) => update(active.id, { lang: e.target.value })}
                  className="rounded-lg border border-forge-border bg-forge-panel2 px-2 text-[13px] text-forge-text outline-none"
                >
                  {LANGS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                <IconButton label="Copy" onClick={() => copy(active.code)}>
                  {copied ? <Check size={14} className="text-ember-400" /> : <Copy size={14} />}
                </IconButton>
                <IconButton label="Delete" onClick={() => remove(active.id)}>
                  <Trash2 size={14} />
                </IconButton>
              </div>
              <CodeArea
                value={active.code}
                onChange={(e) => update(active.id, { code: e.target.value })}
                className="flex-1"
              />
            </>
          ) : (
            <div className="grid flex-1 place-items-center text-[13px] text-forge-faint">
              Select or create a snippet
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
