import { useEffect, useState } from "react";
import { Workspace } from "./components/layout/Workspace";
import { IntroScene } from "./components/intro/IntroScene";
import { useTheme } from "./store/theme";

export default function App() {
  const { theme } = useTheme();
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <>
      {showIntro && <IntroScene onDone={() => setShowIntro(false)} />}
      <Workspace />
    </>
  );
}
