import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Map from "../component/Map/Map";
import WeatherCard from "../component/WeatherCard/WeatherCard";
import AirportInfo from "../component/Airport/AirportInfo";
import CurrencyCard from "../component/Currency/CurrencyCard";
import LanguageCard from "../component/LanguageCard/LanguageCard";
import ActivitiesList from "../component/Activity/ActivitiesList";
import SearchBar from "../component/Searchbar/SearchBar";
import ThemeToggle from "../component/ThemeToggle/ThemeToggle";
import { fetchAttractions } from "../hooks/geoapify";

function AttractionsList({ lat, lon, limit = 10 }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAttractions() {
      setLoading(true);
      try {
        const data = await fetchAttractions(lat, lon, limit);
        setAttractions(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (lat && lon) getAttractions();
  }, [lat, lon, limit]);

  if (loading) return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  if (!attractions.length) return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-2">Popular Attractions</h3>
      <p className="text-gray-500 dark:text-gray-400">No attractions found.</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6 space-y-3 transition-colors">
      <h3 className="text-xl font-semibold mb-2">Popular Attractions</h3>
      <ul className="space-y-2">
        {attractions.map((poi) => (
          <li
            key={poi.properties.place_id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            {poi.properties.name || "Unnamed place"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SearchResults() {
  const { state } = useLocation();
  if (!state) return <Navigate to="/" />;

  const { lat, lon, country, city, countryCode: passedCode } = state;
  const [countryCode, setCountryCode] = useState(passedCode || null);
  const [loadingCode, setLoadingCode] = useState(!passedCode);

  const handleNewSearch = (destination) => {
    console.log("New search initiated:", destination);
  };

  useEffect(() => {
    if (!countryCode && country) {
      setLoadingCode(true);
      fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        .then((res) => res.json())
        .then((data) => setCountryCode(data?.[0]?.cca2 || null))
        .finally(() => setLoadingCode(false));
    }
  }, [country, countryCode]);

  return (
    <div className="
      min-h-screen
      bg-gradient-to-br
      from-gray-50 to-gray-100
      dark:from-gray-900 dark:to-gray-800
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    ">

      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">
                {city}
                {country && (
                  <span className="text-gray-500 dark:text-gray-400 text-lg md:text-xl ml-3">
                    ({country})
                  </span>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Search for another destination
              </p>
            </div>
            <SearchBar onSelectDestination={handleNewSearch} />
          </div>

          {lat && lon && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors">
              <Map lat={lat} lon={lon} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lat && lon && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
                <WeatherCard lat={lat} lon={lon} />
              </div>
            )}

            {loadingCode ? (
              <div className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl shadow-lg p-6 animate-pulse transition-colors">
                Loading currency...
              </div>
            ) : countryCode ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
                <CurrencyCard countryCode={countryCode} />
              </div>
            ) : null}
          </div>

          {/* Languages */}
          {countryCode && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <LanguageCard countryCode={countryCode} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lat && lon && <AttractionsList lat={lat} lon={lon} />}
            {lat && lon && <ActivitiesList lat={lat} lon={lon} city={city} country={country} />}
          </div>

          {lat && lon && country && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <AirportInfo lat={lat} lon={lon} country={country} />
            </div>
          )}

          <div className="text-center pt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="
                inline-flex items-center gap-2
                px-6 py-3
                bg-blue-600 hover:bg-blue-700
                dark:bg-blue-500 dark:hover:bg-blue-600
                text-white
                rounded-xl
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition-all
                hover:scale-105
              "
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="
        bg-gray-800 dark:bg-gray-900
        text-white dark:text-gray-300
        py-8
        mt-12
        transition-colors
      ">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl font-bold mb-2">GetGo</p>
          <p className="mb-4">Your travel companion for discovering the world</p>
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
          </div>
          <p className="text-sm text-gray-400">© 2025 GetGo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}