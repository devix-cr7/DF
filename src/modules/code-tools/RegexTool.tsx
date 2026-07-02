import { useMemo, useState } from "react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";

export default function RegexTool() {
  const [pattern, setPattern] = useState("[A-Z][a-z]+");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "DevForge helps Developers Build Great Tools quickly."
  );

  const { matches, error, highlighted } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const found = [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];
      let cursor = 0;
      const pieces: { text: string; hit: boolean }[] = [];
      found.forEach((m) => {
        const start = m.index ?? 0;
        if (start > cursor) pieces.push({ text: text.slice(cursor, start), hit: false });
        pieces.push({ text: m[0], hit: true });
        cursor = start + m[0].length;
      });
      if (cursor < text.length) pieces.push({ text: text.slice(cursor), hit: false });
      return { matches: found, error: null, highlighted: pieces, re };
    } catch (e) {
      return { matches: [], error: (e as Error).message, highlighted: [{ text, hit: false }] };
    }
  }, [pattern, flags, text]);

  return (
    <ToolShell title="Regex Tester" description="Test patterns against sample text in real time">
      <div className="flex h-full flex-col gap-4">
        <div className="flex gap-2">
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Pattern"
            className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="w-20 rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <CodeArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-28 flex-none"
        />
        <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40 p-3.5">
          <p className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed">
            {highlighted.map((p, i) =>
              p.hit ? (
                <mark key={i} className="rounded bg-ember-600/30 text-ember-200">
                  {p.text}
                </mark>
              ) : (
                <span key={i}>{p.text}</span>
              )
            )}
          </p>
        </div>
        <p className="text-xs text-forge-muted">{matches.length} match{matches.length === 1 ? "" : "es"}</p>
      </div>
    </ToolShell>
  );
}
