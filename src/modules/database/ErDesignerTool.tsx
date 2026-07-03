import { useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { TableNode, type TableField } from "./nodes/TableNode";

const nodeTypes = { table: TableNode };

function makeTable(id: string, label: string, x: number, y: number, fields: TableField[]): Node {
  return { id, type: "table", position: { x, y }, data: { label, fields, onChange: () => {} } };
}

const initialNodes: Node[] = [
  makeTable("users", "users", 60, 60, [
    { id: "1", name: "id", type: "INTEGER", pk: true },
    { id: "2", name: "email", type: "VARCHAR" },
    { id: "3", name: "created_at", type: "DATE" },
  ]),
  makeTable("posts", "posts", 420, 60, [
    { id: "1", name: "id", type: "INTEGER", pk: true },
    { id: "2", name: "user_id", type: "INTEGER" },
    { id: "3", name: "title", type: "TEXT" },
  ]),
];

const initialEdges: Edge[] = [
  { id: "e1", source: "users", target: "posts", animated: true, style: { stroke: "#D97B2B" } },
];

function Inner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [count, setCount] = useState(3);

  const onConnect = useCallback(
    (c: Connection) => setEdges((eds) => addEdge({ ...c, animated: true, style: { stroke: "#D97B2B" } }, eds)),
    [setEdges]
  );

  function attachHandlers(list: Node[]) {
    return list.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onChange: (patch: Partial<{ label: string; fields: TableField[] }>) =>
          setNodes((nds) =>
            nds.map((node) => (node.id === n.id ? { ...node, data: { ...node.data, ...patch } } : node))
          ),
      },
    }));
  }

  function addTable() {
    const id = `table_${count}`;
    setCount((c) => c + 1);
    setNodes((nds) => [
      ...nds,
      makeTable(id, "new_table", 80 + (count % 4) * 220, 260 + Math.floor(count / 4) * 180, [
        { id: "1", name: "id", type: "INTEGER", pk: true },
      ]),
    ]);
  }

  return (
    <div className="relative h-full">
      <div className="absolute right-3 top-3 z-10">
        <Button variant="primary" size="sm" onClick={addTable}>
          <Plus size={13} /> Table
        </Button>
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
        <MiniMap pannable zoomable nodeColor="#D97B2B" maskColor="rgba(10,11,13,0.7)" />
      </ReactFlow>
    </div>
  );
}

export default function ErDesignerTool() {
  return (
    <ToolShell title="ER Designer" description="Drag tables, connect fields, sketch your schema" flush>
      <ReactFlowProvider>
        <Inner />
      </ReactFlowProvider>
    </ToolShell>
  );
}
