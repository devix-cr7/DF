import { useMemo, useState } from "react";
import JSZip from "jszip";
import { Download, FolderTree } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { Button } from "../../components/ui/Button";

const SAMPLE = `src/
  components/
    Button.tsx
    Card.tsx
  hooks/
    useAuth.ts
  App.tsx
  main.tsx
public/
  favicon.svg
package.json
README.md`;

interface TreeLine {
  depth: number;
  name: string;
  isDir: boolean;
}

function parse(text: string): TreeLine[] {
  return text
    .split("\n")
    .filter((l) => l.trim())
    .map((line) => {
      const match = line.match(/^(\s*)(.*)$/);
      const indent = match?.[1].length ?? 0;
      const depth = Math.floor(indent / 2);
      const name = (match?.[2] ?? "").trim();
      return { depth, name: name.replace(/\/$/, ""), isDir: line.trimEnd().endsWith("/") };
    });
}

export default function FolderGeneratorTool() {
  const [text, setText] = useState(SAMPLE);
  const lines = useMemo(() => parse(text), [text]);

  async function download() {
    const zip = new JSZip();
    const stack: string[] = [];

    lines.forEach((line) => {
      stack.length = line.depth;
      if (line.isDir) {
        stack.push(line.name);
        zip.folder(stack.join("/"));
      } else {
        const path = [...stack, line.name].join("/");
        zip.file(path, `// ${line.name}\n`);
      }
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "devforge-scaffold.zip";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="Folder Generator"
      description="Sketch a folder tree, download it as a real scaffold"
      toolbar={
        <Button variant="primary" size="sm" onClick={download}>
          <Download size={13} /> Download ZIP
        </Button>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs text-forge-muted">
            Indent with 2 spaces. End a line with <code className="text-ember-400">/</code> for a folder.
          </p>
          <CodeArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[240px] md:h-[calc(100%-1.75rem)]"
          />
        </div>
        <div className="min-h-[240px] overflow-y-auto rounded-lg border border-forge-border bg-forge-bg/40 p-3 font-mono text-[13px] md:min-h-0">
          {lines.map((line, i) => (
            <div key={i} style={{ paddingLeft: line.depth * 16 }} className="flex items-center gap-1.5 py-0.5 text-forge-text">
              {line.isDir ? (
                <FolderTree size={13} className="shrink-0 text-ember-400" />
              ) : (
                <span className="w-[13px] shrink-0 text-forge-faint">·</span>
              )}
              <span>{line.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
