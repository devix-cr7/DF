import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocaleCode } from "../i18n/locales";

interface LocaleState {
  locale: LocaleCode;
  setLocale: (l: LocaleCode) => void;
}

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "devforge-locale" }
  )
);
