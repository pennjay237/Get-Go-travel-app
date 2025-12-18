import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../component/ThemeToggle/ThemeToggle";
import SearchBar from "../component/Searchbar/SearchBar";

export default function Home() {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-50 to-gray-100
      dark:from-gray-900 dark:to-gray-800
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">
      <nav className="
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-200
        px-6 py-4
        flex justify-between items-center
        shadow-md
        border-b border-gray-200 dark:border-gray-700
        transition-colors
      ">
        <div className="text-2xl font-bold">
          <Link 
            to="/" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            GetGo
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />
        </div>
      </nav>

      <header className="
        bg-blue-100 dark:bg-gray-800
        flex flex-col items-center justify-center
        text-center px-6 py-24 md:py-32
        transition-colors
      ">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Explore the world with{" "}
          <span className="text-purple-600 dark:text-purple-400">
            GetGo
          </span>
        </h1>

        <p className="
          text-gray-700 dark:text-gray-300
          text-lg md:text-xl
          max-w-3xl
          mb-10
        ">
          Your Tour site that facilitates all your adventures
        </p>

        <div className="w-full max-w-2xl mb-8 px-4">
          <SearchBar onSelectDestination={() => {}} />
        </div>

        
      </header>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="
            text-3xl font-bold text-center mb-12
            text-gray-900 dark:text-gray-100
          ">
            Informations You Need For Your Trips
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Attractions",
                description: "Search popular tourist attractions in your dream city.",
                icon: "📍",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                title: "Weather",
                description: "Get accurate wether informations about your dream city.",
                icon: "🌤️",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                title: "Airports",
                description: "Get suggestions of the nearest airport in your dream city.",
                icon: "✈️",
                gradient: "from-purple-500 to-pink-500"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="
                  group
                  bg-white dark:bg-gray-800
                  text-gray-800 dark:text-gray-100
                  rounded-xl
                  shadow-lg
                  p-8
                  text-center
                  hover:scale-105
                  transform
                  transition-all duration-300
                  border border-gray-200 dark:border-gray-700
                  hover:border-blue-300 dark:hover:border-blue-600
                  hover:shadow-2xl
                "
              >
                <div className={`
                  inline-flex items-center justify-center
                  w-16 h-16
                  rounded-full
                  bg-gradient-to-br ${feature.gradient}
                  text-white
                  text-2xl
                  mb-6
                  group-hover:scale-110
                  transition-transform duration-300
                `}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="
        bg-gray-800 dark:bg-gray-900
        text-white dark:text-gray-300
        py-6
        text-center
        mt-auto
        transition-colors
      ">
        <p>© 2025 GetGo. All rights reserved.</p>
      </footer>
    </div>
  );
}