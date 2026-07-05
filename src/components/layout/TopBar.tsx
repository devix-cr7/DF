import { Star, Sun, Moon, PanelLeftClose, PanelLeft } from "lucide-react";
import { useWorkspace } from "../../store/workspace";
import { useTheme } from "../../store/theme";
import { getTool } from "../../modules/registry";
import { IconButton } from "../ui/Panel";
import { cn } from "../../lib/utils";
import { useT } from "../../hooks/useT";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function TopBar({
  sidebarOpen,
  onToggleSidebar,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { activeTab, favorites, toggleFavorite } = useWorkspace();
  const { theme, toggle } = useTheme();
  const { t, tCategory, tTool } = useT();
  const tool = activeTab !== "dashboard" ? getTool(activeTab) : null;
  const isFav = tool ? favorites.includes(tool.id) : false;

  return (
    <div className="flex h-11 flex-none items-center justify-between border-b border-forge-border px-3">
      <div className="flex items-center gap-1.5">
        <IconButton label={t("topbar.toggle_sidebar")} onClick={onToggleSidebar}>
          {sidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeft size={15} />}
        </IconButton>
        <span className="text-[13px] text-forge-muted">
          {tool ? (
            <>
              <span className="text-forge-faint">{tCategory(tool.category)} / </span>
              {tTool(tool.id, "title")}
            </>
          ) : (
            t("nav.dashboard")
          )}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tool && (
          <IconButton label={t("topbar.toggle_favorite")} onClick={() => toggleFavorite(tool.id)}>
            <Star size={15} className={cn(isFav && "fill-ember-400 text-ember-400")} />
          </IconButton>
        )}
        <LanguageSwitcher />
        <IconButton label={t("topbar.toggle_theme")} onClick={toggle}>
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </IconButton>
      </div>
    </div>
  );
}
