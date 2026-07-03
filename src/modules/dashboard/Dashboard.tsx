import { motion } from "framer-motion";
import { Flame, Star, Clock, ArrowUpRight } from "lucide-react";
import { tools, categories } from "../../modules/registry";
import { useWorkspace } from "../../store/workspace";
import { Panel } from "../../components/ui/Panel";
import { ConstellationField } from "../../components/ui/ConstellationField";
import { AnimatedText } from "../../components/ui/AnimatedText";
import { TiltCard } from "../../components/ui/TiltCard";

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
    <div className="relative h-full overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
      <ConstellationField count={34} />
      <motion.div initial="hidden" animate="show" variants={container} className="relative z-10 mx-auto max-w-5xl">
        <motion.div variants={item} className="mb-8 flex items-center gap-3">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-11 w-11 place-items-center rounded-xl bg-forge-gradient shadow-glow"
          >
            <Flame size={20} className="text-forge-bg" strokeWidth={2.5} />
          </motion.div>
          <div>
            <AnimatedText
              as="h1"
              text="Welcome back to DevForge"
              className="font-display text-xl font-semibold"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-[13px] text-forge-muted"
            >
              {tools.length} tools · {categories.length} categories · everything runs locally
            </motion.p>
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
        <TiltCard key={tool.id} onClick={() => onOpen(tool.id)} className="cursor-pointer rounded-xl">
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
        </TiltCard>
      ))}
    </div>
  );
}
