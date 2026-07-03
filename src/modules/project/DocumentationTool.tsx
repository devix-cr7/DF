import { useEffect, useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { IconButton } from "../../components/ui/Panel";
import { markdownToHtml } from "../../lib/markdown";

interface Page {
  id: string;
  title: string;
  body: string;
}

const STORAGE_KEY = "devforge-docs";

function load(): Page[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : [
          {
            id: crypto.randomUUID(),
            title: "Getting Started",
            body: "# Getting Started\n\nWelcome to the project. Install dependencies with `npm install`, then run `npm run dev`.",
          },
        ];
  } catch {
    return [];
  }
}

export default function DocumentationTool() {
  const [pages, setPages] = useState<Page[]>(load);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  }, [pages]);

  const active = pages.find((p) => p.id === activeId) ?? pages[0] ?? null;

  function create() {
    const p: Page = { id: crypto.randomUUID(), title: "New page", body: "# New page\n\nStart writing…" };
    setPages((list) => [...list, p]);
    setActiveId(p.id);
  }
  function update(id: string, patch: Partial<Page>) {
    setPages((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function remove(id: string) {
    setPages((list) => list.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  }
  function exportAll() {
    const combined = pages.map((p) => p.body).join("\n\n---\n\n");
    const blob = new Blob([combined], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "documentation.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="Documentation"
      description="Write multi-page docs with live Markdown preview"
      toolbar={
        <IconButton label="Export all as Markdown" onClick={exportAll}>
          <Download size={15} />
        </IconButton>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[180px_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <button
            onClick={create}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-forge-border py-2 text-xs text-forge-muted hover:border-ember-600/50 hover:text-forge-text"
          >
            <Plus size={13} /> New page
          </button>
          <div className="min-h-[100px] flex-1 space-y-1 overflow-y-auto md:min-h-0">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={`block w-full truncate rounded-lg px-3 py-2 text-left text-[13px] ${
                  active?.id === p.id ? "bg-forge-panel2 text-forge-text" : "text-forge-muted hover:bg-forge-panel2/60"
                }`}
              >
                {p.title || "Untitled"}
              </button>
            ))}
          </div>
        </div>

        {active ? (
          <>
            <div className="flex min-h-[200px] flex-col gap-2 md:min-h-0">
              <div className="flex items-center gap-2">
                <input
                  value={active.title}
                  onChange={(e) => update(active.id, { title: e.target.value })}
                  className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-1.5 text-[13px] text-forge-text outline-none"
                />
                <IconButton label="Delete" onClick={() => remove(active.id)}>
                  <Trash2 size={14} />
                </IconButton>
              </div>
              <textarea
                value={active.body}
                onChange={(e) => update(active.id, { body: e.target.value })}
                className="flex-1 resize-none rounded-lg border border-forge-border bg-forge-bg/60 p-3 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
              />
            </div>
            <div
              className="prose-forge min-h-[200px] overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40 p-4 text-[13.5px] leading-relaxed text-forge-text [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_code]:rounded [&_code]:bg-forge-panel2 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-ember-300 [&_pre]:rounded-lg [&_pre]:bg-forge-panel2 [&_pre]:p-3 [&_li]:ml-4 [&_li]:list-disc md:min-h-0"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(active.body) }}
            />
          </>
        ) : (
          <div className="col-span-2 grid place-items-center text-[13px] text-forge-faint">
            Create a page to get started
          </div>
        )}
      </div>
    </ToolShell>
  );
}
