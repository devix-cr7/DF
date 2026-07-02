import { useState } from "react";
import { Copy, Check, ArrowLeftRight, Trash2 } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, DevForge!");
  const { copied, copy } = useCopy();

  let output = "";
  let error: string | null = null;
  try {
    output =
      mode === "encode"
        ? btoa(unescape(encodeURIComponent(input)))
        : decodeURIComponent(escape(atob(input.trim())));
  } catch {
    error = mode === "encode" ? "Could not encode this input." : "Invalid Base64 string.";
  }

  return (
    <ToolShell
      title="Base64 Encoder / Decoder"
      description="Convert text to and from Base64"
      toolbar={
        <>
          <IconButton
            label="Swap mode"
            onClick={() => setMode((m) => (m === "encode" ? "decode" : "encode"))}
          >
            <ArrowLeftRight size={15} />
          </IconButton>
          <IconButton label="Clear" onClick={() => setInput("")}>
            <Trash2 size={15} />
          </IconButton>
          <IconButton label="Copy output" onClick={() => copy(output)}>
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </IconButton>
        </>
      }
    >
      <div className="mb-3 flex gap-1.5">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              mode === m
                ? "bg-ember-600/20 text-ember-400"
                : "text-forge-muted hover:bg-forge-panel2"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="grid h-[calc(100%-3rem)] grid-cols-2 gap-4">
        <CodeArea value={input} onChange={(e) => setInput(e.target.value)} />
        <CodeArea value={error ?? output} readOnly className={error ? "text-red-400" : ""} />
      </div>
    </ToolShell>
  );
}
