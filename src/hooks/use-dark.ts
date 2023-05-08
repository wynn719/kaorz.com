import { useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

export type Mode = "system" | "light" | "dark" | null;

export function useDark() {
  const [mode, setMode] = useState<Mode>(null);
  const [isDark, setIsDark] = useState(false);
  const { matches: isSystemDark } = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  function toggleDark(isOpen = true) {
    setIsDark(isOpen);
    isOpen
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }

  function updateMode(mode: Mode) {
    if (mode === "dark") {
      toggleDark(true);
    }
    if (mode === "light") {
      toggleDark(false);
    }
    if (mode === "system") {
      toggleDark(isSystemDark);
    }

    setMode(mode);
    window.localStorage.setItem("theme", mode);
  }

  useEffect(() => {
    const theme = (window.localStorage.getItem("theme") || "system") as Mode;

    if (theme === "system") {
      typeof isSystemDark !== "undefined" && toggleDark(isSystemDark);
    }
    setMode(theme);
  }, [isSystemDark]);

  return {
    mode,
    isDark,
    updateMode,
  };
}
