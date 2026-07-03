import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";
import { useCopy } from "../../hooks/useCopy";

export default function UrlTool() {
  const [mode, setMode] = useState<"parse" | "encode">("parse");
  const [url, setUrl] = useState("https://devix-cr7.github.io/DF/?ref=devforge&lang=ar#tools");
  const [text, setText] = useState("hello world/devforge?");
  const [encMode, setEncMode] = useState<"encode" | "decode">("encode");
  const { copied, copy } = useCopy();
  const [copiedVal, setCopiedVal] = useState("");

  const parsed = useMemo(() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  }, [url]);

  const encoded = useMemo(() => {
    try {
      return encMode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
    } catch {
      return "Invalid input for decoding";
    }
  }, [text, encMode]);

  function doCopy(v: string) {
    copy(v);
    setCopiedVal(v);
  }

  return (
    <ToolShell
      title="URL Tools"
      description="Parse URLs into parts, or encode/decode components"
      toolbar={
        <div className="flex gap-1">
          {(["parse", "encode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                mode === m ? "bg-ember-600/20 text-ember-400" : "text-forge-muted hover:bg-forge-panel2"
              }`}
            >
              {m === "parse" ? "Parse" : "Encode / Decode"}
            </button>
          ))}
        </div>
      }
    >
      {mode === "parse" ? (
        <div className="flex h-full flex-col gap-4">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a URL…"
            className="w-full rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
          />
          {!parsed ? (
            <p className="text-xs text-red-400">Not a valid absolute URL.</p>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  ["Protocol", parsed.protocol],
                  ["Host", parsed.host],
                  ["Hostname", parsed.hostname],
                  ["Port", parsed.port || "(default)"],
                  ["Pathname", parsed.pathname],
                  ["Hash", parsed.hash || "—"],
                ].map(([label, value]) => (
                  <Row key={label} label={label} value={value} onCopy={doCopy} copied={copied && copiedVal === value} />
                ))}
              </div>

              {[...parsed.searchParams.entries()].length > 0 && (
                <div>
                  <p className="mb-2 text-[10.5px] uppercase tracking-wider text-forge-faint">
                    Query Parameters
                  </p>
                  <div className="overflow-hidden rounded-lg border border-forge-border">
                    {[...parsed.searchParams.entries()].map(([k, v], i) => (
                      <div
                        key={k + i}
                        className="flex items-center justify-between border-b border-forge-border/60 bg-forge-bg/30 px-3 py-2 text-[13px] last:border-0"
                      >
                        <span className="font-mono text-ember-400">{k}</span>
                        <span className="font-mono text-forge-text">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-1">
            {(["encode", "decode"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setEncMode(m)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  encMode === m ? "bg-ember-600/20 text-ember-400" : "text-forge-muted hover:bg-forge-panel2"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
            <CodeArea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[200px] md:min-h-0" />
            <div className="relative min-h-[200px] md:min-h-0">
              <CodeArea value={encoded} readOnly className="h-full" />
              <button
                onClick={() => doCopy(encoded)}
                className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-lg bg-forge-panel2 text-forge-muted hover:text-forge-text"
              >
                {copied && copiedVal === encoded ? <Check size={13} className="text-ember-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

function Row({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: (v: string) => void;
  copied: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-forge-border bg-forge-bg/40 px-3 py-2">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-forge-faint">{label}</p>
        <p className="truncate font-mono text-[13px] text-forge-text">{value}</p>
      </div>
      <button
        onClick={() => onCopy(value)}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-forge-muted hover:bg-forge-panel2 hover:text-forge-text"
      >
        {copied ? <Check size={13} className="text-ember-400" /> : <Copy size={13} />}
      </button>
    </div>
  );
}
