import { useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { formatJs, minifyJs } from "../../lib/js-format";

export default function TsTool() {
  const [code, setCode] = useState(
    "interface Tool{id:string;title:string;category:string;}function register(tool:Tool):void{console.log(tool.id);}"
  );
  const { copied, copy } = useCopy();
  const { t } = useT();

  return (
    <ToolShell
      title="TypeScript Formatter"
      description="Beautify or minify TypeScript"
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
