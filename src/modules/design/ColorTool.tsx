import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { ToolShell } from "../../components/ui/ToolShell";
import { useCopy } from "../../hooks/useCopy";
import { hexToRgb, rgbToHsl, shadesOf, contrastRatio } from "../../lib/color";

export default function ColorTool() {
  const [hex, setHex] = useState("#D97B2B");
  const [textColor, setTextColor] = useState("#0A0B0D");
  const { copied, copy } = useCopy();
  const [copiedVal, setCopiedVal] = useState("");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null), [rgb]);
  const shades = useMemo(() => shadesOf(hex), [hex]);
  const ratio = useMemo(() => contrastRatio(hex, textColor), [hex, textColor]);

  function doCopy(val: string) {
    copy(val);
    setCopiedVal(val);
  }

  return (
    <ToolShell title="Color Tool" description="Convert, generate shades, and check contrast">
      <div className="flex h-full flex-col gap-6 overflow-y-auto md:flex-row">
        <div className="flex w-full flex-col gap-4 md:w-72">
          <div
            className="h-32 w-full rounded-xl border border-forge-border shadow-panel"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-lg border border-forge-border bg-transparent"
          />

          {[
            { label: "HEX", value: hex },
            { label: "RGB", value: rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "—" },
            { label: "HSL", value: hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "—" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-lg border border-forge-border bg-forge-bg/40 px-3 py-2"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider text-forge-faint">{row.label}</p>
                <p className="font-mono text-[13px] text-forge-text">{row.value}</p>
              </div>
              <button
                onClick={() => doCopy(row.value)}
                className="grid h-7 w-7 place-items-center rounded-lg text-forge-muted hover:bg-forge-panel2 hover:text-forge-text"
              >
                {copied && copiedVal === row.value ? (
                  <Check size={13} className="text-ember-400" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </div>
          ))}

          <div className="rounded-lg border border-forge-border bg-forge-bg/40 p-3">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-forge-faint">
              Contrast check
            </p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border border-forge-border bg-transparent"
              />
              <div
                className="flex flex-1 items-center justify-center rounded-lg py-2 text-sm font-medium"
                style={{ backgroundColor: hex, color: textColor }}
              >
                Aa Sample
              </div>
            </div>
            <p
              className={`mt-2 text-xs ${ratio >= 4.5 ? "text-emerald-400" : "text-red-400"}`}
            >
              Ratio {ratio.toFixed(2)} — {ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail"}
            </p>
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-[10.5px] uppercase tracking-wider text-forge-faint">
            Shades
          </p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {shades.map((s) => (
              <button
                key={s}
                onClick={() => doCopy(s)}
                className="group relative aspect-square rounded-lg border border-forge-border"
                style={{ backgroundColor: s }}
                title={s}
              >
                <span className="absolute inset-x-0 bottom-1 truncate px-1 text-center font-mono text-[9px] text-white opacity-0 mix-blend-difference group-hover:opacity-100">
                  {s}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
