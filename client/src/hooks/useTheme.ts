import { useEffect, useCallback } from "react";

const THEME_KEY = "theme";

function computeInitialDark(): boolean {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return !!window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme() {
  useEffect(() => {
    applyTheme(computeInitialDark());
  }, []);

  const toggleTheme = useCallback(() => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    return isDark;
  }, []);

  return { toggleTheme };
}
