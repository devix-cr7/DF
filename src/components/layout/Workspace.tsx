import { Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";
import { Dashboard } from "../../modules/dashboard/Dashboard";
import { useWorkspace } from "../../store/workspace";
import { getTool } from "../../modules/registry";

export function Workspace() {
  const { activeTab } = useWorkspace();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const tool = activeTab !== "dashboard" ? getTool(activeTab) : null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-forge-bg text-forge-text">
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <TabBar />
        <div className="min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="h-full"
            >
              {tool ? (
                <Suspense fallback={<ToolFallback />}>
                  <tool.component />
                </Suspense>
              ) : (
                <Dashboard />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <StatusBar />
      </div>
    </div>
  );
}

function ToolFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-forge-border border-t-ember-500" />
    </div>
  );
}
