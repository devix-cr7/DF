import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Check } from "lucide-react";
import { LOCALES } from "../../i18n/locales";
import { useLocale } from "../../store/locale";
import { useT } from "../../hooks/useT";
import { IconButton } from "../ui/Panel";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const { t } = useT();

  return (
    <div className="relative">
      <IconButton label={t("topbar.language")} onClick={() => setOpen((o) => !o)} active={open}>
        <Languages size={15} />
      </IconButton>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-forge-border bg-forge-panel py-1.5 shadow-panel"
            >
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-forge-text hover:bg-forge-panel2"
                >
                  <span>{l.nativeLabel}</span>
                  {locale === l.code && <Check size={13} className="text-ember-400" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
