import { useRef, useState } from "react";
import { Upload, Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";

export default function ImageTool() {
  const [src, setSrc] = useState<string | null>(null);
  const [origSize, setOrigSize] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState<"image/png" | "image/jpeg" | "image/webp">("image/jpeg");
  const [quality, setQuality] = useState(0.85);
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outSize, setOutSize] = useState(0);
  const fileInput = useRef<HTMLInputElement>(null);
  const aspectRef = useRef(4 / 3);

  function handleFile(file: File) {
    setOrigSize(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setSrc(url);
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        aspectRef.current = img.width / img.height;
        process(url, img.width, img.height);
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }

  function process(url: string, w: number, h: number) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setOutUrl(URL.createObjectURL(blob));
          setOutSize(blob.size);
        },
        format,
        quality
      );
    };
    img.src = url;
  }

  function reprocess(w = width, h = height, fmt = format, q = quality) {
    if (src) process(src, w, h);
    setWidth(w);
    setHeight(h);
    setFormat(fmt);
    setQuality(q);
  }

  function download() {
    if (!outUrl) return;
    const ext = format.split("/")[1];
    const link = document.createElement("a");
    link.href = outUrl;
    link.download = `devforge-image.${ext}`;
    link.click();
  }

  return (
    <ToolShell title="Image Utilities" description="Resize, convert, and compress images locally">
      <div className="flex h-full flex-col gap-5">
        {!src ? (
          <button
            onClick={() => fileInput.current?.click()}
            className="grid flex-1 place-items-center rounded-xl border-2 border-dashed border-forge-border text-forge-muted transition-colors hover:border-ember-600/50 hover:text-forge-text"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload size={22} />
              <span className="text-sm">Click to upload an image</span>
            </div>
          </button>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-5 md:grid-cols-[1fr_260px]">
            <div className="grid min-h-[200px] place-items-center overflow-hidden rounded-xl border border-forge-border bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:14px_14px]">
              {outUrl && <img src={outUrl} alt="preview" className="max-h-full max-w-full object-contain" />}
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                <NumberField
                  label="Width"
                  value={width}
                  onChange={(v) => reprocess(v, Math.round(v / aspectRef.current))}
                />
                <NumberField
                  label="Height"
                  value={height}
                  onChange={(v) => reprocess(Math.round(v * aspectRef.current), v)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-forge-muted">Format</label>
                <select
                  value={format}
                  onChange={(e) => reprocess(width, height, e.target.value as typeof format)}
                  className="mt-1.5 w-full rounded-lg border border-forge-border bg-forge-panel2 px-3 py-2 text-[13px] text-forge-text outline-none"
                >
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>

              {format !== "image/png" && (
                <div>
                  <label className="text-xs font-semibold text-forge-muted">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={quality}
                    onChange={(e) => reprocess(width, height, format, Number(e.target.value))}
                    className="mt-1.5 w-full accent-ember-500"
                  />
                </div>
              )}

              <div className="rounded-lg border border-forge-border bg-forge-bg/40 p-3 text-xs text-forge-muted">
                <p>Original: {formatBytes(origSize)}</p>
                <p>Output: {formatBytes(outSize)}</p>
                {outSize > 0 && origSize > 0 && (
                  <p className="mt-1 text-ember-400">
                    {outSize < origSize
                      ? `${Math.round((1 - outSize / origSize) * 100)}% smaller`
                      : `${Math.round((outSize / origSize - 1) * 100)}% larger`}
                  </p>
                )}
              </div>

              <Button variant="primary" onClick={download}>
                <Download size={14} /> Download
              </Button>
              <Button variant="ghost" onClick={() => fileInput.current?.click()}>
                Replace image
              </Button>
            </div>
          </div>
        )}

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>
    </ToolShell>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-forge-muted">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1.5 w-full rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 text-[13px] text-forge-text outline-none focus:border-ember-600/60"
      />
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
