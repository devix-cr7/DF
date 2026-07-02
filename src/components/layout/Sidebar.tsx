import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, LayoutDashboard, Star, Flame } from "lucide-react";
import { categories, tools } from "../../modules/registry";
import { useWorkspace } from "../../store/workspace";
import { cn } from "../../lib/utils";

export function Sidebar() {
  const [query, setQuery] = useState("");
  const { activeTab, openTool, goDashboard, favorites } = useWorkspace();

  const filtered = useMemo(() => {
    if (!query.trim()) return tools;
    const q = query.toLowerCase();
    return tools.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.keywords?.some((k) => k.includes(q))
    );
  }, [query]);

  return (
    <aside className="flex h-full w-60 flex-none flex-col border-r border-forge-border bg-forge-panel/60">
      <div className="flex items-center gap-2 px-4 py-4">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-forge-gradient">
          <Flame size={15} className="text-forge-bg" strokeWidth={2.5} />
        </div>
        <span className="font-display text-[15px] font-semibold tracking-tight">
          DevForge
        </span>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 rounded-lg border border-forge-border bg-forge-bg/50 px-2.5 py-1.5">
          <Search size={13} className="text-forge-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            className="w-full bg-transparent text-[13px] text-forge-text outline-none placeholder:text-forge-faint"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-3">
        <NavItem
          label="Dashboard"
          icon={LayoutDashboard}
          active={activeTab === "dashboard"}
          onClick={goDashboard}
        />

        {favorites.length > 0 && !query && (
          <Section label="Favorites">
            {favorites.map((id) => {
              const tool = tools.find((t) => t.id === id);
              if (!tool) return null;
              return (
                <NavItem
                  key={id}
                  label={tool.title}
                  icon={tool.icon}
                  active={activeTab === id}
                  onClick={() => openTool(id)}
                />
              );
            })}
          </Section>
        )}

        {categories.map((cat) => {
          const items = filtered.filter((t) => t.category === cat.id);
          if (items.length === 0) return null;
          return (
            <Section key={cat.id} label={cat.label}>
              {items.map((tool) => (
                <NavItem
                  key={tool.id}
                  label={tool.title}
                  icon={tool.icon}
                  active={activeTab === tool.id}
                  onClick={() => openTool(tool.id)}
                />
              ))}
            </Section>
          );
        })}
      </nav>
    </aside>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 first:mt-1">
      <p className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-forge-faint">
        {label}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof Star;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors duration-200",
        active ? "text-forge-text" : "text-forge-muted hover:text-forge-text hover:bg-forge-panel2"
      )}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute inset-0 rounded-lg bg-forge-panel2"
        />
      )}
      {active && (
        <motion.div
          layoutId="sidebar-glow"
          className="molten-indicator absolute left-0 top-1 bottom-1 w-[2.5px] rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <Icon size={14} className="relative z-10 shrink-0" />
      <span className="relative z-10 truncate">{label}</span>
    </button>
  );
}
