import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Server, Database, Globe, Box, Cloud, Layers } from "lucide-react";

const ICONS = { server: Server, database: Database, globe: Globe, box: Box, cloud: Cloud, layers: Layers };

export interface BoxNodeData {
  label: string;
  icon: keyof typeof ICONS;
  onChange: (patch: { label?: string; icon?: keyof typeof ICONS }) => void;
  [key: string]: unknown;
}

export function BoxNode({ data }: NodeProps) {
  const { label, icon, onChange } = data as unknown as BoxNodeData;
  const Icon = ICONS[icon] ?? Box;

  return (
    <div className="flex min-w-[160px] items-center gap-2.5 rounded-xl border border-forge-border bg-forge-panel px-3.5 py-3 shadow-panel">
      <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
      <Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
      <button
        onClick={() => {
          const keys = Object.keys(ICONS) as (keyof typeof ICONS)[];
          const next = keys[(keys.indexOf(icon) + 1) % keys.length];
          onChange({ icon: next });
        }}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-forge-panel2 text-ember-400"
        title="Click to change icon"
      >
        <Icon size={15} />
      </button>
      <input
        value={label}
        onChange={(e) => onChange({ label: e.target.value })}
        className="w-full bg-transparent text-[13px] font-medium text-forge-text outline-none"
      />
    </div>
  );
}
