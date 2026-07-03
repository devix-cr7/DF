import { Handle, Position, type NodeProps } from "@xyflow/react";

export type ShapeKind = "start" | "process" | "decision" | "end";

export interface ShapeNodeData {
  label: string;
  shape: ShapeKind;
  onChange: (patch: { label?: string }) => void;
  [key: string]: unknown;
}

const STYLES: Record<ShapeKind, string> = {
  start: "rounded-full bg-emerald-500/15 border-emerald-500/50 text-emerald-300",
  end: "rounded-full bg-red-500/15 border-red-500/50 text-red-300",
  process: "rounded-lg bg-forge-panel border-forge-border text-forge-text",
  decision: "bg-temper-500/15 border-temper-400/50 text-temper-300",
};

export function ShapeNode({ data }: NodeProps) {
  const { label, shape, onChange } = data as unknown as ShapeNodeData;

  if (shape === "decision") {
    return (
      <div className="relative grid h-24 w-24 place-items-center">
        <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
        <Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
        <Handle type="source" position={Position.Right} id="r" className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
        <div className={`absolute inset-0 rotate-45 border ${STYLES.decision}`} />
        <input
          value={label}
          onChange={(e) => onChange({ label: e.target.value })}
          className="relative z-10 w-16 bg-transparent text-center text-[11px] font-medium outline-none"
        />
      </div>
    );
  }

  return (
    <div className={`min-w-[140px] border px-4 py-2.5 text-center shadow-panel ${STYLES[shape]}`}>
      <Handle type="target" position={Position.Top} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
      <Handle type="source" position={Position.Bottom} className="!h-2.5 !w-2.5 !border-forge-bg !bg-temper-400" />
      <input
        value={label}
        onChange={(e) => onChange({ label: e.target.value })}
        className="w-full bg-transparent text-center text-[13px] font-medium outline-none"
      />
    </div>
  );
}
