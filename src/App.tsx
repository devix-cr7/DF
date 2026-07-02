import { useEffect } from "react";
import { Workspace } from "./components/layout/Workspace";
import { useTheme } from "./store/theme";

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return <Workspace />;
}
