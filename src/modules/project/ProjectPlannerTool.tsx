import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToolShell } from "../../components/ui/ToolShell";
import { useT } from "../../hooks/useT";

interface Task {
  id: string;
  title: string;
  col: "todo" | "doing" | "done";
}

const COLUMNS: { id: Task["col"]; labelKey: string; color: string }[] = [
  { id: "todo", labelKey: "planner.todo", color: "text-forge-muted" },
  { id: "doing", labelKey: "planner.doing", color: "text-ember-400" },
  { id: "done", labelKey: "planner.done", color: "text-emerald-400" },
];

const STORAGE_KEY = "devforge-planner";

function load(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : [
          { id: crypto.randomUUID(), title: "Design the dashboard", col: "done" },
          { id: crypto.randomUUID(), title: "Build the plugin registry", col: "done" },
          { id: crypto.randomUUID(), title: "Add Database tools", col: "doing" },
          { id: crypto.randomUUID(), title: "Ship i18n support", col: "todo" },
        ];
  } catch {
    return [];
  }
}

export default function ProjectPlannerTool() {
  const { t } = useT();
  const [tasks, setTasks] = useState<Task[]>(load);
  const [draft, setDraft] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function add() {
    if (!draft.trim()) return;
    setTasks((t) => [...t, { id: crypto.randomUUID(), title: draft, col: "todo" }]);
    setDraft("");
  }
  function remove(id: string) {
    setTasks((t) => t.filter((task) => task.id !== id));
  }
  function move(id: string, col: Task["col"]) {
    setTasks((t) => t.map((task) => (task.id === id ? { ...task, col } : task)));
  }

  return (
    <ToolShell title="Project Planner" description="A simple kanban board, saved locally">
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={t("planner.add_task")}
            className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <button
            onClick={add}
            className="grid h-9 w-9 place-items-center rounded-lg bg-forge-gradient text-forge-bg"
          >
            <Plus size={15} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto md:grid-cols-3 md:overflow-visible">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragId && move(dragId, col.id)}
              className="flex min-h-[160px] flex-col gap-2 rounded-xl border border-forge-border bg-forge-bg/30 p-3"
            >
              <p className={`text-[11px] font-semibold uppercase tracking-wider ${col.color}`}>
                {t(col.labelKey)} · {tasks.filter((task) => task.col === col.id).length}
              </p>
              <div className="flex-1 space-y-2">
                <AnimatePresence initial={false}>
                  {tasks
                    .filter((task) => task.col === col.id)
                    .map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        draggable
                        onDragStart={() => setDragId(task.id)}
                        className="group flex items-start justify-between gap-2 rounded-lg border border-forge-border bg-forge-panel p-2.5 text-[13px] text-forge-text shadow-panel"
                      >
                        <span>{task.title}</span>
                        <button
                          onClick={() => remove(task.id)}
                          className="shrink-0 opacity-0 group-hover:opacity-100"
                        >
                          <X size={13} className="text-forge-faint hover:text-red-400" />
                        </button>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
