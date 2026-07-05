import { useEffect, useState } from "react";
import { ToolShell } from "../../components/ui/ToolShell";
import { useT } from "../../hooks/useT";

const FONTS = [
  "Inter", "Space Grotesk", "Playfair Display", "Poppins", "Roboto Mono",
  "Merriweather", "Manrope", "DM Serif Display", "Sora", "Lora",
  "JetBrains Mono", "Fraunces",
];

function useGoogleFont(family: string) {
  useEffect(() => {
    const id = `gf-${family.replace(/\s+/g, "-")}`;
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(
      /\s+/g,
      "+"
    )}:wght@400;500;600;700&display=swap`;
    document.head.appendChild(link);
  }, [family]);
}

export default function FontTool() {
  const [heading, setHeading] = useState("Space Grotesk");
  const [body, setBody] = useState("Inter");
  useGoogleFont(heading);
  useGoogleFont(body);
  const { t } = useT();

  return (
    <ToolShell title="Font Pairing" description="Preview Google Font combinations live">
      <div className="flex h-full flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label={t("fonts.heading_font")} value={heading} onChange={setHeading} />
          <Select label={t("fonts.body_font")} value={body} onChange={setBody} />
        </div>

        <div className="flex-1 overflow-y-auto rounded-xl border border-forge-border bg-forge-bg/40 p-6 sm:p-10">
          <h1 style={{ fontFamily: heading }} className="text-3xl font-semibold text-forge-text sm:text-4xl">
            {t("fonts.sample_heading")}
          </h1>
          <p style={{ fontFamily: body }} className="mt-4 max-w-xl text-[15px] leading-relaxed text-forge-muted">
            {t("fonts.sample_body")}
          </p>
          <p style={{ fontFamily: body }} dir="ltr" className="mt-4 text-left text-xs text-forge-faint">
            {heading} / {body}
          </p>
        </div>
      </div>
    </ToolShell>
  );
}

function Select({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-forge-muted">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-forge-border bg-forge-panel2 px-3 py-2 text-[13px] text-forge-text outline-none"
      >
        {FONTS.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}
