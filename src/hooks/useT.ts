import { useCallback } from "react";
import { useLocale } from "../store/locale";
import { uiStrings, categoryStrings, toolStrings, commonStrings, toolInternalStrings } from "../i18n/translations";

export function useT() {
  const locale = useLocale((s) => s.locale);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const entry = uiStrings[key] ?? commonStrings[key] ?? toolInternalStrings[key];
      let str = entry ? entry[locale] ?? entry.en : key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          str = str.replace(`{${k}}`, String(v));
        });
      }
      return str;
    },
    [locale]
  );

  const tCategory = useCallback(
    (id: string) => categoryStrings[id]?.[locale] ?? categoryStrings[id]?.en ?? id,
    [locale]
  );

  const tTool = useCallback(
    (id: string, field: "title" | "desc") =>
      toolStrings[id]?.[field]?.[locale] ?? toolStrings[id]?.[field]?.en ?? id,
    [locale]
  );

  return { t, tCategory, tTool, locale };
}
