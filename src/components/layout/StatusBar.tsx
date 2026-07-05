import { Wifi, ShieldCheck, GitBranch } from "lucide-react";
import { tools } from "../../modules/registry";
import { useT } from "../../hooks/useT";

export function StatusBar() {
  const { t } = useT();
  return (
    <div className="flex h-6 flex-none items-center justify-between border-t border-forge-border bg-forge-panel/60 px-3 text-[11px] text-forge-faint">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-ember-pulse rounded-full bg-ember-500" />
          {t("status.local")}
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={11} /> {t("status.private")}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch size={11} /> v0.1.0
        </span>
        <span className="flex items-center gap-1">
          <Wifi size={11} /> {tools.length} {t("status.installed")}
        </span>
      </div>
    </div>
  );
}
