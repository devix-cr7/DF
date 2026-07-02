import { useMemo, useState } from "react";
import { ToolShell } from "../../components/ui/ToolShell";
import { CodeArea } from "../../components/ui/CodeArea";

function decodePart(part: string) {
  try {
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return null;
  }
}

export default function JwtTool() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXZmb3JnZSIsIm5hbWUiOiJTZWlmIn0.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ"
  );

  const { header, payload, valid } = useMemo(() => {
    const parts = token.trim().split(".");
    if (parts.length < 2) return { header: null, payload: null, valid: false };
    const header = decodePart(parts[0]);
    const payload = decodePart(parts[1]);
    return { header, payload, valid: !!header && !!payload };
  }, [token]);

  return (
    <ToolShell title="JWT Decoder" description="Inspect header and payload claims locally">
      <div className="flex h-full flex-col gap-4">
        <CodeArea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="h-20 flex-none"
          placeholder="Paste a JWT…"
        />
        {!valid && token.trim() && (
          <p className="text-xs text-red-400">Not a valid JWT structure.</p>
        )}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4">
          <div className="flex min-h-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-temper-400">HEADER</span>
            <CodeArea value={header ?? ""} readOnly />
          </div>
          <div className="flex min-h-0 flex-col gap-1.5">
            <span className="text-xs font-semibold text-ember-400">PAYLOAD</span>
            <CodeArea value={payload ?? ""} readOnly />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
