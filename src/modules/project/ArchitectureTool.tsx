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
import { BoxNode, type BoxNodeData } from "./nodes/BoxNode";

const nodeTypes = { box: BoxNode };

function makeBox(id: string, label: string, icon: BoxNodeData["icon"], x: number, y: number): Node {
  return { id, type: "box", position: { x, y }, data: { label, icon, onChange: () => {} } };
}

const initialNodes: Node[] = [
  makeBox("client", "Client (React)", "globe", 60, 40),
  makeBox("api", "API Server", "server", 60, 200),
  makeBox("db", "Database", "database", 60, 360),
];

const initialEdges: Edge[] = [
  { id: "e1", source: "client", target: "api", animated: true, style: { stroke: "#3E6B8A" } },
  { id: "e2", source: "api", target: "db", animated: true, style: { stroke: "#3E6B8A" } },
];

function Inner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [count, setCount] = useState(0);

  const onConnect = useCallback(
    (c: Connection) => setEdges((eds) => addEdge({ ...c, animated: true, style: { stroke: "#3E6B8A" } }, eds)),
    [setEdges]
  );

  function attachHandlers(list: Node[]) {
    return list.map((n) => ({
      ...n,
      data: {
        ...n.data,
        onChange: (patch: Partial<BoxNodeData>) =>
          setNodes((nds) =>
            nds.map((node) => (node.id === n.id ? { ...node, data: { ...node.data, ...patch } } : node))
          ),
      },
    }));
  }

  function addBox() {
    const id = `box_${count}`;
    setCount((c) => c + 1);
    setNodes((nds) => [...nds, makeBox(id, "New component", "box", 300 + (count % 3) * 40, 40 + (count % 4) * 120)]);
  }

  return (
    <div className="relative h-full">
      <div className="absolute right-3 top-3 z-10">
        <Button variant="primary" size="sm" onClick={addBox}>
          <Plus size={13} /> Component
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
        <MiniMap pannable zoomable nodeColor="#3E6B8A" maskColor="rgba(10,11,13,0.7)" />
      </ReactFlow>
    </div>
  );
}

export default function ArchitectureTool() {
  return (
    <ToolShell title="Architecture" description="Map out your system's components and connections" flush>
      <ReactFlowProvider>
        <Inner />
      </ReactFlowProvider>
    </ToolShell>
  );
}
