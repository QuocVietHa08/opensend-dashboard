import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMantineColorScheme } from '@mantine/core';

type ThemeContextType = {
  toggleColorScheme: () => void;
  colorScheme: 'light' | 'dark' | 'auto';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(colorScheme as 'light' | 'dark' | 'auto');

  useEffect(() => {
    // Sync with localStorage
    const savedTheme = localStorage.getItem('colorScheme') as 'light' | 'dark' | 'auto';
    if (savedTheme) {
      setTheme(savedTheme);
      setColorScheme(savedTheme);
    }
  }, [setColorScheme]);

  const toggleColorScheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setColorScheme(newTheme);
    localStorage.setItem('colorScheme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ toggleColorScheme, colorScheme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
