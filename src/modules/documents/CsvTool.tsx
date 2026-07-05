import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 || r[0] !== "");
}

const SAMPLE = `name,role,tool\nSeif,Developer,DevForge\nClaude,Assistant,Claude Code`;

export default function CsvTool() {
  const [csv, setCsv] = useState(SAMPLE);
  const { copied, copy } = useCopy();
  const { t } = useT();

  const rows = useMemo(() => parseCsv(csv), [csv]);
  const [header, ...body] = rows;

  const json = useMemo(() => {
    if (!header) return "[]";
    const objs = body.map((r) =>
      header.reduce<Record<string, string>>((acc, h, i) => {
        acc[h] = r[i] ?? "";
        return acc;
      }, {})
    );
    return JSON.stringify(objs, null, 2);
  }, [header, body]);

  return (
    <ToolShell
      title="CSV Viewer"
      description="Paste CSV, view as a table, convert to JSON"
      toolbar={
        <IconButton label={t("csv.copy_json")} onClick={() => copy(json)}>
          {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
        </IconButton>
      }
    >
      <div className="flex h-full flex-col gap-4">
        <CodeArea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          className="h-28 flex-none"
          placeholder={t("csv.paste_placeholder")}
        />
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          <div className="min-h-[200px] overflow-auto rounded-lg border border-forge-border md:min-h-0">
            <table className="w-full text-left text-[12.5px]">
              <thead className="sticky top-0 bg-forge-panel2">
                <tr>
                  {header?.map((h, i) => (
                    <th key={i} className="border-b border-forge-border px-3 py-2 font-semibold text-ember-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((r, ri) => (
                  <tr key={ri} className="border-b border-forge-border/50 last:border-0">
                    {r.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-forge-text">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CodeArea value={json} readOnly className="min-h-[200px] md:min-h-0" />
        </div>
      </div>
    </ToolShell>
  );
}
