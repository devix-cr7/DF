import { useState } from "react";
import { Copy, Check, Wand2, Minimize2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { formatCss, minifyCss } from "../../lib/formatters";

export default function CssTool() {
  const [code, setCode] = useState(
    ".workspace{display:flex;background:#0A0B0D;}.sidebar{width:240px;border-right:1px solid #22262D;}"
  );
  const { copied, copy } = useCopy();
  const { t } = useT();

  return (
    <ToolShell
      title="CSS Formatter"
      description="Beautify or minify CSS instantly"
      toolbar={
        <>
          <IconButton label={t("beautify")} onClick={() => setCode(formatCss(code))}>
            <Wand2 size={15} />
          </IconButton>
          <IconButton label={t("minify")} onClick={() => setCode(minifyCss(code))}>
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
