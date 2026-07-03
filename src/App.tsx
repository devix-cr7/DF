import { useEffect, useState } from "react";
import { Workspace } from "./components/layout/Workspace";
import { IntroScene } from "./components/intro/IntroScene";
import { useTheme } from "./store/theme";
import { useLocale } from "./store/locale";
import { LOCALES } from "./i18n/locales";

export default function App() {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    const info = LOCALES.find((l) => l.code === locale);
    document.documentElement.dir = info?.dir ?? "ltr";
    document.documentElement.lang = locale;

    if (locale === "ar") {
      const id = "gf-arabic";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";
        document.head.appendChild(link);
      }
      document.body.style.fontFamily = '"IBM Plex Sans Arabic", "Inter", sans-serif';
    } else {
      document.body.style.fontFamily = '"Inter", sans-serif';
    }
  }, [locale]);

  return (
    <>
      {showIntro && <IntroScene onDone={() => setShowIntro(false)} />}
      <Workspace />
    </>
  );
}
