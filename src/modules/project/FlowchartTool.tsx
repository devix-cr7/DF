import { useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Circle, Square, Diamond, XCircle } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { useT } from "../../hooks/useT";
import { ShapeNode, type ShapeKind } from "./nodes/ShapeNode";

const nodeTypes = { shape: ShapeNode };

function makeNode(id: string, label: string, shape: ShapeKind, x: number, y: number): Node {
  return { id, type: "shape", position: { x, y }, data: { label, shape, onChange: () => {} } };
}

function Inner() {
  const { t } = useT();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    makeNode("n1", t("flow.start"), "start", 180, 20),
    makeNode("n2", t("flow.receive_request"), "process", 140, 120),
    makeNode("n3", t("flow.valid"), "decision", 160, 230),
    makeNode("n4", t("flow.return_error"), "process", 380, 240),
    makeNode("n5", t("flow.end"), "end", 180, 380),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([
    { id: "e1", source: "n1", target: "n2" },
    { id: "e2", source: "n2", target: "n3" },
    { id: "e3", source: "n3", target: "n5", label: t("flow.yes") },
    { id: "e4", source: "n3", sourceHandle: "r", target: "n4", label: t("flow.no") },
  ]);
  const [count, setCount] = useState(0);

  const ADD_BUTTONS: { shape: ShapeKind; label: string; icon: typeof Circle }[] = [
    { shape: "start", label: t("flow.start_end"), icon: Circle },
    { shape: "process", label: t("flow.process"), icon: Square },
    { shape: "decision", label: t("flow.decision"), icon: Diamond },
    { shape: "end", label: t("flow.terminate"), icon: XCircle },
  ];

  const SHAPE_LABEL: Record<ShapeKind, string> = {
    start: t("flow.start_end"),
    process: t("flow.process"),
    decision: t("flow.decision"),
    end: t("flow.terminate"),
  };

  const onConnect = useCallback(
    (c: Connection) => setEdges((eds) => addEdge(c, eds)),
    [setEdges]
  );

  function attachHandlers(list: Node[]) {
    return list.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onChange: (patch: { label?: string }) =>
          setNodes((nds) =>
            nds.map((node) => (node.id === n.id ? { ...node, data: { ...node.data, ...patch } } : node))
          ),
      },
    }));
  }

  function addShape(shape: ShapeKind) {
    const id = `n_${count}`;
    setCount((c) => c + 1);
    setNodes((nds) => [...nds, makeNode(id, SHAPE_LABEL[shape], shape, 420 + (count % 3) * 60, 40 + (count % 5) * 90)]);
  }

  return (
    <div className="relative h-full">
      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        {ADD_BUTTONS.map(({ shape, label, icon: Icon }) => (
          <button
            key={shape}
            onClick={() => addShape(shape)}
            title={label}
            className="grid h-8 w-8 place-items-center rounded-lg border border-forge-border bg-forge-panel text-forge-muted hover:text-ember-400"
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
      <ReactFlow
        nodes={attachHandlers(nodes)}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode="dark"
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={18} color="#22262D" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

export default function FlowchartTool() {
  return (
    <ToolShell title="Flowcharts" description="Build process flows with connected shapes" flush>
      <ReactFlowProvider>
        <Inner />
      </ReactFlowProvider>
    </ToolShell>
  );
}
