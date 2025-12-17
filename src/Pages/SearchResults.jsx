import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Map from "../component/Map/Map";
import WeatherCard from "../component/WeatherCard/WeatherCard";
import AirportInfo from "../component/Airport/AirportInfo";
import CurrencyCard from "../component/Currency/CurrencyCard";
import LanguageCard from "../component/LanguageCard/LanguageCard";
import ActivitiesList from "../component/Activity/ActivitiesList";
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
      px-4 py-8
    ">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-6 text-center md:text-left transition-colors">
          <h1 className="text-3xl md:text-4xl font-bold">
            {city}
            {country && (
              <span className="text-gray-500 dark:text-gray-400 text-lg md:text-xl ml-3">
                ({country})
              </span>
            )}
          </h1>
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
      </div>
    </div>
  );
}