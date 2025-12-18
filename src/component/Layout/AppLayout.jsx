import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-50 to-gray-100
      dark:from-gray-900 dark:to-gray-800
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="
        mt-12 py-6 text-center text-sm
        text-gray-600 dark:text-gray-400
        border-t border-gray-200 dark:border-gray-700
      ">
        © 2025 GetGo. All rights reserved.
      </footer>
    </div>
  );
}