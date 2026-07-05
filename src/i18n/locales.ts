export interface Locale {
  code: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}

export const LOCALES: Locale[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "de", label: "German", nativeLabel: "Deutsch", dir: "ltr" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", dir: "ltr" },
  { code: "zh", label: "Chinese", nativeLabel: "简体中文", dir: "ltr" },
];

export type LocaleCode = (typeof LOCALES)[number]["code"];
