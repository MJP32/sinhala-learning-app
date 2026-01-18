import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-icon">{isDarkMode ? "☀️" : "🌙"}</span>
    </button>
  );
}

export default ThemeToggle;
