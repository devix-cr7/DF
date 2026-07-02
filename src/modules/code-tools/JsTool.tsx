import { useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { formatJs, minifyJs } from "../../lib/js-format";

export default function JsTool() {
  const [code, setCode] = useState(
    "function forge(name){const tools=['json','css','regex'];return tools.map(t=>`${name}:${t}`);}"
  );
  const { copied, copy } = useCopy();

  return (
    <ToolShell
      title="JavaScript Formatter"
      description="Beautify or minify JavaScript"
      toolbar={
        <>
          <IconButton label="Beautify" onClick={() => setCode(formatJs(code))}>
            <Wand2 size={15} />
          </IconButton>
          <IconButton label="Minify" onClick={() => setCode(minifyJs(code))}>
            <Minimize2 size={15} />
          </IconButton>
          <IconButton label="Copy" onClick={() => copy(code)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
        </>
      }
    >
      <CodeArea value={code} onChange={(e) => setCode(e.target.value)} className="h-full" />
    </ToolShell>
  );
}
