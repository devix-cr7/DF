import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { IconButton } from "../../components/ui/Panel";
import { useCopy } from "../../hooks/useCopy";
import { useT } from "../../hooks/useT";

export default function TimestampTool() {
  const { t } = useT();
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [unix, setUnix] = useState(String(now));
  const [iso, setIso] = useState(() => new Date(now * 1000).toISOString());
  const { copied, copy } = useCopy();
  const [copiedField, setCopiedField] = useState("");

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  function fromUnix(v: string) {
    setUnix(v);
    const n = Number(v);
    if (!Number.isNaN(n)) setIso(new Date(n * 1000).toISOString());
  }

  function fromIso(v: string) {
    setIso(v);
    const t = Date.parse(v);
    if (!Number.isNaN(t)) setUnix(String(Math.floor(t / 1000)));
  }

  const parsed = new Date(Number(unix) * 1000);
  const valid = !Number.isNaN(parsed.getTime());

  return (
    <ToolShell title="Timestamp Converter" description="Unix epoch ⇄ human-readable date">
      <div className="mx-auto flex h-full max-w-lg flex-col gap-6">
        <div className="rounded-lg border border-forge-border bg-forge-bg/40 p-4 text-center">
          <p className="text-[11px] uppercase tracking-wider text-forge-muted">{t("timestamp.current")}</p>
          <p className="mt-1 font-mono text-2xl text-ember-400">{now}</p>
        </div>

        <Field
          label={t("timestamp.unix_label")}
          value={unix}
          onChange={fromUnix}
          onCopy={() => {
            copy(unix);
            setCopiedField("unix");
          }}
          copied={copied && copiedField === "unix"}
        />
        <Field
          label={t("timestamp.iso")}
          value={iso}
          onChange={fromIso}
          onCopy={() => {
            copy(iso);
            setCopiedField("iso");
          }}
          copied={copied && copiedField === "iso"}
        />

        {valid && (
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <Info label={t("timestamp.local")} value={parsed.toLocaleString()} />
            <Info label={t("timestamp.utc")} value={parsed.toUTCString()} />
            <Info label={t("timestamp.relative")} value={relative(parsed, t)} />
            <Info label={t("timestamp.day_of_year")} value={String(dayOfYear(parsed))} />
          </div>
        )}
      </div>
    </ToolShell>
  );
}

function Field({
  label,
  value,
  onChange,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const { t } = useT();
  return (
    <div>
      <label className="text-xs font-semibold text-forge-muted">{label}</label>
      <div className="mt-1.5 flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-forge-border bg-forge-bg/60 px-3 py-2 font-mono text-[13px] text-forge-text outline-none focus:border-ember-600/60"
        />
        <IconButton label={t("copy")} onClick={onCopy}>
          {copied ? <Check size={14} className="text-ember-400" /> : <Copy size={14} />}
        </IconButton>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-forge-border bg-forge-bg/30 p-3">
      <p className="text-[10.5px] uppercase tracking-wider text-forge-faint">{label}</p>
      <p className="mt-0.5 text-forge-text">{value}</p>
    </div>
  );
}

function relative(d: Date, t: (key: string) => string) {
  const diff = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const units: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];
  for (const [name, secs] of units) {
    if (abs >= secs || name === "second") {
      const val = Math.round(abs / secs);
      const unitKey = `timestamp.unit.${name}${val !== 1 ? "s" : ""}`;
      return `${val} ${t(unitKey)} ${diff < 0 ? t("timestamp.ago") : t("timestamp.from_now")}`;
    }
  }
  return t("timestamp.now");
}

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}
