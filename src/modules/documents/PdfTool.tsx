import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Trash2, ArrowUp, ArrowDown, FileStack, Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useT } from "../../hooks/useT";

interface PdfFile {
  id: string;
  name: string;
  file: File;
  pages?: number;
}

export default function PdfTool() {
  const { t } = useT();
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function addFiles(list: FileList) {
    const next: PdfFile[] = [];
    for (const file of Array.from(list)) {
      if (file.type !== "application/pdf") continue;
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        next.push({ id: crypto.randomUUID(), name: file.name, file, pages: doc.getPageCount() });
      } catch {
        /* skip unreadable pdf */
      }
    }
    setFiles((f) => [...f, ...next]);
  }

  function move(id: string, dir: -1 | 1) {
    setFiles((f) => {
      const i = f.findIndex((x) => x.id === id);
      const j = i + dir;
      if (j < 0 || j >= f.length) return f;
      const copy = [...f];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  function remove(id: string) {
    setFiles((f) => f.filter((x) => x.id !== id));
  }

  async function merge() {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const merged = await PDFDocument.create();
      for (const f of files) {
        const bytes = await f.file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "devforge-merged.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setMerging(false);
    }
  }

  const totalPages = files.reduce((sum, f) => sum + (f.pages ?? 0), 0);

  return (
    <ToolShell title="PDF Merge" description="Combine multiple PDFs into one, entirely in your browser">
      <div className="flex h-full flex-col gap-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-forge-border py-6 text-sm text-forge-muted transition-colors hover:border-ember-600/50 hover:text-forge-text"
        >
          <Upload size={16} /> {t("pdf.click_add")}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto">
          {files.map((f, i) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-forge-border bg-forge-bg/40 p-3"
            >
              <FileStack size={16} className="shrink-0 text-ember-400" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] text-forge-text">{f.name}</p>
                <p className="text-[11px] text-forge-faint">{f.pages ?? "?"} {t("pdf.pages")}</p>
              </div>
              <IconButton label={t("pdf.move_up")} onClick={() => move(f.id, -1)} disabled={i === 0}>
                <ArrowUp size={14} />
              </IconButton>
              <IconButton label={t("pdf.move_down")} onClick={() => move(f.id, 1)} disabled={i === files.length - 1}>
                <ArrowDown size={14} />
              </IconButton>
              <IconButton label={t("remove")} onClick={() => remove(f.id)}>
                <Trash2 size={14} />
              </IconButton>
            </div>
          ))}
          {files.length === 0 && (
            <p className="py-10 text-center text-[13px] text-forge-faint">
              {t("pdf.hint")}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-forge-border pt-4">
          <p className="text-xs text-forge-muted">
            {files.length} {t("pdf.files_count")} · {totalPages} {t("pdf.pages_total")}
          </p>
          <Button variant="primary" onClick={merge} disabled={files.length < 2 || merging}>
            <Download size={14} /> {merging ? t("pdf.merging") : t("pdf.merge_download")}
          </Button>
        </div>
      </div>
    </ToolShell>
  );
}
