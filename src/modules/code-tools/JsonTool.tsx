import { useMemo, useState } from "react";
import { Sparkles, Copy, Check, Trash2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

export default function JsonTool() {
  const [input, setInput] = useState('{\n  "project": "DevForge",\n  "modules": ["code", "design", "docs"]\n}');
  const [indent, setIndent] = useState(2);
  const { copied, copy } = useCopy();

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, indent), error: null };
    } catch (e) {
      return { output: "", error: (e as Error).message };
    }
  }, [input, indent]);

  const minify = () => {
    try {
      setInput(JSON.stringify(JSON.parse(input)));
    } catch {
      /* invalid JSON — ignore */
    }
  };

  return (
    <ToolShell
      title="JSON Formatter"
      description="Format, validate, and minify JSON with instant feedback"
      toolbar={
        <>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border border-forge-border bg-forge-panel2 px-2.5 py-1.5 text-xs text-forge-text outline-none"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={0}>Tab</option>
          </select>
          <IconButton label="Minify" onClick={minify}>
            <Minimize2 size={15} />
          </IconButton>
          <IconButton label="Clear" onClick={() => setInput("")}>
            <Trash2 size={15} />
          </IconButton>
          <IconButton label="Copy output" onClick={() => copy(output)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
        </>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        <CodeArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON here…"
          className="min-h-[240px] md:min-h-0"
        />
        <div className="relative min-h-[240px] md:h-full">
          <CodeArea value={error ? "" : output} readOnly placeholder="Formatted output…" className="h-full" />
          {error && (
            <div className="absolute inset-3.5 flex items-start gap-2 rounded-lg border border-red-900/40 bg-red-950/30 p-3 text-[13px] text-red-300">
              <Sparkles size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
