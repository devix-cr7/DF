import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Plus, Trash2, KeyRound } from "lucide-react";

export interface TableField {
  id: string;
  name: string;
  type: string;
  pk?: boolean;
}

export interface TableNodeData {
  label: string;
  fields: TableField[];
  onChange: (patch: { label?: string; fields?: TableField[] }) => void;
  [key: string]: unknown;
}

const TYPES = ["INTEGER", "TEXT", "VARCHAR", "BOOLEAN", "DATE", "FLOAT", "UUID"];

export function TableNode({ data }: NodeProps) {
  const { label, fields, onChange } = data as unknown as TableNodeData;

  function updateField(id: string, patch: Partial<TableField>) {
    onChange({ fields: fields.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  }
  function addField() {
    onChange({ fields: [...fields, { id: crypto.randomUUID(), name: "field", type: "TEXT" }] });
  }
  function removeField(id: string) {
    onChange({ fields: fields.filter((f) => f.id !== id) });
  }

  return (
    <div className="min-w-[200px] rounded-xl border border-forge-border bg-forge-panel shadow-panel">
      <Handle type="target" position={Position.Left} className="!h-2.5 !w-2.5 !border-forge-bg !bg-ember-500" />
      <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !border-forge-bg !bg-ember-500" />

      <input
        value={label}
        onChange={(e) => onChange({ label: e.target.value })}
        className="w-full rounded-t-xl border-b border-forge-border bg-forge-panel2 px-3 py-2 text-[13px] font-semibold text-ember-400 outline-none"
      />
      <div className="space-y-1 p-2">
        {fields.map((f) => (
          <div key={f.id} className="group flex items-center gap-1">
            <button
              onClick={() => updateField(f.id, { pk: !f.pk })}
              title="Primary key"
              className={`grid h-5 w-5 shrink-0 place-items-center rounded ${f.pk ? "text-ember-400" : "text-forge-faint"}`}
            >
              <KeyRound size={11} />
            </button>
            <input
              value={f.name}
              onChange={(e) => updateField(f.id, { name: e.target.value })}
              className="w-20 rounded bg-transparent px-1 py-0.5 text-[12px] text-forge-text outline-none focus:bg-forge-bg/50"
            />
            <select
              value={f.type}
              onChange={(e) => updateField(f.id, { type: e.target.value })}
              className="flex-1 rounded bg-transparent px-1 py-0.5 text-[11px] text-forge-muted outline-none"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeField(f.id)}
              className="opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={11} className="text-forge-faint hover:text-red-400" />
            </button>
          </div>
        ))}
        <button
          onClick={addField}
          className="flex items-center gap-1 pl-1 pt-1 text-[11px] text-ember-400 hover:text-ember-300"
        >
          <Plus size={11} /> field
        </button>
      </div>
    </div>
  );
}
