export function formatCss(css: string, indent = 2): string {
  const pad = " ".repeat(indent);
  let depth = 0;
  const clean = css.replace(/\s+/g, " ").trim();
  let out = "";
  let i = 0;
  while (i < clean.length) {
    const ch = clean[i];
    if (ch === "{") {
      out += " {\n";
      depth++;
      out += pad.repeat(depth);
      i++;
      while (clean[i] === " ") i++;
      continue;
    }
    if (ch === "}") {
      out = out.replace(/\s+$/, "");
      depth = Math.max(0, depth - 1);
      out += "\n" + pad.repeat(depth) + "}\n" + pad.repeat(depth);
      i++;
      while (clean[i] === " ") i++;
      continue;
    }
    if (ch === ";") {
      out += ";\n" + pad.repeat(depth);
      i++;
      while (clean[i] === " ") i++;
      continue;
    }
    out += ch;
    i++;
  }
  return out.replace(/\n\s*\n/g, "\n").trim();
}

export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export function formatHtml(html: string, indent = 2): string {
  const pad = " ".repeat(indent);
  const clean = html.replace(/>\s+</g, "><").trim();
  const tokens = clean.match(/<[^>]+>|[^<]+/g) ?? [];
  let depth = 0;
  const voidTags = new Set(["br", "img", "input", "hr", "meta", "link", "area", "base", "col", "embed", "source", "track", "wbr"]);
  const lines: string[] = [];

  tokens.forEach((token) => {
    const trimmed = token.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("</")) {
      depth = Math.max(0, depth - 1);
      lines.push(pad.repeat(depth) + trimmed);
    } else if (trimmed.startsWith("<")) {
      const tagName = trimmed.match(/^<([a-zA-Z0-9-]+)/)?.[1]?.toLowerCase() ?? "";
      const selfClosing = trimmed.endsWith("/>") || voidTags.has(tagName);
      lines.push(pad.repeat(depth) + trimmed);
      if (!selfClosing) depth++;
    } else {
      lines.push(pad.repeat(depth) + trimmed);
    }
  });

  return lines.join("\n");
}

export function minifyHtml(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "").replace(/>\s+</g, "><").trim();
}
