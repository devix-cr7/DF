import { lazy } from "react";
import {
  Braces,
  Code2,
  FileCode2,
  Regex,
  Binary,
  KeyRound,
  Hash,
  Fingerprint,
  FileText,
  Paintbrush,
  type LucideIcon,
} from "lucide-react";
import type { ToolCategory, ToolDefinition } from "../types/tool";

export const categories: ToolCategory[] = [
  { id: "code", label: "Code", icon: Code2 },
];

export const tools: ToolDefinition[] = [
  {
    id: "json",
    title: "JSON",
    description: "Format & validate",
    category: "code",
    icon: Braces,
    component: lazy(() => import("./code-tools/JsonTool")),
    keywords: ["json", "format", "validate"],
  },
  {
    id: "html",
    title: "HTML",
    description: "Beautify & minify",
    category: "code",
    icon: FileCode2,
    component: lazy(() => import("./code-tools/HtmlTool")),
    keywords: ["html", "markup"],
  },
  {
    id: "css",
    title: "CSS",
    description: "Beautify & minify",
    category: "code",
    icon: Paintbrush,
    component: lazy(() => import("./code-tools/CssTool")),
    keywords: ["css", "styles"],
  },
  {
    id: "js",
    title: "JavaScript",
    description: "Beautify & minify",
    category: "code",
    icon: FileCode2,
    component: lazy(() => import("./code-tools/JsTool")),
    keywords: ["javascript", "js"],
  },
  {
    id: "ts",
    title: "TypeScript",
    description: "Beautify & minify",
    category: "code",
    icon: FileCode2,
    component: lazy(() => import("./code-tools/TsTool")),
    keywords: ["typescript", "ts"],
  },
  {
    id: "markdown",
    title: "Markdown",
    description: "Live preview",
    category: "code",
    icon: FileText,
    component: lazy(() => import("./code-tools/MarkdownTool")),
    keywords: ["markdown", "md", "preview"],
  },
  {
    id: "regex",
    title: "Regex Tester",
    description: "Match & highlight",
    category: "code",
    icon: Regex,
    component: lazy(() => import("./code-tools/RegexTool")),
    keywords: ["regex", "regexp", "pattern"],
  },
  {
    id: "base64",
    title: "Base64",
    description: "Encode & decode",
    category: "code",
    icon: Binary,
    component: lazy(() => import("./code-tools/Base64Tool")),
    keywords: ["base64", "encode", "decode"],
  },
  {
    id: "jwt",
    title: "JWT Decoder",
    description: "Inspect claims",
    category: "code",
    icon: KeyRound,
    component: lazy(() => import("./code-tools/JwtTool")),
    keywords: ["jwt", "token", "auth"],
  },
  {
    id: "hash",
    title: "Hash Generator",
    description: "SHA-1 / 256 / 384 / 512",
    category: "code",
    icon: Hash,
    component: lazy(() => import("./code-tools/HashTool")),
    keywords: ["hash", "sha", "checksum"],
  },
  {
    id: "uuid",
    title: "UUID Generator",
    description: "RFC 4122 v4",
    category: "code",
    icon: Fingerprint,
    component: lazy(() => import("./code-tools/UuidTool")),
    keywords: ["uuid", "guid", "id"],
  },
];

export function getTool(id: string) {
  return tools.find((t) => t.id === id);
}

export function iconFor(id: string): LucideIcon {
  return getTool(id)?.icon ?? Code2;
}
