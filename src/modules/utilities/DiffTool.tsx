import { useMemo, useState } from "react";
import { diffLines, diffWords } from "diff";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { useT } from "../../hooks/useT";

export default function DiffTool() {
  const [a, setA] = useState("const forge = true;\nfunction build() {\n  return 'v1';\n}");
  const [b, setB] = useState("const forge = true;\nfunction build() {\n  return 'v2';\n}\n// done");
  const [mode, setMode] = useState<"lines" | "words">("lines");
  const { t } = useT();

  const parts = useMemo(
    () => (mode === "lines" ? diffLines(a, b) : diffWords(a, b)),
    [a, b, mode]
  );

  const added = parts.filter((p) => p.added).length;
  const removed = parts.filter((p) => p.removed).length;

  return (
    <ToolShell
      title="Diff Checker"
      description="Compare two blocks of text"
      toolbar={
        <div className="flex gap-1">
          {(["lines", "words"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                mode === m ? "bg-ember-600/20 text-ember-400" : "text-forge-muted hover:bg-forge-panel2"
              }`}
            >
              {t(m === "lines" ? "diff.mode_lines" : "diff.mode_words")}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-forge-muted">{t("diff.original")}</label>
            <CodeArea
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="mt-1.5 h-32 min-h-[140px]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-forge-muted">{t("diff.changed")}</label>
            <CodeArea
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="mt-1.5 h-32 min-h-[140px]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span dir="ltr" className="text-left text-emerald-400">+{added} {t("diff.added")}</span>
          <span dir="ltr" className="text-left text-red-400">-{removed} {t("diff.removed")}</span>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40 p-3.5">
          <pre className="whitespace-pre-wrap font-mono text-[12.5px] leading-relaxed">
            {parts.map((part, i) => (
              <span
                key={i}
                className={
                  part.added
                    ? "bg-emerald-500/15 text-emerald-300"
                    : part.removed
                      ? "bg-red-500/15 text-red-300 line-through decoration-red-500/50"
                      : "text-forge-text"
                }
              >
                {part.value}
              </span>
            ))}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
}
