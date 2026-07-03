# DevForge

A premium, desktop-like developer workspace. Local-first, plugin-based, dark by default.

## Complete (this build)

- Design system (colors, type, motion tokens) — `tailwind.config.ts`, `src/index.css`
- Workspace shell: collapsible/drawer sidebar (responsive), tab bar with animated molten indicator, top bar, status bar
- Dashboard: favorites, recents, category grid, constellation background, 3D tilt cards
- Plugin architecture: `src/modules/registry.ts` — add a tool by dropping a component + one entry
- Cinematic galaxy-orbit intro animation, plays on every visit
- Dark / light theme (persisted) · fully responsive (mobile drawer, stacked panels)
- 7-language interface (English, العربية, Español, Français, Deutsch, 日本語, 简体中文) with full RTL support for Arabic — switch from the globe icon in the top bar
- Tabs, favorites, recents, and history persisted locally (Zustand + localStorage)

**36 tools across 8 categories, all fully working:**

- **Code** (11): JSON, HTML, CSS, JavaScript, TypeScript, Markdown, Regex Tester, Base64, JWT Decoder, Hash Generator, UUID Generator
- **Design** (5): Color Tool, SVG Preview, Font Pairing, Icon Browser, Image Utilities
- **Database** (4): ER Designer, SQL Builder, SQLite Viewer, Data Generator
- **API** (3): URL Tools, Header Builder, API Designer
- **Project** (5): Project Planner, Folder Generator, Architecture, Documentation, Flowcharts
- **Documents** (3): CSV Viewer, Text Studio, PDF Merge
- **Utilities** (5): QR Code, Password Generator, Timestamp Converter, Diff Checker, Clipboard Board
- **Workspace** (3): Notes, Snippets, History

## Not yet built

PWA/offline support · keyboard shortcut customization · Contact page.

## Run locally

```bash
npm install
npm run dev
```

## Deploy (GitHub Pages via Actions — same flow as your other projects)

1. Push this repo to GitHub as `DF`.
2. Repo Settings → Pages → Source → **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
4. Live at `https://devix-cr7.github.io/DF/`.

If you rename the repo, update `base` in `vite.config.ts` to match.

## Notes on heavier tools

- **SQLite Viewer** loads a WASM engine (`sql.js`) — the binary is bundled in `public/sql-wasm.wasm` so it works fully offline, no CDN needed.
- **ER Designer**, **Architecture**, and **Flowcharts** use `@xyflow/react` for the canvas — drag nodes, drag from the small dots on their edges to connect them.
- **PDF Merge** uses `pdf-lib`, entirely client-side — nothing is uploaded anywhere.
- **Language**: the shell (sidebar, top bar, dashboard, status bar) and every tool's title/description/category are fully translated across all 7 languages, resolved automatically in `ToolShell` from the active tool id — no per-tool wiring needed. Individual tools' internal labels (buttons, form fields inside each tool) are still English-only for now; translating those is the next step if wanted.
