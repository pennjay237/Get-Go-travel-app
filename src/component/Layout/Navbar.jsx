import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="
      sticky top-0 z-50
      bg-white/80 dark:bg-gray-800/80
      backdrop-blur-md
      border-b border-gray-200 dark:border-gray-700
      px-6 py-4
      shadow-sm
    ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
        >
          GetGo
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
         
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}