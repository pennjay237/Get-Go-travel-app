import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Map from "../component/Map";
import WeatherCard from "../component/WeatherCard";
import AirportInfo from "../component/AirportInfo";
import CurrencyCard from "../component/CurrencyCard";
import LanguageCard from "../component/LanguageCard";
import ActivitiesList from "../component/ActivitiesList";
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

  if (loading) return <p className="text-gray-500">Loading attractions...</p>;
  if (!attractions.length) return <p>No attractions found.</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-3">
      <h3 className="text-xl font-semibold mb-2">Popular Attractions</h3>
      <ul className="space-y-2">
        {attractions.map((poi) => (
          <li
            key={poi.properties.place_id}
            className="p-3 border rounded-lg hover:bg-gray-50 transition"
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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-white rounded-xl shadow-lg p-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">
            {city}
            {country && (
              <span className="text-gray-500 text-lg md:text-xl ml-3">
                ({country})
              </span>
            )}
          </h1>
        </div>

        {/* Map */}
        {lat && lon && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <Map lat={lat} lon={lon} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lat && lon && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <WeatherCard lat={lat} lon={lon} />
            </div>
          )}

          {loadingCode ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-gray-500">
              Loading currency...
            </div>
          ) : countryCode ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CurrencyCard countryCode={countryCode} />
            </div>
          ) : null}
        </div>

        {countryCode && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <LanguageCard countryCode={countryCode} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lat && lon && <AttractionsList lat={lat} lon={lon} />}
          {lat && lon && <ActivitiesList lat={lat} lon={lon} />}
        </div>

        {/* Nearest Arport */}
        {lat && lon && country && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <AirportInfo lat={lat} lon={lon} country={country} />
          </div>
        )}
      </div>
    </div>
  );
}
