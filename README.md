# DevForge

A premium, desktop-like developer workspace. Local-first, plugin-based, dark by default.

## Phase 1 (this build)

- Design system (colors, type, motion tokens) — `tailwind.config.ts`, `src/index.css`
- Workspace shell: collapsible sidebar, tab bar with animated molten indicator, top bar, status bar
- Dashboard: favorites, recents, category grid
- Plugin architecture: `src/modules/registry.ts` — add a tool by dropping a component + one entry
- **Code** category, fully working, 11 tools: JSON, HTML, CSS, JavaScript, TypeScript, Markdown, Regex Tester, Base64, JWT Decoder, Hash Generator, UUID Generator
- Dark / light theme (persisted)
- Tabs, favorites, and recents persisted locally (Zustand + localStorage)

## Not yet built (next phases)

Database, API, Design, Documents, Utilities, Workspace-notes categories · i18n (7 languages) · 3D hero visuals · PWA/offline · React Flow diagrams · keyboard shortcut customization · Contact page.

## Run locally

```bash
npm install
npm run dev
```

## Deploy (GitHub Pages via Actions — same flow as your other projects)

1. Push this repo to GitHub as `DevForge`.
2. Repo Settings → Pages → Source → **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.
4. Live at `https://devix-cr7.github.io/DevForge/`.

If you rename the repo, update `base` in `vite.config.ts` to match.
