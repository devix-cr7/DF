import { useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { formatJs, minifyJs } from "../../lib/js-format";

export default function JsTool() {
  const [code, setCode] = useState(
    "function forge(name){const tools=['json','css','regex'];return tools.map(t=>`${name}:${t}`);}"
  );
  const { copied, copy } = useCopy();
  const { t } = useT();

  return (
    <ToolShell
      title="JavaScript Formatter"
      description="Beautify or minify JavaScript"
      toolbar={
        <>
          <IconButton label={t("beautify")} onClick={() => setCode(formatJs(code))}>
            <Wand2 size={15} />
          </IconButton>
          <IconButton label={t("minify")} onClick={() => setCode(minifyJs(code))}>
            <Minimize2 size={15} />
          </IconButton>
          <IconButton label={t("copy")} onClick={() => copy(code)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
        </>
      }
    >
      <CodeArea value={code} onChange={(e) => setCode(e.target.value)} className="h-full" />
    </ToolShell>
  );
}
