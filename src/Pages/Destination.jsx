import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../component/ThemeToggle/ThemeToggle";
import SearchBar from "../component/Searchbar/SearchBar";

export default function Home() {
  const handleDestinationSelect = (destination) => {
    console.log("Destination selected:", destination);
  };

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
        text-center px-6 py-20 md:py-28
        transition-colors
      ">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Explore the world with{" "}
          <span className="text-blue-600 dark:text-blue-400">
            GetGo
          </span>
        </h1>

        <p className="
          text-gray-700 dark:text-gray-300
          text-lg md:text-xl
          max-w-3xl
          mb-10
        ">
          Discover weather, attractions, and nearby airports for any destination in the world.
        </p>

        <div className="w-full max-w-2xl mb-8">
          <SearchBar onSelectDestination={handleDestinationSelect} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            to="/search"
            className="
              bg-blue-600 hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600
              text-white
              px-8 py-3
              rounded-lg
              font-semibold
              shadow-lg
              hover:shadow-xl
              transition-all
              hover:scale-105
              text-center
            "
          >
            Start Exploring
          </Link>
          <Link
            to="/search"
            className="
              bg-white dark:bg-gray-700
              text-blue-600 dark:text-blue-400
              border border-blue-300 dark:border-blue-600
              hover:bg-blue-50 dark:hover:bg-gray-600
              px-8 py-3
              rounded-lg
              font-semibold
              shadow-lg
              hover:shadow-xl
              transition-all
              hover:scale-105
              text-center
            "
          >
            Browse Destinations
          </Link>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="
            text-3xl font-bold text-center mb-12
            text-gray-900 dark:text-gray-100
          ">
            Everything You Need For Your Journey
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Attractions",
                description: "Find popular tourist spots and activities near your destination.",
                icon: "📍",
                gradient: "from-green-500 to-emerald-500",
                link: "/search"
              },
              {
                title: "Weather",
                description: "Get real-time weather updates before you travel.",
                icon: "🌤️",
                gradient: "from-blue-500 to-cyan-500",
                link: "/search"
              },
              {
                title: "Airports",
                description: "Locate the nearest airports and plan smarter routes.",
                icon: "✈️",
                gradient: "from-purple-500 to-pink-500",
                link: "/search"
              },
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
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
                  block
                  hover:no-underline
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Paris", country: "France", emoji: "🇫🇷" },
              { name: "Tokyo", country: "Japan", emoji: "🇯🇵" },
              { name: "New York", country: "USA", emoji: "🇺🇸" },
              { name: "London", country: "UK", emoji: "🇬🇧" },
              { name: "Dubai", country: "UAE", emoji: "🇦🇪" },
              { name: "Sydney", country: "Australia", emoji: "🇦🇺" },
              { name: "Bangkok", country: "Thailand", emoji: "🇹🇭" },
              { name: "Rome", country: "Italy", emoji: "🇮🇹" },
            ].map((city, index) => (
              <Link
                key={index}
                to={`/search?city=${city.name}`}
                className="
                  bg-white dark:bg-gray-800
                  rounded-lg
                  p-4
                  text-center
                  hover:shadow-lg
                  transition-all
                  border border-gray-200 dark:border-gray-700
                  hover:border-blue-300 dark:hover:border-blue-600
                  hover:scale-105
                "
              >
                <div className="text-2xl mb-2">{city.emoji}</div>
                <div className="font-semibold">{city.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{city.country}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="
        bg-gray-800 dark:bg-gray-900
        text-white dark:text-gray-300
        py-8
        text-center
        mt-auto
        transition-colors
      ">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xl font-bold mb-2">GetGo</p>
          <p className="mb-4">Your travel companion for discovering the world</p>
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/search" className="hover:text-blue-400 transition-colors">Search</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-gray-400">© 2025 GetGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}