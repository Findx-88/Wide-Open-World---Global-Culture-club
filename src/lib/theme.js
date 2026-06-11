"use client";
import { useEffect, useState } from 'react';

/**
 * useTheme — reads/writes the `wow-theme` localStorage key and
 * applies `data-theme` to the <html> element.
 * Defaults to "dark" if no preference is saved.
 */
export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('wow-theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('wow-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return { theme, toggleTheme };
}
