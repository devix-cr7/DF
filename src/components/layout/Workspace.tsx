import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";
import { Dashboard } from "../../modules/dashboard/Dashboard";
import { useWorkspace } from "../../store/workspace";
import { getTool } from "../../modules/registry";
import { useIsMobile } from "../../hooks/useIsMobile";
import { CursorGlow } from "../ui/CursorGlow";

export function Workspace() {
  const { activeTab } = useWorkspace();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const tool = activeTab !== "dashboard" ? getTool(activeTab) : null;

  // collapse the sidebar automatically when crossing into mobile,
  // and default it open again on desktop
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  // auto-close the drawer after picking a tool on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="flex h-[100dvh] w-screen overflow-hidden bg-forge-bg text-forge-text">
      <CursorGlow />
      {isMobile ? (
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 z-50 w-[80vw] max-w-[280px] shadow-2xl"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : (
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
      )}

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
        {!isMobile && <StatusBar />}
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
