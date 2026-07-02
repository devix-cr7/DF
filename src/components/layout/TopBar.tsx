import { Star, Sun, Moon, PanelLeftClose, PanelLeft } from "lucide-react";
import { useWorkspace } from "../../store/workspace";
import { useTheme } from "../../store/theme";
import { getTool } from "../../modules/registry";
import { IconButton } from "../ui/Panel";
import { cn } from "../../lib/utils";

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { activeTab, favorites, toggleFavorite } = useWorkspace();
  const { theme, toggle } = useTheme();
  const tool = activeTab !== "dashboard" ? getTool(activeTab) : null;
  const isFav = tool ? favorites.includes(tool.id) : false;

  return (
    <div className="flex h-11 flex-none items-center justify-between border-b border-forge-border px-3">
      <div className="flex items-center gap-1.5">
        <IconButton label="Toggle sidebar" onClick={onToggleSidebar}>
          {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeft size={15} />}
        </IconButton>
        <span className="text-[13px] text-forge-muted">
          {tool ? (
            <>
              <span className="text-forge-faint">Code / </span>
              {tool.title}
            </>
          ) : (
            "Dashboard"
          )}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tool && (
          <IconButton label="Toggle favorite" onClick={() => toggleFavorite(tool.id)}>
            <Star
              size={15}
              className={cn(isFav && "fill-ember-400 text-ember-400")}
            />
          </IconButton>
        )}
        <IconButton label="Toggle theme" onClick={toggle}>
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </IconButton>
      </div>
    </div>
  );
}
