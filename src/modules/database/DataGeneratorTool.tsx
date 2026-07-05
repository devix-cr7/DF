import { useMemo, useState } from "react";
import { Plus, Trash2, Copy, Check, Download, RefreshCw } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";
import { generateValue, type FieldType } from "../../lib/fakedata";

interface Field {
  id: string;
  name: string;
  type: FieldType;
}

const TYPES: FieldType[] = [
  "id", "fullName", "firstName", "lastName", "email", "phone", "city",
  "number", "boolean", "uuid", "date", "sentence",
];

export default function DataGeneratorTool() {
  const [fields, setFields] = useState<Field[]>([
    { id: crypto.randomUUID(), name: "id", type: "id" },
    { id: crypto.randomUUID(), name: "name", type: "fullName" },
    { id: crypto.randomUUID(), name: "email", type: "email" },
    { id: crypto.randomUUID(), name: "city", type: "city" },
  ]);
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState<"json" | "csv">("json");
  const [seed, setSeed] = useState(0);
  const { copied, copy } = useCopy();
  const { t } = useT();

  const rows = useMemo(() => {
    return Array.from({ length: count }, (_, i) =>
      fields.reduce<Record<string, string | number | boolean>>((acc, f) => {
        acc[f.name || `field${i}`] = generateValue(f.type, i);
        return acc;
      }, {})
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, count, seed]);

  const output = useMemo(() => {
    if (format === "json") return JSON.stringify(rows, null, 2);
    if (rows.length === 0) return "";
    const headers = Object.keys(rows[0]);
    const lines = [headers.join(",")];
    rows.forEach((r) => lines.push(headers.map((h) => String(r[h])).join(",")));
    return lines.join("\n");
  }, [rows, format]);

  function addField() {
    setFields((f) => [...f, { id: crypto.randomUUID(), name: "field", type: "sentence" }]);
  }
  function update(id: string, patch: Partial<Field>) {
    setFields((f) => f.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }
  function remove(id: string) {
    setFields((f) => f.filter((row) => row.id !== id));
  }

  function download() {
    const blob = new Blob([output], { type: format === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `devforge-data.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolShell
      title="Data Generator"
      description="Define a schema, generate realistic mock data instantly"
      toolbar={
        <>
          <IconButton label={t("regenerate")} onClick={() => setSeed((s) => s + 1)}>
            <RefreshCw size={15} />
          </IconButton>
          <IconButton label={t("copy")} onClick={() => copy(output)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
          <Button variant="secondary" size="sm" onClick={download}>
            <Download size={13} /> {t("download")}
          </Button>
        </>
      }
    >
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="space-y-2">
            {fields.map((f) => (
              <div key={f.id} className="flex gap-2">
                <input
                  value={f.name}
                  onChange={(e) => update(f.id, { name: e.target.value })}
                  className="w-24 rounded-lg border border-forge-border bg-forge-bg/60 px-2 py-1.5 font-mono text-[12.5px] text-forge-text outline-none"
                />
                <select
                  value={f.type}
                  onChange={(e) => update(f.id, { type: e.target.value as FieldType })}
                  className="flex-1 rounded-lg border border-forge-border bg-forge-panel2 px-2 py-1.5 text-[12.5px] text-forge-text outline-none"
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <IconButton label={t("remove")} onClick={() => remove(f.id)}>
                  <Trash2 size={13} />
                </IconButton>
              </div>
            ))}
            <button onClick={addField} className="flex items-center gap-1.5 text-xs text-ember-400 hover:text-ember-300">
              <Plus size={12} /> {t("data.add_field")}
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-forge-muted">{t("data.rows")}: {count}</label>
            <input
              type="range"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-1.5 w-full accent-ember-500"
            />
          </div>

          <div className="flex gap-1">
            {(["json", "csv"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium uppercase transition-colors ${
                  format === f ? "bg-ember-600/20 text-ember-400" : "text-forge-muted hover:bg-forge-panel2"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <CodeArea value={output} readOnly className="min-h-[240px] md:min-h-0" />
      </div>
    </ToolShell>
  );
}
