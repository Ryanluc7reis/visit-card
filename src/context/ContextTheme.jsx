import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ContextThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  const toggleThemeLight = () => {
    const newTheme = "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const toggleThemeDark = () => {
    const newTheme = "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeLight, toggleThemeDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
