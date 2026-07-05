import { useMemo, useState } from "react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { markdownToHtml } from "../../lib/markdown";

const SAMPLE = `# DevForge

Build tools **faster** with a *unified* workspace.

- Local-first
- Zero servers
- Plugin architecture

> Every tool plugs in without touching the core.

\`const forge = true\``;

export default function MarkdownTool() {
  const [md, setMd] = useState(SAMPLE);
  const html = useMemo(() => markdownToHtml(md), [md]);

  return (
    <ToolShell title="Markdown Preview" description="Live-rendered Markdown, side by side">
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        <CodeArea value={md} onChange={(e) => setMd(e.target.value)} className="min-h-[240px] md:min-h-0" />
        <div
          className="prose-forge h-full min-h-[240px] overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40 p-4 text-[13.5px] leading-relaxed text-forge-text [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_code]:rounded [&_code]:bg-forge-panel2 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-ember-300 [&_pre]:rounded-lg [&_pre]:bg-forge-panel2 [&_pre]:p-3 [&_blockquote]:border-l-2 [&_blockquote]:border-ember-600 [&_blockquote]:pl-3 [&_blockquote]:text-forge-muted [&_a]:text-temper-400 [&_li]:ml-4 [&_li]:list-disc md:min-h-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </ToolShell>
  );
}
