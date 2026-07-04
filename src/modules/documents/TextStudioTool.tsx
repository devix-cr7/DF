import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";

const SAMPLE = "DevForge is a Premium Developer Workspace built for speed and focus.";

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t[0].toUpperCase() + t.slice(1).toLowerCase());
}
function toCamelCase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}
function toSnakeCase(s: string) {
  return s
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .toLowerCase();
}
function toKebabCase(s: string) {
  return toSnakeCase(s).replace(/_/g, "-");
}

export default function TextStudioTool() {
  const [text, setText] = useState(SAMPLE);
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const { copied, copy } = useCopy();
  const { t } = useT();

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = text ? text.split("\n").length : 0;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(?:\s|$)/g) ?? []).length || 1 : 0;
    return { chars: text.length, words, lines, sentences };
  }, [text]);

  function applyReplace() {
    if (!find) return;
    setText((t) => t.split(find).join(replace));
  }

  const transforms: [string, (s: string) => string][] = [
    [t("text.upper"), (s) => s.toUpperCase()],
    [t("text.lower"), (s) => s.toLowerCase()],
    [t("text.title_case"), toTitleCase],
    ["camelCase", toCamelCase],
    ["snake_case", toSnakeCase],
    ["kebab-case", toKebabCase],
  ];

  return (
    <ToolShell
      title="Text Studio"
      description="Case conversion, counting, and find & replace"
      toolbar={
        <IconButton label={t("copy")} onClick={() => copy(text)}>
          {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
        </IconButton>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <CodeArea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[160px] flex-1" />

        <div className="flex flex-wrap gap-2">
          {transforms.map(([label, fn]) => (
            <button
              key={label}
              onClick={() => setText(fn)}
              className="rounded-lg border border-forge-border bg-forge-panel2 px-3 py-1.5 text-xs text-forge-text transition-colors hover:border-forge-borderHi"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            [t("characters"), stats.chars],
            [t("words"), stats.words],
            [t("lines"), stats.lines],
            [t("sentences"), stats.sentences],
          ].map(([label, val]) => (
            <div key={label as string} className="rounded-lg border border-forge-border bg-forge-bg/40 p-2.5 text-center">
              <p className="font-mono text-lg text-ember-400">{val}</p>
              <p className="text-[10.5px] uppercase tracking-wider text-forge-faint">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder={t("find")}
            className="min-w-[120px] flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <input
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder={t("replace_with")}
            className="min-w-[120px] flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <Button variant="primary" size="sm" onClick={applyReplace}>
            {t("replace_all")}
          </Button>
        </div>
      </div>
    </ToolShell>
  );
}
