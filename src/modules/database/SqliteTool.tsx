import { useEffect, useRef, useState } from "react";
import initSqlJs, { type Database } from "sql.js";
import { Play, Upload, Download } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { CodeArea } from "../../components/ui/CodeArea";
import { useT } from "../../hooks/useT";

const SEED = `CREATE TABLE tools (id INTEGER PRIMARY KEY, name TEXT, category TEXT);
INSERT INTO tools (name, category) VALUES ('JSON Formatter', 'Code');
INSERT INTO tools (name, category) VALUES ('Color Tool', 'Design');
INSERT INTO tools (name, category) VALUES ('QR Code', 'Utilities');
SELECT * FROM tools;`;

export default function SqliteTool() {
  const { t } = useT();
  const [ready, setReady] = useState(false);
  const [sql, setSql] = useState(SEED);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<unknown[][]>([]);
  const [error, setError] = useState<string | null>(null);
  const dbRef = useRef<Database | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    initSqlJs({ locateFile: (f) => `${import.meta.env.BASE_URL}${f}` }).then((SQL) => {
      if (cancelled) return;
      dbRef.current = new SQL.Database();
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  function run() {
    if (!dbRef.current) return;
    try {
      const results = dbRef.current.exec(sql);
      const last = results[results.length - 1];
      setColumns(last?.columns ?? []);
      setRows(last?.values ?? []);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setColumns([]);
      setRows([]);
    }
  }

  async function loadFile(file: File) {
    const initSql = await initSqlJs({ locateFile: (f) => `${import.meta.env.BASE_URL}${f}` });
    const buf = new Uint8Array(await file.arrayBuffer());
    dbRef.current = new initSql.Database(buf);
    setColumns([]);
    setRows([]);
    setError(null);
  }

  function download() {
    if (!dbRef.current) return;
    const data = dbRef.current.export();
    const blob = new Blob([new Uint8Array(data)], { type: "application/x-sqlite3" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "devforge.sqlite";
    link.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    if (ready) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <ToolShell
      title="SQLite Viewer"
      description="Run real SQL against an in-browser database"
      toolbar={
        <>
          <Button variant="secondary" size="sm" onClick={() => fileInput.current?.click()}>
            <Upload size={13} /> {t("sqlite.open_file")}
          </Button>
          <Button variant="secondary" size="sm" onClick={download} disabled={!ready}>
            <Download size={13} /> {t("export")}
          </Button>
          <Button variant="primary" size="sm" onClick={run} disabled={!ready}>
            <Play size={13} /> {t("run")}
          </Button>
        </>
      }
    >
      <input
        ref={fileInput}
        type="file"
        accept=".sqlite,.db"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
      />
      <div className="flex h-full flex-col gap-4">
        <CodeArea value={sql} onChange={(e) => setSql(e.target.value)} className="h-32 flex-none" />
        {error && <p dir="ltr" className="text-left text-xs text-red-400">{error}</p>}
        <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-forge-border">
          {columns.length > 0 ? (
            <table className="w-full text-left text-[12.5px]">
              <thead className="sticky top-0 bg-forge-panel2">
                <tr>
                  {columns.map((c) => (
                    <th key={c} className="border-b border-forge-border px-3 py-2 font-semibold text-ember-400">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-b border-forge-border/50 last:border-0">
                    {r.map((cell, ci) => (
                      <td key={ci} className="px-3 py-2 text-forge-text">
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-center text-[13px] text-forge-faint">
              {ready ? t("sqlite.run_hint") : t("sqlite.loading")}
            </p>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
