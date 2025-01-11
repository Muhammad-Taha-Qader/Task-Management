"use client";

import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage or system preference for the theme
    const userPreference =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setIsDark(userPreference === "dark");
    document.documentElement.classList.toggle("dark", userPreference === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center px-4 py-2 rounded-full shadow-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {isDark ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
