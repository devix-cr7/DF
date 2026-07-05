import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { useT } from "../../hooks/useT";

export default function QrTool() {
  const { t } = useT();
  const [text, setText] = useState("https://devix-cr7.github.io/DF/");
  const [fg, setFg] = useState("#EDEBE7");
  const [bg, setBg] = useState("#111317");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text || " ", {
      width: 260,
      margin: 2,
      color: { dark: fg, light: bg },
    }).catch(() => {});
  }, [text, fg, bg]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "devforge-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <ToolShell title="QR Code Generator" description="Turn any text or URL into a scannable code">
      <div className="flex h-full flex-col items-center gap-6 md:flex-row md:items-start md:justify-center">
        <div className="flex w-full max-w-sm flex-col gap-3">
          <label className="text-xs font-semibold text-forge-muted">{t("qr.content")}</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-forge-border bg-forge-bg/60 p-3 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          <div className="flex gap-4">
            <div className="flex flex-1 items-center gap-2">
              <label className="text-xs text-forge-muted">{t("qr.foreground")}</label>
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-forge-border bg-transparent"
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <label className="text-xs text-forge-muted">{t("qr.background")}</label>
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-forge-border bg-transparent"
              />
            </div>
          </div>
          <Button variant="primary" onClick={download}>
            <Download size={14} /> {t("qr.download_png")}
          </Button>
        </div>

        <div className="grid place-items-center rounded-xl border border-forge-border bg-forge-panel p-5 shadow-panel">
          <canvas ref={canvasRef} className="rounded-lg" />
        </div>
      </div>
    </ToolShell>
  );
}
