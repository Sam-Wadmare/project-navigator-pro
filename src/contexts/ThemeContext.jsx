import { createContext, useContext, useState, useEffect } from 'react';

// create context for theme
const ThemeContext = createContext(undefined);

// theme provider component
export function ThemeProvider({ children }) {
  // get saved theme or default to light
  const [theme, setTheme] = useState(function() {
    const saved = localStorage.getItem('curadocs_theme');
    return saved || 'light';
  });

  // update document class when theme changes
  useEffect(function() {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('curadocs_theme', theme);
  }, [theme]);

  // toggle between light and dark
  function toggleTheme() {
    setTheme(function(prev) {
      if (prev === 'light') {
        return 'dark';
      }
      return 'light';
    });
  }

  const value = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// custom hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
