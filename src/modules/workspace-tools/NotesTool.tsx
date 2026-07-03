import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { IconButton } from "../../components/ui/Panel";

interface Note {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
}

const STORAGE_KEY = "devforge-notes";

function load(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function NotesTool() {
  const [notes, setNotes] = useState<Note[]>(load);
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const active = notes.find((n) => n.id === activeId) ?? null;

  function create() {
    const note: Note = { id: crypto.randomUUID(), title: "Untitled note", body: "", updatedAt: Date.now() };
    setNotes((n) => [note, ...n]);
    setActiveId(note.id);
  }

  function update(id: string, patch: Partial<Note>) {
    setNotes((n) => n.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note)));
  }

  function remove(id: string) {
    setNotes((n) => n.filter((note) => note.id !== id));
    if (activeId === id) setActiveId(null);
  }

  return (
    <ToolShell title="Notes" description="Quick notes, saved locally">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col gap-2">
          <button
            onClick={create}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-forge-border py-2 text-xs text-forge-muted hover:border-ember-600/50 hover:text-forge-text"
          >
            <Plus size={13} /> New note
          </button>
          <div className="min-h-[120px] flex-1 space-y-1 overflow-y-auto md:min-h-0">
            {notes
              .slice()
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((note) => (
                <button
                  key={note.id}
                  onClick={() => setActiveId(note.id)}
                  className={`block w-full truncate rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                    activeId === note.id
                      ? "bg-forge-panel2 text-forge-text"
                      : "text-forge-muted hover:bg-forge-panel2/60"
                  }`}
                >
                  {note.title || "Untitled note"}
                </button>
              ))}
            {notes.length === 0 && (
              <p className="px-2 py-6 text-center text-[12px] text-forge-faint">No notes yet</p>
            )}
          </div>
        </div>

        <div className="flex min-h-0 flex-col rounded-lg border border-forge-border bg-forge-bg/30">
          {active ? (
            <>
              <div className="flex items-center gap-2 border-b border-forge-border p-3">
                <input
                  value={active.title}
                  onChange={(e) => update(active.id, { title: e.target.value })}
                  className="flex-1 bg-transparent text-[14px] font-medium text-forge-text outline-none"
                  placeholder="Title"
                />
                <IconButton label="Delete" onClick={() => remove(active.id)}>
                  <Trash2 size={14} />
                </IconButton>
              </div>
              <textarea
                value={active.body}
                onChange={(e) => update(active.id, { body: e.target.value })}
                placeholder="Start writing…"
                className="flex-1 resize-none bg-transparent p-4 text-[13.5px] leading-relaxed text-forge-text outline-none"
              />
            </>
          ) : (
            <div className="grid flex-1 place-items-center text-[13px] text-forge-faint">
              Select or create a note
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
