import { Trash2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { useWorkspace } from "../../store/workspace";
import { getTool } from "../../modules/registry";
import { useT } from "../../hooks/useT";

function dayLabel(ts: number, todayLabel: string, yesterdayLabel: string) {
  const d = new Date(ts);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const sameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();
  if (sameDay(d, today)) return todayLabel;
  if (sameDay(d, yesterday)) return yesterdayLabel;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function HistoryTool() {
  const { historyLog, openTool, clearHistory } = useWorkspace();
  const { t, tTool } = useT();
  const todayLabel = t("history.today");
  const yesterdayLabel = t("history.yesterday");

  const groups = historyLog.reduce<Record<string, typeof historyLog>>((acc, entry) => {
    const label = dayLabel(entry.ts, todayLabel, yesterdayLabel);
    (acc[label] ??= []).push(entry);
    return acc;
  }, {});

  return (
    <ToolShell
      title="History"
      description="Every tool you've opened, most recent first"
      toolbar={
        historyLog.length > 0 ? (
          <Button variant="ghost" size="sm" onClick={clearHistory}>
            <Trash2 size={13} /> {t("clear")}
          </Button>
        ) : undefined
      }
    >
      {historyLog.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-forge-faint">
          {t("history.empty")}
        </p>
      ) : (
        <div className="space-y-6 overflow-y-auto">
          {Object.entries(groups).map(([label, entries]) => (
            <div key={label}>
              <p className="mb-2 text-[10.5px] uppercase tracking-wider text-forge-faint">{label}</p>
              <div className="space-y-1">
                {entries.map((entry) => {
                  const tool = getTool(entry.toolId);
                  if (!tool) return null;
                  return (
                    <button
                      key={entry.id}
                      onClick={() => openTool(entry.toolId)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-forge-panel2"
                    >
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forge-panel2 text-ember-400">
                        <tool.icon size={14} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] text-forge-text">{tTool(tool.id, "title")}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-forge-faint">
                        {new Date(entry.ts).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}
