import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function ToolShell({
  title,
  description,
  toolbar,
  children,
}: {
  title: string;
  description: string;
  toolbar?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col"
    >
      <div className="flex items-start justify-between gap-4 border-b border-forge-border px-6 py-4">
        <div>
          <h1 className="font-display text-[15px] font-semibold text-forge-text">
            {title}
          </h1>
          <p className="mt-0.5 text-[13px] text-forge-muted">{description}</p>
        </div>
        {toolbar && <div className="flex shrink-0 items-center gap-2">{toolbar}</div>}
      </div>
      <div className="min-h-0 flex-1 p-5">{children}</div>
    </motion.div>
  );
}
