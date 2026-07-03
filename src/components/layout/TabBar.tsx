import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutDashboard } from "lucide-react";
import { useWorkspace } from "../../store/workspace";
import { getTool } from "../../modules/registry";
import { cn } from "../../lib/utils";
import { useT } from "../../hooks/useT";

export function TabBar() {
  const { openTabs, activeTab, setActive, closeTab, goDashboard } = useWorkspace();
  const { t, tTool } = useT();

  return (
    <div className="flex h-11 flex-none items-center overflow-x-auto border-b border-forge-border bg-forge-panel/40 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <Tab
        label={t("nav.dashboard")}
        icon={<LayoutDashboard size={13} />}
        active={activeTab === "dashboard"}
        onClick={goDashboard}
      />
      <AnimatePresence initial={false}>
        {openTabs.map((id) => {
          const tool = getTool(id);
          if (!tool) return null;
          return (
            <Tab
              key={id}
              label={tTool(tool.id, "title")}
              icon={<tool.icon size={13} />}
              active={activeTab === id}
              onClick={() => setActive(id)}
              onClose={() => closeTab(id)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function Tab({
  label,
  icon,
  active,
  onClick,
  onClose,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  onClose?: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "auto" }}
      exit={{ opacity: 0, width: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full"
    >
      <button
        onClick={onClick}
        className={cn(
          "group relative flex h-full items-center gap-2 whitespace-nowrap rounded-t-lg px-3.5 text-[13px] transition-colors",
          active ? "text-forge-text" : "text-forge-muted hover:text-forge-text"
        )}
      >
        {icon}
        <span>{label}</span>
        {onClose && (
          <span
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-0.5 grid h-4 w-4 place-items-center rounded opacity-0 hover:bg-forge-border group-hover:opacity-100"
          >
            <X size={11} />
          </span>
        )}
        {active && (
          <motion.div
            layoutId="tab-underline"
            transition={{ type: "spring", stiffness: 500, damping: 40 }}
            className="molten-indicator absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
          />
        )}
      </button>
    </motion.div>
  );
}
