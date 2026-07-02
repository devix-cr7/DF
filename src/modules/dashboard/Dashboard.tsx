import { motion } from "framer-motion";
import { Flame, Star, Clock, ArrowUpRight } from "lucide-react";
import { tools, categories } from "../../modules/registry";
import { useWorkspace } from "../../store/workspace";
import { Panel } from "../../components/ui/Panel";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Dashboard() {
  const { openTool, favorites, recents } = useWorkspace();
  const favoriteTools = tools.filter((t) => favorites.includes(t.id));
  const recentTools = recents.map((id) => tools.find((t) => t.id === id)).filter(Boolean) as typeof tools;

  return (
    <div className="h-full overflow-y-auto px-8 py-8">
      <motion.div initial="hidden" animate="show" variants={container} className="mx-auto max-w-5xl">
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-forge-gradient shadow-glow">
            <Flame size={20} className="text-forge-bg" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">Welcome back to DevForge</h1>
            <p className="text-[13px] text-forge-muted">
              {tools.length} tools · {categories.length} categories · everything runs locally
            </p>
          </div>
        </motion.div>

        {favoriteTools.length > 0 && (
          <motion.section variants={item} className="mb-8">
            <SectionTitle icon={Star} label="Favorites" />
            <ToolGrid list={favoriteTools} onOpen={openTool} />
          </motion.section>
        )}

        {recentTools.length > 0 && (
          <motion.section variants={item} className="mb-8">
            <SectionTitle icon={Clock} label="Recently used" />
            <ToolGrid list={recentTools} onOpen={openTool} />
          </motion.section>
        )}

        {categories.map((cat) => (
          <motion.section key={cat.id} variants={item} className="mb-8">
            <SectionTitle icon={cat.icon} label={cat.label} />
            <ToolGrid list={tools.filter((t) => t.category === cat.id)} onOpen={openTool} />
          </motion.section>
        ))}
      </motion.div>
    </div>
  );
}

function SectionTitle({ icon: Icon, label }: { icon: typeof Star; label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon size={14} className="text-ember-400" />
      <h2 className="text-[12.5px] font-semibold uppercase tracking-wider text-forge-muted">
        {label}
      </h2>
    </div>
  );
}

function ToolGrid({ list, onOpen }: { list: typeof tools; onOpen: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((tool) => (
        <motion.button
          key={tool.id}
          onClick={() => onOpen(tool.id)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Panel className="group flex h-full flex-col gap-2.5 p-4 text-left transition-colors hover:border-forge-borderHi">
            <div className="flex items-center justify-between">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-forge-panel2 text-ember-400">
                <tool.icon size={15} />
              </div>
              <ArrowUpRight
                size={14}
                className="text-forge-faint opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>
            <div>
              <p className="text-[13px] font-medium text-forge-text">{tool.title}</p>
              <p className="text-[11.5px] text-forge-muted">{tool.description}</p>
            </div>
          </Panel>
        </motion.button>
      ))}
    </div>
  );
}
