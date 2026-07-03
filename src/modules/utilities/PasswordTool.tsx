import { useMemo, useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { Button } from "../../components/ui/Button";
import { useCopy } from "../../hooks/useCopy";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generate(length: number, opts: Record<keyof typeof SETS, boolean>) {
  const pool = (Object.keys(opts) as (keyof typeof SETS)[])
    .filter((k) => opts[k])
    .map((k) => SETS[k])
    .join("");
  if (!pool) return "";
  const bytes = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(bytes, (b) => pool[b % pool.length]).join("");
}

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 14) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent"];
const COLORS = ["bg-red-500", "bg-red-500", "bg-ember-500", "bg-ember-400", "bg-emerald-500", "bg-emerald-400"];

export default function PasswordTool() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [pw, setPw] = useState(() => generate(20, { lower: true, upper: true, digits: true, symbols: true }));
  const { copied, copy } = useCopy();

  const score = useMemo(() => strength(pw), [pw]);

  function regenerate() {
    setPw(generate(length, opts));
  }

  function toggle(key: keyof typeof SETS) {
    const next = { ...opts, [key]: !opts[key] };
    if (Object.values(next).some(Boolean)) {
      setOpts(next);
      setPw(generate(length, next));
    }
  }

  return (
    <ToolShell title="Password Generator" description="Cryptographically random, locally generated">
      <div className="mx-auto flex h-full max-w-md flex-col gap-6">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-forge-border bg-forge-bg/50 p-4">
          <p className="break-all font-mono text-[15px] text-forge-text">{pw}</p>
          <button
            onClick={() => copy(pw)}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-forge-muted hover:bg-forge-panel2 hover:text-forge-text"
          >
            {copied ? <Check size={15} className="text-ember-400" /> : <Copy size={15} />}
          </button>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < score ? COLORS[score] : "bg-forge-border"}`}
            />
          ))}
        </div>
        <p className="-mt-4 text-xs text-forge-muted">{LABELS[score]}</p>

        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-forge-muted">Length: {length}</label>
        </div>
        <input
          type="range"
          min={6}
          max={64}
          value={length}
          onChange={(e) => {
            const l = Number(e.target.value);
            setLength(l);
            setPw(generate(l, opts));
          }}
          className="accent-ember-500"
        />

        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(SETS) as (keyof typeof SETS)[]).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 rounded-lg border border-forge-border px-3 py-2 text-[13px] capitalize text-forge-text"
            >
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={() => toggle(key)}
                className="accent-ember-500"
              />
              {key}
            </label>
          ))}
        </div>

        <Button variant="primary" onClick={regenerate}>
          <RefreshCw size={14} /> Generate new
        </Button>
      </div>
    </ToolShell>
  );
}
