'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-24 z-50 p-2 rounded-full bg-primary/10 dark:bg-primary/20 backdrop-blur-sm border border-border hover:bg-primary/20 dark:hover:bg-primary/30 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}