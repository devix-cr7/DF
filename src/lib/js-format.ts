export function formatJs(code: string, indent = 2): string {
  const pad = " ".repeat(indent);
  let depth = 0;
  let out = "";
  let i = 0;
  let inString: string | null = null;

  while (i < code.length) {
    const ch = code[i];

    if (inString) {
      out += ch;
      if (ch === inString && code[i - 1] !== "\\") inString = null;
      i++;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      out += ch;
      i++;
      continue;
    }
    if (ch === "{" || ch === "[") {
      depth++;
      out += ch + "\n" + pad.repeat(depth);
      i++;
      while (code[i] === " " || code[i] === "\n") i++;
      continue;
    }
    if (ch === "}" || ch === "]") {
      depth = Math.max(0, depth - 1);
      out = out.replace(/\n[ ]*$/, "");
      out += "\n" + pad.repeat(depth) + ch;
      i++;
      while (code[i] === " " || code[i] === "\n") i++;
      continue;
    }
    if (ch === ";") {
      out += ";\n" + pad.repeat(depth);
      i++;
      while (code[i] === " " || code[i] === "\n") i++;
      continue;
    }
    out += ch;
    i++;
  }
  return out.replace(/\n{2,}/g, "\n").replace(/[ \t]+\n/g, "\n").trim();
}

export function minifyJs(code: string): string {
  return code
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}();,:])\s*/g, "$1")
    .trim();
}
