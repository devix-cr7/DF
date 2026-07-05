import { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { minifyHtml } from "../../lib/formatters";

const SAMPLE = `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="9" stroke="#D97B2B" stroke-width="2"/>
  <path d="M8 12l2.5 2.5L16 9" stroke="#D97B2B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function SvgTool() {
  const [code, setCode] = useState(SAMPLE);
  const { copied, copy } = useCopy();
  const { t } = useT();
  const isValid = code.trim().startsWith("<svg");

  function download() {
    const blob = new Blob([code], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "icon.svg";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="SVG Preview & Minify"
      description="Paste SVG markup, preview it live, and strip excess whitespace"
      toolbar={
        <>
          <IconButton label={t("minify")} onClick={() => setCode(minifyHtml(code))}>
            <span className="text-[11px] font-semibold">MIN</span>
          </IconButton>
          <IconButton label={t("copy")} onClick={() => copy(code)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
          <IconButton label={t("download")} onClick={download}>
            <Download size={15} />
          </IconButton>
        </>
      }
    >
      <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        <CodeArea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[220px] md:min-h-0"
        />
        <div className="grid min-h-[220px] place-items-center rounded-lg border border-forge-border bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:14px_14px] md:min-h-0">
          {isValid ? (
            <div className="rounded-xl border border-forge-border bg-forge-panel p-6" dangerouslySetInnerHTML={{ __html: code }} />
          ) : (
            <p className="text-xs text-forge-faint">{t("svg.preview_hint")}</p>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
