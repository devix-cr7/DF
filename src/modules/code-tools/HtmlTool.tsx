import { useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { formatHtml, minifyHtml } from "../../lib/formatters";

export default function HtmlTool() {
  const [code, setCode] = useState(
    "<div class=\"card\"><h2>DevForge</h2><p>Built for developers.</p></div>"
  );
  const { copied, copy } = useCopy();
  const { t } = useT();

  return (
    <ToolShell
      title="HTML Formatter"
      description="Beautify or minify HTML markup"
      toolbar={
        <>
          <IconButton label={t("beautify")} onClick={() => setCode(formatHtml(code))}>
            <Wand2 size={15} />
          </IconButton>
          <IconButton label={t("minify")} onClick={() => setCode(minifyHtml(code))}>
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
