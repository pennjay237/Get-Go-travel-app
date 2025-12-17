import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-bold">
          <Link to="/">GetGo</Link>
        </div>
        <div className="space-x-6 hidden md:flex text-lg">
          <Link to="/" className="hover:underline transition">Home</Link>
          <Link to="/search" className="hover:underline transition">Search</Link>
          <Link to="/about" className="hover:underline transition">About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-blue-100 flex flex-col items-center justify-center text-center px-6 py-32 md:py-40">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900">
          Explore the world with <span className="text-blue-600">GetGo</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-3xl mb-8">
          Discover weather, attractions, and nearby airports for any destination in the world.
        </p>
        <Link
          to="/search#search-bar"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Start Exploring
        </Link>
      </header>

      {/* Feature Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Attractions</h3>
            <p className="text-gray-600">
              Find popular tourist spots and activities near your destination.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Weather</h3>
            <p className="text-gray-600">
              Get real-time weather updates before you travel.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transform transition">
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Airports</h3>
            <p className="text-gray-600">
              Locate the nearest airports and plan smarter routes.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
        <p>© 2025 GetGo. All rights reserved.</p>
      </footer>
    </div>
  );
}
