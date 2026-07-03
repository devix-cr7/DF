import { useMemo, useState } from "react";
import { Copy, Check, Plus, Trash2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

interface Condition {
  id: string;
  column: string;
  op: string;
  value: string;
}

const OPS = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN"];

function formatSql(sql: string) {
  const KEYWORDS = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "LIMIT", "JOIN", "LEFT JOIN", "INNER JOIN", "VALUES", "SET", "INSERT INTO", "UPDATE", "DELETE FROM"];
  let out = sql.trim();
  KEYWORDS.forEach((kw) => {
    out = out.replace(new RegExp(`\\s+${kw}\\s+`, "gi"), `\n${kw} `);
  });
  return out.trim();
}

export default function SqlBuilderTool() {
  const [table, setTable] = useState("users");
  const [columns, setColumns] = useState("id, name, email");
  const [conditions, setConditions] = useState<Condition[]>([
    { id: crypto.randomUUID(), column: "active", op: "=", value: "true" },
  ]);
  const [orderBy, setOrderBy] = useState("created_at DESC");
  const [limit, setLimit] = useState("50");
  const [rawSql, setRawSql] = useState("");
  const { copied, copy } = useCopy();

  const built = useMemo(() => {
    let q = `SELECT ${columns.trim() || "*"}\nFROM ${table}`;
    if (conditions.some((c) => c.column)) {
      const clauses = conditions
        .filter((c) => c.column)
        .map((c) => `${c.column} ${c.op} ${/^\d+$/.test(c.value) || c.value === "true" || c.value === "false" ? c.value : `'${c.value}'`}`);
      q += `\nWHERE ${clauses.join("\n  AND ")}`;
    }
    if (orderBy.trim()) q += `\nORDER BY ${orderBy}`;
    if (limit.trim()) q += `\nLIMIT ${limit}`;
    return q + ";";
  }, [table, columns, conditions, orderBy, limit]);

  function addCondition() {
    setConditions((c) => [...c, { id: crypto.randomUUID(), column: "", op: "=", value: "" }]);
  }
  function updateCondition(id: string, patch: Partial<Condition>) {
    setConditions((c) => c.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }
  function removeCondition(id: string) {
    setConditions((c) => c.filter((row) => row.id !== id));
  }

  return (
    <ToolShell title="SQL Builder" description="Visually build a SELECT query, or paste SQL to format">
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Table" value={table} onChange={setTable} />
            <Field label="Columns" value={columns} onChange={setColumns} />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-forge-muted">WHERE</p>
            <div className="space-y-2">
              {conditions.map((c) => (
                <div key={c.id} className="flex gap-2">
                  <input
                    value={c.column}
                    onChange={(e) => updateCondition(c.id, { column: e.target.value })}
                    placeholder="column"
                    className="w-24 rounded-lg border border-forge-border bg-forge-bg/60 px-2 py-1.5 font-mono text-[12.5px] text-forge-text outline-none"
                  />
                  <select
                    value={c.op}
                    onChange={(e) => updateCondition(c.id, { op: e.target.value })}
                    className="rounded-lg border border-forge-border bg-forge-panel2 px-2 py-1.5 text-[12.5px] text-forge-text outline-none"
                  >
                    {OPS.map((op) => (
                      <option key={op}>{op}</option>
                    ))}
                  </select>
                  <input
                    value={c.value}
                    onChange={(e) => updateCondition(c.id, { value: e.target.value })}
                    placeholder="value"
                    className="flex-1 rounded-lg border border-forge-border bg-forge-bg/60 px-2 py-1.5 font-mono text-[12.5px] text-forge-text outline-none"
                  />
                  <IconButton label="Remove" onClick={() => removeCondition(c.id)}>
                    <Trash2 size={13} />
                  </IconButton>
                </div>
              ))}
              <button onClick={addCondition} className="flex items-center gap-1.5 text-xs text-ember-400 hover:text-ember-300">
                <Plus size={12} /> Add condition
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Order by" value={orderBy} onChange={setOrderBy} />
            <Field label="Limit" value={limit} onChange={setLimit} />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-forge-muted">Or paste SQL to format</p>
            <div className="flex gap-2">
              <CodeArea
                value={rawSql}
                onChange={(e) => setRawSql(e.target.value)}
                className="h-20"
                placeholder="SELECT * FROM users WHERE active = true..."
              />
            </div>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-forge-muted">Generated SQL</p>
            <IconButton label="Copy" onClick={() => copy(rawSql ? formatSql(rawSql) : built)}>
              {copied ? <Check size={14} className="text-ember-400" /> : <Copy size={14} />}
            </IconButton>
          </div>
          <CodeArea value={rawSql ? formatSql(rawSql) : built} readOnly className="flex-1" />
        </div>
      </div>
    </ToolShell>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold text-forge-muted">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
      />
    </div>
  );
}
