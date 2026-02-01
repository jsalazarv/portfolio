import { useEffect, useState } from 'react';

import { ThemeProviderContext } from './context';

import type { Theme, ThemeProviderProps } from './types';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    console.log('Theme changed to:', theme);

    // Remove both classes first
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      console.log('System theme detected:', systemTheme);
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Force a reflow to ensure the theme change is applied
    void root.offsetHeight;
    console.log('Applied theme class:', root.classList.toString());
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      console.log('Setting theme to:', theme);
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
