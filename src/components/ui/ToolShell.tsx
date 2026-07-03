import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import { useWorkspace } from "../../store/workspace";
import { useT } from "../../hooks/useT";
import { toolStrings } from "../../i18n/translations";

export function ToolShell({
  title,
  description,
  toolbar,
  children,
  flush = false,
}: {
  title: string;
  description: string;
  toolbar?: ReactNode;
  children: ReactNode;
  flush?: boolean;
}) {
  const { activeTab } = useWorkspace();
  const { tTool } = useT();

  // Every tool page renders inside ToolShell while it is the active tab,
  // so we can resolve translated copy from the registry id automatically —
  // individual tool files don't need to import the translation hook themselves.
  const hasTranslation = Boolean(toolStrings[activeTab]);
  const shownTitle = hasTranslation ? tTool(activeTab, "title") : title;
  const shownDescription = hasTranslation ? tTool(activeTab, "desc") : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-forge-border px-4 py-3 sm:px-6 sm:py-4">
        <div>
          <AnimatedText
            key={shownTitle}
            as="h1"
            text={shownTitle}
            className="font-display text-[15px] font-semibold text-forge-text"
          />
          <p className="mt-0.5 text-[13px] text-forge-muted">{shownDescription}</p>
        </div>
        {toolbar && <div className="flex shrink-0 flex-wrap items-center gap-2">{toolbar}</div>}
      </div>
      <div className={flush ? "min-h-0 flex-1" : "min-h-0 flex-1 overflow-y-auto p-3 sm:p-5"}>
        {children}
      </div>
    </motion.div>
  );
}
