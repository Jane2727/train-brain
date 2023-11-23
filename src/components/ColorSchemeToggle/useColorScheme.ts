import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { DARK_CLASS, LIGHT_CLASS } from "../../constants";
import createPersistedState from "use-persisted-state";
import { ColorSchemeToggleProps } from "../../models";

export const useColorSchemeState = createPersistedState("colorScheme");

export function useColorScheme(): ColorSchemeToggleProps {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useColorSchemeState<boolean>(systemPrefersDark);

  useEffect(() => {
    document.documentElement.className = isDark ? DARK_CLASS : LIGHT_CLASS;
  }, [isDark]);

  return {
    isDark,
    setDarkTheme: setIsDark,
  };
}
