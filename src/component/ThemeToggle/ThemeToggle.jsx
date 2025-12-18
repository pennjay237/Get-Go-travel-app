import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        group
        relative
        flex items-center justify-center gap-2
        px-4 py-2.5
        rounded-xl
        bg-gradient-to-r from-blue-600 to-purple-600
        dark:from-blue-500 dark:to-purple-500
        text-white
        hover:from-blue-700 hover:to-purple-700
        dark:hover:from-blue-600 dark:hover:to-purple-600
        transition-all duration-300
        shadow-lg hover:shadow-xl
        font-semibold
        border border-blue-400/30 dark:border-blue-300/30
        min-w-[120px]
        hover:scale-105
        active:scale-95
        overflow-hidden
      "
      aria-label="Toggle dark mode"
    >
      <div className="
        absolute inset-0
        bg-gradient-to-r from-white/0 via-white/20 to-white/0
        translate-x-[-100%]
        group-hover:translate-x-[100%]
        transition-transform duration-1000
        pointer-events-none
      " />
      
      <div className="
        absolute inset-0
        rounded-xl
        bg-gradient-to-r from-blue-400/10 to-purple-400/10
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
      " />
      
      <span className="relative flex items-center justify-center gap-2">
        <span className="text-lg transition-all duration-300 group-hover:scale-110">
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
        <span className="hidden sm:inline text-sm font-medium transition-all duration-300">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
        <span className="sm:hidden text-sm font-medium">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
      </span>
      
      <span className="
        absolute -top-1 -right-1
        w-3 h-3
        rounded-full
        bg-green-400
        dark:bg-yellow-400
        shadow-sm
        border border-white dark:border-gray-800
        transition-colors duration-300
        animate-pulse
      " />
    </button>
  );
}